'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

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

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1024);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

// Desktop: scroll-hijacked horizontal slider (original behavior)
function DesktopSlider({ posts }: { posts: Post[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (y - rect.height / 2) / 10;
    const rotateY = (rect.width / 2 - x) / 10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
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
    if (glow) glow.style.opacity = '0';
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(section);

    const handleScroll = () => {
      if (!isVisible) return;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = section.offsetHeight;
      const scrollEnd = sectionHeight - windowHeight;

      if (rect.top <= 0 && rect.bottom >= windowHeight) {
        const scrolled = -rect.top;
        const progress = Math.min(1, Math.max(0, scrolled / scrollEnd));
        setScrollProgress(progress);
        const trackWidth = track.scrollWidth;
        const startOffset = 60;
        const endMargin = window.innerWidth * 0.3;
        const endPosition = -(trackWidth - window.innerWidth + endMargin);
        track.style.transform = `translate3d(${startOffset + (endPosition - startOffset) * progress}px, 0, 0)`;
      } else if (rect.top > 0) {
        setScrollProgress(0);
        track.style.transform = 'translate3d(60px, 0, 0)';
      } else {
        setScrollProgress(1);
      }
    };

    track.style.transform = 'translate3d(60px, 0, 0)';
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="blog-horizontal-section">
      <div className="blog-horizontal-bg" />
      <div className="blog-horizontal-sticky">
        <div className="blog-horizontal-giant-num">
          <span className="blog-horizontal-num-outline">0</span>
          <span className="blog-horizontal-num-solid">2</span>
        </div>
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
                <div className="blog-horizontal-card-glow" />
                <div className="blog-horizontal-card-shine" />
                <div className="blog-horizontal-card-tag">{post.category}</div>
                <h3 className="blog-horizontal-card-title">{post.title}</h3>
                <p className="blog-horizontal-card-excerpt">{post.excerpt}</p>
                <div className="blog-horizontal-card-footer">
                  <span>{post.date}</span>
                  <span className="blog-horizontal-card-dot">·</span>
                  <span>{post.readTime}</span>
                </div>
                <div className="blog-horizontal-card-arrow">
                  <ArrowUpRight />
                </div>
              </Link>
            ))}
            <Link href="/blog" className="blog-horizontal-card blog-horizontal-card-cta">
              <div className="blog-horizontal-cta-glitch">
                <span className="blog-horizontal-cta-text" data-text="See all articles">See all articles</span>
              </div>
              <ArrowUpRight className="w-8 h-8" />
              <div className="blog-horizontal-cta-scanlines" />
            </Link>
          </div>
        </div>

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

// Mobile: native swipeable slider with navigation dots
function MobileSlider({ posts }: { posts: Post[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement;
    if (card) {
      track.scrollTo({ left: card.offsetLeft - 20, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      const scrollLeft = track.scrollLeft;
      const cardWidth = track.children[0]?.clientWidth || 300;
      const index = Math.round(scrollLeft / (cardWidth + 16));
      setActiveIndex(Math.min(index, posts.length));
    };

    track.addEventListener('scroll', handleScroll, { passive: true });
    return () => track.removeEventListener('scroll', handleScroll);
  }, [posts.length]);

  const allItems = [...posts, { slug: '__cta', title: '', excerpt: '', category: '', date: '', readTime: '' }];

  return (
    <section className="blog-mobile-section">
      <div className="blog-mobile-header">
        <div>
          <span className="label" style={{ color: 'var(--c-accent)' }}>Latest Articles</span>
        </div>
        <Link href="/blog" className="blog-horizontal-view-all">
          <span>View all</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div ref={trackRef} className="blog-mobile-track">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="blog-mobile-card"
          >
            <div className="blog-horizontal-card-tag">{post.category}</div>
            <h3 className="blog-mobile-card-title">{post.title}</h3>
            <p className="blog-mobile-card-excerpt">{post.excerpt}</p>
            <div className="blog-horizontal-card-footer">
              <span>{post.date}</span>
              <span className="blog-horizontal-card-dot">·</span>
              <span>{post.readTime}</span>
            </div>
          </Link>
        ))}
        <Link href="/blog" className="blog-mobile-card blog-mobile-card-cta">
          <span className="blog-mobile-cta-text">See all articles</span>
          <ArrowUpRight className="w-6 h-6" />
        </Link>
      </div>

      {/* Navigation */}
      <div className="blog-mobile-nav">
        <button
          className="blog-mobile-nav-btn"
          onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
          disabled={activeIndex === 0}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="blog-mobile-dots">
          {allItems.map((_, i) => (
            <button
              key={i}
              className={`blog-mobile-dot ${i === activeIndex ? 'active' : ''}`}
              onClick={() => scrollToIndex(i)}
            />
          ))}
        </div>
        <button
          className="blog-mobile-nav-btn"
          onClick={() => scrollToIndex(Math.min(allItems.length - 1, activeIndex + 1))}
          disabled={activeIndex === allItems.length - 1}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}

export function BlogGridAwwwards({ posts }: BlogGridAwwwardsProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileSlider posts={posts} />;
  }

  return <DesktopSlider posts={posts} />;
}
