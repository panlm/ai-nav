// Mock data for development — will be replaced by Supabase queries

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  parentId?: string
  sortOrder: number
  toolCount: number
}

export interface Tool {
  id: string
  name: string
  slug: string
  description: string
  url: string
  logoUrl?: string
  category: string
  categorySlug: string
  pricing: 'free' | 'freemium' | 'paid' | 'open_source'
  chineseSupport: boolean
  platforms: string[]
  openSource: boolean
  editorScore: number
  tags: string[]
  featured: boolean
}

export const categories: Category[] = [
  { id: '1', name: '文本生成', slug: 'text-generation', icon: '✍️', sortOrder: 1, toolCount: 12 },
  { id: '2', name: '图像设计', slug: 'image-design', icon: '🎨', sortOrder: 2, toolCount: 8 },
  { id: '3', name: '编程开发', slug: 'coding', icon: '💻', sortOrder: 3, toolCount: 15 },
  { id: '4', name: '音视频', slug: 'audio-video', icon: '🎬', sortOrder: 4, toolCount: 6 },
  { id: '5', name: '效率办公', slug: 'productivity', icon: '📊', sortOrder: 5, toolCount: 10 },
  { id: '6', name: '数据分析', slug: 'data-analysis', icon: '📈', sortOrder: 6, toolCount: 5 },
  { id: '7', name: '教育学习', slug: 'education', icon: '📚', sortOrder: 7, toolCount: 7 },
  { id: '8', name: '营销推广', slug: 'marketing', icon: '📣', sortOrder: 8, toolCount: 4 },
]

