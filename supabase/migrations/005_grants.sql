-- Migration 005: Grant anon/authenticated access for PostgREST
-- Supabase uses roles: anon (public), authenticated (logged in), service_role (admin)

-- Public read access
GRANT SELECT ON categories TO anon, authenticated;
GRANT SELECT ON tags TO anon, authenticated;
GRANT SELECT ON tool_tags TO anon, authenticated;
GRANT SELECT ON tools TO anon, authenticated;
GRANT SELECT ON tools_public TO anon, authenticated;
GRANT SELECT ON tool_stats TO anon, authenticated;

-- Authenticated users can manage favorites and ratings
GRANT SELECT, INSERT, DELETE ON favorites TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON ratings TO authenticated;

-- Authenticated users can submit tools (INSERT only, RLS enforces draft status)
GRANT INSERT ON tools TO authenticated;
