'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, LayoutGrid, List } from 'lucide-react';

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
}

type CardSize = 'large' | 'wide' | 'normal';
type ViewMode = 'grid' | 'list';

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
}: {
  post: Post;
  index: number;
  size: CardSize;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  // Reveal animation with stagger
  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 100 + index * 80);
    return () => clearTimeout(timer);
  }, [index]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;

    // Update glow position
    const glow = card.querySelector('.bento-card-glow') as HTMLElement;
    if (glow) {
      glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 255, 136, 0.2) 0%, transparent 50%)`;
      glow.style.opacity = '1';
    }

    // Update scanline position
    const scanline = card.querySelector('.bento-card-scanline') as HTMLElement;
    if (scanline) {
      scanline.style.top = `${y}px`;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;

    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';

    const glow = card.querySelector('.bento-card-glow') as HTMLElement;
    if (glow) {
      glow.style.opacity = '0';
    }
  }, []);

  return (
    <Link
      ref={cardRef}
      href={`/blog/${post.slug}`}
      className={`bento-card bento-card-${size} ${isHovered ? 'hovered' : ''} ${isRevealed ? 'revealed' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        handleMouseLeave();
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      style={{ '--card-index': index } as React.CSSProperties}
    >
      {/* Glow effect */}
      <div className="bento-card-glow" />

      {/* Scanline */}
      <div className="bento-card-scanline" />

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

function ListCard({ post, index }: { post: Post; index: number }) {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 50 + index * 40);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <Link
      href={`/blog/${post.slug}`}
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

export function BentoGrid({ posts }: BentoGridProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  return (
    <section className="bento-grid-section">
      <div className="container">
        {/* View Mode Toggle */}
        <div className="blog-view-toggle">
          <button
            className={`blog-view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            aria-label="Grid view"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            className={`blog-view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            aria-label="List view"
          >
            <List className="w-4 h-4" />
          </button>
        </div>

        {viewMode === 'grid' ? (
          <div className="bento-grid">
            {posts.map((post, index) => (
              <BentoCard
                key={post.slug}
                post={post}
                index={index}
                size={getCardSize(index, posts.length)}
              />
            ))}
          </div>
        ) : (
          <div className="blog-list">
            {posts.map((post, index) => (
              <ListCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