export const tools: Tool[] = [
  {
    id: '1',
    name: 'ChatGPT',
    slug: 'chatgpt',
    description: 'OpenAI 的对话式 AI 助手，支持文本生成、代码编写、翻译、数据分析等多种任务。GPT-4o 支持多模态输入。',
    url: 'https://chat.openai.com',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    category: '文本生成',
    categorySlug: 'text-generation',
    pricing: 'freemium',
    chineseSupport: true,
    platforms: ['web', 'ios', 'android', 'api'],
    openSource: false,
    editorScore: 9.0,
    tags: ['GPT', 'API', '中文'],
    featured: true,
  },
  {
    id: '2',
    name: 'Claude',
    slug: 'claude',
    description: 'Anthropic 出品的 AI 助手，擅长长文分析、代码编写和安全对话。200K token 超长上下文窗口。',
    url: 'https://claude.ai',
    category: '文本生成',
    categorySlug: 'text-generation',
    pricing: 'freemium',
    chineseSupport: true,
    platforms: ['web', 'ios', 'android', 'api'],
    openSource: false,
    editorScore: 8.8,
    tags: ['Claude', 'API', '中文'],
    featured: true,
  },
  {
    id: '3',
    name: 'Midjourney',
    slug: 'midjourney',
    description: '顶级 AI 图像生成工具，通过文字描述创建高质量艺术作品和设计素材。V6 版本画质惊艳。',
    url: 'https://midjourney.com',
    category: '图像设计',
    categorySlug: 'image-design',
    pricing: 'paid',
    chineseSupport: false,
    platforms: ['web'],
    openSource: false,
    editorScore: 9.2,
    tags: ['绘画', '设计'],
    featured: true,
  },
  {
    id: '4',
    name: 'Cursor',
    slug: 'cursor',
    description: 'AI 驱动的代码编辑器，基于 VS Code，内置 AI 编程助手加速开发。支持 Tab 补全和 Agent 模式。',
    url: 'https://cursor.com',
    category: '编程开发',
    categorySlug: 'coding',
    pricing: 'freemium',
    chineseSupport: true,
    platforms: ['mac', 'windows', 'linux'],
    openSource: false,
    editorScore: 9.1,
    tags: ['代码', 'IDE'],
    featured: true,
  },
  {
    id: '5',
    name: 'Ollama',
    slug: 'ollama',
    description: '本地运行大语言模型的开源工具，支持 Llama 3、Mistral、Gemma 等多种模型。一行命令即可启动。',
    url: 'https://ollama.com',
    category: '编程开发',
    categorySlug: 'coding',
    pricing: 'free',
    chineseSupport: true,
    platforms: ['mac', 'windows', 'linux', 'api'],
    openSource: true,
    editorScore: 8.5,
    tags: ['开源', '本地部署', 'API'],
    featured: true,
  },
  {
    id: '6',
    name: 'Notion AI',
    slug: 'notion-ai',
    description: 'Notion 内置 AI 写作助手，支持自动总结、翻译、头脑风暴、改写润色，与笔记无缝集成。',
    url: 'https://notion.so',
    category: '效率办公',
    categorySlug: 'productivity',
    pricing: 'freemium',
    chineseSupport: true,
    platforms: ['web', 'mac', 'windows', 'ios', 'android'],
    openSource: false,
    editorScore: 8.3,
    tags: ['写作', '笔记', '中文'],
    featured: false,
  },
  {
    id: '7',
    name: 'Stable Diffusion',
    slug: 'stable-diffusion',
    description: '最流行的开源图像生成模型，支持本地部署，社区生态丰富，可自由训练和定制。',
    url: 'https://stability.ai',
    category: '图像设计',
    categorySlug: 'image-design',
    pricing: 'open_source',
    chineseSupport: true,
    platforms: ['web', 'mac', 'windows', 'linux', 'api'],
    openSource: true,
    editorScore: 8.7,
    tags: ['开源', '绘画', '本地部署'],
    featured: true,
  },
  {
    id: '8',
    name: 'ElevenLabs',
    slug: 'elevenlabs',
    description: '领先的 AI 语音合成平台，支持多语言、声音克隆、实时对话语音，音质极其逼真。',
    url: 'https://elevenlabs.io',
    category: '音视频',
    categorySlug: 'audio-video',
    pricing: 'freemium',
    chineseSupport: true,
    platforms: ['web', 'api'],
    openSource: false,
    editorScore: 8.9,
    tags: ['语音', 'TTS', 'API'],
    featured: false,
  },
  {
    id: '9',
    name: 'Perplexity',
    slug: 'perplexity',
    description: 'AI 驱动的搜索引擎，实时联网搜索 + AI 总结，附带引用来源，替代传统搜索。',
    url: 'https://perplexity.ai',
    category: '效率办公',
    categorySlug: 'productivity',
    pricing: 'freemium',
    chineseSupport: true,
    platforms: ['web', 'ios', 'android', 'api'],
    openSource: false,
    editorScore: 8.6,
    tags: ['搜索', 'API', '中文'],
    featured: true,
  },
  {
    id: '10',
    name: 'v0',
    slug: 'v0',
    description: 'Vercel 出品的 AI UI 生成工具，用自然语言描述即可生成 React + Tailwind 组件代码。',
    url: 'https://v0.dev',
    category: '编程开发',
    categorySlug: 'coding',
    pricing: 'freemium',
    chineseSupport: false,
    platforms: ['web'],
    openSource: false,
    editorScore: 8.4,
    tags: ['代码', 'UI', 'React'],
    featured: false,
  },
  {
    id: '11',
    name: 'Suno',
    slug: 'suno',
    description: 'AI 音乐创作平台，输入文字描述即可生成完整歌曲（含人声），支持多种音乐风格。',
    url: 'https://suno.com',
    category: '音视频',
    categorySlug: 'audio-video',
    pricing: 'freemium',
    chineseSupport: true,
    platforms: ['web'],
    openSource: false,
    editorScore: 8.2,
    tags: ['音乐', '创作'],
    featured: false,
  },
  {
    id: '12',
    name: 'Gamma',
    slug: 'gamma',
    description: 'AI 演示文稿生成工具，一键将文字转化为精美的 PPT/网页/文档，告别排版烦恼。',
    url: 'https://gamma.app',
    category: '效率办公',
    categorySlug: 'productivity',
    pricing: 'freemium',
    chineseSupport: true,
    platforms: ['web'],
    openSource: false,
    editorScore: 8.0,
    tags: ['PPT', '演示', '中文'],
    featured: false,
  },
]

export function getToolsByCategory(categorySlug: string): Tool[] {
  return tools.filter(t => t.categorySlug === categorySlug)
}

export function getFeaturedTools(): Tool[] {
  return tools.filter(t => t.featured).sort((a, b) => b.editorScore - a.editorScore)
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
    t.name.toLowerCase().includes(q) ||
    t.description.toLowerCase().includes(q) ||
    t.tags.some(tag => tag.toLowerCase().includes(q))
  )
}
