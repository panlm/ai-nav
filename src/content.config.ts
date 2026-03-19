import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
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
  }),
})

export const collections = { articles, weekly }
