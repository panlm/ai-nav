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

export interface ToolReview {
  tested: boolean
  testedAt?: string
  verdict?: string
  pros?: string[]
  cons?: string[]
  bestFor?: string
  alternatives?: string[]
}

export interface Tool {
  id: string
  name: string
  slug: string
  descriptionShort: string  // ≤200 chars
  descriptionFull: string
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
  // Differentiation fields
  useCases: string[]
  workflowTags: string[]
  modelBase: string[]
  review?: ToolReview
  // i18n
  locale: string
  // Secondary categories
  categoriesSecondary: string[]
  // Technical fields
  apiAvailable: boolean
  githubUrl?: string
}

export const categories: Category[] = [
  { name: '文本写作', slug: 'text-writing', icon: '✍️', sortOrder: 1, toolCount: 5 },
  { name: '图像生成', slug: 'image-generation', icon: '🎨', sortOrder: 2, toolCount: 3 },
  { name: '视频', slug: 'video', icon: '🎬', sortOrder: 3, toolCount: 1 },
  { name: '语音音频', slug: 'audio-voice', icon: '🎵', sortOrder: 4, toolCount: 2 },
  { name: '编程开发', slug: 'code-dev', icon: '💻', sortOrder: 5, toolCount: 3 },
  { name: '数据分析', slug: 'data-analytics', icon: '📈', sortOrder: 6, toolCount: 0 },
  { name: '营销SEO', slug: 'marketing-seo', icon: '📣', sortOrder: 7, toolCount: 2 },
  { name: '客户支持', slug: 'customer-support', icon: '🎧', sortOrder: 8, toolCount: 0 },
  { name: '效率办公', slug: 'productivity', icon: '📊', sortOrder: 9, toolCount: 4 },
  { name: '教育学习', slug: 'education', icon: '📚', sortOrder: 10, toolCount: 0 },
  { name: '设计UI', slug: 'design-ui', icon: '🎯', sortOrder: 11, toolCount: 1 },
  { name: '研究', slug: 'research', icon: '🔬', sortOrder: 12, toolCount: 0 },
  { name: '电商', slug: 'e-commerce', icon: '🛒', sortOrder: 13, toolCount: 0 },
  { name: '金融', slug: 'finance', icon: '💰', sortOrder: 14, toolCount: 1 },
  { name: 'HR招聘', slug: 'hr-recruiting', icon: '👥', sortOrder: 15, toolCount: 0 },
  { name: '法律', slug: 'legal', icon: '⚖️', sortOrder: 16, toolCount: 0 },
  { name: '医疗健康', slug: 'healthcare', icon: '🏥', sortOrder: 17, toolCount: 0 },
  { name: '其他', slug: 'other', icon: '📦', sortOrder: 18, toolCount: 0 },
]

