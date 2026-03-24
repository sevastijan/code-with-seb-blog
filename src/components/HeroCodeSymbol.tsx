'use client';

import { useEffect, useRef } from 'react';

export function HeroCodeSymbol() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLSpanElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const glow = glowRef.current;
    const outline = outlineRef.current;
    if (!container || !glow) return;

    let animationId: number;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      mouseRef.current.x = lerp(mouseRef.current.x, targetRef.current.x, 0.08);
      mouseRef.current.y = lerp(mouseRef.current.y, targetRef.current.y, 0.08);

      glow.style.transform = `translate(${mouseRef.current.x}px, ${mouseRef.current.y}px) translate(-50%, -50%)`;

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const rotateY = ((e.clientX - centerX) / window.innerWidth) * 15;
      const rotateX = ((centerY - e.clientY) / window.innerHeight) * 10;

      const scrollRotate = scrollRef.current * 20;
      container.style.transform = `rotateX(${rotateX + scrollRef.current * 15}deg) rotateY(${rotateY + scrollRotate}deg)`;

      // Outline moves OPPOSITE to mouse
      if (outline) {
        const offsetX = ((centerX - e.clientX) / window.innerWidth) * 30;
        const offsetY = ((centerY - e.clientY) / window.innerHeight) * 20;
        outline.style.transform = `translateZ(20px) translate(${offsetX}px, ${offsetY}px)`;
      }

      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(scrollY / windowHeight, 1);
      scrollRef.current = progress;

      if (wrapperRef.current) {
        const scale = 1 + progress * 0.5;
        const opacity = 1 - progress * 0.8;
        const translateY = progress * -100;
        wrapperRef.current.style.transform = `translateY(${translateY}px) scale(${scale})`;
        wrapperRef.current.style.opacity = `${opacity}`;
      }
    };

    animate();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Floating particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div ref={wrapperRef} className="hero-code-wrapper" style={{ transition: 'transform 0.1s ease-out, opacity 0.1s ease-out' }}>
      {/* Scan lines overlay */}
      <div className="scan-lines" />

      {/* Floating particles */}
      <div className="particles-container">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Glow that follows cursor */}
      <div ref={glowRef} className="cursor-glow" />

      {/* Main 3D symbol */}
      <div ref={containerRef} className="hero-code-symbol">
        {/* Deep shadow layer */}
        <span className="hero-code-layer layer-shadow" style={{ transform: 'translateZ(-200px)', filter: 'blur(30px)' }}>
          {'</>'}
        </span>

        {/* Chromatic layers with CSS glitch */}
        <span className="hero-code-layer layer-cyan glitch-1" style={{ transform: 'translateZ(-120px)', filter: 'blur(8px)' }}>{'</>'}</span>
        <span className="hero-code-layer layer-blue" style={{ transform: 'translateZ(-80px)', filter: 'blur(5px)' }}>{'</>'}</span>
        <span className="hero-code-layer layer-purple glitch-2" style={{ transform: 'translateZ(-40px)', filter: 'blur(2px)' }}>{'</>'}</span>

        {/* Main gradient layer */}
        <span className="hero-code-layer layer-main" style={{ transform: 'translateZ(0px)' }}>
          {'</>'}
        </span>

        {/* Offset outline - moves opposite to mouse */}
        <span
          ref={outlineRef}
          className="hero-code-layer layer-outline-offset"
          style={{ transition: 'transform 0.15s ease-out' }}
        >
          {'</>'}
        </span>
      </div>

      {/* Horizontal light beam */}
      <div className="light-beam" />
    </div>
  );
}
