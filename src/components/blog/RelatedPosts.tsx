'use client';

import { useRef, useCallback } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface RelatedPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
}

interface RelatedPostsProps {
  posts: RelatedPost[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    const glow = card.querySelector('.related-card-glow') as HTMLElement;
    if (glow) {
      glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 61, 0, 0.3) 0%, transparent 50%)`;
      glow.style.opacity = '1';
    }
  }, []);

  const handleMouseLeave = useCallback((index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';

    const glow = card.querySelector('.related-card-glow') as HTMLElement;
    if (glow) {
      glow.style.opacity = '0';
    }
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="related-posts">
      <div className="container">
        {/* Section header */}
        <div className="related-header">
          <div className="related-label">
            <span className="related-label-text">RELATED</span>
            <div className="related-label-line" />
            <span className="related-label-num">{String(posts.length).padStart(2, '0')}</span>
          </div>
          <h2 className="related-title">Keep reading</h2>
        </div>

        {/* Cards grid */}
        <div className="related-grid">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              ref={(el) => { cardRefs.current[index] = el; }}
              href={`/blog/${post.slug}`}
              className="related-card"
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {/* Glow effect */}
              <div className="related-card-glow" />

              {/* Category */}
              <div className="related-card-category">{post.category}</div>

              {/* Title */}
              <h3 className="related-card-title">{post.title}</h3>

              {/* Excerpt */}
              <p className="related-card-excerpt">{post.excerpt}</p>

              {/* Footer */}
              <div className="related-card-footer">
                <span>{post.date}</span>
                <span className="related-card-dot">·</span>
                <span>{post.readTime}</span>
                <ArrowUpRight className="related-card-arrow" />
              </div>
            </Link>
          ))}
        </div>

        {/* View all link */}
        <div className="related-cta">
          <Link href="/blog" className="btn-magnetic">
            <span>View all articles</span>
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
