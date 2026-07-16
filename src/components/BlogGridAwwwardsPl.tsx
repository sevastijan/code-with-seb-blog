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

// Desktop: free horizontal scroll with drag-to-pan + arrow navigation (no scroll hijack)
function DesktopSlider({ posts }: { posts: Post[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const dragState = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    if (dragState.current.active) return;
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

  const updateScrollState = useCallback(() => {
    const w = wrapperRef.current;
    if (!w) return;
    setCanScrollLeft(w.scrollLeft > 8);
    setCanScrollRight(w.scrollLeft < w.scrollWidth - w.clientWidth - 8);
  }, []);

  const scrollByDirection = useCallback((dir: 'left' | 'right') => {
    const w = wrapperRef.current;
    if (!w) return;
    const firstCard = w.querySelector('.blog-horizontal-card') as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(w.firstElementChild as Element).gap || '32') || 32;
    const step = (firstCard?.offsetWidth ?? 380) + gap;
    w.scrollBy({ left: dir === 'left' ? -step : step, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const w = wrapperRef.current;
    if (!w) return;
    updateScrollState();
    w.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      w.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragState.current.active) return;
      const w = wrapperRef.current;
      if (!w) return;
      const dx = e.pageX - dragState.current.startX;
      if (Math.abs(dx) > 5) dragState.current.moved = true;
      w.scrollLeft = dragState.current.startScroll - dx;
    };
    const onUp = () => {
      if (!dragState.current.active) return;
      dragState.current.active = false;
      const w = wrapperRef.current;
      if (w) {
        w.classList.remove('is-dragging');
      }
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  const onWrapperMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const w = wrapperRef.current;
    if (!w) return;
    dragState.current = {
      active: true,
      startX: e.pageX,
      startScroll: w.scrollLeft,
      moved: false,
    };
    w.classList.add('is-dragging');
  };

  const onCardClick = (e: React.MouseEvent) => {
    if (dragState.current.moved) {
      e.preventDefault();
      dragState.current.moved = false;
    }
  };

  return (
    <section className="blog-horizontal-section">
      <div className="blog-horizontal-bg" />
      <div className="blog-horizontal-sticky">
        <div className="blog-horizontal-giant-num">
          <span className="blog-horizontal-num-outline">0</span>
          <span className="blog-horizontal-num-solid">2</span>
        </div>
        <div className="blog-horizontal-header">
          <div className="blog-horizontal-glitch-label">
            <span className="blog-horizontal-glitch-text">Najnowsze artykuły</span>
            <span className="blog-horizontal-glitch-ghost" aria-hidden="true">Najnowsze artykuły</span>
          </div>
          <Link href="/pl/blog" className="blog-horizontal-view-all">
            <span>Zobacz wszystkie</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div
          ref={wrapperRef}
          className="blog-horizontal-track-wrapper"
          onMouseDown={onWrapperMouseDown}
        >
          <div className="blog-horizontal-track">
            {posts.map((post, index) => (
              <Link
                key={post.slug}
                ref={(el) => { cardRefs.current[index] = el; }}
                href={`/pl/blog/${post.slug}`}
                className="blog-horizontal-card"
                style={{ '--card-index': index } as React.CSSProperties}
                onClick={onCardClick}
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
            <Link
              href="/pl/blog"
              className="blog-horizontal-card blog-horizontal-card-cta"
              onClick={onCardClick}
            >
              <div className="blog-horizontal-cta-glitch">
                <span className="blog-horizontal-cta-text" data-text="Zobacz wszystkie artykuły">Zobacz wszystkie artykuły</span>
              </div>
              <ArrowUpRight className="w-8 h-8" />
              <div className="blog-horizontal-cta-scanlines" />
            </Link>
          </div>
        </div>

        <div className="blog-horizontal-nav">
          <button
            type="button"
            className="blog-horizontal-nav-btn"
            onClick={() => scrollByDirection('left')}
            disabled={!canScrollLeft}
            aria-label="Przewiń w lewo"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="blog-horizontal-nav-hint">Przeciągnij lub przewiń →</span>
          <button
            type="button"
            className="blog-horizontal-nav-btn"
            onClick={() => scrollByDirection('right')}
            disabled={!canScrollRight}
            aria-label="Przewiń w prawo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
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
          <span className="label" style={{ color: 'var(--c-accent)' }}>Najnowsze artykuły</span>
        </div>
        <Link href="/pl/blog" className="blog-horizontal-view-all">
          <span>Zobacz wszystkie</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div ref={trackRef} className="blog-mobile-track">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/pl/blog/${post.slug}`}
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
        <Link href="/pl/blog" className="blog-mobile-card blog-mobile-card-cta">
          <span className="blog-mobile-cta-text">Zobacz wszystkie artykuły</span>
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

export function BlogGridAwwwardsPl({ posts }: BlogGridAwwwardsProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileSlider posts={posts} />;
  }

  return <DesktopSlider posts={posts} />;
}
