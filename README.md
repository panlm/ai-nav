# AI Nav — AI 工具导航站

> 精选优质 AI 工具，分类浏览、搜索筛选、评分收藏 — 一站搞定。

## Tech Stack

- **Frontend:** Astro 5 + Tailwind CSS 4 + TypeScript
- **Backend:** Supabase (PostgreSQL + Auth + Storage)
- **Deploy:** Vercel

## Project Structure

```
src/
├── components/     # 可复用组件
│   └── ToolCard.astro
├── layouts/        # 页面布局
│   └── Layout.astro
├── lib/            # 工具函数和 SDK
│   └── supabase.ts
├── pages/          # 路由页面
│   ├── index.astro
│   ├── category/
│   └── tool/
└── styles/
    └── global.css
supabase/
└── migrations/     # 数据库迁移文件
```

## Getting Started

```bash
# Install dependencies
npm install

# Copy env and fill in Supabase credentials
cp .env.example .env

# Dev server
npm run dev

# Build
npm run build
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PUBLIC_SUPABASE_URL` | Supabase project URL |
| `PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |

## License

MIT
