'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*';
const scrambleColors = ['outline', 'green', 'violet', 'orange'] as const;
type ScrambleColor = typeof scrambleColors[number];

const spotlightColors: Record<ScrambleColor | 'default', string> = {
  default: 'rgba(139, 92, 246, 0.25)',
  outline: 'transparent',
  green: 'rgba(0, 255, 136, 0.25)',
  violet: 'rgba(139, 92, 246, 0.3)',
  orange: 'rgba(255, 61, 0, 0.25)',
};

export function CTAAwwwards() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [activeScrambleColor, setActiveScrambleColor] = useState<ScrambleColor | 'default'>('default');

  // Intersection observer
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Periodic glitch burst
  useEffect(() => {
    if (!isVisible) return;

    const triggerGlitch = () => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    };

    // Initial glitch after reveal
    const initialTimeout = setTimeout(triggerGlitch, 1000);

    // Random glitches
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        triggerGlitch();
      }
    }, 3000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [isVisible]);

  // Mouse tracking
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`cta-aww ${isVisible ? 'visible' : ''} ${glitchActive ? 'glitch-burst' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Spotlight that follows cursor */}
      <div
        className="cta-aww-spotlight"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(circle, ${spotlightColors[activeScrambleColor]} 0%, transparent 60%)`
        }}
      />

      {/* Background */}
      <div className="cta-aww-bg">
        <div className="cta-aww-gradient" />
        <div className="cta-aww-grid" />
        <div className="cta-aww-noise" />
      </div>


      {/* Floating particles - reduced for performance */}
      <div className="cta-aww-particles">
        {Array(8).fill(null).map((_, i) => (
          <div
            key={i}
            className={`cta-aww-particle cta-aww-particle-${i % 4}`}
          />
        ))}
      </div>

      {/* Marquee top */}
      <div className="cta-aww-marquee cta-aww-marquee-top">
        <div className="cta-aww-marquee-track">
          {Array(10).fill(null).map((_, i) => (
            <span key={i} className="cta-aww-marquee-item">Let's build something great</span>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="cta-aww-content">
        {/* Label */}
        <div className="cta-aww-label">
          <span className="cta-aww-label-text">Ready?</span>
          <span className="cta-aww-label-ghost" aria-hidden="true">Ready?</span>
        </div>

        {/* Giant CTA text with magnetic letters */}
        <h2 className="cta-aww-title">
          <MagneticLine
            text="LET'S"
            mousePos={mousePos}
            sectionRef={sectionRef}
            isVisible={isVisible}
            startIndex={0}
            onScrambleColorChange={setActiveScrambleColor}
          />
          <MagneticLine
            text="TALK."
            mousePos={mousePos}
            sectionRef={sectionRef}
            isVisible={isVisible}
            startIndex={5}
            isOrange
            onScrambleColorChange={setActiveScrambleColor}
          />
        </h2>

        {/* Email */}
        <a href="mailto:hello@codewithseb.com" className="cta-aww-email">
          <span className="cta-aww-email-text">hello@codewithseb.com</span>
          <span className="cta-aww-email-arrow">→</span>
        </a>

        {/* Or button */}
        <div className="cta-aww-or">
          <span className="cta-aww-or-line" />
          <span className="cta-aww-or-text">or</span>
          <span className="cta-aww-or-line" />
        </div>

        {/* CTA Button */}
        <Link href="/contact" className="cta-aww-btn">
          <span className="cta-aww-btn-bg" />
          <span className="cta-aww-btn-text">Start a project</span>
          <span className="cta-aww-btn-arrow">↗</span>
        </Link>
      </div>

      {/* Marquee bottom */}
      <div className="cta-aww-marquee cta-aww-marquee-bottom">
        <div className="cta-aww-marquee-track cta-aww-marquee-reverse">
          {Array(10).fill(null).map((_, i) => (
            <span key={i} className="cta-aww-marquee-item">Available for Q1 2026</span>
          ))}
        </div>
      </div>

    </section>
  );
}

// Magnetic line component with scramble effect
function MagneticLine({
  text,
  mousePos,
  sectionRef,
  isVisible,
  startIndex,
  isOrange = false,
  onScrambleColorChange
}: {
  text: string;
  mousePos: { x: number; y: number };
  sectionRef: React.RefObject<HTMLElement | null>;
  isVisible: boolean;
  startIndex: number;
  isOrange?: boolean;
  onScrambleColorChange: (color: ScrambleColor | 'default') => void;
}) {
  const lineRef = useRef<HTMLSpanElement>(null);
  const [scrambleIndex, setScrambleIndex] = useState<number | null>(null);
  const [scrambleChar, setScrambleChar] = useState('');
  const [scrambleColor, setScrambleColor] = useState<ScrambleColor | null>(null);

  // Scramble effect on hover with random colors
  const handleCharHover = (index: number, originalChar: string) => {
    if (originalChar === '.') return; // Don't scramble the dot
    setScrambleIndex(index);

    let iterations = 0;
    let lastColor: ScrambleColor | null = null;

    const interval = setInterval(() => {
      setScrambleChar(chars[Math.floor(Math.random() * chars.length)]);

      // Pick random color, but not the same as last one
      let newColor: ScrambleColor;
      do {
        newColor = scrambleColors[Math.floor(Math.random() * scrambleColors.length)];
      } while (newColor === lastColor);
      lastColor = newColor;

      setScrambleColor(newColor);
      onScrambleColorChange(newColor);
      iterations++;

      if (iterations > 8) {
        clearInterval(interval);
        setScrambleChar(originalChar);
        setScrambleColor(null);
        onScrambleColorChange('default');
        setTimeout(() => setScrambleIndex(null), 100);
      }
    }, 50);
  };

  return (
    <span ref={lineRef} className={`cta-aww-title-line ${isOrange ? 'cta-aww-title-orange' : ''}`}>
      {text.split('').map((char, i) => {
        const globalIndex = startIndex + i;
        const isScrambling = scrambleIndex === i;

        return (
          <MagneticChar
            key={i}
            char={isScrambling ? scrambleChar : char}
            index={globalIndex}
            mousePos={mousePos}
            sectionRef={sectionRef}
            isVisible={isVisible}
            isOrange={isOrange}
            scrambleColor={isScrambling ? scrambleColor : null}
            onHover={() => handleCharHover(i, char)}
          />
        );
      })}
    </span>
  );
}

// Individual magnetic character
function MagneticChar({
  char,
  index,
  mousePos,
  sectionRef,
  isVisible,
  isOrange = false,
  scrambleColor = null,
  onHover
}: {
  char: string;
  index: number;
  mousePos: { x: number; y: number };
  sectionRef: React.RefObject<HTMLElement | null>;
  isVisible: boolean;
  isOrange?: boolean;
  scrambleColor?: ScrambleColor | null;
  onHover: () => void;
}) {
  const charRef = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!charRef.current || !sectionRef.current) return;

    const charRect = charRef.current.getBoundingClientRect();
    const sectionRect = sectionRef.current.getBoundingClientRect();

    const charCenterX = charRect.left - sectionRect.left + charRect.width / 2;
    const charCenterY = charRect.top - sectionRect.top + charRect.height / 2;

    const deltaX = mousePos.x - charCenterX;
    const deltaY = mousePos.y - charCenterY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    const maxDistance = 300;
    const maxOffset = 20;

    if (distance < maxDistance) {
      const force = (1 - distance / maxDistance) * maxOffset;
      setOffset({
        x: (deltaX / distance) * force * 0.3,
        y: (deltaY / distance) * force * 0.3
      });
    } else {
      setOffset({ x: 0, y: 0 });
    }
  }, [mousePos, sectionRef]);

  const colorClass = scrambleColor
    ? `cta-aww-char-scramble-${scrambleColor}`
    : isOrange
      ? 'cta-aww-char-orange'
      : '';

  return (
    <span
      ref={charRef}
      className={`cta-aww-char ${colorClass}`}
      style={{
        '--char-i': index,
        transform: isVisible ? `translate(${offset.x}px, ${offset.y}px)` : undefined
      } as React.CSSProperties}
      onMouseEnter={onHover}
    >
      {char === "'" ? "'" : char}
    </span>
  );
}
