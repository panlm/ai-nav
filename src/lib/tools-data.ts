// Unified tool data layer — merges batch-1 JSON (rich, snake_case) with mock-data fallbacks
// This replaces direct mock-data imports across the site.

import batch1Raw from '../../data/tools-batch-1.json'
import batch2Raw from '../../data/tools-batch-2.json'

// ── Types ────────────────────────────────────────────────────────────────────

export type CategoryPrimary =
  | 'text-writing' | 'image-generation' | 'video' | 'audio-voice'
  | 'code-dev' | 'data-analytics' | 'marketing-seo' | 'customer-support'
  | 'productivity' | 'education' | 'design-ui' | 'research'
  | 'e-commerce' | 'finance' | 'hr-recruiting' | 'legal'
  | 'healthcare' | 'other'

export type PricingModel = 'free' | 'freemium' | 'paid' | 'enterprise' | 'open-source' | 'contact-sales'
export type ChineseSupport = 'native' | 'supported' | 'english-only'

export interface PricingPlan {
  name: string
  price_monthly?: number
  features: string[]
}

export interface PricingDetail {
  currency: string
  startingPrice: number
  freeTierLimits?: string
  plans?: PricingPlan[]
}

export interface Company {
  name: string
  country: string
  foundedYear: number
  fundingStage: string
}

export interface Ratings {
  overall: number
  easeOfUse: number
  valueForMoney: number
  outputQuality: number
  reviewCount: number
}

export interface ToolReview {
  tested: boolean
  testedAt?: string
  verdict?: string
  pros?: string[]
  cons?: string[]
  bestFor?: string
}

export interface Affiliate {
  hasProgram: boolean
  commissionRate: string
  cookieDays: number
}

export interface TrafficEstimate {
  monthlyVisits: number
  trafficTrend: string
}

export interface Tool {
  id: string
  name: string
  slug: string
  url: string
  descriptionShort: string
  descriptionFull: string
  categoryPrimary: string
  categoriesSecondary: string[]
  tags: string[]
  useCases: string[]
  pricingModel: string
  pricingDetail?: PricingDetail
  platforms: string[]
  apiAvailable: boolean
  openSource: boolean
  modelBase: string[]
  company?: Company
  ratings: Ratings
  review: ToolReview
  workflowTags: string[]
  affiliate?: Affiliate
  trafficEstimate?: TrafficEstimate
  status: string
  featured: boolean
  chineseSupport: ChineseSupport
  logoUrl?: string
  editorScore: number
  locale: string
  verifiedAt?: string
}

export interface Category {
  name: string
  slug: CategoryPrimary
  icon: string
  sortOrder: number
  toolCount: number
}

// ── Category definitions ─────────────────────────────────────────────────────

const categoryDefs: Omit<Category, 'toolCount'>[] = [
  { name: '文本写作', slug: 'text-writing', icon: '✍️', sortOrder: 1 },
  { name: '图像生成', slug: 'image-generation', icon: '🎨', sortOrder: 2 },
  { name: '视频', slug: 'video', icon: '🎬', sortOrder: 3 },
  { name: '语音音频', slug: 'audio-voice', icon: '🎵', sortOrder: 4 },
  { name: '编程开发', slug: 'code-dev', icon: '💻', sortOrder: 5 },
  { name: '数据分析', slug: 'data-analytics', icon: '📈', sortOrder: 6 },
  { name: '营销SEO', slug: 'marketing-seo', icon: '📣', sortOrder: 7 },
  { name: '客户支持', slug: 'customer-support', icon: '🎧', sortOrder: 8 },
  { name: '效率办公', slug: 'productivity', icon: '📊', sortOrder: 9 },
  { name: '教育学习', slug: 'education', icon: '📚', sortOrder: 10 },
  { name: '设计UI', slug: 'design-ui', icon: '🎯', sortOrder: 11 },
  { name: '研究', slug: 'research', icon: '🔬', sortOrder: 12 },
  { name: '电商', slug: 'e-commerce', icon: '🛒', sortOrder: 13 },
  { name: '金融', slug: 'finance', icon: '💰', sortOrder: 14 },
  { name: 'HR招聘', slug: 'hr-recruiting', icon: '👥', sortOrder: 15 },
  { name: '法律', slug: 'legal', icon: '⚖️', sortOrder: 16 },
  { name: '医疗健康', slug: 'healthcare', icon: '🏥', sortOrder: 17 },
  { name: '其他', slug: 'other', icon: '📦', sortOrder: 18 },
]

