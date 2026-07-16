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
  const enDir = path.join(process.cwd(), 'content/blog');
  const plDir = path.join(enDir, 'pl');

  const enPosts = readPosts(enDir).filter(p => p.slug !== 'pl');
  const plPosts = readPosts(plDir);

  // Map English slug -> Polish slug (via the enSlug frontmatter on Polish posts).
  const enToPl = new Map<string, string>();
  for (const p of plPosts) {
    if (p.data.enSlug) enToPl.set(p.data.enSlug, p.slug);
  }

  const staticPaths = ['', '/about', '/blog', '/contact', '/work', '/services', '/services/ai', '/services/development', '/services/consulting'];
  const staticPages: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${BASE_URL}${p || '/'}`,
    lastModified: new Date(),
    changeFrequency: p === '/blog' ? 'daily' : p === '' ? 'weekly' : 'monthly',
    priority: p === '' ? 1.0 : p === '/blog' ? 0.9 : 0.8,
    alternates: {
      languages: {
        en: `${BASE_URL}${p || '/'}`,
        pl: `${BASE_URL}/pl${p}`,
      },
    },
  }));

  // English blog posts, with hreflang to the Polish version when it exists.
  const enBlog: MetadataRoute.Sitemap = enPosts.map(({ slug, data }) => {
    const pl = enToPl.get(slug);
    const languages: Record<string, string> = { en: `${BASE_URL}/blog/${slug}` };
    if (pl) languages.pl = `${BASE_URL}/pl/blog/${pl}`;
    return {
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: data.date ? new Date(data.date) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: { languages },
    };
  });

  // Polish blog posts, with hreflang back to the English version.
  const plBlog: MetadataRoute.Sitemap = plPosts.map(({ slug, data }) => {
    const en = data.enSlug;
    const languages: Record<string, string> = { pl: `${BASE_URL}/pl/blog/${slug}` };
    if (en) languages.en = `${BASE_URL}/blog/${en}`;
    return {
      url: `${BASE_URL}/pl/blog/${slug}`,
      lastModified: data.date ? new Date(data.date) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: { languages },
    };
  });

  return [...staticPages, ...enBlog, ...plBlog];
}
