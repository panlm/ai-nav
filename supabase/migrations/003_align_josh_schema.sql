-- Migration 003: Align tools table with Josh's finalized JSON Schema
-- Diff from 001_initial_schema.sql → Josh's spec

-- ============================================
-- Step 1: Create ENUMs
-- ============================================
CREATE TYPE category_primary_enum AS ENUM (
  'text-writing',
  'image-generation',
  'video',
  'audio-voice',
  'code-dev',
  'data-analytics',
  'marketing-seo',
  'customer-support',
  'productivity',
  'education',
  'design-ui',
  'research',
  'e-commerce',
  'finance',
  'hr-recruiting',
  'legal',
  'healthcare',
  'other'
);

CREATE TYPE pricing_model_enum AS ENUM (
  'free',
  'freemium',
  'paid',
  'enterprise',
  'open-source',
  'contact-sales'
);

CREATE TYPE chinese_support_enum AS ENUM (
  'native',
  'supported',
  'english-only'
);

CREATE TYPE tool_status_enum AS ENUM (
  'active',
  'stale',
  'discontinued'
);

CREATE TYPE review_status_enum AS ENUM (
  'draft',
  'pending-review',
  'published',
  'archived',
  'rejected'
);

-- ============================================
-- Step 2: Alter tools table
-- ============================================

-- 2a: Split description → description_short + description_long
ALTER TABLE tools RENAME COLUMN description TO description_long;
ALTER TABLE tools ADD COLUMN description_short VARCHAR(200) NOT NULL DEFAULT '';
ALTER TABLE tools ALTER COLUMN description_long TYPE TEXT;

-- 2b: Replace pricing with pricing_model
ALTER TABLE tools ADD COLUMN pricing_model pricing_model_enum NOT NULL DEFAULT 'free';
-- Migrate existing data
UPDATE tools SET pricing_model = pricing::pricing_model_enum;
ALTER TABLE tools DROP COLUMN pricing;

-- 2c: Replace chinese_support boolean → enum
ALTER TABLE tools ADD COLUMN chinese_support_new chinese_support_enum NOT NULL DEFAULT 'english-only';
UPDATE tools SET chinese_support_new = CASE
  WHEN chinese_support = TRUE THEN 'supported'::chinese_support_enum
  ELSE 'english-only'::chinese_support_enum
END;
ALTER TABLE tools DROP COLUMN chinese_support;
ALTER TABLE tools RENAME COLUMN chinese_support_new TO chinese_support;

-- 2d: Replace category FK with category_primary enum
ALTER TABLE tools ADD COLUMN category_primary category_primary_enum NOT NULL DEFAULT 'other';
-- Best-effort mapping from old category slugs
UPDATE tools SET category_primary = CASE
  WHEN category_id IN (SELECT id FROM categories WHERE slug = 'text-generation') THEN 'text-writing'::category_primary_enum
  WHEN category_id IN (SELECT id FROM categories WHERE slug = 'image-design') THEN 'image-generation'::category_primary_enum
  WHEN category_id IN (SELECT id FROM categories WHERE slug = 'coding') THEN 'code-dev'::category_primary_enum
  WHEN category_id IN (SELECT id FROM categories WHERE slug = 'audio-video') THEN 'audio-voice'::category_primary_enum
  WHEN category_id IN (SELECT id FROM categories WHERE slug = 'productivity') THEN 'productivity'::category_primary_enum
  WHEN category_id IN (SELECT id FROM categories WHERE slug = 'data-analysis') THEN 'data-analytics'::category_primary_enum
  WHEN category_id IN (SELECT id FROM categories WHERE slug = 'education') THEN 'education'::category_primary_enum
  WHEN category_id IN (SELECT id FROM categories WHERE slug = 'marketing') THEN 'marketing-seo'::category_primary_enum
  ELSE 'other'::category_primary_enum
