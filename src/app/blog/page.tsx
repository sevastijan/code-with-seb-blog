import type { Metadata } from 'next';
import { getAllPosts, getFeaturedPosts, getAllCategories } from '@/lib/mdx';
import { CustomCursor } from '@/components/CustomCursor';
import { ScrollProgress } from '@/components/ScrollProgress';
import { FooterAwwwards } from '@/components/FooterAwwwards';
import { BlogArchiveClient } from '@/components/blog/BlogArchiveClient';

export const metadata: Metadata = {
  title: 'Blog — AI, Development & Technical Leadership',
  description:
    'Practical insights on AI automation, web development, and technical leadership. Code examples, architecture patterns, and lessons from real projects.',
  alternates: {
    canonical: 'https://codewithseb.com/blog',
  },
  openGraph: {
    title: 'Blog — AI, Development & Technical Leadership',
    description:
      'Practical insights on AI automation, web development, and technical leadership from real projects.',
  },
};

export default function BlogPage() {
  const allPosts = getAllPosts();
  const featuredPosts = getFeaturedPosts();
  const categoryNames = getAllCategories();

  // Get featured post
  const featuredPost = featuredPosts[0] || allPosts[0];

  // Prepare categories with counts
  const categories = [
    { name: 'All', count: allPosts.length },
    ...categoryNames.map(name => ({
      name,
      count: allPosts.filter(p => p.category === name).length
    }))
  ];

  // Posts without featured
  const postsWithoutFeatured = allPosts.filter(p => p.slug !== featuredPost?.slug);

  return (
    <div className="grain">
      <CustomCursor />
      <ScrollProgress />

      <BlogArchiveClient
        totalPosts={allPosts.length}
        featuredPost={featuredPost ? {
          slug: featuredPost.slug,
          title: featuredPost.title,
          excerpt: featuredPost.excerpt,
          category: featuredPost.category,
          date: featuredPost.date,
          readTime: featuredPost.readTime,
        } : null}
        posts={postsWithoutFeatured}
        categories={categories}
      />

      <FooterAwwwards />
    </div>
  );
}
