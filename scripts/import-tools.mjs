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
// JSON → DB field mapping:
//   platform → platforms
//   featured (bool) → featured_placement (JSONB)
//   company → company (JSONB)
//   ratings → editor_ratings (JSONB, to avoid collision with user ratings table)
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
    chinese_support: t.chinese_support || 'supported',  // Josh's data is zh-locale, default to supported
    platforms: t.platform || t.platforms || [],  // Josh uses "platform", DB uses "platforms"
    open_source: t.open_source || false,
    status: t.status || 'published',
    tool_status: t.tool_status || 'active',
    verified_at: t.verified_at || new Date().toISOString(),
    editor_score: t.editor_score || (t.ratings?.overall ? Math.round(t.ratings.overall * 2) / 1 : null),
    use_cases: t.use_cases || [],
    workflow_tags: t.workflow_tags || [],
    model_base: t.model_base || [],
    review: t.review || {},
    affiliate: t.affiliate || {},
    featured_placement: t.featured ? { promoted: true, tier: 'basic' } : {},
    api_available: t.api_available || false,
    github_url: t.github_url || null,
    pricing_detail: t.pricing_detail || {},
    traffic_estimate: t.traffic_estimate || {},
    company: t.company || {},
    editor_ratings: t.ratings || {},
    submitted_by: null,  // Josh's data doesn't have auth user ids
    created_at: t.created_at || new Date().toISOString(),
    updated_at: t.updated_at || new Date().toISOString(),
  }
}

async function importTools() {
  let success = 0
  let errors = 0

  const mapped = tools.map(mapTool)

  if (dryRun) {
    console.log('\n📋 Sample mapped record:')
    console.log(JSON.stringify(mapped[0], null, 2))
    console.log(`\n📊 Field mapping check:`)
    console.log(`  platform[] → platforms[]: ${mapped[0].platforms}`)
    console.log(`  featured → featured_placement: ${JSON.stringify(mapped[0].featured_placement)}`)
    console.log(`  ratings → editor_ratings: ${JSON.stringify(mapped[0].editor_ratings)}`)
    console.log(`  company: ${JSON.stringify(mapped[0].company)}`)
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
      // Try one by one to identify the problem record
      for (const tool of batch) {
        const { error: singleErr } = await supabase
          .from('tools')
          .upsert(tool, { onConflict: 'slug,locale' })
        if (singleErr) {
          console.error(`  ❌ ${tool.name} (${tool.slug}): ${singleErr.message}`)
          errors++
        } else {
          success++
        }
      }
    } else {
      success += batch.length
      console.log(`✅ Batch ${Math.floor(i/25)+1}: ${batch.length} tools imported (${batch.map(t=>t.name).join(', ')})`)
    }
  }

  // Handle tags → tool_tags junction table
  console.log('\n📎 Syncing tags...')
  let tagCount = 0
  for (const t of tools) {
    if (!t.tags?.length) continue

    // Get tool id from DB
    const { data: dbTool } = await supabase
      .from('tools')
      .select('id')
      .eq('slug', t.slug)
      .eq('locale', t.locale || 'zh')
      .single()

    if (!dbTool) {
      console.error(`  ⚠️ Tool not found: ${t.slug}`)
      continue
    }

    for (const tagName of t.tags) {
      const tagSlug = tagName
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9\u4e00-\u9fff-]/g, '')
        || tagName.toLowerCase()

      // Upsert tag
      const { data: tag, error: tagErr } = await supabase
        .from('tags')
        .upsert({ name: tagName, slug: tagSlug }, { onConflict: 'name' })
        .select('id')
        .single()

      if (tag) {
        const { error: jtErr } = await supabase
          .from('tool_tags')
          .upsert({ tool_id: dbTool.id, tag_id: tag.id }, { onConflict: 'tool_id,tag_id' })
        if (!jtErr) tagCount++
      }
    }
  }

  console.log(`✅ ${tagCount} tool-tag associations created`)
  console.log(`\n📊 Import complete: ${success} success, ${errors} errors out of ${mapped.length} total`)
}

importTools().catch(console.error)
