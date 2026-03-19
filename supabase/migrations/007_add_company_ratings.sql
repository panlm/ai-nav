-- Migration 007: Add company and ratings JSONB fields from Josh's batch data

-- company: { "name": "...", "country": "US", "founded_year": 2021, "funding_stage": "series-a" }
ALTER TABLE tools ADD COLUMN IF NOT EXISTS company JSONB DEFAULT '{}';

-- ratings: { "overall": 4.3, "ease_of_use": 4.5, "value_for_money": 3.8, "output_quality": 4.2, "review_count": 0 }
-- This is EDITOR ratings, separate from user ratings table
ALTER TABLE tools ADD COLUMN IF NOT EXISTS editor_ratings JSONB DEFAULT '{}';

-- Grant access
GRANT SELECT ON tools TO anon, authenticated;
GRANT SELECT ON tools_public TO anon, authenticated;

-- Update tools_public view to include new fields
CREATE OR REPLACE VIEW tools_public AS
SELECT
  id, name, slug, locale, description_short, description_full, url, logo_url,
  category_primary, categories_secondary, pricing_model, chinese_support,
  platforms, open_source, status, tool_status, verified_at,
  editor_score, use_cases, workflow_tags, model_base,
  review, api_available, github_url, pricing_detail,
  traffic_estimate, company, editor_ratings,
  search_vector, created_at, updated_at
FROM tools
WHERE status = 'published' AND tool_status != 'discontinued';
