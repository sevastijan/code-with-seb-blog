'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface FeaturedPostProps {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
}

// Glitch text component
function GlitchLabel() {
  const texts = ['FEATURED', '01', 'LATEST', '<READ/>'];
  const characters = '!@#$%^&*<>/|01_';

  const [displayText, setDisplayText] = useState('FEATURED');
  const [targetText, setTargetText] = useState('FEATURED');
  const [phase, setPhase] = useState<'idle' | 'deleting' | 'typing'>('idle');
  const currentIndex = useRef(0);

  useEffect(() => {
    if (phase === 'idle') return;

    let timeout: NodeJS.Timeout;

    if (phase === 'deleting') {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          const glitchChar = characters[Math.floor(Math.random() * characters.length)];
          setDisplayText(prev => {
            if (prev.length > 1) {
              return prev.slice(0, -2) + glitchChar;
            }
            return '';
          });
          setTimeout(() => {
            setDisplayText(prev => prev.slice(0, -1));
          }, 25);
        }, 40);
      } else {
        setPhase('typing');
      }
    }

    if (phase === 'typing') {
      if (displayText.length < targetText.length) {
        timeout = setTimeout(() => {
          const nextChar = targetText[displayText.length];
          const glitchChar = characters[Math.floor(Math.random() * characters.length)];
          setDisplayText(prev => prev + glitchChar);
          setTimeout(() => {
            setDisplayText(prev => prev.slice(0, -1) + nextChar);
          }, 35);
        }, 50);
      } else {
        setPhase('idle');
      }
    }

    return () => clearTimeout(timeout);
  }, [phase, displayText, targetText]);

  // Cycle every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      if (phase === 'idle') {
        currentIndex.current = (currentIndex.current + 1) % texts.length;
        setTargetText(texts[currentIndex.current]);
        setPhase('deleting');
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [phase]);

  return (
    <span className="featured-label-glitch">
      <span className="featured-label-text">{displayText}</span>
      <span className="featured-label-ghost" aria-hidden="true">{displayText}</span>
    </span>
  );
}