END;
ALTER TABLE tools DROP COLUMN category_id;
ALTER TABLE tools DROP COLUMN subcategory_id;

-- 2e: Replace status text check → enum
ALTER TABLE tools ADD COLUMN status_new review_status_enum NOT NULL DEFAULT 'draft';
UPDATE tools SET status_new = status::review_status_enum;
ALTER TABLE tools DROP COLUMN status;
ALTER TABLE tools RENAME COLUMN status_new TO status;

-- 2f: Add tool_status
ALTER TABLE tools ADD COLUMN tool_status tool_status_enum NOT NULL DEFAULT 'active';

-- 2g: Rebuild search_vector with new columns
-- Drop the generated column first, then recreate
ALTER TABLE tools DROP COLUMN search_vector;
ALTER TABLE tools ADD COLUMN search_vector TSVECTOR GENERATED ALWAYS AS (
  setweight(to_tsvector('simple', coalesce(name, '')), 'A') ||
  setweight(to_tsvector('simple', coalesce(description_short, '')), 'B') ||
  setweight(to_tsvector('simple', coalesce(description_long, '')), 'C')
) STORED;

-- ============================================
-- Step 3: Rebuild indexes
-- ============================================
DROP INDEX IF EXISTS idx_tools_search;
DROP INDEX IF EXISTS idx_tools_category;
DROP INDEX IF EXISTS idx_tools_subcategory;
DROP INDEX IF EXISTS idx_tools_pricing;
DROP INDEX IF EXISTS idx_tools_status;

CREATE INDEX idx_tools_search ON tools USING GIN (search_vector);
CREATE INDEX idx_tools_category_primary ON tools (category_primary);
CREATE INDEX idx_tools_pricing_model ON tools (pricing_model);
CREATE INDEX idx_tools_status ON tools (status);
CREATE INDEX idx_tools_tool_status ON tools (tool_status);
CREATE INDEX idx_tools_chinese_support ON tools (chinese_support);

-- ============================================
-- Step 4: Update RLS policies
-- ============================================
DROP POLICY IF EXISTS "Published tools are viewable by everyone" ON tools;
CREATE POLICY "Published tools are viewable by everyone"
  ON tools FOR SELECT
  USING (status = 'published' AND tool_status != 'discontinued');

DROP POLICY IF EXISTS "Authenticated users can submit tools" ON tools;
CREATE POLICY "Authenticated users can submit tools"
  ON tools FOR INSERT
  TO authenticated
  WITH CHECK (submitted_by = auth.uid() AND status = 'draft');

-- ============================================
-- Step 5: Refresh materialized view
-- ============================================
REFRESH MATERIALIZED VIEW CONCURRENTLY tool_stats;

-- ============================================
-- Step 6: Update categories table to match Josh's 18 categories
-- ============================================
TRUNCATE categories CASCADE;
INSERT INTO categories (name, slug, icon, sort_order) VALUES
  ('文本写作', 'text-writing', '✍️', 1),
  ('图像生成', 'image-generation', '🎨', 2),
  ('视频', 'video', '🎬', 3),
  ('语音音频', 'audio-voice', '🎵', 4),
  ('编程开发', 'code-dev', '💻', 5),
  ('数据分析', 'data-analytics', '📈', 6),
  ('营销SEO', 'marketing-seo', '📣', 7),
  ('客户支持', 'customer-support', '🎧', 8),
  ('效率办公', 'productivity', '📊', 9),
  ('教育学习', 'education', '📚', 10),
  ('设计UI', 'design-ui', '🎯', 11),
  ('研究', 'research', '🔬', 12),
  ('电商', 'e-commerce', '🛒', 13),
  ('金融', 'finance', '💰', 14),
  ('HR招聘', 'hr-recruiting', '👥', 15),
  ('法律', 'legal', '⚖️', 16),
  ('医疗健康', 'healthcare', '🏥', 17),
  ('其他', 'other', '📦', 18);
