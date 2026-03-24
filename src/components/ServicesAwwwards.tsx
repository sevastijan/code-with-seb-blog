'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

interface Service {
  id: string;
  title: string;
  tagline: string;
  color: string;
  href: string;
  easterEgg: number;
  easterEggType: 'spin' | 'bounce' | 'flip';
}

const services: Service[] = [
  { id: '01', title: '10X AI', tagline: 'Your digital workforce', color: '#00ff88', href: '/services/ai', easterEgg: 1, easterEggType: 'spin' },
  { id: '02', title: 'CODE', tagline: 'Ships that scale', color: '#ff3d00', href: '/services/development', easterEgg: 2, easterEggType: 'bounce' },
  { id: '03', title: 'LEAD', tagline: 'Vision that wins', color: '#8b5cf6', href: '/services/consulting', easterEgg: 2, easterEggType: 'flip' },
];

export function ServicesAwwwards() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = section.offsetHeight;

      // Check if in view
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        setIsInView(true);
      } else {
        setIsInView(false);
      }

      if (rect.top <= 0 && rect.bottom >= windowHeight) {
        const scrolled = -rect.top;
        const scrollEnd = sectionHeight - windowHeight;
        const rawProgress = Math.min(1, Math.max(0, scrolled / scrollEnd));
        setProgress(rawProgress);

        const cardIndex = Math.min(
          services.length - 1,
          Math.floor(rawProgress * services.length)
        );
        setActiveIndex(cardIndex);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeService = services[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="srv-takeover"
      style={{ '--srv-color': activeService.color } as React.CSSProperties}
    >
      {/* Fullscreen sticky container */}
      <div className="srv-takeover-sticky">
        {/* Dynamic background */}
        <div className="srv-takeover-bg">
          <div className="srv-takeover-glow" />
          <div className="srv-takeover-noise" />
          <div className="srv-takeover-lines" />
        </div>

        {/* Section label with glitch */}
        <div className="srv-takeover-label">
          <span className="srv-takeover-label-text">Services</span>
          <span className="srv-takeover-label-ghost" aria-hidden="true">Services</span>
        </div>

        {/* Giant 03 in background */}
        <div className="srv-takeover-giant">
          <span className="srv-takeover-giant-outline">0</span>
          <span className="srv-takeover-giant-solid">3</span>
        </div>

        {/* Main content - MASSIVE typography */}
        <div className="srv-takeover-content">
          {services.map((service, i) => (
            <div
              key={service.id}
              className={`srv-takeover-slide ${activeIndex === i ? 'active' : ''} ${activeIndex > i ? 'passed' : ''}`}
              style={{ '--slide-color': service.color } as React.CSSProperties}
            >
              {/* Mega title with easter eggs */}
              <h2 className="srv-takeover-title">
                {service.title.split('').map((char, charIndex) => (
                  <span
                    key={charIndex}
                    className={`srv-char ${service.easterEgg === charIndex ? `srv-easter-egg srv-ee-${service.easterEggType}` : ''} ${char === ' ' ? 'srv-char-space' : ''}`}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </h2>

              {/* Tagline with glitch */}
              <div className="srv-takeover-tagline">
                <span className="srv-takeover-tagline-text">{service.tagline}</span>
                <span className="srv-takeover-tagline-ghost" aria-hidden="true">{service.tagline}</span>
              </div>

              {/* CTA Button */}
              <Link href={service.href} className="srv-takeover-service-btn">
                <span>Explore</span>
                <span className="srv-takeover-service-btn-arrow">→</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Progress dots */}
        <div className="srv-takeover-dots">
          {services.map((_, i) => (
            <div
              key={i}
              className={`srv-takeover-dot ${activeIndex === i ? 'active' : ''} ${activeIndex > i ? 'passed' : ''}`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="srv-takeover-scroll">
          <span>Scroll</span>
          <div className="srv-takeover-scroll-line">
            <div
              className="srv-takeover-scroll-progress"
              style={{ transform: `scaleY(${progress})` }}
            />
          </div>
        </div>

        {/* CTA */}
        <Link href="/services" className="srv-takeover-cta">
          <span className="srv-takeover-cta-text">All services</span>
          <span className="srv-takeover-cta-arrow">→</span>
        </Link>
      </div>
    </section>
  );
}