// ── Price / category corrections (Josh's corrections) ───────────────────────

const priceCorrections: Record<string, Partial<{ startingPrice: number; categoryPrimary: string }>> = {
  'jasper-ai': { startingPrice: 49 },
  'copy-ai': { startingPrice: 49 },
  'elevenlabs': { startingPrice: 11 },
  'grammarly': { categoryPrimary: 'text-writing' },
}

// ── Chinese-support inference (batch 1 doesn't carry chinese_support) ───────

const chineseSupportMap: Record<string, ChineseSupport> = {
  'chatgpt': 'supported',
  'claude': 'supported',
  'jasper-ai': 'supported',
  'copy-ai': 'english-only',
  'writesonic': 'supported',
  'midjourney': 'english-only',
  'dall-e-3': 'supported',
  'leonardo-ai': 'english-only',
  'runway': 'english-only',
  'synthesia': 'supported',
  'heygen': 'supported',
  'elevenlabs': 'supported',
  'murf-ai': 'english-only',
  'descript': 'english-only',
  'github-copilot': 'supported',
  'cursor': 'supported',
  'tabnine': 'english-only',
  'julius-ai': 'supported',
  'tableau': 'supported',
  'surfer-seo': 'english-only',
  'semrush': 'english-only',
  'grammarly': 'english-only',
  'intercom': 'english-only',
  'zendesk-ai': 'supported',
  'tidio': 'english-only',
  'notion-ai': 'supported',
  'otter-ai': 'english-only',
  'fireflies-ai': 'english-only',
  'khanmigo': 'english-only',
  'duolingo-max': 'supported',
  'quizlet-ai': 'english-only',
  'canva-ai': 'native',
  'figma-ai': 'english-only',
  'uizard': 'english-only',
  'perplexity-ai': 'supported',
  'elicit': 'english-only',
  'shopify-magic': 'supported',
  'klaviyo-ai': 'english-only',
  'gorgias': 'english-only',
  'stripe-billing-ai': 'english-only',
  'ramp-ai': 'english-only',
  'deel-ai': 'english-only',
  'hirevue': 'english-only',
  'harvey-ai': 'english-only',
  'spellbook': 'english-only',
  'hippocratic-ai': 'english-only',
  'luma-ai': 'english-only',
  'pictory': 'english-only',
  'zapier-ai': 'english-only',
  'adobe-firefly': 'supported',
  // Batch 2
  'suno-ai': 'supported',
  'kling-ai': 'native',
  'google-gemini': 'supported',
  'kimi': 'native',
  'tongyi-qianwen': 'native',
  'wenxin-yiyan': 'native',
  'zhipu-chatglm': 'native',
  'gamma-ai': 'supported',
  'stable-diffusion': 'supported',
  'pika': 'english-only',
  'notion-calendar': 'supported',
  'manychat': 'english-only',
  'ahrefs': 'english-only',
  'luma-dream-machine': 'english-only',
  'fliki': 'english-only',
  'udio': 'english-only',
  'n8n': 'supported',
  'make': 'supported',
  'midjourney-niji': 'supported',
  'ideogram': 'english-only',
  'hubspot-ai': 'english-only',
  'manus-ai': 'native',
  'bolt-new': 'english-only',
  'v0': 'english-only',
  'replit-ai': 'english-only',
  'lovable': 'english-only',
  'framer-ai': 'english-only',
  'whimsical-ai': 'english-only',
  'consensus': 'english-only',
  'hypotenuse-ai': 'english-only',
  'akkio': 'english-only',
  'polymer': 'english-only',
  'tome': 'english-only',
  'lemon-squeezy': 'english-only',
  'resume-io': 'supported',
  'reclaim-ai': 'english-only',
  'beautiful-ai': 'english-only',
  'deepl': 'native',
  'casetext': 'english-only',
  'glass-health': 'english-only',
  'invideo-ai': 'supported',
  'lovo-ai': 'english-only',
  'tldv': 'english-only',
  'jasper-art': 'supported',
  'phind': 'english-only',
  'decagon': 'english-only',
  'scholarcy': 'english-only',
  'lexica': 'english-only',
  'rezi': 'english-only',
  'pi-ai': 'supported',
}

