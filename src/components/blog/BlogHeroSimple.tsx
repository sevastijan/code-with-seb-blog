'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface BlogHeroSimpleProps {
  totalPosts: number;
}

const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*';

function ScrambleText({ text, isRevealed, delay = 0 }: { text: string; isRevealed: boolean; delay?: number }) {
  const [displayText, setDisplayText] = useState(text.split('').map(() => ' '));
  const [hasStarted, setHasStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    if (!isRevealed) return;

    const startTimer = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [isRevealed, delay]);

  useEffect(() => {
    if (!hasStarted) return;

    const letters = text.split('');
    let frame = 0;
    const totalFrames = letters.length * 3;

    const interval = setInterval(() => {
      setDisplayText(
        letters.map((letter, i) => {
          if (letter === ' ') return ' ';
          const revealAt = i * 3;
          if (frame >= revealAt + 3) return letter;
          if (frame >= revealAt) {
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          }
          return ' ';
        })
      );

      frame++;
      if (frame > totalFrames) {
        clearInterval(interval);
        setDisplayText(letters);
        setIsComplete(true);

        // Trigger glitch effect after completion
        setTimeout(() => {
          setGlitchActive(true);
          setTimeout(() => setGlitchActive(false), 600);
        }, 200);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [hasStarted, text]);

  return (
    <span className={`scramble-text ${isComplete ? 'complete' : ''} ${glitchActive ? 'glitch-active' : ''}`}>
      {displayText.map((char, i) => (
        <span
          key={i}
          className="scramble-char"
          style={{ '--char-index': i } as React.CSSProperties}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

export function BlogHeroSimple({ totalPosts }: BlogHeroSimpleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isRevealed, setIsRevealed] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [counterDisplay, setCounterDisplay] = useState('00');

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

  return (
    <section ref={containerRef} className="blog-hero-simple">
      {/* Background layers */}
      <div className="blog-hero-simple-bg">
        {/* Grid overlay */}
        <div className="blog-hero-simple-grid" />

        {/* Gradient orbs */}
        <div
          className="blog-hero-simple-orb blog-hero-simple-orb-1"
          style={{ transform: `translate(${mousePos.x * -40}px, ${mousePos.y * -30}px)` }}
        />
        <div
          className="blog-hero-simple-orb blog-hero-simple-orb-2"
          style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 25}px)` }}
        />

        {/* Decorative lines */}
        <div className="blog-hero-simple-deco">
          <div className="blog-hero-simple-line blog-hero-simple-line-1" />
          <div className="blog-hero-simple-line blog-hero-simple-line-2" />
        </div>
      </div>

      {/* Main content */}
      <div className="container relative z-10">
        <div className="blog-hero-simple-content">
          {/* Main headline */}
          <h1 className="blog-hero-simple-title">
            <span className={`blog-hero-simple-word ${isRevealed ? 'revealed' : ''}`} style={{ transitionDelay: '100ms' }}>
              ALL THE
            </span>
            <span className={`blog-hero-simple-word blog-hero-simple-word-stroke ${isRevealed ? 'revealed' : ''}`} style={{ transitionDelay: '200ms' }}>
              <ScrambleText text="THOUGHTS" isRevealed={isRevealed} delay={400} />
            </span>
          </h1>

          {/* Terminal subtitle */}
          <div className={`blog-hero-simple-terminal ${isRevealed ? 'revealed' : ''}`}>
            <div className="blog-hero-simple-terminal-line">
              <span className="blog-hero-simple-terminal-prompt">$</span>
              <span className="blog-hero-simple-terminal-text">
                grep -r "insights" ./brain
              </span>
            </div>
            <div className="blog-hero-simple-terminal-output">
              <span className="blog-hero-simple-terminal-arrow">→</span>
              <span className="blog-hero-simple-terminal-result">
                {counterDisplay} results found
                <span className={`blog-hero-simple-cursor ${cursorVisible ? 'visible' : ''}`}>_</span>
              </span>
            </div>
          </div>

          {/* Description */}
          <p className={`blog-hero-simple-desc ${isRevealed ? 'revealed' : ''}`}>
            Technical insights on AI, modern web architecture, and shipping software that scales.
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`blog-hero-simple-scroll ${isRevealed ? 'revealed' : ''}`}>
        <span>SCROLL</span>
        <div className="blog-hero-simple-scroll-line" />
      </div>
    </section>
  );
}
