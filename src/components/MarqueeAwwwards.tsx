'use client';

import { useRef, useEffect } from 'react';

export function MarqueeAwwwards() {
  const trackRef = useRef<HTMLDivElement>(null);

  const words = [
    { text: 'BUILD', style: 'primary' },
    { text: '/', style: 'separator' },
    { text: 'BREAK', style: 'outline' },
    { text: '/', style: 'separator' },
    { text: 'SHIP', style: 'accent-green' },
    { text: '/', style: 'separator' },
    { text: 'REPEAT', style: 'accent' },
    { text: '—', style: 'separator' },
  ];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let offset = 0;
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;
    let rafId: number;
    let isVisible = true;

    const sectionEl = track.closest('section');
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    if (sectionEl) observer.observe(sectionEl);

    const animate = () => {
      if (!isVisible) { rafId = requestAnimationFrame(animate); return; }
      // Base speed
      offset += 0.8;

      // Add scroll velocity
      offset += scrollVelocity;

      // Decay scroll velocity
      scrollVelocity *= 0.92;

      // Reset for seamless loop
      const resetPoint = track.scrollWidth / 4;
      if (offset >= resetPoint) {
        offset = offset % resetPoint;
      }

      // Direct DOM update - no React re-render
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;

      rafId = requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      scrollVelocity += delta * 0.15;
      // Cap max velocity
      scrollVelocity = Math.max(-15, Math.min(15, scrollVelocity));
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="marquee-awwwards">
      <div ref={trackRef} className="marquee-track-scroll">
        {[0, 1, 2, 3].map((groupIndex) => (
          <div key={groupIndex} className="marquee-word-group">
            {words.map((word, wordIndex) => (
              <span
                key={`${groupIndex}-${wordIndex}`}
                className={`marquee-word marquee-word-${word.style}`}
              >
                {word.text}
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="marquee-mask-left" />
      <div className="marquee-mask-right" />
    </section>
  );
}
