'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
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

interface BlogGridAwwwardsProps {
  posts: Post[];
}

export function BlogGridAwwwards({ posts }: BlogGridAwwwardsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // 3D tilt effect handler
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    // Update glow position
    const glow = card.querySelector('.blog-horizontal-card-glow') as HTMLElement;
    if (glow) {
      glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 255, 136, 0.3) 0%, transparent 50%)`;
      glow.style.opacity = '1';
    }
  }, []);

  const handleMouseLeave = useCallback((index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';

    const glow = card.querySelector('.blog-horizontal-card-glow') as HTMLElement;
    if (glow) {
      glow.style.opacity = '0';
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = section.offsetHeight;

      // Calculate progress: 0 when section enters, 1 when section leaves
      // The "scroll zone" is from when sticky pins to when we exit
      const scrollStart = 0; // When section top hits viewport top
      const scrollEnd = sectionHeight - windowHeight; // When section bottom hits viewport bottom

      if (rect.top <= 0 && rect.bottom >= windowHeight) {
        // We're in the sticky zone
        const scrolled = -rect.top;
        const progress = Math.min(1, Math.max(0, scrolled / scrollEnd));
        setScrollProgress(progress);

        // Calculate track position
        const trackWidth = track.scrollWidth;
        const startOffset = 60; // First card visible with padding
        const endMargin = window.innerWidth * 0.3; // 30% margin on the right for last card
        const endPosition = -(trackWidth - window.innerWidth + endMargin);

        const translateX = startOffset + (endPosition - startOffset) * progress;
        track.style.transform = `translate3d(${translateX}px, 0, 0)`;
      } else if (rect.top > 0) {
        // Before section
        setScrollProgress(0);
        track.style.transform = 'translate3d(60px, 0, 0)';
      } else {
        // After section
        setScrollProgress(1);
      }
    };

    // Initial position
    track.style.transform = `translate3d(60px, 0, 0)`;

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="blog-horizontal-section">
      {/* Green gradient background */}
      <div className="blog-horizontal-bg" />

      {/* Sticky container */}
      <div className="blog-horizontal-sticky">
        {/* Giant 02 number - inside sticky so it stays visible */}
        <div className="blog-horizontal-giant-num">
          <span className="blog-horizontal-num-outline">0</span>
          <span className="blog-horizontal-num-solid">2</span>
        </div>
        {/* Header */}
        <div className="blog-horizontal-header">
          <div className="blog-horizontal-glitch-label">
            <span className="blog-horizontal-glitch-text">Latest Articles</span>
            <span className="blog-horizontal-glitch-ghost" aria-hidden="true">Latest Articles</span>
          </div>
          <Link href="/blog" className="blog-horizontal-view-all">
            <span>View all</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Horizontal track */}
        <div className="blog-horizontal-track-wrapper">
          <div ref={trackRef} className="blog-horizontal-track">
            {posts.map((post, index) => (
              <Link
                key={post.slug}
                ref={(el) => { cardRefs.current[index] = el; }}
                href={`/blog/${post.slug}`}
                className="blog-horizontal-card"
                style={{ '--card-index': index } as React.CSSProperties}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                {/* Glow effect that follows cursor */}
                <div className="blog-horizontal-card-glow" />

                {/* Shine effect */}
                <div className="blog-horizontal-card-shine" />

                {/* Category tag */}
                <div className="blog-horizontal-card-tag">{post.category}</div>

                {/* Title */}
                <h3 className="blog-horizontal-card-title">{post.title}</h3>

                {/* Excerpt */}
                <p className="blog-horizontal-card-excerpt">{post.excerpt}</p>

                {/* Footer */}
                <div className="blog-horizontal-card-footer">
                  <span>{post.date}</span>
                  <span className="blog-horizontal-card-dot">·</span>
                  <span>{post.readTime}</span>
                </div>

                {/* Hover arrow */}
                <div className="blog-horizontal-card-arrow">
                  <ArrowUpRight />
                </div>
              </Link>
            ))}

            {/* View all card with glitch effect */}
            <Link href="/blog" className="blog-horizontal-card blog-horizontal-card-cta">
              <div className="blog-horizontal-cta-glitch">
                <span className="blog-horizontal-cta-text" data-text="See all articles">See all articles</span>
              </div>
              <ArrowUpRight className="w-8 h-8" />
              <div className="blog-horizontal-cta-scanlines" />
            </Link>
          </div>
        </div>

        {/* Progress counter */}
        <div className="blog-horizontal-counter">
          <div className="blog-horizontal-counter-glitch">
            <span className="blog-horizontal-counter-text">
              {String(Math.round(scrollProgress * 100)).padStart(2, '0')}/100
            </span>
            <span className="blog-horizontal-counter-ghost" aria-hidden="true">
              {String(Math.round(scrollProgress * 100)).padStart(2, '0')}/100
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
