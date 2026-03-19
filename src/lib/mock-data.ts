// Mock data aligned with Josh's finalized JSON Schema
// Will be replaced by Supabase queries

export type CategoryPrimary =
  | 'text-writing' | 'image-generation' | 'video' | 'audio-voice'
  | 'code-dev' | 'data-analytics' | 'marketing-seo' | 'customer-support'
  | 'productivity' | 'education' | 'design-ui' | 'research'
  | 'e-commerce' | 'finance' | 'hr-recruiting' | 'legal'
  | 'healthcare' | 'other'

export type PricingModel = 'free' | 'freemium' | 'paid' | 'enterprise' | 'open-source' | 'contact-sales'
export type ChineseSupport = 'native' | 'supported' | 'english-only'
export type ToolStatus = 'active' | 'stale' | 'discontinued'
export type ReviewStatus = 'draft' | 'pending-review' | 'published' | 'archived' | 'rejected'

export interface Category {
  name: string
  slug: CategoryPrimary
  icon: string
  sortOrder: number
  toolCount: number
}

export interface Tool {
  id: string
  name: string
  slug: string
  descriptionShort: string  // ≤200 chars
  descriptionLong: string
  url: string
  logoUrl?: string
  categoryPrimary: CategoryPrimary
  pricingModel: PricingModel
  chineseSupport: ChineseSupport
  platforms: string[]
  openSource: boolean
  status: ReviewStatus
  toolStatus: ToolStatus
  editorScore: number
  tags: string[]
  featured: boolean
  verifiedAt?: string
}

export const categories: Category[] = [
  { name: '文本写作', slug: 'text-writing', icon: '✍️', sortOrder: 1, toolCount: 3 },
  { name: '图像生成', slug: 'image-generation', icon: '🎨', sortOrder: 2, toolCount: 2 },
  { name: '视频', slug: 'video', icon: '🎬', sortOrder: 3, toolCount: 0 },
  { name: '语音音频', slug: 'audio-voice', icon: '🎵', sortOrder: 4, toolCount: 2 },
  { name: '编程开发', slug: 'code-dev', icon: '💻', sortOrder: 5, toolCount: 3 },
  { name: '数据分析', slug: 'data-analytics', icon: '📈', sortOrder: 6, toolCount: 0 },
  { name: '营销SEO', slug: 'marketing-seo', icon: '📣', sortOrder: 7, toolCount: 0 },
  { name: '客户支持', slug: 'customer-support', icon: '🎧', sortOrder: 8, toolCount: 0 },
  { name: '效率办公', slug: 'productivity', icon: '📊', sortOrder: 9, toolCount: 3 },
  { name: '教育学习', slug: 'education', icon: '📚', sortOrder: 10, toolCount: 0 },
  { name: '设计UI', slug: 'design-ui', icon: '🎯', sortOrder: 11, toolCount: 0 },
  { name: '研究', slug: 'research', icon: '🔬', sortOrder: 12, toolCount: 0 },
  { name: '电商', slug: 'e-commerce', icon: '🛒', sortOrder: 13, toolCount: 0 },
  { name: '金融', slug: 'finance', icon: '💰', sortOrder: 14, toolCount: 0 },
  { name: 'HR招聘', slug: 'hr-recruiting', icon: '👥', sortOrder: 15, toolCount: 0 },
  { name: '法律', slug: 'legal', icon: '⚖️', sortOrder: 16, toolCount: 0 },
  { name: '医疗健康', slug: 'healthcare', icon: '🏥', sortOrder: 17, toolCount: 0 },
  { name: '其他', slug: 'other', icon: '📦', sortOrder: 18, toolCount: 0 },
]

