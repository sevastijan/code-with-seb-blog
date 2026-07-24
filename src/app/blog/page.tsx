import type { Metadata } from 'next';
import { getAllPosts, getAllCategories } from '@/lib/mdx';
import { ScrollProgress } from '@/components/ScrollProgress';
import { FooterAwwwards } from '@/components/FooterAwwwards';
import { BlogArchiveClient } from '@/components/blog/BlogArchiveClient';

export const metadata: Metadata = {
  title: 'Blog — AI, Development & Technical Leadership',
  description:
    'Practical insights on AI automation, web development, and technical leadership. Code examples, architecture patterns, and lessons from real projects.',
  alternates: {
    canonical: 'https://www.codewithseb.com/blog',
  },
  openGraph: {
    title: 'Blog — AI, Development & Technical Leadership',
    description:
      'Practical insights on AI automation, web development, and technical leadership from real projects.',
  },
};

export default function BlogPage() {
  const allPosts = getAllPosts();
  const categoryNames = getAllCategories();

  // Prepare categories with counts
  const categories = [
    { name: 'All', count: allPosts.length },
    ...categoryNames.map(name => ({
      name,
      count: allPosts.filter(p => p.category === name).length
    }))
  ];

  return (
    <div className="grain">
      <ScrollProgress />

      <BlogArchiveClient
        totalPosts={allPosts.length}
        posts={allPosts}
        categories={categories}
      />

      <FooterAwwwards />
    </div>
  );
}
