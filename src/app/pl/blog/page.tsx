import type { Metadata } from 'next';
import { getAllPosts, getFeaturedPosts, getAllCategories } from '@/lib/mdx';
import { ScrollProgress } from '@/components/ScrollProgress';
import { FooterAwwwards } from '@/components/FooterAwwwards';
import { BlogArchiveClient } from '@/components/blog/BlogArchiveClient';

const LOCALE = 'pl' as const;

export const metadata: Metadata = {
  title: 'Blog — AI, Development i Technical Leadership',
  description:
    'Praktyczne wskazówki o automatyzacji AI, web developmencie i przywództwie technicznym. Przykłady kodu, wzorce architektoniczne i lekcje z prawdziwych projektów.',
  alternates: {
    canonical: 'https://www.codewithseb.com/pl/blog',
    languages: {
      en: 'https://www.codewithseb.com/blog',
      pl: 'https://www.codewithseb.com/pl/blog',
    },
  },
  openGraph: {
    title: 'Blog — AI, Development i Technical Leadership',
    description:
      'Praktyczne wskazówki o automatyzacji AI, web developmencie i przywództwie technicznym z prawdziwych projektów.',
  },
};

export default function BlogPagePL() {
  const allPosts = getAllPosts(LOCALE);
  const featuredPosts = getFeaturedPosts(LOCALE);
  const categoryNames = getAllCategories(LOCALE);

  const featuredPost = featuredPosts[0] || allPosts[0];

  const categories = [
    { name: 'All', count: allPosts.length },
    ...categoryNames.map(name => ({
      name,
      count: allPosts.filter(p => p.category === name).length,
    })),
  ];

  const postsWithoutFeatured = allPosts.filter(p => p.slug !== featuredPost?.slug);

  return (
    <div className="grain">
      <ScrollProgress />

      <BlogArchiveClient
        totalPosts={allPosts.length}
        basePath="/pl"
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
