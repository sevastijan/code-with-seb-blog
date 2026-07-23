import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BASE_URL = 'https://www.codewithseb.com';

type Frontmatter = { draft?: boolean; date?: string; enSlug?: string };

function readPosts(dir: string) {
  const posts: { slug: string; data: Frontmatter }[] = [];
  if (!fs.existsSync(dir)) return posts;
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;
    const { data } = matter(fs.readFileSync(path.join(dir, file), 'utf8'));
    if (data.draft) continue;
    posts.push({ slug: file.replace(/\.(md|mdx)$/, ''), data: data as Frontmatter });
  }
  return posts;
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Polish locale is temporarily disabled — /pl URLs redirect to English
  // (see next.config.js), so the sitemap lists English pages only.
  const enDir = path.join(process.cwd(), 'content/blog');
  const enPosts = readPosts(enDir).filter(p => p.slug !== 'pl');

  const staticPaths = ['', '/about', '/blog', '/contact', '/work', '/services', '/services/ai', '/services/development', '/services/consulting'];
  const staticPages: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${BASE_URL}${p || '/'}`,
    lastModified: new Date(),
    changeFrequency: p === '/blog' ? 'daily' : p === '' ? 'weekly' : 'monthly',
    priority: p === '' ? 1.0 : p === '/blog' ? 0.9 : 0.8,
  }));

  const enBlog: MetadataRoute.Sitemap = enPosts.map(({ slug, data }) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: data.date ? new Date(data.date) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...enBlog];
}
