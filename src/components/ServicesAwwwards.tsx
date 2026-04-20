'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

const AUTO_ADVANCE_MS = 5500;

export function ServicesAwwwards() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const userInteracted = useRef(false);

  const goTo = useCallback((index: number) => {
    const next = (index + services.length) % services.length;
    setActiveIndex(next);
  }, []);

  const next = useCallback(() => {
    userInteracted.current = true;
    setActiveIndex((i) => (i + 1) % services.length);
  }, []);

  const prev = useCallback(() => {
    userInteracted.current = true;
    setActiveIndex((i) => (i - 1 + services.length) % services.length);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.4 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isInView, next, prev]);

  useEffect(() => {
    if (!isInView || isHovering || userInteracted.current) return;
    const timer = setTimeout(() => {
      setActiveIndex((i) => (i + 1) % services.length);
    }, AUTO_ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [activeIndex, isInView, isHovering]);

  const activeService = services[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="srv-takeover"
      style={{ '--srv-color': activeService.color } as React.CSSProperties}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Fullscreen stage */}
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

        {/* Prev/Next arrows */}
        <button
          type="button"
          className="srv-takeover-arrow srv-takeover-arrow-prev"
          onClick={prev}
          aria-label="Previous service"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          type="button"
          className="srv-takeover-arrow srv-takeover-arrow-next"
          onClick={next}
          aria-label="Next service"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Clickable dots */}
        <div className="srv-takeover-dots" role="tablist">
          {services.map((service, i) => (
            <button
              key={service.id}
              type="button"
              role="tab"
              aria-selected={activeIndex === i}
              aria-label={`Show ${service.title}`}
              className={`srv-takeover-dot ${activeIndex === i ? 'active' : ''}`}
              onClick={() => { userInteracted.current = true; goTo(i); }}
            />
          ))}
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