// ── Platform name normalization ─────────────────────────────────────────────

function normalizePlatform(p: string): string {
  const map: Record<string, string> = {
    'web': 'Web',
    'ios': 'iOS',
    'android': 'Android',
    'mac': 'Mac',
    'macos': 'Mac',
    'win': 'Win',
    'windows': 'Win',
    'linux': 'Linux',
    'api': 'API',
    'chrome-extension': 'Chrome Extension',
    'chrome_extension': 'Chrome Extension',
    'wechat-mini': 'wechat-mini',
    'vscode': 'VS Code',
    'jetbrains': 'JetBrains',
    'slack-integration': 'Slack',
    'zapier-integration': 'Zapier',
  }
  return map[p.toLowerCase()] || p
}

// ── Convert one batch-1 raw entry → Tool ────────────────────────────────────

function mapBatchTool(raw: any): Tool {
  const slug = raw.slug as string
  const corrections = priceCorrections[slug]

  const categoryPrimary = corrections?.categoryPrimary || raw.category_primary || 'other'

  // Pricing detail
  let pricingDetail: PricingDetail | undefined
  if (raw.pricing_detail) {
    const pd = raw.pricing_detail
    pricingDetail = {
      currency: pd.currency || 'USD',
      startingPrice: corrections?.startingPrice ?? pd.starting_price ?? 0,
      freeTierLimits: pd.free_tier_limits,
      plans: pd.plans,
    }
  }

  // Company
  let company: Company | undefined
  if (raw.company) {
    company = {
      name: raw.company.name,
      country: raw.company.country,
      foundedYear: raw.company.founded_year,
      fundingStage: raw.company.funding_stage,
    }
  }

  // Ratings
  const r = raw.ratings || {}
  const ratings: Ratings = {
    overall: r.overall ?? 4.0,
    easeOfUse: r.ease_of_use ?? 4.0,
    valueForMoney: r.value_for_money ?? 4.0,
    outputQuality: r.output_quality ?? 4.0,
    reviewCount: r.review_count ?? 0,
  }

  // Review
  const rev = raw.review || {}
  const review: ToolReview = {
    tested: rev.tested ?? false,
    testedAt: rev.tested_at,
    verdict: rev.verdict,
    pros: rev.pros,
    cons: rev.cons,
    bestFor: rev.best_for,
  }

  // Affiliate
  let affiliate: Affiliate | undefined
  if (raw.affiliate) {
    affiliate = {
      hasProgram: raw.affiliate.has_program ?? false,
      commissionRate: raw.affiliate.commission_rate ?? '',
      cookieDays: raw.affiliate.cookie_days ?? 0,
    }
  }

  // Traffic
  let trafficEstimate: TrafficEstimate | undefined
  if (raw.traffic_estimate) {
    trafficEstimate = {
      monthlyVisits: raw.traffic_estimate.monthly_visits ?? 0,
      trafficTrend: raw.traffic_estimate.traffic_trend ?? 'stable',
    }
  }

  return {
    id: raw.id,
    name: raw.name,
    slug,
    url: raw.url,
    descriptionShort: raw.description_short || '',
    descriptionFull: raw.description_full || raw.description_short || '',
    categoryPrimary,
    categoriesSecondary: raw.categories_secondary || [],
    tags: raw.tags || [],
    useCases: raw.use_cases || [],
    pricingModel: raw.pricing_model || 'free',
    pricingDetail,
    platforms: (raw.platform || []).map(normalizePlatform),
    apiAvailable: raw.api_available ?? false,
    openSource: raw.open_source ?? false,
    modelBase: raw.model_base || [],
    company,
    ratings,
    review,
    workflowTags: raw.workflow_tags || [],
    affiliate,
    trafficEstimate,
    status: raw.status || 'published',
    featured: raw.featured ?? false,
    chineseSupport: chineseSupportMap[slug] || 'english-only',
    logoUrl: undefined,
    editorScore: Math.round(ratings.overall * 20) / 10, // 4.3 → 8.6
    locale: raw.locale || 'zh',
    verifiedAt: raw.updated_at ? raw.updated_at.slice(0, 10) : undefined,
  }
}