export const tools: Tool[] = [
  {
    id: '1', name: 'ChatGPT', slug: 'chatgpt',
    descriptionShort: 'OpenAI 的对话式 AI 助手，支持文本生成、代码编写、翻译等多种任务。',
    descriptionFull: 'ChatGPT 是 OpenAI 推出的大语言模型对话产品。GPT-4o 支持文字、图片、语音多模态输入输出，可用于写作、编程、数据分析、翻译、头脑风暴等多种场景。企业版支持团队协作和数据隐私保护。',
    url: 'https://chat.openai.com',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    categoryPrimary: 'text-writing', pricingModel: 'freemium', chineseSupport: 'supported',
    platforms: ['Web', 'iOS', 'Android', 'API', 'Mac', 'Win'],
    openSource: false, status: 'published', toolStatus: 'active', editorScore: 9.0,
    tags: ['GPT', 'API', '多模态'], locale: 'zh', categoriesSecondary: [], featured: true, verifiedAt: '2026-03-15',
  },
  {
    id: '2', name: 'Claude', slug: 'claude',
    descriptionShort: 'Anthropic 出品的 AI 助手，擅长长文分析、代码编写和安全对话。',
    descriptionFull: 'Claude 是 Anthropic 开发的 AI 助手，以安全和有用著称。支持 200K token 超长上下文，擅长长文档分析、代码编写、创意写作。Claude 3.5 Sonnet 在多项基准测试中表现优异。',
    url: 'https://claude.ai',
    categoryPrimary: 'text-writing', pricingModel: 'freemium', chineseSupport: 'supported',
    platforms: ['Web', 'iOS', 'Android', 'API'],
    openSource: false, status: 'published', toolStatus: 'active', editorScore: 8.8,
    tags: ['Claude', 'API', '长上下文'], locale: 'zh', categoriesSecondary: [], featured: true, verifiedAt: '2026-03-15',
  },
  {
    id: '3', name: '豆包', slug: 'doubao',
    descriptionShort: '字节跳动旗下 AI 对话助手，中文能力原生支持，功能丰富。',
    descriptionFull: '豆包是字节跳动推出的 AI 对话助手，基于自研大模型，中文理解和生成能力出色。支持写作、翻译、代码、问答等多种场景，拥有插件生态和角色扮演功能。',
    url: 'https://www.doubao.com',
    categoryPrimary: 'text-writing', pricingModel: 'free', chineseSupport: 'native',
    platforms: ['Web', 'iOS', 'Android', 'wechat-mini'],
    openSource: false, status: 'published', toolStatus: 'active', editorScore: 8.2,
    tags: ['中文原生', '免费'], locale: 'zh', categoriesSecondary: [], featured: false, verifiedAt: '2026-03-10',
  },
  {
    id: '4', name: 'Midjourney', slug: 'midjourney',
    descriptionShort: '顶级 AI 图像生成工具，通过文字描述创建高质量艺术作品。',
    descriptionFull: 'Midjourney 是目前最受欢迎的 AI 图像生成工具之一。V6 版本画质惊艳，支持文字描述生成图像、图片编辑、风格迁移。适合设计师、创意工作者和艺术爱好者。',
    url: 'https://midjourney.com',
    categoryPrimary: 'image-generation', pricingModel: 'paid', chineseSupport: 'english-only',
    platforms: ['Web'],
    openSource: false, status: 'published', toolStatus: 'active', editorScore: 9.2,
    tags: ['绘画', '设计'], locale: 'zh', categoriesSecondary: [], featured: true, verifiedAt: '2026-03-12',
  },
  {
    id: '5', name: 'Stable Diffusion', slug: 'stable-diffusion',
    descriptionShort: '最流行的开源图像生成模型，支持本地部署，社区生态丰富。',
    descriptionFull: 'Stable Diffusion 是 Stability AI 推出的开源图像生成模型。完全开源可本地部署，有丰富的社区模型和 LoRA，支持 ControlNet 精准控制。适合追求隐私和自定义的用户。',
    url: 'https://stability.ai',
    categoryPrimary: 'image-generation', pricingModel: 'open-source', chineseSupport: 'supported',
    platforms: ['Web', 'Mac', 'Win', 'Linux', 'API'],
    openSource: true, status: 'published', toolStatus: 'active', editorScore: 8.7,
    tags: ['开源', '绘画', '本地部署'], locale: 'zh', categoriesSecondary: [], featured: true, verifiedAt: '2026-03-08',
  },
  {
    id: '6', name: 'Cursor', slug: 'cursor',
    descriptionShort: 'AI 驱动的代码编辑器，基于 VS Code，内置 AI 编程助手。',
    descriptionFull: 'Cursor 是一款 AI-first 的代码编辑器，基于 VS Code 打造。内置 Tab 补全、Chat、Agent 模式，支持 GPT-4、Claude 等多个模型。适合希望 AI 加速日常开发的程序员。',
    url: 'https://cursor.com',
    categoryPrimary: 'code-dev', pricingModel: 'freemium', chineseSupport: 'supported',
    platforms: ['Mac', 'Win', 'Linux'],
    openSource: false, status: 'published', toolStatus: 'active', editorScore: 9.1,
    tags: ['代码', 'IDE', 'Agent'], locale: 'zh', categoriesSecondary: [], featured: true, verifiedAt: '2026-03-15',
  },
  {
    id: '7', name: 'Ollama', slug: 'ollama',
    descriptionShort: '本地运行大语言模型的开源工具，一行命令即可启动。',
    descriptionFull: 'Ollama 让你在本地轻松运行 Llama 3、Mistral、Gemma 等开源大模型。一行命令安装和运行，内置模型管理、API 服务，适合开发者本地实验和私有化部署。',
    url: 'https://ollama.com',
    categoryPrimary: 'code-dev', pricingModel: 'free', chineseSupport: 'supported',
    platforms: ['Mac', 'Win', 'Linux', 'API'],
    openSource: true, status: 'published', toolStatus: 'active', editorScore: 8.5,
    tags: ['开源', '本地部署', 'API'], locale: 'zh', categoriesSecondary: [], featured: true, verifiedAt: '2026-03-10',
  },
  {
    id: '8', name: 'v0', slug: 'v0',
    descriptionShort: 'Vercel 出品的 AI UI 生成工具，自然语言生成 React 组件。',
    descriptionFull: 'v0 是 Vercel 推出的 AI UI 代码生成工具。用自然语言描述你想要的界面，自动生成 React + Tailwind 代码。支持迭代修改、组件导出，适合快速原型和前端开发。',
    url: 'https://v0.dev',
    categoryPrimary: 'code-dev', pricingModel: 'freemium', chineseSupport: 'english-only',
    platforms: ['Web'],
    openSource: false, status: 'published', toolStatus: 'active', editorScore: 8.4,
    tags: ['代码', 'UI', 'React'], locale: 'zh', categoriesSecondary: [], featured: false, verifiedAt: '2026-03-05',
  },
  {
    id: '9', name: 'ElevenLabs', slug: 'elevenlabs',
    descriptionShort: '领先的 AI 语音合成平台，多语言、声音克隆、极致音质。',
    descriptionFull: 'ElevenLabs 是目前最逼真的 AI 语音合成平台。支持 29+ 语言、声音克隆、实时对话语音生成。音质自然度极高，广泛用于内容创作、有声书、播客、游戏配音。',
    url: 'https://elevenlabs.io',
    categoryPrimary: 'audio-voice', pricingModel: 'freemium', chineseSupport: 'supported',
    platforms: ['Web', 'API'],
    openSource: false, status: 'published', toolStatus: 'active', editorScore: 8.9,
    tags: ['语音', 'TTS', 'API'], locale: 'zh', categoriesSecondary: [], featured: false, verifiedAt: '2026-03-12',
  },
  {
    id: '10', name: 'Suno', slug: 'suno',
    descriptionShort: 'AI 音乐创作平台，输入文字即可生成完整歌曲含人声。',
    descriptionFull: 'Suno 让任何人都能用文字描述创作音乐。支持生成含人声的完整歌曲，覆盖流行、摇滚、古典等多种风格。V3.5 版本音乐质量大幅提升，适合内容创作者和音乐爱好者。',
    url: 'https://suno.com',
    categoryPrimary: 'audio-voice', pricingModel: 'freemium', chineseSupport: 'supported',
    platforms: ['Web'],
    openSource: false, status: 'published', toolStatus: 'active', editorScore: 8.2,
    tags: ['音乐', '创作'], locale: 'zh', categoriesSecondary: [], featured: false, verifiedAt: '2026-03-08',
  },
  {
    id: '11', name: 'Notion AI', slug: 'notion-ai',
    descriptionShort: 'Notion 内置 AI 写作助手，与笔记无缝集成。',
    descriptionFull: 'Notion AI 是嵌入 Notion 工作空间的 AI 助手。支持自动总结、翻译、改写润色、头脑风暴、会议纪要整理。与现有笔记和数据库深度集成，提升团队知识管理效率。',
    url: 'https://notion.so',
    categoryPrimary: 'productivity', pricingModel: 'freemium', chineseSupport: 'supported',
    platforms: ['Web', 'Mac', 'Win', 'iOS', 'Android'],
    openSource: false, status: 'published', toolStatus: 'active', editorScore: 8.3,
    tags: ['写作', '笔记', '协作'], locale: 'zh', categoriesSecondary: [], featured: false, verifiedAt: '2026-03-10',
  },
  {
    id: '12', name: 'Perplexity', slug: 'perplexity',
    descriptionShort: 'AI 搜索引擎，实时联网搜索 + AI 总结，附带来源引用。',
    descriptionFull: 'Perplexity 是新一代 AI 搜索引擎，实时联网获取最新信息，用 AI 总结搜索结果并附带来源引用。Pro 版支持更复杂的研究分析。正在改变人们获取信息的方式。',
    url: 'https://perplexity.ai',
    categoryPrimary: 'productivity', pricingModel: 'freemium', chineseSupport: 'supported',
    platforms: ['Web', 'iOS', 'Android', 'API', 'Chrome Extension'],
    openSource: false, status: 'published', toolStatus: 'active', editorScore: 8.6,
    tags: ['搜索', 'API'], locale: 'zh', categoriesSecondary: [], featured: true, verifiedAt: '2026-03-15',
  },
  {
    id: '13', name: 'Gamma', slug: 'gamma',
    descriptionShort: 'AI 演示文稿生成，一键将文字转化为精美 PPT/网页。',
    descriptionFull: 'Gamma 是 AI 驱动的演示文稿生成工具。输入内容大纲即可自动生成精美的 PPT、网页或文档。支持多种模板、自定义样式、实时协作。告别排版烦恼，专注内容本身。',
    url: 'https://gamma.app',
    categoryPrimary: 'productivity', pricingModel: 'freemium', chineseSupport: 'supported',
    platforms: ['Web'],
    openSource: false, status: 'published', toolStatus: 'active', editorScore: 8.0,
    tags: ['PPT', '演示'], locale: 'zh', categoriesSecondary: [], featured: false, verifiedAt: '2026-03-05',
  },
  {
    id: '14', name: 'Semrush', slug: 'semrush',
    descriptionShort: '全球领先的数字营销 SEO 平台，提供关键词研究、网站审计、竞品分析和外链追踪等一站式营销工具。',
    descriptionFull: 'Semrush 是全球最受欢迎的数字营销和 SEO 平台之一，服务超过一千万营销专业人士。核心功能包括：关键词研究与排名追踪、网站技术 SEO 审计、竞品流量与策略分析、外链建设与监控、内容营销工具、PPC 广告分析、社交媒体管理等。拥有业内最大的关键词数据库（260 亿+关键词），提供 55+ 个营销工具。免费版可有限使用核心功能，付费版从 $139.95/月起。适合 SEO 从业者、数字营销团队、内容策略师和代理公司。',
    url: 'https://www.semrush.com',
    categoryPrimary: 'marketing-seo', pricingModel: 'freemium', chineseSupport: 'english-only',
    platforms: ['Web', 'API'],
    openSource: false, status: 'published', toolStatus: 'active', editorScore: 8.8,
    tags: ['SEO', '竞品分析', '关键词'], locale: 'zh', categoriesSecondary: [], featured: false, verifiedAt: '2026-03-22',
    useCases: ['关键词研究', '网站SEO审计', '竞品分析', '外链追踪'],
    workflowTags: ['SEO优化', '数字营销', '竞品监控'],
    modelBase: [],
    apiAvailable: true,
  },
  {
    id: '15', name: 'Jasper', slug: 'jasper',
    descriptionShort: 'AI 营销内容创作平台，一站式生成广告文案、博客、社交媒体和邮件内容，支持品牌声音定制。',
    descriptionFull: 'Jasper 是专为营销团队打造的 AI 内容创作平台。基于先进的大语言模型，提供 50+ 内容模板，覆盖广告文案、博客文章、社交媒体帖子、营销邮件、产品描述等场景。核心亮点包括：品牌声音（Brand Voice）定制，确保所有输出内容风格一致；知识库功能，可上传企业资料让 AI 理解品牌上下文；支持多语言输出包括中文；团队协作与审批工作流。从 $49/月起，适合营销团队、内容运营和品牌管理者。',
    url: 'https://www.jasper.ai',
    categoryPrimary: 'text-writing', pricingModel: 'paid', chineseSupport: 'supported',
    platforms: ['Web', 'Chrome Extension'],
    openSource: false, status: 'published', toolStatus: 'active', editorScore: 8.1,
    tags: ['营销文案', 'AI写作', '品牌声音'], locale: 'zh', categoriesSecondary: [], featured: false, verifiedAt: '2026-03-22',
    useCases: ['营销文案生成', '博客写作', '社交媒体内容', '品牌内容管理'],
    workflowTags: ['内容营销', 'AI写作', '品牌一致性'],
    modelBase: ['GPT-4', 'Anthropic'],
    apiAvailable: true,
  },
  {
    id: '16', name: 'Writesonic', slug: 'writesonic',
    descriptionShort: 'AI 写作与 SEO 内容平台，内置 Chatsonic 搜索对话，帮助快速产出高质量 SEO 优化文章。',
    descriptionFull: 'Writesonic 是一款集 AI 写作和 SEO 优化于一体的内容创作平台。核心功能包括：AI 文章生成器（支持 SEO 优化的长文写作）、Chatsonic（基于 GPT-4 的实时联网搜索对话）、品牌声音设置、改写与润色工具。支持 25+ 语言输出包括中文，提供 API 接口供开发者集成。免费版每月提供有限额度，适合个人博客作者、内容营销者和 SEO 从业者。与 WordPress、Zapier 等平台集成，支持一键发布。',
    url: 'https://writesonic.com',
    categoryPrimary: 'text-writing', pricingModel: 'freemium', chineseSupport: 'supported',
    platforms: ['Web', 'API'],
    openSource: false, status: 'published', toolStatus: 'active', editorScore: 7.8,
    tags: ['SEO写作', 'AI文案', '博客'], locale: 'zh', categoriesSecondary: [], featured: false, verifiedAt: '2026-03-22',
    useCases: ['SEO博客写作', 'AI对话搜索', '营销文案', '内容改写'],
    workflowTags: ['SEO内容', 'AI写作', '博客运营'],
    modelBase: ['GPT-4'],
    apiAvailable: true,
  },
  {
    id: '17', name: 'Canva', slug: 'canva',
    descriptionShort: '全球最受欢迎的在线设计平台，Magic Studio AI 赋能文生图、智能抠图、AI 写作等创意功能。',
    descriptionFull: 'Canva 是全球用户量最大的在线设计平台，拥有超过 1.7 亿月活用户。提供海量专业设计模板，覆盖社交媒体图片、海报、演示文稿、视频、Logo 等各类设计需求。2024 年推出的 Magic Studio AI 套件包括：Magic Design（AI 一键生成设计）、Magic Media（文生图/文生视频）、Magic Eraser（智能擦除）、Magic Expand（AI 扩图）、Magic Write（AI 文案写作）、Background Remover（智能抠图）。原生支持中文界面和中文模板，免费版功能丰富，Pro 版解锁全部 AI 功能和素材库。支持全平台使用，适合设计师、营销人员、自媒体创作者和企业团队。',
    url: 'https://www.canva.com',
    categoryPrimary: 'design-ui', pricingModel: 'freemium', chineseSupport: 'native',
    platforms: ['Web', 'Mac', 'Win', 'iOS', 'Android'],
    openSource: false, status: 'published', toolStatus: 'active', editorScore: 9.0,
    tags: ['设计', '模板', 'AI设计'], locale: 'zh', categoriesSecondary: [], featured: true, verifiedAt: '2026-03-22',
    useCases: ['社交媒体设计', '演示文稿', '海报制作', 'AI图片生成'],
    workflowTags: ['平面设计', '内容创作', '品牌设计'],
    modelBase: [],
    apiAvailable: true,
  },
  {
    id: '18', name: 'Surfer SEO', slug: 'surfer-seo',
    descriptionShort: 'AI 驱动的 SEO 内容优化工具，通过 SERP 分析和内容评分帮助文章获得更高搜索排名。',
    descriptionFull: 'Surfer SEO 是一款专注于内容优化的 AI SEO 工具。核心功能包括：Content Editor（内容编辑器，实时评分和优化建议）、SERP Analyzer（搜索结果页面深度分析）、Keyword Research（关键词研究与聚类）、AI 文章生成器（基于 SEO 数据生成优化文章）、Audit 工具（已有页面的 SEO 体检与改进建议）。基于 NLP 算法分析排名靠前的页面，提供数据驱动的内容优化建议，包括关键词密度、内容结构、标题优化等。提供 Chrome 扩展与 Google Docs 集成。从 $99/月起，适合 SEO 专家、内容团队和代理公司。',
    url: 'https://surferseo.com',
    categoryPrimary: 'marketing-seo', pricingModel: 'paid', chineseSupport: 'english-only',
    platforms: ['Web', 'Chrome Extension'],
    openSource: false, status: 'published', toolStatus: 'active', editorScore: 8.3,
    tags: ['SEO优化', '内容优化', 'SERP'], locale: 'zh', categoriesSecondary: [], featured: false, verifiedAt: '2026-03-22',
    useCases: ['内容SEO优化', 'SERP分析', '关键词聚类', 'SEO审计'],
    workflowTags: ['SEO优化', '内容策略', '搜索排名'],
    modelBase: [],
    apiAvailable: true,
  },
  {
    id: '19', name: 'Zapier', slug: 'zapier',
    descriptionShort: '领先的无代码自动化平台，连接 7000+ 应用，AI 驱动的工作流构建器让自动化触手可及。',
    descriptionFull: 'Zapier 是全球最大的无代码工作流自动化平台，连接超过 7000 个应用（包括 Gmail、Slack、Notion、Salesforce、HubSpot 等）。核心功能包括：Zaps（自动化工作流，支持多步骤触发和操作）、AI 工作流构建器（用自然语言描述即可创建自动化流程）、Tables（内置数据库）、Interfaces（无代码应用构建）、Chatbots（AI 聊天机器人）。免费版提供 100 次/月任务执行，适合个人和小团队。高级版支持更复杂的工作流和更高执行量。适合需要打通多个 SaaS 工具的团队、运营人员和开发者。',
    url: 'https://zapier.com',
    categoryPrimary: 'productivity', pricingModel: 'freemium', chineseSupport: 'english-only',
    platforms: ['Web', 'API'],
    openSource: false, status: 'published', toolStatus: 'active', editorScore: 8.7,
    tags: ['自动化', '无代码', 'API集成'], locale: 'zh', categoriesSecondary: [], featured: false, verifiedAt: '2026-03-22',
    useCases: ['工作流自动化', '应用集成', 'AI自动化', '数据同步'],
    workflowTags: ['自动化', '无代码', 'SaaS集成'],
    modelBase: [],
    apiAvailable: true,
  },
  {
    id: '20', name: 'Adobe Firefly', slug: 'adobe-firefly',
    descriptionShort: 'Adobe 官方生成式 AI，支持文生图、生成式填充/扩展和文字效果，深度集成 Creative Cloud。',
    descriptionFull: 'Adobe Firefly 是 Adobe 推出的生成式 AI 创意工具系列。核心功能包括：Text to Image（文字描述生成高质量图片）、Generative Fill（生成式填充，智能替换图片中的内容）、Generative Expand（AI 扩展图片边界）、Text Effects（文字特效生成）、Generative Recolor（矢量图 AI 重新配色）。Firefly 已深度集成到 Photoshop、Illustrator、Adobe Express 等 Creative Cloud 应用中。使用商业安全的训练数据，生成内容可安全用于商业用途。支持中文提示词，Web 端免费提供有限生成额度。适合设计师、摄影师、创意工作者和企业用户。',
    url: 'https://www.adobe.com/products/firefly.html',
    categoryPrimary: 'image-generation', pricingModel: 'freemium', chineseSupport: 'supported',
    platforms: ['Web', 'Mac', 'Win'],
    openSource: false, status: 'published', toolStatus: 'active', editorScore: 8.5,
    tags: ['AI绘画', 'Adobe', '设计'], locale: 'zh', categoriesSecondary: [], featured: false, verifiedAt: '2026-03-22',
    useCases: ['文生图', '图片编辑', '生成式填充', '商业设计'],
    workflowTags: ['AI绘画', 'Adobe生态', '商业创意'],
    modelBase: ['Firefly'],
    apiAvailable: true,
  },
  {
    id: '21', name: 'Synthesia', slug: 'synthesia',
    descriptionShort: 'AI 视频生成平台，输入文字即可创建数字人视频，支持 140+ 种语言和多样化虚拟形象。',
    descriptionFull: 'Synthesia 是领先的 AI 视频生成平台，让用户无需摄像机、演员或录影棚即可制作专业视频。核心功能包括：160+ AI 数字人形象（支持不同年龄、种族和风格）、140+ 种语言的语音合成（包括中文）、自定义数字人（上传个人形象创建专属虚拟分身）、AI 脚本生成器、屏幕录制与 AI 视频合成、丰富的视频模板库。广泛应用于企业培训视频、产品介绍、营销视频、知识分享和多语言本地化。从 $29/月起，提供 API 接口支持批量视频生成。世界 500 强企业的信赖之选。',
    url: 'https://www.synthesia.io',
    categoryPrimary: 'video', pricingModel: 'paid', chineseSupport: 'supported',
    platforms: ['Web', 'API'],
    openSource: false, status: 'published', toolStatus: 'active', editorScore: 8.4,
    tags: ['AI视频', '数字人', '培训视频'], locale: 'zh', categoriesSecondary: [], featured: false, verifiedAt: '2026-03-22',
    useCases: ['企业培训视频', '产品介绍', '多语言视频', 'AI数字人'],
    workflowTags: ['视频制作', '企业培训', '内容本地化'],
    modelBase: [],
    apiAvailable: true,
  },
  {
    id: '22', name: 'Ramp', slug: 'ramp',
    descriptionShort: 'AI 驱动的企业财务管理平台，提供智能费用管理、账单支付和自动化记账，帮助企业节省开支。',
    descriptionFull: 'Ramp 是美国增长最快的企业财务管理平台，利用 AI 帮助企业优化支出和自动化财务流程。核心功能包括：企业信用卡（无年费、自动返现 1.5%）、AI 费用管理（自动分类、收据匹配、合规审查）、账单支付自动化（AI 提取发票信息、自动审批流程）、会计自动化（与 QuickBooks、NetSuite、Sage 等无缝集成）、采购管理（供应商比价、合同管理）、差旅管理。AI 智能洞察帮助发现节省机会，平均为企业节省 5% 的运营开支。基础版企业卡免费，高级财务管理功能按需付费。适合中小企业和成长型公司的财务团队。',
    url: 'https://ramp.com',
    categoryPrimary: 'finance', pricingModel: 'freemium', chineseSupport: 'english-only',
    platforms: ['Web', 'iOS', 'Android'],
    openSource: false, status: 'published', toolStatus: 'active', editorScore: 8.2,
    tags: ['财务管理', '企业支出', 'AI记账'], locale: 'zh', categoriesSecondary: [], featured: false, verifiedAt: '2026-03-22',
    useCases: ['费用管理', '账单自动化', '企业信用卡', '财务分析'],
    workflowTags: ['财务管理', '企业支出', '自动化记账'],
    modelBase: [],
    apiAvailable: true,
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
