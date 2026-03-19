-- Seed data: 示例分类和工具（开发/测试用）

-- ============================================
-- Categories (假设分类，等 Marketing 定稿后对齐)
-- ============================================
INSERT INTO categories (name, slug, icon, sort_order) VALUES
  ('文本生成', 'text-generation', '✍️', 1),
  ('图像设计', 'image-design', '🎨', 2),
  ('编程开发', 'coding', '💻', 3),
  ('音视频', 'audio-video', '🎬', 4),
  ('效率办公', 'productivity', '📊', 5),
  ('数据分析', 'data-analysis', '📈', 6),
  ('教育学习', 'education', '📚', 7),
  ('营销推广', 'marketing', '📣', 8);

-- 子分类示例
INSERT INTO categories (name, slug, parent_id, icon, sort_order)
SELECT '写作助手', 'writing-assistant', id, '📝', 1 FROM categories WHERE slug = 'text-generation'
UNION ALL
SELECT '翻译工具', 'translation', id, '🌐', 2 FROM categories WHERE slug = 'text-generation'
UNION ALL
SELECT 'AI 绘画', 'ai-art', id, '🖼️', 1 FROM categories WHERE slug = 'image-design'
UNION ALL
SELECT '代码助手', 'code-assistant', id, '🤖', 1 FROM categories WHERE slug = 'coding';

-- ============================================
-- Tags
-- ============================================
INSERT INTO tags (name, slug) VALUES
  ('GPT', 'gpt'),
  ('Claude', 'claude'),
  ('开源', 'open-source'),
  ('API', 'api'),
  ('中文', 'chinese'),
  ('免费', 'free'),
  ('写作', 'writing'),
  ('绘画', 'painting'),
  ('代码', 'code'),
  ('语音', 'voice');

-- ============================================
-- Tools (示例数据，status = published 方便测试)
-- ============================================
INSERT INTO tools (name, slug, description, url, category_id, pricing, chinese_support, platforms, open_source, status, editor_score) VALUES
(
  'ChatGPT',
  'chatgpt',
  'OpenAI 的对话式 AI 助手，支持文本生成、代码编写、翻译等多种任务。',
  'https://chat.openai.com',
  (SELECT id FROM categories WHERE slug = 'text-generation'),
  'freemium',
  TRUE,
  ARRAY['web', 'ios', 'android', 'api'],
  FALSE,
  'published',
  9.0
),
(
  'Claude',
  'claude',
  'Anthropic 出品的 AI 助手，擅长长文分析、代码编写和安全对话。',
  'https://claude.ai',
  (SELECT id FROM categories WHERE slug = 'text-generation'),
  'freemium',
  TRUE,
  ARRAY['web', 'ios', 'android', 'api'],
  FALSE,
  'published',
  8.8
),
(
  'Midjourney',
  'midjourney',
  '顶级 AI 图像生成工具，通过文字描述创建高质量艺术作品。',
  'https://midjourney.com',
  (SELECT id FROM categories WHERE slug = 'image-design'),
  'paid',
  FALSE,
  ARRAY['web'],
  FALSE,
  'published',
  9.2
),
(
  'Cursor',
  'cursor',
  'AI 驱动的代码编辑器，基于 VS Code，内置 AI 编程助手加速开发。',
  'https://cursor.com',
  (SELECT id FROM categories WHERE slug = 'coding'),
  'freemium',
  TRUE,
  ARRAY['mac', 'windows', 'linux'],
  FALSE,
  'published',
  9.1
),
(
  'Ollama',
  'ollama',
  '本地运行大语言模型的开源工具，支持 Llama、Mistral 等多种模型。',
  'https://ollama.com',
  (SELECT id FROM categories WHERE slug = 'coding'),
  'free',
  TRUE,
  ARRAY['mac', 'windows', 'linux', 'api'],
  TRUE,
  'published',
  8.5
);

-- ============================================
-- Tool Tags
-- ============================================
INSERT INTO tool_tags (tool_id, tag_id) VALUES
  ((SELECT id FROM tools WHERE slug = 'chatgpt'), (SELECT id FROM tags WHERE slug = 'gpt')),
  ((SELECT id FROM tools WHERE slug = 'chatgpt'), (SELECT id FROM tags WHERE slug = 'api')),
  ((SELECT id FROM tools WHERE slug = 'chatgpt'), (SELECT id FROM tags WHERE slug = 'chinese')),
  ((SELECT id FROM tools WHERE slug = 'claude'), (SELECT id FROM tags WHERE slug = 'claude')),
  ((SELECT id FROM tools WHERE slug = 'claude'), (SELECT id FROM tags WHERE slug = 'api')),
  ((SELECT id FROM tools WHERE slug = 'claude'), (SELECT id FROM tags WHERE slug = 'chinese')),
  ((SELECT id FROM tools WHERE slug = 'midjourney'), (SELECT id FROM tags WHERE slug = 'painting')),
  ((SELECT id FROM tools WHERE slug = 'cursor'), (SELECT id FROM tags WHERE slug = 'code')),
  ((SELECT id FROM tools WHERE slug = 'ollama'), (SELECT id FROM tags WHERE slug = 'open-source')),
  ((SELECT id FROM tools WHERE slug = 'ollama'), (SELECT id FROM tags WHERE slug = 'free'));