// ── Mock-only tools (not in batch 1 at all) ──────────────────────────────────

const mockOnlyTools: Tool[] = [
  {
    id: 'mock-doubao',
    name: '豆包',
    slug: 'doubao',
    url: 'https://www.doubao.com',
    descriptionShort: '字节跳动旗下 AI 对话助手，中文能力原生支持，功能丰富。',
    descriptionFull: '豆包是字节跳动推出的 AI 对话助手，基于自研大模型，中文理解和生成能力出色。支持写作、翻译、代码、问答等多种场景，拥有插件生态和角色扮演功能。',
    categoryPrimary: 'text-writing',
    categoriesSecondary: [],
    tags: ['中文原生', '免费'],
    useCases: [],
    pricingModel: 'free',
    platforms: ['Web', 'iOS', 'Android', 'wechat-mini'],
    apiAvailable: false,
    openSource: false,
    modelBase: [],
    ratings: { overall: 4.1, easeOfUse: 4.3, valueForMoney: 4.5, outputQuality: 4.0, reviewCount: 0 },
    review: { tested: false },
    workflowTags: [],
    status: 'published',
    featured: false,
    chineseSupport: 'native',
    editorScore: 8.2,
    locale: 'zh',
    verifiedAt: '2026-03-10',
  },
  {
    id: 'mock-stable-diffusion',
    name: 'Stable Diffusion',
    slug: 'stable-diffusion',
    url: 'https://stability.ai',
    descriptionShort: '最流行的开源图像生成模型，支持本地部署，社区生态丰富。',
    descriptionFull: 'Stable Diffusion 是 Stability AI 推出的开源图像生成模型。完全开源可本地部署，有丰富的社区模型和 LoRA，支持 ControlNet 精准控制。适合追求隐私和自定义的用户。',
    categoryPrimary: 'image-generation',
    categoriesSecondary: [],
    tags: ['开源', '绘画', '本地部署'],
    useCases: [],
    pricingModel: 'open-source',
    platforms: ['Web', 'Mac', 'Win', 'Linux', 'API'],
    apiAvailable: true,
    openSource: true,
    modelBase: [],
    ratings: { overall: 4.35, easeOfUse: 3.5, valueForMoney: 4.8, outputQuality: 4.2, reviewCount: 0 },
    review: { tested: false },
    workflowTags: [],
    status: 'published',
    featured: true,
    chineseSupport: 'supported',
    editorScore: 8.7,
    locale: 'zh',
    verifiedAt: '2026-03-08',
  },
  {
    id: 'mock-ollama',
    name: 'Ollama',
    slug: 'ollama',
    url: 'https://ollama.com',
    descriptionShort: '本地运行大语言模型的开源工具，一行命令即可启动。',
    descriptionFull: 'Ollama 让你在本地轻松运行 Llama 3、Mistral、Gemma 等开源大模型。一行命令安装和运行，内置模型管理、API 服务，适合开发者本地实验和私有化部署。',
    categoryPrimary: 'code-dev',
    categoriesSecondary: [],
    tags: ['开源', '本地部署', 'API'],
    useCases: [],
    pricingModel: 'free',
    platforms: ['Mac', 'Win', 'Linux', 'API'],
    apiAvailable: true,
    openSource: true,
    modelBase: [],
    ratings: { overall: 4.25, easeOfUse: 4.0, valueForMoney: 5.0, outputQuality: 4.0, reviewCount: 0 },
    review: { tested: false },
    workflowTags: [],
    status: 'published',
    featured: true,
    chineseSupport: 'supported',
    editorScore: 8.5,
    locale: 'zh',
    verifiedAt: '2026-03-10',
  },
  {
    id: 'mock-v0',
    name: 'v0',
    slug: 'v0',
    url: 'https://v0.dev',
    descriptionShort: 'Vercel 出品的 AI UI 生成工具，自然语言生成 React 组件。',
    descriptionFull: 'v0 是 Vercel 推出的 AI UI 代码生成工具。用自然语言描述你想要的界面，自动生成 React + Tailwind 代码。支持迭代修改、组件导出，适合快速原型和前端开发。',
    categoryPrimary: 'code-dev',
    categoriesSecondary: [],
    tags: ['代码', 'UI', 'React'],
    useCases: [],
    pricingModel: 'freemium',
    platforms: ['Web'],
    apiAvailable: false,
    openSource: false,
    modelBase: [],
    ratings: { overall: 4.2, easeOfUse: 4.5, valueForMoney: 4.0, outputQuality: 4.0, reviewCount: 0 },
    review: { tested: false },
    workflowTags: [],
    status: 'published',
    featured: false,
    chineseSupport: 'english-only',
    editorScore: 8.4,
    locale: 'zh',
    verifiedAt: '2026-03-05',
  },
  // Suno and Gamma removed — covered by batch 2 as suno-ai and gamma-ai
]

