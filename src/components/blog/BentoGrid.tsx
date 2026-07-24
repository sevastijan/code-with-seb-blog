'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
}

interface BentoGridProps {
  posts: Post[];
  basePath?: string;
  viewMode?: ViewMode;
}

type CardSize = 'large' | 'wide' | 'normal';
export type ViewMode = 'grid' | 'list';

// Determine card size based on index for asymmetric layout
function getCardSize(index: number, totalPosts: number): CardSize {
  // First card is always large (2x2)
  if (index === 0) return 'large';
  // Every 5th card after first is wide (2x1) — but not if it would leave a gap
  if ((index - 1) % 5 === 3 && index + 1 < totalPosts) return 'wide';
  return 'normal';
}

function BentoCard({
  post,
  index,
  size,
  basePath = '',
}: {
  post: Post;
  index: number;
  size: CardSize;
  basePath?: string;
}) {
  const [isRevealed, setIsRevealed] = useState(false);

  // Reveal animation with stagger
  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 100 + index * 80);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <Link
      href={`${basePath}/blog/${post.slug}`}
      className={`bento-card bento-card-${size} ${isRevealed ? 'revealed' : ''}`}
      style={{ '--card-index': index } as React.CSSProperties}
    >
      {/* Category */}
      <div className="bento-card-category">{post.category}</div>

      {/* Title */}
      <h3 className="bento-card-title">{post.title}</h3>

      {/* Excerpt - only show on larger cards or on hover */}
      <p className="bento-card-excerpt">{post.excerpt}</p>

      {/* Footer */}
      <div className="bento-card-footer">
        <span>{post.date}</span>
        <span className="bento-card-dot">·</span>
        <span>{post.readTime}</span>
      </div>

      {/* Arrow */}
      <div className="bento-card-arrow">
        <ArrowUpRight />
      </div>

      {/* Border */}
      <div className="bento-card-border" />

      {/* Corner accents for large cards */}
      {size === 'large' && (
        <>
          <div className="bento-card-corner bento-card-corner-tl" />
          <div className="bento-card-corner bento-card-corner-tr" />
          <div className="bento-card-corner bento-card-corner-bl" />
          <div className="bento-card-corner bento-card-corner-br" />
        </>
      )}
    </Link>
  );
}

function ListCard({ post, index, basePath = '' }: { post: Post; index: number; basePath?: string }) {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 50 + index * 40);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <Link
      href={`${basePath}/blog/${post.slug}`}
      className={`blog-list-item ${isRevealed ? 'revealed' : ''}`}
    >
      <div className="blog-list-item-num">
        {String(index + 1).padStart(2, '0')}
      </div>
      <div className="blog-list-item-content">
        <div className="blog-list-item-meta">
          <span className="blog-list-item-category">{post.category}</span>
          <span className="blog-list-item-dot">·</span>
          <span>{post.date}</span>
          <span className="blog-list-item-dot">·</span>
          <span>{post.readTime}</span>
        </div>
        <h3 className="blog-list-item-title">{post.title}</h3>
        <p className="blog-list-item-excerpt">{post.excerpt}</p>
      </div>
      <div className="blog-list-item-arrow">
        <ArrowUpRight />
      </div>
    </Link>
  );
}

export function BentoGrid({ posts, basePath = '', viewMode = 'list' }: BentoGridProps) {
  return (
    <section className="bento-grid-section">
      <div className="container">
        {viewMode === 'grid' ? (
          <div className="bento-grid">
            {posts.map((post, index) => (
              <BentoCard
                key={post.slug}
                post={post}
                index={index}
                size={getCardSize(index, posts.length)}
                basePath={basePath}
              />
            ))}
          </div>
        ) : (
          <div className="blog-list">
            {posts.map((post, index) => (
              <ListCard key={post.slug} post={post} index={index} basePath={basePath} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
