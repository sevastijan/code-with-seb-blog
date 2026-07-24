'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { BlogHeroSimple } from './BlogHeroSimple';
import { TerminalFilters } from './TerminalFilters';
import { BentoGrid, type ViewMode } from './BentoGrid';
import { LoadMoreProgress } from './LoadMoreProgress';
import { NewsletterSignal } from './NewsletterSignal';

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  tags?: string[];
}

interface CategoryCount {
  name: string;
  count: number;
}

interface BlogArchiveClientProps {
  totalPosts: number;
  posts: Post[];
  categories: CategoryCount[];
  basePath?: string;
}

const POSTS_PER_PAGE = 8;

export function BlogArchiveClient({
  totalPosts,
  posts,
  categories,
  basePath = '',
}: BlogArchiveClientProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);

  // Pick up ?tag= from the URL (links under each article point here)
  useEffect(() => {
    const tag = new URLSearchParams(window.location.search).get('tag');
    if (tag) setActiveTag(tag);
  }, []);

  const clearTag = useCallback(() => {
    setActiveTag(null);
    setVisibleCount(POSTS_PER_PAGE);
    const url = new URL(window.location.href);
    url.searchParams.delete('tag');
    window.history.replaceState(null, '', url.toString());
  }, []);

  // Filter posts based on active tag and category
  const filteredPosts = useMemo(() => {
    let result = posts;
    if (activeTag) {
      const tagLower = activeTag.toLowerCase();
      result = result.filter(p => p.tags?.some(t => t.toLowerCase() === tagLower));
    }
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    return result;
  }, [posts, activeCategory, activeTag]);

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

      {/* Terminal Filters */}
      <TerminalFilters
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        activeTag={activeTag}
        onClearTag={clearTag}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Bento Grid */}
      <BentoGrid posts={visiblePosts} basePath={basePath} viewMode={viewMode} />

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
