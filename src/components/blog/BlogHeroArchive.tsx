'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface FeaturedPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
}

interface BlogHeroArchiveProps {
  totalPosts: number;
  featuredPost: FeaturedPost;
}

const GLITCH_CHARS = '!@#$%^&*<>/|\\01_{}[]';

export function BlogHeroArchive({ totalPosts, featuredPost }: BlogHeroArchiveProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isRevealed, setIsRevealed] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [counterDisplay, setCounterDisplay] = useState('00');
  const [isCardHovered, setIsCardHovered] = useState(false);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Counter animation on mount
  useEffect(() => {
    let current = 0;
    const target = totalPosts;
    const duration = 1500;
    const steps = 30;
    const increment = target / steps;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setCounterDisplay(String(Math.floor(current)).padStart(2, '0'));
    }, stepDuration);

    return () => clearInterval(timer);
  }, [totalPosts]);

  // Reveal animation
  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 3D card tilt
  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    // Update glow
    const glow = card.querySelector('.featured-card-glow') as HTMLElement;
    if (glow) {
      glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 61, 0, 0.25) 0%, transparent 50%)`;
      glow.style.opacity = '1';
    }
  }, []);

  const handleCardMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';

    const glow = card.querySelector('.featured-card-glow') as HTMLElement;
    if (glow) {
      glow.style.opacity = '0';
    }
  }, []);

  return (
    <section ref={containerRef} className="blog-hero-archive">
      {/* Background layers */}
      <div className="blog-hero-archive-bg">
        {/* Giant 03 number */}
        <div
          className="blog-hero-archive-giant-num"
          style={{
            transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -20}px)`,
          }}
        >
          <span className="blog-hero-archive-num-outline">0</span>
          <span className="blog-hero-archive-num-solid">3</span>
        </div>

        {/* Grid overlay */}
        <div className="blog-hero-archive-grid" />

        {/* Gradient orbs */}
        <div
          className="blog-hero-archive-orb blog-hero-archive-orb-1"
          style={{ transform: `translate(${mousePos.x * -40}px, ${mousePos.y * -30}px)` }}
        />
        <div
          className="blog-hero-archive-orb blog-hero-archive-orb-2"
          style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 25}px)` }}
        />

        {/* Decorative lines */}
        <div className="blog-hero-archive-deco">
          <div className="blog-hero-archive-line blog-hero-archive-line-1" />
          <div className="blog-hero-archive-line blog-hero-archive-line-2" />
          <div className="blog-hero-archive-line blog-hero-archive-line-3" />
        </div>
      </div>

      {/* Main content */}
      <div className="container relative z-10">
        <div className="blog-hero-archive-content">
          {/* Left side - Title & Terminal */}
          <div className="blog-hero-archive-left">
            {/* Top bar */}
            <div className={`blog-hero-archive-topbar ${isRevealed ? 'revealed' : ''}`}>
              <span className="blog-hero-archive-label">
                <span className="blog-hero-archive-label-dot" />
                ARCHIVE
              </span>
              <span className="blog-hero-archive-counter">
                <span className="blog-hero-archive-counter-num">{counterDisplay}</span>
                <span className="blog-hero-archive-counter-label">ARTICLES</span>
              </span>
            </div>

            {/* Main headline */}
            <h1 className="blog-hero-archive-title">
              <span className={`blog-hero-archive-word ${isRevealed ? 'revealed' : ''}`} style={{ transitionDelay: '100ms' }}>
                ALL THE
              </span>
              <span className={`blog-hero-archive-word blog-hero-archive-word-stroke ${isRevealed ? 'revealed' : ''}`} style={{ transitionDelay: '200ms' }}>
                THOUGHTS
              </span>
            </h1>

            {/* Terminal subtitle */}
            <div className={`blog-hero-archive-terminal ${isRevealed ? 'revealed' : ''}`}>
              <span className="blog-hero-archive-terminal-prompt">$</span>
              <span className="blog-hero-archive-terminal-text">
                grep -r "insights" ./brain
                <span className={`blog-hero-archive-cursor ${cursorVisible ? 'visible' : ''}`}>_</span>
              </span>
            </div>

            {/* Description */}
            <p className={`blog-hero-archive-desc ${isRevealed ? 'revealed' : ''}`}>
              Deep dives into AI, web development, and the craft of building products.
              No corporate speak—just lessons from the trenches.
            </p>
          </div>

          {/* Right side - Featured Post Card */}
          <div className={`blog-hero-archive-right ${isRevealed ? 'revealed' : ''}`}>
            <div className="blog-hero-archive-featured-label">
              <span className="blog-hero-archive-featured-dot" />
              FEATURED
            </div>

            <Link
              ref={cardRef}
              href={`/blog/${featuredPost.slug}`}
              className={`blog-hero-archive-card ${isCardHovered ? 'hovered' : ''}`}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={() => {
                handleCardMouseLeave();
                setIsCardHovered(false);
              }}
              onMouseEnter={() => setIsCardHovered(true)}
            >
              {/* Glow effect */}
              <div className="featured-card-glow" />

              {/* Scan line */}
              <div className="blog-hero-archive-card-scanline" />

              {/* Content */}
              <div className="blog-hero-archive-card-content">
                <span className="blog-hero-archive-card-category">{featuredPost.category}</span>
                <h2 className="blog-hero-archive-card-title">{featuredPost.title}</h2>
                <p className="blog-hero-archive-card-excerpt">{featuredPost.excerpt}</p>
                <div className="blog-hero-archive-card-meta">
                  <span>{featuredPost.date}</span>
                  <span className="blog-hero-archive-card-dot">·</span>
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>

              {/* Arrow */}
              <div className="blog-hero-archive-card-arrow">
                <ArrowUpRight />
              </div>

              {/* Border glow */}
              <div className="blog-hero-archive-card-border" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className={`blog-hero-archive-scroll ${isRevealed ? 'revealed' : ''}`}>
        <span>SCROLL</span>
        <div className="blog-hero-archive-scroll-line" />
      </div>
    </section>
  );
}