export function FeaturedPostBrutalist({ slug, title, excerpt, category, date, readTime }: FeaturedPostProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const transitionLineRef = useRef<HTMLDivElement>(null);
  const transitionGlowRef = useRef<HTMLDivElement>(null);

  const [isRevealed, setIsRevealed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });

  // Mouse position for parallax (smoothed)
  const mouse = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });
  const scrollProgress = useRef(0);

  // Split title for mixed typography
  const titleWords = title.split(' ');

  const getWordStyle = (word: string, index: number): 'solid' | 'stroke' | 'serif' => {
    const lowerWord = word.toLowerCase().replace(/[^a-z]/g, '');
    if (index < 2) return 'solid';
    if (['revolution', 'automation', 'ready', 'here'].includes(lowerWord)) return 'stroke';
    if (['ai', 'is', 'are', 'you'].includes(lowerWord)) return 'serif';
    return 'solid';
  };

  // Main animation loop
  useEffect(() => {
    let animationId: number;
    const section = sectionRef.current;
    const reveal = revealRef.current;
    const card = cardRef.current;
    const layer1 = layer1Ref.current;
    const layer2 = layer2Ref.current;
    const layer3 = layer3Ref.current;
    const titleEl = titleRef.current;
    const transitionLine = transitionLineRef.current;
    const transitionGlow = transitionGlowRef.current;

    if (!section) return;

    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const animate = () => {
      // Smooth mouse interpolation
      smoothMouse.current.x = lerp(smoothMouse.current.x, mouse.current.x, 0.03);
      smoothMouse.current.y = lerp(smoothMouse.current.y, mouse.current.y, 0.03);

      const mx = smoothMouse.current.x;
      const my = smoothMouse.current.y;
      const sp = scrollProgress.current;

      // Layer 1: Deep background - slow, opposite direction
      if (layer1) {
        layer1.style.transform = `
          translate3d(${mx * -30}px, ${my * -20 + sp * 100}px, -300px)
          rotateX(${my * 5}deg)
          rotateY(${mx * -8}deg)
          scale(${1 + sp * 0.2})
        `;
      }

      // Layer 2: Mid layer - medium speed
      if (layer2) {
        layer2.style.transform = `
          translate3d(${mx * -15}px, ${my * -10 + sp * 50}px, -150px)
          rotateX(${my * 3}deg)
          rotateY(${mx * -5}deg)
        `;
      }

      // Layer 3: Front layer - fast, same direction as mouse
      if (layer3) {
        layer3.style.transform = `
          translate3d(${mx * 20}px, ${my * 15 + sp * -30}px, 0px)
          rotateX(${my * -2}deg)
          rotateY(${mx * 3}deg)
        `;
      }


      // Reveal card based on scroll - faster opacity
      if (reveal) {
        const revealY = Math.max(0, (1 - sp) * 80);
        const revealScale = 0.95 + sp * 0.05;
        const revealOpacity = Math.min(1, sp * 2.5); // Faster fade in
        reveal.style.transform = `translateY(${revealY}px) scale(${revealScale})`;
        reveal.style.opacity = `${revealOpacity}`;
      }

      // Card 3D tilt (opposite to 01)
      if (card) {
        card.style.transform = `
          perspective(1000px)
          rotateX(${my * -2}deg)
          rotateY(${mx * 3}deg)
          translateZ(10px)
        `;
      }

      // Transition line - expands from center on scroll
      if (transitionLine) {
        const lineScale = Math.min(1, sp * 2); // Expand faster
        transitionLine.style.transform = `scaleX(${lineScale})`;
        transitionLine.style.opacity = `${0.3 + sp * 0.7}`;
      }

      // Transition glow
      if (transitionGlow) {
        const glowOpacity = Math.max(0, sp - 0.2) * 1.5;
        transitionGlow.style.opacity = `${Math.min(1, glowOpacity)}`;
      }

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1 based on window center
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Progress: starts earlier for faster reveal
      const progress = 1 - Math.max(0, Math.min(1, (rect.top + windowHeight * 0.3) / windowHeight));
      scrollProgress.current = Math.min(1, progress * 1.5); // Accelerate progress

      if (progress > 0.1 && !isRevealed) {
        setIsRevealed(true);
      }
    };

    animate();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isRevealed]);

  // Magnetic button
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt((e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2);

      if (distance < 100) {
        setButtonPos({
          x: (e.clientX - centerX) * 0.5,
          y: (e.clientY - centerY) * 0.5,
        });
      } else {
        setButtonPos({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={sectionRef} className="featured-section">
      {/* Animated background */}
      <div className="featured-bg">
        {/* Gradient mesh */}
        <div className="featured-gradient-mesh">
          <div className="featured-gradient-orb featured-gradient-orb-1" />
          <div className="featured-gradient-orb featured-gradient-orb-2" />
          <div className="featured-gradient-orb featured-gradient-orb-3" />
        </div>

        {/* Grid overlay */}
        <div className="featured-grid-overlay" />

        {/* Floating geometry */}
        <div className="featured-geo">
          <svg className="featured-geo-ring" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,61,0,0.1)" strokeWidth="1" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(255,61,0,0.05)" strokeWidth="1" strokeDasharray="4 4" />
          </svg>
          <div className="featured-geo-line featured-geo-line-1" />
          <div className="featured-geo-line featured-geo-line-2" />
        </div>
      </div>

      {/* Parallax layers */}
      <div className="featured-parallax-container">
        {/* Layer 1: Deep */}
        <div ref={layer1Ref} className="featured-layer featured-layer-1">
          <div className="featured-shape featured-shape-circle" />
        </div>

        {/* Layer 2: Mid */}
        <div ref={layer2Ref} className="featured-layer featured-layer-2">
        </div>

        {/* Layer 3: Front */}
        <div ref={layer3Ref} className="featured-layer featured-layer-3">
          <div className="featured-accent-cross" />
        </div>
      </div>

      {/* Reveal card container */}
      <div ref={revealRef} className="featured-reveal-card">
        {/* Top bar */}
        <div className={`featured-top-bar ${isRevealed ? 'revealed' : ''}`}>
          <GlitchLabel />
          <div className="featured-label-line" />
          <span className="featured-label-num">01</span>
        </div>

        {/* Main content */}
        <Link
          ref={cardRef}
          href={`/blog/${slug}`}
          className={`featured-card ${isHovered ? 'hovered' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="featured-card-inner">
            {/* Title with mixed typography */}
            <h2 ref={titleRef} className="featured-title">
              {titleWords.map((word, index) => (
                <span key={index}>
                  <span
                    className={`featured-word featured-word-${getWordStyle(word, index)} ${isRevealed ? 'revealed' : ''}`}
                    style={{ transitionDelay: `${index * 60 + 200}ms` }}
                  >
                    {word}
                  </span>
                  {index < titleWords.length - 1 && ' '}
                </span>
              ))}
            </h2>

            {/* Divider line */}
            <div className={`featured-divider ${isRevealed ? 'revealed' : ''}`}>
              <div className="featured-divider-fill" />
            </div>

            {/* Excerpt */}
            <p className={`featured-excerpt ${isRevealed ? 'revealed' : ''}`}>
              {excerpt}
            </p>

            {/* Footer: meta + CTA */}
            <div className={`featured-footer ${isRevealed ? 'revealed' : ''}`}>
              <div className="featured-meta">
                <span className="featured-tag">{category}</span>
                <span className="featured-meta-sep">/</span>
                <span>{readTime}</span>
                <span className="featured-meta-sep">/</span>
                <span>{date}</span>
              </div>

              <div
                ref={buttonRef}
                className="featured-cta"
                style={{ transform: `translate(${buttonPos.x}px, ${buttonPos.y}px)` }}
              >
                <span className="featured-cta-text">READ ARTICLE</span>
                <ArrowUpRight className="featured-cta-icon" />
                <div className="featured-cta-fill" />
              </div>
            </div>
          </div>

          {/* Hover glow */}
          <div className="featured-card-glow" />
        </Link>
      </div>

      {/* Transition element - horizontal wipe */}
      <div className="featured-transition">
        <div ref={transitionLineRef} className="featured-transition-line" />
        <div ref={transitionGlowRef} className="featured-transition-glow" />
      </div>
    </section>
  );
}
