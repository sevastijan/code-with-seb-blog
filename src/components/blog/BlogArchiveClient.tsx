'use client';

import { useState, useMemo, useCallback } from 'react';
import { BlogHeroSimple } from './BlogHeroSimple';
import { FeaturedPostBrutalist } from '../FeaturedPostBrutalist';
import { TerminalFilters } from './TerminalFilters';
import { BentoGrid } from './BentoGrid';
import { LoadMoreProgress } from './LoadMoreProgress';
import { NewsletterSignal } from './NewsletterSignal';

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
}

interface FeaturedPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
}

interface CategoryCount {
  name: string;
  count: number;
}

interface BlogArchiveClientProps {
  totalPosts: number;
  featuredPost: FeaturedPost | null;
  posts: Post[];
  categories: CategoryCount[];
}

const POSTS_PER_PAGE = 8;

export function BlogArchiveClient({
  totalPosts,
  featuredPost,
  posts,
  categories,
}: BlogArchiveClientProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);

  // Filter posts based on active category
  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return posts;
    return posts.filter(p => p.category === activeCategory);
  }, [posts, activeCategory]);

  // Visible posts based on pagination
  const visiblePosts = useMemo(() => {
    return filteredPosts.slice(0, visibleCount);
  }, [filteredPosts, visibleCount]);

  // Handle category change
  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    setVisibleCount(POSTS_PER_PAGE); // Reset pagination
  }, []);

  // Handle load more
  const handleLoadMore = useCallback(() => {
    setIsLoading(true);
    // Simulate loading delay for visual effect
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + POSTS_PER_PAGE, filteredPosts.length));
      setIsLoading(false);
    }, 800);
  }, [filteredPosts.length]);

  return (
    <>
      {/* Hero - Simple version without embedded card */}
      <BlogHeroSimple totalPosts={totalPosts} />

      {/* Featured Post - Brutalist style like homepage */}
      {featuredPost && (
        <FeaturedPostBrutalist
          slug={featuredPost.slug}
          title={featuredPost.title}
          excerpt={featuredPost.excerpt}
          category={featuredPost.category}
          date={featuredPost.date}
          readTime={featuredPost.readTime}
        />
      )}

      {/* Terminal Filters */}
      <TerminalFilters
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Bento Grid */}
      <BentoGrid posts={visiblePosts} />

      {/* Load More */}
      <div className="container">
        <LoadMoreProgress
          loaded={visiblePosts.length}
          total={filteredPosts.length}
          onLoadMore={handleLoadMore}
          isLoading={isLoading}
        />
      </div>

      {/* Newsletter - hidden temporarily */}
      {/* <NewsletterSignal /> */}
    </>
  );
}