export const tools: Tool[] = [
  {
    id: '1', name: 'ChatGPT', slug: 'chatgpt',
    descriptionShort: 'OpenAI 的对话式 AI 助手，支持文本生成、代码编写、翻译等多种任务。',
    descriptionLong: 'ChatGPT 是 OpenAI 推出的大语言模型对话产品。GPT-4o 支持文字、图片、语音多模态输入输出，可用于写作、编程、数据分析、翻译、头脑风暴等多种场景。企业版支持团队协作和数据隐私保护。',
    url: 'https://chat.openai.com',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    categoryPrimary: 'text-writing', pricingModel: 'freemium', chineseSupport: 'supported',
    platforms: ['Web', 'iOS', 'Android', 'API', 'Mac', 'Win'],
    openSource: false, status: 'published', toolStatus: 'active', editorScore: 9.0,
    tags: ['GPT', 'API', '多模态'], featured: true, verifiedAt: '2026-03-15',
  },
  {
    id: '2', name: 'Claude', slug: 'claude',
    descriptionShort: 'Anthropic 出品的 AI 助手，擅长长文分析、代码编写和安全对话。',
    descriptionLong: 'Claude 是 Anthropic 开发的 AI 助手，以安全和有用著称。支持 200K token 超长上下文，擅长长文档分析、代码编写、创意写作。Claude 3.5 Sonnet 在多项基准测试中表现优异。',
    url: 'https://claude.ai',
    categoryPrimary: 'text-writing', pricingModel: 'freemium', chineseSupport: 'supported',
    platforms: ['Web', 'iOS', 'Android', 'API'],
    openSource: false, status: 'published', toolStatus: 'active', editorScore: 8.8,
    tags: ['Claude', 'API', '长上下文'], featured: true, verifiedAt: '2026-03-15',
  },
  {
    id: '3', name: '豆包', slug: 'doubao',
    descriptionShort: '字节跳动旗下 AI 对话助手，中文能力原生支持，功能丰富。',
    descriptionLong: '豆包是字节跳动推出的 AI 对话助手，基于自研大模型，中文理解和生成能力出色。支持写作、翻译、代码、问答等多种场景，拥有插件生态和角色扮演功能。',
    url: 'https://www.doubao.com',
    categoryPrimary: 'text-writing', pricingModel: 'free', chineseSupport: 'native',
    platforms: ['Web', 'iOS', 'Android', 'wechat-mini'],
    openSource: false, status: 'published', toolStatus: 'active', editorScore: 8.2,
    tags: ['中文原生', '免费'], featured: false, verifiedAt: '2026-03-10',
  },
  {
    id: '4', name: 'Midjourney', slug: 'midjourney',
    descriptionShort: '顶级 AI 图像生成工具，通过文字描述创建高质量艺术作品。',
    descriptionLong: 'Midjourney 是目前最受欢迎的 AI 图像生成工具之一。V6 版本画质惊艳，支持文字描述生成图像、图片编辑、风格迁移。适合设计师、创意工作者和艺术爱好者。',
    url: 'https://midjourney.com',
    categoryPrimary: 'image-generation', pricingModel: 'paid', chineseSupport: 'english-only',
    platforms: ['Web'],
    openSource: false, status: 'published', toolStatus: 'active', editorScore: 9.2,
    tags: ['绘画', '设计'], featured: true, verifiedAt: '2026-03-12',
  },
  {
    id: '5', name: 'Stable Diffusion', slug: 'stable-diffusion',
    descriptionShort: '最流行的开源图像生成模型，支持本地部署，社区生态丰富。',
    descriptionLong: 'Stable Diffusion 是 Stability AI 推出的开源图像生成模型。完全开源可本地部署，有丰富的社区模型和 LoRA，支持 ControlNet 精准控制。适合追求隐私和自定义的用户。',
    url: 'https://stability.ai',
    categoryPrimary: 'image-generation', pricingModel: 'open-source', chineseSupport: 'supported',
    platforms: ['Web', 'Mac', 'Win', 'Linux', 'API'],
    openSource: true, status: 'published', toolStatus: 'active', editorScore: 8.7,
    tags: ['开源', '绘画', '本地部署'], featured: true, verifiedAt: '2026-03-08',
  },
  {
    id: '6', name: 'Cursor', slug: 'cursor',
    descriptionShort: 'AI 驱动的代码编辑器，基于 VS Code，内置 AI 编程助手。',
    descriptionLong: 'Cursor 是一款 AI-first 的代码编辑器，基于 VS Code 打造。内置 Tab 补全、Chat、Agent 模式，支持 GPT-4、Claude 等多个模型。适合希望 AI 加速日常开发的程序员。',
    url: 'https://cursor.com',
    categoryPrimary: 'code-dev', pricingModel: 'freemium', chineseSupport: 'supported',
    platforms: ['Mac', 'Win', 'Linux'],
    openSource: false, status: 'published', toolStatus: 'active', editorScore: 9.1,
    tags: ['代码', 'IDE', 'Agent'], featured: true, verifiedAt: '2026-03-15',
  },
  {
    id: '7', name: 'Ollama', slug: 'ollama',
    descriptionShort: '本地运行大语言模型的开源工具，一行命令即可启动。',
    descriptionLong: 'Ollama 让你在本地轻松运行 Llama 3、Mistral、Gemma 等开源大模型。一行命令安装和运行，内置模型管理、API 服务，适合开发者本地实验和私有化部署。',
    url: 'https://ollama.com',
    categoryPrimary: 'code-dev', pricingModel: 'free', chineseSupport: 'supported',
    platforms: ['Mac', 'Win', 'Linux', 'API'],
    openSource: true, status: 'published', toolStatus: 'active', editorScore: 8.5,
    tags: ['开源', '本地部署', 'API'], featured: true, verifiedAt: '2026-03-10',
  },
  {
    id: '8', name: 'v0', slug: 'v0',
    descriptionShort: 'Vercel 出品的 AI UI 生成工具，自然语言生成 React 组件。',
    descriptionLong: 'v0 是 Vercel 推出的 AI UI 代码生成工具。用自然语言描述你想要的界面，自动生成 React + Tailwind 代码。支持迭代修改、组件导出，适合快速原型和前端开发。',
    url: 'https://v0.dev',
    categoryPrimary: 'code-dev', pricingModel: 'freemium', chineseSupport: 'english-only',
    platforms: ['Web'],
    openSource: false, status: 'published', toolStatus: 'active', editorScore: 8.4,
    tags: ['代码', 'UI', 'React'], featured: false, verifiedAt: '2026-03-05',
  },
  {
    id: '9', name: 'ElevenLabs', slug: 'elevenlabs',
    descriptionShort: '领先的 AI 语音合成平台，多语言、声音克隆、极致音质。',
    descriptionLong: 'ElevenLabs 是目前最逼真的 AI 语音合成平台。支持 29+ 语言、声音克隆、实时对话语音生成。音质自然度极高，广泛用于内容创作、有声书、播客、游戏配音。',
    url: 'https://elevenlabs.io',
    categoryPrimary: 'audio-voice', pricingModel: 'freemium', chineseSupport: 'supported',
    platforms: ['Web', 'API'],
    openSource: false, status: 'published', toolStatus: 'active', editorScore: 8.9,
    tags: ['语音', 'TTS', 'API'], featured: false, verifiedAt: '2026-03-12',
  },
  {
    id: '10', name: 'Suno', slug: 'suno',
    descriptionShort: 'AI 音乐创作平台，输入文字即可生成完整歌曲含人声。',
    descriptionLong: 'Suno 让任何人都能用文字描述创作音乐。支持生成含人声的完整歌曲，覆盖流行、摇滚、古典等多种风格。V3.5 版本音乐质量大幅提升，适合内容创作者和音乐爱好者。',
    url: 'https://suno.com',
    categoryPrimary: 'audio-voice', pricingModel: 'freemium', chineseSupport: 'supported',
    platforms: ['Web'],
    openSource: false, status: 'published', toolStatus: 'active', editorScore: 8.2,
    tags: ['音乐', '创作'], featured: false, verifiedAt: '2026-03-08',
  },
  {
    id: '11', name: 'Notion AI', slug: 'notion-ai',
    descriptionShort: 'Notion 内置 AI 写作助手，与笔记无缝集成。',
    descriptionLong: 'Notion AI 是嵌入 Notion 工作空间的 AI 助手。支持自动总结、翻译、改写润色、头脑风暴、会议纪要整理。与现有笔记和数据库深度集成，提升团队知识管理效率。',
    url: 'https://notion.so',
    categoryPrimary: 'productivity', pricingModel: 'freemium', chineseSupport: 'supported',
    platforms: ['Web', 'Mac', 'Win', 'iOS', 'Android'],
    openSource: false, status: 'published', toolStatus: 'active', editorScore: 8.3,
    tags: ['写作', '笔记', '协作'], featured: false, verifiedAt: '2026-03-10',
  },
  {
    id: '12', name: 'Perplexity', slug: 'perplexity',
    descriptionShort: 'AI 搜索引擎，实时联网搜索 + AI 总结，附带来源引用。',
    descriptionLong: 'Perplexity 是新一代 AI 搜索引擎，实时联网获取最新信息，用 AI 总结搜索结果并附带来源引用。Pro 版支持更复杂的研究分析。正在改变人们获取信息的方式。',
    url: 'https://perplexity.ai',
    categoryPrimary: 'productivity', pricingModel: 'freemium', chineseSupport: 'supported',
    platforms: ['Web', 'iOS', 'Android', 'API', 'Chrome Extension'],
    openSource: false, status: 'published', toolStatus: 'active', editorScore: 8.6,
    tags: ['搜索', 'API'], featured: true, verifiedAt: '2026-03-15',
  },
  {
    id: '13', name: 'Gamma', slug: 'gamma',
    descriptionShort: 'AI 演示文稿生成，一键将文字转化为精美 PPT/网页。',
    descriptionLong: 'Gamma 是 AI 驱动的演示文稿生成工具。输入内容大纲即可自动生成精美的 PPT、网页或文档。支持多种模板、自定义样式、实时协作。告别排版烦恼，专注内容本身。',
    url: 'https://gamma.app',
    categoryPrimary: 'productivity', pricingModel: 'freemium', chineseSupport: 'supported',
    platforms: ['Web'],
    openSource: false, status: 'published', toolStatus: 'active', editorScore: 8.0,
    tags: ['PPT', '演示'], featured: false, verifiedAt: '2026-03-05',
  },
]

// Helper functions
export function getToolsByCategory(slug: string): Tool[] {
  return tools.filter(t => t.categoryPrimary === slug && t.status === 'published')
}

export function getFeaturedTools(): Tool[] {
  return tools.filter(t => t.featured && t.status === 'published').sort((a, b) => b.editorScore - a.editorScore)
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find(t => t.slug === slug)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug)
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase()
  return tools.filter(t =>
    t.status === 'published' && (
      t.name.toLowerCase().includes(q) ||
      t.descriptionShort.toLowerCase().includes(q) ||
      t.tags.some(tag => tag.toLowerCase().includes(q))
    )
  )
}
