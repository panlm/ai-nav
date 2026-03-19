-- Migration 004: Add differentiation, monetization, and technical fields
-- Priority: use_cases, workflow_tags, review, model_base first
-- Then: affiliate, featured, api/github, pricing_detail

-- ============================================
-- 1. Differentiation fields (核心差异化)
-- ============================================

-- use_cases: 场景化用途，支撑 AI 推荐
ALTER TABLE tools ADD COLUMN use_cases TEXT[] DEFAULT '{}';
CREATE INDEX idx_tools_use_cases ON tools USING GIN (use_cases);

-- workflow_tags: 工作流标签，支撑组合方案推荐
ALTER TABLE tools ADD COLUMN workflow_tags TEXT[] DEFAULT '{}';
CREATE INDEX idx_tools_workflow_tags ON tools USING GIN (workflow_tags);

-- model_base: 底层模型标注
ALTER TABLE tools ADD COLUMN model_base TEXT[] DEFAULT '{}';
CREATE INDEX idx_tools_model_base ON tools USING GIN (model_base);

-- review: 编辑实测数据 (JSONB for flexibility)
-- Structure: {
--   "tested": true/false,
--   "tested_at": "2026-03-15",
--   "verdict": "强烈推荐",
--   "pros": ["优点1", "优点2"],
--   "cons": ["缺点1", "缺点2"],
--   "best_for": "适合人群描述",
--   "alternatives": ["tool-slug-1", "tool-slug-2"]
-- }
ALTER TABLE tools ADD COLUMN review JSONB DEFAULT '{}';

-- ============================================
-- 2. Monetization fields (不对外暴露)
-- ============================================

-- affiliate: 联盟营销数据 (JSONB, internal only)
-- Structure: {
--   "enabled": true/false,
--   "url": "https://...",
--   "network": "impact/cj/direct",
--   "commission_rate": "30%",
--   "cookie_days": 30,
--   "notes": "internal notes"
-- }
ALTER TABLE tools ADD COLUMN affiliate JSONB DEFAULT '{}';

-- featured: 付费推广位标记 (rename from boolean to structured)
-- Already had 'featured' concept in mock data, but this is monetization
-- We'll drop the old column if it somehow got in, and use JSONB
-- Structure: {
--   "promoted": true/false,
--   "tier": "basic/premium/spotlight",
--   "starts_at": "2026-03-01",
--   "ends_at": "2026-06-01",
--   "paid": true/false
-- }
ALTER TABLE tools ADD COLUMN featured_placement JSONB DEFAULT '{}';

-- ============================================
-- 3. Technical fields
-- ============================================

ALTER TABLE tools ADD COLUMN api_available BOOLEAN DEFAULT FALSE;
ALTER TABLE tools ADD COLUMN github_url TEXT;

-- pricing_detail: 结构化价格比较 (JSONB)
-- Structure: {
--   "free_tier": { "included": true, "limits": "10 req/day" },
--   "plans": [
--     { "name": "Pro", "price": "$20/mo", "features": ["feature1", "feature2"] },
--     { "name": "Team", "price": "$30/user/mo", "features": [...] }
--   ],
--   "enterprise": { "available": true, "contact": true },
--   "currency": "USD",
--   "billing_cycle": "monthly/annual"
-- }
ALTER TABLE tools ADD COLUMN pricing_detail JSONB DEFAULT '{}';

-- ============================================
-- 4. Indexes for query patterns
-- ============================================
CREATE INDEX idx_tools_api_available ON tools (api_available) WHERE api_available = TRUE;
CREATE INDEX idx_tools_review ON tools USING GIN (review);
CREATE INDEX idx_tools_featured ON tools USING GIN (featured_placement);

-- ============================================
-- 5. Update search vector via trigger (array_to_string not immutable for generated columns)
-- ============================================
ALTER TABLE tools DROP COLUMN IF EXISTS search_vector;
ALTER TABLE tools ADD COLUMN search_vector TSVECTOR;

CREATE OR REPLACE FUNCTION tools_search_vector_update() RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('simple', coalesce(NEW.name, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(NEW.description_short, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(NEW.description_long, '')), 'C') ||
    setweight(to_tsvector('simple', coalesce(array_to_string(NEW.use_cases, ' '), '')), 'C') ||
    setweight(to_tsvector('simple', coalesce(array_to_string(NEW.workflow_tags, ' '), '')), 'D');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_tools_search_vector
  BEFORE INSERT OR UPDATE ON tools
  FOR EACH ROW EXECUTE FUNCTION tools_search_vector_update();

-- Backfill existing rows
UPDATE tools SET search_vector = (
  setweight(to_tsvector('simple', coalesce(name, '')), 'A') ||
  setweight(to_tsvector('simple', coalesce(description_short, '')), 'B') ||
  setweight(to_tsvector('simple', coalesce(description_long, '')), 'C') ||
  setweight(to_tsvector('simple', coalesce(array_to_string(use_cases, ' '), '')), 'C') ||
  setweight(to_tsvector('simple', coalesce(array_to_string(workflow_tags, ' '), '')), 'D')
);

DROP INDEX IF EXISTS idx_tools_search;
CREATE INDEX idx_tools_search ON tools USING GIN (search_vector);

-- ============================================
-- 6. RLS: hide monetization fields from anon
-- ============================================
-- Note: RLS controls row access, not column access.
-- Column-level hiding is done at the API/view layer.
-- Create a public view that excludes internal fields:

CREATE OR REPLACE VIEW tools_public AS
SELECT
  id, name, slug, description_short, description_long, url, logo_url,
  category_primary, pricing_model, chinese_support, platforms,
  open_source, status, tool_status, verified_at,
  editor_score, use_cases, workflow_tags, model_base,
  review, api_available, github_url, pricing_detail,
  search_vector, created_at, updated_at
  -- Excluded: affiliate, featured_placement, submitted_by, affiliate_url
FROM tools
WHERE status = 'published' AND tool_status != 'discontinued';