// ── Build the unified tool list ──────────────────────────────────────────────

const batch1Tools: Tool[] = (batch1Raw as any[]).map(mapBatchTool)
const batch2Tools: Tool[] = (batch2Raw as any[]).map(mapBatchTool)

// Merge: batch 1 first, then batch 2 (no overlap expected), then mock-only for anything still missing
const slugSet = new Set<string>()
const allTools: Tool[] = []

for (const t of batch1Tools) {
  if (!slugSet.has(t.slug)) {
    slugSet.add(t.slug)
    allTools.push(t)
  }
}
for (const t of batch2Tools) {
  if (!slugSet.has(t.slug)) {
    slugSet.add(t.slug)
    allTools.push(t)
  }
}
for (const t of mockOnlyTools) {
  if (!slugSet.has(t.slug)) {
    slugSet.add(t.slug)
    allTools.push(t)
  }
}

// ── Build categories with real counts ───────────────────────────────────────

function buildCategories(): Category[] {
  const published = allTools.filter(t => t.status === 'published')
  const countMap = new Map<string, number>()
  for (const t of published) {
    countMap.set(t.categoryPrimary, (countMap.get(t.categoryPrimary) || 0) + 1)
  }
  return categoryDefs.map(c => ({
    ...c,
    toolCount: countMap.get(c.slug) || 0,
  }))
}

export const categories: Category[] = buildCategories()

// ── Public API ──────────────────────────────────────────────────────────────

export function getAllTools(): Tool[] {
  return allTools.filter(t => t.status === 'published')
}

export function getToolBySlug(slug: string): Tool | undefined {
  return allTools.find(t => t.slug === slug)
}

export function getToolsByCategory(slug: string): Tool[] {
  return allTools.filter(t => t.categoryPrimary === slug && t.status === 'published')
}

export function getFeaturedTools(): Tool[] {
  return allTools
    .filter(t => t.featured && t.status === 'published')
    .sort((a, b) => b.editorScore - a.editorScore)
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase()
  return allTools.filter(t =>
    t.status === 'published' && (
      t.name.toLowerCase().includes(q) ||
      t.descriptionShort.toLowerCase().includes(q) ||
      t.tags.some(tag => tag.toLowerCase().includes(q))
    )
  )
}

export function getCategories(): Category[] {
  return categories
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug)
}
