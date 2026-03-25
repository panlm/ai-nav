# Frontmatter 模板规范

本文档定义了 AI Nav 内容集合（articles、weekly）的 frontmatter 字段规范，供编辑团队参考。

---

## 一、文章（Articles）Frontmatter 规范

### 字段定义

| 字段 | 类型 | 必填 | 默认值 | 约束 | 说明 |
|------|------|------|--------|------|------|
| `title` | `string` | ✅ | — | ≤80 字符 | 文章标题，SEO 友好，中文优先 |
| `description` | `string` | ✅ | — | ≤200 字符 | 文章摘要，用于 meta description 和列表页预览 |
| `publishedAt` | `date` | ✅ | — | ISO 8601 日期（`YYYY-MM-DD`） | 发布日期 |
| `updatedAt` | `date` | ❌ | — | ISO 8601 日期（`YYYY-MM-DD`） | 最后更新日期，内容有实质性修改时填写 |
| `category` | `enum` | ❌ | — | 见下方允许值 | 文章所属分类，用于筛选和 SEO |
| `tags` | `string[]` | ❌ | `[]` | 每个标签 ≤30 字符，最多 10 个 | 文章标签，用于关联和搜索 |
| `keywords` | `string[]` | ❌ | `[]` | 每个关键词 ≤50 字符，最多 10 个 | SEO 关键词 |
| `relatedTools` | `string[]` | ❌ | `[]` | 工具 slug 标识 | 关联工具列表，使用工具的 slug |
| `author` | `string` | ❌ | `AI Nav 编辑部` | ≤50 字符 | 作者名称 |
| `image` | `string` | ❌ | — | 有效 URL 或本地路径 | 文章封面图片 |

### `category` 允许值

| 值 | 含义 |
|----|------|
| `text-writing` | 文本写作 |
| `image-generation` | 图像生成 |
| `video` | 视频 |
| `audio-voice` | 语音音频 |
| `code-dev` | 编程开发 |
| `data-analytics` | 数据分析 |
| `marketing-seo` | 营销 SEO |
| `customer-support` | 客户支持 |
| `productivity` | 效率办公 |
| `education` | 教育 |
| `design-ui` | 设计 UI |
| `research` | 研究 |

### 文章 Frontmatter 模板

```yaml
---
title: "文章标题（≤80字符）"
description: "文章摘要描述（≤200字符），用于 meta description。"
publishedAt: 2026-03-20
updatedAt: 2026-03-22  # 可选，内容更新时填写
category: text-writing  # 可选，见允许值列表
tags:                    # 可选
  - AI写作
  - 工具对比
keywords:                # 可选，SEO 关键词
  - AI写作工具
  - ChatGPT写作技巧
relatedTools:            # 可选，关联工具 slug
  - chatgpt
  - claude
author: AI Nav 编辑部    # 可选，默认 "AI Nav 编辑部"
image: /images/article-cover.png  # 可选
---
```

---

## 二、周报（Weekly）Frontmatter 规范

### 字段定义

| 字段 | 类型 | 必填 | 默认值 | 约束 | 说明 |
|------|------|------|--------|------|------|
| `title` | `string` | ✅ | — | ≤80 字符 | 周报标题，格式：`AI 工具周报 #N` |
| `description` | `string` | ✅ | — | ≤200 字符 | 周报摘要 |
| `publishedAt` | `date` | ✅ | — | ISO 8601 日期（`YYYY-MM-DD`） | 发布日期 |
| `weekNumber` | `number` | ✅ | — | 正整数 | 周报期号 |
| `dateRange` | `string` | ✅ | — | 格式：`YYYY.MM.DD — MM.DD` | 周报覆盖的日期范围 |
| `highlights` | `string[]` | ❌ | `[]` | 每条 ≤100 字符，最多 10 条 | 本期要点摘要 |
| `category` | `enum` | ❌ | — | 同文章 category 允许值 | 周报分类（通常不需要） |
| `tags` | `string[]` | ❌ | `[]` | 每个标签 ≤30 字符，最多 10 个 | 周报标签 |

### 周报 Frontmatter 模板

```yaml
---
title: "AI 工具周报 #2"
description: "每周追踪 AI 工具圈动态。本期：XXX、YYY、ZZZ。"
publishedAt: 2026-03-26
weekNumber: 2
dateRange: "2026.03.20 — 03.26"
highlights:
  - XXX 发布新版本
  - YYY 开源新框架
  - ZZZ 宣布重大更新
category: research  # 可选
tags:               # 可选
  - 周报
  - AI动态
---
```

---

## 三、文件命名规范

### 文章
- 目录：`src/content/articles/`
- 文件名：使用 kebab-case 英文 slug，如 `ai-writing-comparison.md`
- slug 自动从文件名派生

### 周报
- 目录：`src/content/weekly/`
- 文件名：`week-NN.md`（两位数字，如 `week-01.md`）

---

## 四、注意事项

1. **日期格式**：始终使用 `YYYY-MM-DD` 格式，不带时间
2. **category 字段**：可选，为了向后兼容。新文章建议都填写
3. **tags 字段**：使用中文标签，便于前端展示和搜索
4. **relatedTools**：使用工具的 slug 而非显示名称（如 `chatgpt` 而非 `ChatGPT`）
5. **keywords**：面向 SEO，可使用中英文混合
6. **description**：务必精简有力，会直接用于搜索引擎摘要展示
