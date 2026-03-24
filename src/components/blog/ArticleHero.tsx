'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { Clock, Calendar } from 'lucide-react';

interface ArticleHeroProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author?: string;
}

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*';

export function ArticleHero({ title, excerpt, category, date, readTime, author }: ArticleHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isRevealed, setIsRevealed] = useState(false);
  const [backText, setBackText] = useState('BLOG');
  const [isBackHovered, setIsBackHovered] = useState(false);
  const scrambleRef = useRef<NodeJS.Timeout | null>(null);

  // Split title into words for staggered animation
  const titleWords = title.split(' ');

  // Scramble text effect for back link
  const triggerScramble = useCallback((finalText: string) => {
    if (scrambleRef.current) clearInterval(scrambleRef.current);
    let iterations = 0;
    scrambleRef.current = setInterval(() => {
      setBackText(
        finalText.split('').map((char, i) => {
          if (i < iterations) return finalText[i];
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }).join('')
      );
      iterations += 0.5;
      if (iterations > finalText.length) {
        if (scrambleRef.current) clearInterval(scrambleRef.current);
        setBackText(finalText);
      }
    }, 40);
  }, []);

  const handleBackHover = () => {
    setIsBackHovered(true);
    triggerScramble('BLOG');
  };

  const handleBackLeave = () => {
    setIsBackHovered(false);
  };

  useEffect(() => {
    return () => {
      if (scrambleRef.current) clearInterval(scrambleRef.current);
    };
  }, []);

  // Mouse parallax effect
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

  // Trigger reveal animation
  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={containerRef} className="article-hero">
      {/* Animated background layers */}
      <div className="article-hero-bg">
        {/* Giant background text */}
        <div className="article-hero-bg-text-wrapper">
          <span
            className="article-hero-bg-text article-hero-bg-text-1"
            style={{
              transform: `translateY(-50%) translate(${mousePos.x * -40}px, ${mousePos.y * -25}px)`,
            }}
          >
            {category.toUpperCase()}
          </span>
        </div>

        {/* Gradient orbs with parallax */}
        <div
          className="article-hero-orb article-hero-orb-1"
          style={{
            transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -20}px)`,
          }}
        />
        <div
          className="article-hero-orb article-hero-orb-2"
          style={{
            transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 30}px)`,
          }}
        />

        {/* Grid overlay */}
        <div className="article-hero-grid" />

        {/* Floating decorative elements */}
        <div className="article-hero-deco">
          <div className="article-hero-line article-hero-line-1" />
          <div className="article-hero-line article-hero-line-2" />
          <div className="article-hero-dot article-hero-dot-1" />
          <div className="article-hero-dot article-hero-dot-2" />
        </div>
      </div>

      {/* Content */}
      <div className="container relative z-10">
        {/* Top bar with back link and category */}
        <div className={`article-hero-topbar ${isRevealed ? 'revealed' : ''}`}>
          {/* Back link - glitch style */}
          <Link
            href="/blog"
            className={`article-hero-back ${isBackHovered ? 'hovered' : ''}`}
            onMouseEnter={handleBackHover}
            onMouseLeave={handleBackLeave}
          >
            <span className="article-hero-back-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </span>
            <span className="article-hero-back-text" data-text={backText}>
              {backText.split('').map((char, i) => (
                <span key={i} className="article-hero-back-char" style={{ '--char-i': i } as React.CSSProperties}>
                  {char}
                </span>
              ))}
            </span>
          </Link>

          {/* Category badge - neon style */}
          <div className="article-hero-category">
            <span className="article-hero-category-text" data-text={category.toUpperCase()}>
              {category.toUpperCase()}
            </span>
            <span className="article-hero-category-glow" />
          </div>
        </div>

        {/* Title with word-by-word reveal */}
        <h1 className="article-hero-title">
          {titleWords.map((word, index) => (
            <span key={index} className="article-hero-word-wrapper">
              <span
                className={`article-hero-word ${isRevealed ? 'revealed' : ''}`}
                style={{ transitionDelay: `${index * 50 + 200}ms` }}
              >
                {word}
              </span>
              {index < titleWords.length - 1 && ' '}
            </span>
          ))}
        </h1>

        {/* Excerpt */}
        <p className={`article-hero-excerpt ${isRevealed ? 'revealed' : ''}`}>
          {excerpt}
        </p>

        {/* Meta information */}
        <div className={`article-hero-meta ${isRevealed ? 'revealed' : ''}`}>
          {author && (
            <div className="article-hero-author">
              <div className="article-hero-author-avatar">
                {author.charAt(0)}
              </div>
              <span>{author}</span>
            </div>
          )}
          <div className="article-hero-meta-divider" />
          <div className="article-hero-meta-item">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <div className="article-hero-meta-item">
            <Clock className="w-4 h-4" />
            <span>{readTime}</span>
          </div>
        </div>

      </div>

      {/* Scroll indicator - centered at bottom */}
      <div className={`article-hero-scroll-inline ${isRevealed ? 'revealed' : ''}`}>
        <span>Scroll</span>
        <div className="article-hero-scroll-line" />
      </div>

    </section>
  );
}
