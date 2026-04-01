# Supabase Migration Design — Static JSON → Database

## Overview
Migrate from static JSON files (`data/tools-batch-*.json`) to Supabase PostgreSQL for dynamic data management.

## Current Architecture (Static)
- Data: `data/tools-batch-1.json` (50 tools) + `data/tools-batch-2.json` (54 tools)
- Loader: `src/lib/tools-data.ts` — reads JSON at build time, maps snake_case → camelCase
- Build: Static site generation (SSG) via Astro
- Deploy: Vercel auto-deploy on git push

## Target Architecture (Hybrid)
- Data source: Supabase PostgreSQL (existing schema, tables: `tools`, `categories`)
- Build-time: Fetch all tools from Supabase at build time (ISR/SSG)
- Runtime: Search and filter via Supabase full-text search API (client-side)
- Fallback: Keep JSON files as backup; if Supabase unreachable at build, fall back to JSON

## Migration Steps

### Phase 1: Data Import (Day 1)
1. Get new Supabase service key from panlm
2. Run data import script: `scripts/import-tools.ts`
   - Read both batch JSON files
   - Map fields to Supabase schema (already defined in `supabase/` migrations)
   - Upsert 104 tools
3. Verify: `SELECT count(*) FROM tools WHERE status = 'published'` = 105

### Phase 2: Dual-Source Loader (Day 2)
1. Update `src/lib/tools-data.ts`:
   - Try Supabase first (using `src/lib/supabase.ts` client)
   - If fails, fall back to JSON files
   - Same TypeScript interface, zero changes to page components
2. Set env vars in Vercel:
   - `PUBLIC_SUPABASE_URL`
   - `PUBLIC_SUPABASE_ANON_KEY`

### Phase 3: Search Migration (Day 3)
1. Replace client-side JS search with Supabase full-text search
2. Update `/search` page to call Supabase API
3. Category filters can use Supabase queries for real-time counts

### Phase 4: Cleanup (Day 4)
1. Remove JSON fallback code (keep files as backup)
2. Enable Supabase trigger for search vector updates
3. Add admin UI for tool CRUD (future)

## Rollback Plan
- Keep JSON files in repo permanently
- Toggle in `tools-data.ts`: `USE_SUPABASE = true/false`
- If Supabase down, set to false, rebuild, deploy

## Prerequisites
- [ ] New Supabase service key (rotated from exposed one)
- [ ] Vercel environment variables configured
- [ ] Supabase schema migrations verified (already in `supabase/` dir)

## Risk Assessment
- **Low risk**: Dual-source approach means zero downtime
- **Main risk**: Supabase free tier rate limits (500 req/min should be fine for SSG)
- **Mitigation**: Build-time fetching, not runtime for page generation
