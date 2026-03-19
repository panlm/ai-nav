-- Migration 006: Align field names with Josh's actual JSON output
-- Fixes schema diff: description_long→description_full, adds locale, categories_secondary, traffic_estimate

-- ============================================
-- 1. Rename description_long → description_full
-- ============================================
ALTER TABLE tools RENAME COLUMN description_long TO description_full;

-- ============================================
-- 2. Add locale field for i18n support
-- ============================================
ALTER TABLE tools ADD COLUMN locale TEXT NOT NULL DEFAULT 'zh';

-- Drop old unique constraint on slug alone, add composite unique
ALTER TABLE tools DROP CONSTRAINT IF EXISTS tools_slug_key;
ALTER TABLE tools ADD CONSTRAINT tools_slug_locale_key UNIQUE (slug, locale);

-- ============================================
-- 3. Add categories_secondary array
-- ============================================
ALTER TABLE tools ADD COLUMN categories_secondary TEXT[] DEFAULT '{}';
CREATE INDEX idx_tools_categories_secondary ON tools USING GIN (categories_secondary);

-- ============================================
-- 4. Add traffic_estimate JSONB
-- ============================================
-- Structure: { "monthly_visits": 1000000, "source": "similarweb", "updated_at": "2026-03" }
ALTER TABLE tools ADD COLUMN traffic_estimate JSONB DEFAULT '{}';

-- ============================================
-- 5. Update search_vector trigger for renamed column
-- ============================================
CREATE OR REPLACE FUNCTION tools_search_vector_update() RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('simple', coalesce(NEW.name, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(NEW.description_short, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(NEW.description_full, '')), 'C') ||
    setweight(to_tsvector('simple', coalesce(array_to_string(NEW.use_cases, ' '), '')), 'C') ||
    setweight(to_tsvector('simple', coalesce(array_to_string(NEW.workflow_tags, ' '), '')), 'D');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Backfill search vector
UPDATE tools SET search_vector = (
  setweight(to_tsvector('simple', coalesce(name, '')), 'A') ||
  setweight(to_tsvector('simple', coalesce(description_short, '')), 'B') ||
  setweight(to_tsvector('simple', coalesce(description_full, '')), 'C') ||
  setweight(to_tsvector('simple', coalesce(array_to_string(use_cases, ' '), '')), 'C') ||
  setweight(to_tsvector('simple', coalesce(array_to_string(workflow_tags, ' '), '')), 'D')
);

-- ============================================
-- 6. Update tools_public view
-- ============================================
CREATE OR REPLACE VIEW tools_public AS
SELECT
  id, name, slug, locale, description_short, description_full, url, logo_url,
  category_primary, categories_secondary, pricing_model, chinese_support,
  platforms, open_source, status, tool_status, verified_at,
  editor_score, use_cases, workflow_tags, model_base,
  review, api_available, github_url, pricing_detail,
  traffic_estimate, search_vector, created_at, updated_at
FROM tools
WHERE status = 'published' AND tool_status != 'discontinued';
