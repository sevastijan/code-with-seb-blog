'use client';

import { useEffect, useRef } from 'react';

interface HeroParallaxProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  speed?: number;
}

export function HeroParallax({ children, direction = 'left', speed = 0.5 }: HeroParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const scrollY = window.scrollY;
      const multiplier = direction === 'left' ? -1 : 1;
      ref.current.style.transform = `translateX(${scrollY * speed * multiplier}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [direction, speed]);

  return (
    <div ref={ref} className="will-change-transform transition-transform duration-75">
      {children}
    </div>
  );
}
