import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const categoryEnum = z.enum([
  'text-writing', 'image-generation', 'video', 'audio-voice',
  'code-dev', 'data-analytics', 'marketing-seo', 'customer-support',
  'productivity', 'education', 'design-ui', 'research',
])

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    category: categoryEnum.optional(),
    tags: z.array(z.string()).default([]),
    keywords: z.array(z.string()).default([]),
    relatedTools: z.array(z.string()).default([]),
    author: z.string().default('AI Nav 编辑部'),
    image: z.string().optional(),
  }),
})

const weekly = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/weekly' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    weekNumber: z.number(),
    dateRange: z.string(),
    highlights: z.array(z.string()).default([]),
    category: categoryEnum.optional(),
    tags: z.array(z.string()).default([]),
  }),
})

export const collections = { articles, weekly }
