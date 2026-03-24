'use client';

import { useEffect, useRef, useCallback } from 'react';

export function HeroCodeSymbol() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLSpanElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const isVisible = useRef(true);
  const rafId = useRef(0);

  const animate = useCallback(() => {
    if (!isVisible.current) {
      rafId.current = requestAnimationFrame(animate);
      return;
    }

    const glow = glowRef.current;
    if (!glow) return;

    mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.08;
    mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.08;

    glow.style.transform = `translate3d(${mouseRef.current.x}px, ${mouseRef.current.y}px, 0) translate(-50%, -50%)`;

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    const outline = outlineRef.current;
    if (!container) return;

    // Intersection Observer — pause when not visible
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible.current = entry.isIntersecting; },
      { threshold: 0.1 }
    );
    if (wrapper) observer.observe(wrapper);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible.current) return;

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const rotateY = ((e.clientX - centerX) / window.innerWidth) * 15;
      const rotateX = ((centerY - e.clientY) / window.innerHeight) * 10;
      const scrollRotate = scrollRef.current * 20;

      container.style.transform = `rotateX(${rotateX + scrollRef.current * 15}deg) rotateY(${rotateY + scrollRotate}deg)`;

      if (outline) {
        const offsetX = ((centerX - e.clientX) / window.innerWidth) * 30;
        const offsetY = ((centerY - e.clientY) / window.innerHeight) * 20;
        outline.style.transform = `translateZ(20px) translate(${offsetX}px, ${offsetY}px)`;
      }

      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };

    const handleScroll = () => {
      const progress = Math.min(window.scrollY / window.innerHeight, 1);
      scrollRef.current = progress;

      if (wrapper) {
        const scale = 1 + progress * 0.5;
        const opacity = 1 - progress * 0.8;
        wrapper.style.transform = `translateY(${progress * -100}px) scale(${scale})`;
        wrapper.style.opacity = `${opacity}`;
      }
    };

    rafId.current = requestAnimationFrame(animate);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [animate]);

  return (
    <div ref={wrapperRef} className="hero-code-wrapper" style={{ willChange: 'transform, opacity' }}>
      <div className="scan-lines" />

      <div className="particles-container">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div ref={glowRef} className="cursor-glow" style={{ willChange: 'transform' }} />

      <div ref={containerRef} className="hero-code-symbol" style={{ willChange: 'transform' }}>
        <span className="hero-code-layer layer-shadow" style={{ transform: 'translateZ(-200px)', filter: 'blur(30px)' }}>{'</>'}</span>
        <span className="hero-code-layer layer-cyan glitch-1" style={{ transform: 'translateZ(-120px)', filter: 'blur(8px)' }}>{'</>'}</span>
        <span className="hero-code-layer layer-blue" style={{ transform: 'translateZ(-80px)', filter: 'blur(5px)' }}>{'</>'}</span>
        <span className="hero-code-layer layer-purple glitch-2" style={{ transform: 'translateZ(-40px)', filter: 'blur(2px)' }}>{'</>'}</span>
        <span className="hero-code-layer layer-main" style={{ transform: 'translateZ(0px)' }}>{'</>'}</span>
        <span ref={outlineRef} className="hero-code-layer layer-outline-offset" style={{ willChange: 'transform', transition: 'transform 0.15s ease-out' }}>{'</>'}</span>
      </div>

      <div className="light-beam" />
    </div>
  );
}
