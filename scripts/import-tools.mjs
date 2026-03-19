#!/usr/bin/env node
// Import tools from Josh's JSON batch file into Supabase
// Usage: node scripts/import-tools.mjs <path-to-json> [--dry-run]

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL || 'https://yuzvmgwileqevbhctwvc.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY // service_role key for admin writes

if (!SUPABASE_KEY) {
  console.error('ERROR: Set SUPABASE_SERVICE_KEY env var (service_role key, not anon)')
  process.exit(1)
}

const jsonPath = process.argv[2]
const dryRun = process.argv.includes('--dry-run')

if (!jsonPath) {
  console.error('Usage: node scripts/import-tools.mjs <path-to-json> [--dry-run]')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Read and parse JSON
const raw = readFileSync(jsonPath, 'utf8')
const tools = JSON.parse(raw)

console.log(`📦 Loaded ${tools.length} tools from ${jsonPath}`)
if (dryRun) console.log('🔍 DRY RUN — no writes')

// Map Josh's field names to our DB columns
function mapTool(t) {
  return {
    id: t.id,
    name: t.name,
    slug: t.slug,
    locale: t.locale || 'zh',
    description_short: t.description_short,
    description_full: t.description_full,
    url: t.url,
    logo_url: t.logo_url || null,
    category_primary: t.category_primary,
    categories_secondary: t.categories_secondary || [],
    pricing_model: t.pricing_model,
    chinese_support: t.chinese_support || 'english-only',
    platforms: t.platform || t.platforms || [],
    open_source: t.open_source || false,
    status: 'published',  // Josh's data is pre-verified
    tool_status: t.tool_status || 'active',
    verified_at: t.verified_at || new Date().toISOString(),
    editor_score: t.editor_score || null,
    use_cases: t.use_cases || [],
    workflow_tags: t.workflow_tags || [],
    model_base: t.model_base || [],
    review: t.review || {},
    affiliate: t.affiliate || {},
    api_available: t.api_available || false,
    github_url: t.github_url || null,
    pricing_detail: t.pricing_detail || {},
    traffic_estimate: t.traffic_estimate || {},
    tags: t.tags || [],  // Note: tags go into tool_tags junction, but store in array too for search
  }
}

// Upsert tools (handle UNIQUE(slug, locale) constraint)
async function importTools() {
  let success = 0
  let errors = 0

  // Batch upsert (Supabase supports up to ~1000 rows)
  const mapped = tools.map(mapTool)

  if (dryRun) {
    console.log('\nSample mapped record:')
    console.log(JSON.stringify(mapped[0], null, 2))
    console.log(`\n✅ ${mapped.length} tools would be imported`)
    return
  }

  // Upsert in batches of 25
  for (let i = 0; i < mapped.length; i += 25) {
    const batch = mapped.slice(i, i + 25)
    const { data, error } = await supabase
      .from('tools')
      .upsert(batch, { onConflict: 'slug,locale' })

    if (error) {
      console.error(`❌ Batch ${i}-${i + batch.length}: ${error.message}`)
      errors += batch.length
    } else {
      success += batch.length
      console.log(`✅ Batch ${i}-${i + batch.length}: ${batch.length} tools imported`)
    }
  }

  // Handle tags → tool_tags junction table
  console.log('\n📎 Syncing tags...')
  for (const t of tools) {
    if (!t.tags?.length) continue

    for (const tagName of t.tags) {
      const tagSlug = tagName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\u4e00-\u9fff-]/g, '')

      // Upsert tag
      const { data: tag } = await supabase
        .from('tags')
        .upsert({ name: tagName, slug: tagSlug }, { onConflict: 'name' })
        .select('id')
        .single()

      if (tag) {
        // Get tool id
        const { data: tool } = await supabase
          .from('tools')
          .select('id')
          .eq('slug', t.slug)
          .eq('locale', t.locale || 'zh')
          .single()

        if (tool) {
          await supabase
            .from('tool_tags')
            .upsert({ tool_id: tool.id, tag_id: tag.id }, { onConflict: 'tool_id,tag_id' })
        }
      }
    }
  }

  console.log(`\n📊 Results: ${success} success, ${errors} errors out of ${mapped.length} total`)
}

importTools().catch(console.error)
