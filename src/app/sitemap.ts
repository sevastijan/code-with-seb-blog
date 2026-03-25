import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BASE_URL = 'https://codewithseb.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const postsDirectory = path.join(process.cwd(), 'content/blog');

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/work`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services/ai`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services/development`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services/consulting`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Blog posts
  const blogPosts: MetadataRoute.Sitemap = [];

  if (fs.existsSync(postsDirectory)) {
    const files = fs.readdirSync(postsDirectory).filter(
      (file) => file.endsWith('.md') || file.endsWith('.mdx')
    );

    for (const file of files) {
      const fullPath = path.join(postsDirectory, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      if (data.draft) continue;

      const slug = file.replace(/\.(md|mdx)$/, '');
      const date = data.date ? new Date(data.date) : new Date();

      blogPosts.push({
        url: `${BASE_URL}/blog/${slug}`,
        lastModified: date,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return [...staticPages, ...blogPosts];
}
