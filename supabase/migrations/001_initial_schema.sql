-- AI Nav: Initial Schema Migration
-- Creates core tables: categories, tools, tags, tool_tags

-- ============================================
-- Categories (支持多级分类，parent_id 实现子分类)
-- ============================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  icon TEXT,                    -- emoji or icon class (e.g. "🤖", "lucide:code")
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_categories_parent ON categories(parent_id);
CREATE INDEX idx_categories_slug ON categories(slug);

-- ============================================
-- Tools (核心工具表)
-- ============================================
CREATE TABLE tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  url TEXT NOT NULL,
  logo_url TEXT,
  -- 分类
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  subcategory_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  -- 属性
  pricing TEXT NOT NULL DEFAULT 'free'
    CHECK (pricing IN ('free', 'freemium', 'paid', 'open_source')),
  chinese_support BOOLEAN DEFAULT FALSE,
  platforms TEXT[] DEFAULT '{}',    -- ["web", "ios", "android", "mac", "windows", "linux", "api"]
  open_source BOOLEAN DEFAULT FALSE,
  -- 运营
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'published', 'archived', 'rejected')),
  verified_at TIMESTAMPTZ,
  affiliate_url TEXT,
  editor_score NUMERIC(3,1) CHECK (editor_score >= 0 AND editor_score <= 10),
  -- 提交者
  submitted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  -- 全文搜索向量
  search_vector TSVECTOR GENERATED ALWAYS AS (
    setweight(to_tsvector('simple', coalesce(name, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(description, '')), 'B')
  ) STORED,
  -- 时间戳
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_tools_search ON tools USING GIN (search_vector);
CREATE INDEX idx_tools_category ON tools(category_id);
CREATE INDEX idx_tools_subcategory ON tools(subcategory_id);
CREATE INDEX idx_tools_pricing ON tools(pricing);
CREATE INDEX idx_tools_status ON tools(status);
CREATE INDEX idx_tools_slug ON tools(slug);
CREATE INDEX idx_tools_platforms ON tools USING GIN (platforms);
CREATE INDEX idx_tools_editor_score ON tools(editor_score DESC NULLS LAST);

-- ============================================
-- Tags (标签表)
-- ============================================
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_tags_slug ON tags(slug);

-- ============================================
-- Tool Tags (多对多关联)
-- ============================================
CREATE TABLE tool_tags (
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (tool_id, tag_id)
);

CREATE INDEX idx_tool_tags_tag ON tool_tags(tag_id);

-- ============================================
-- User Favorites (用户收藏)
-- ============================================
CREATE TABLE favorites (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, tool_id)
);

-- ============================================
-- User Ratings (用户评分)
-- ============================================
CREATE TABLE ratings (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  score INT NOT NULL CHECK (score BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, tool_id)
);

-- ============================================
-- Tool Stats (物化视图: 聚合统计)
-- ============================================
CREATE MATERIALIZED VIEW tool_stats AS
SELECT
  t.id AS tool_id,
  COUNT(DISTINCT f.user_id) AS favorite_count,
  COALESCE(ROUND(AVG(r.score)::numeric, 1), 0) AS avg_rating,
  COUNT(DISTINCT r.user_id) AS rating_count
FROM tools t
LEFT JOIN favorites f ON f.tool_id = t.id
LEFT JOIN ratings r ON r.tool_id = t.id
GROUP BY t.id;

CREATE UNIQUE INDEX idx_tool_stats_tool ON tool_stats(tool_id);

-- ============================================
-- Auto-update updated_at trigger
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_tools_updated_at
  BEFORE UPDATE ON tools
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_ratings_updated_at
  BEFORE UPDATE ON ratings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- Row Level Security (RLS)
-- ============================================

-- Tools: 已发布的公开可读，管理员可写
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published tools are viewable by everyone"
  ON tools FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authenticated users can submit tools"
  ON tools FOR INSERT
  TO authenticated
  WITH CHECK (submitted_by = auth.uid() AND status = 'draft');

-- Favorites: 用户只能管理自己的收藏
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own favorites"
  ON favorites FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can manage own favorites"
  ON favorites FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Ratings: 用户只能管理自己的评分，所有人可读
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Ratings are viewable by everyone"
  ON ratings FOR SELECT
  USING (true);

CREATE POLICY "Users can manage own ratings"
  ON ratings FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Tags/Tool_tags: 公开可读
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tags are viewable by everyone"
  ON tags FOR SELECT USING (true);

ALTER TABLE tool_tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tool tags are viewable by everyone"
  ON tool_tags FOR SELECT USING (true);

-- Categories: 公开可读
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT USING (true);
