'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface ScrollFadeProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollFade({ children, className = '', delay = 0 }: ScrollFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const targetOpacity = useRef(1);
  const targetY = useRef(0);
  const currentOpacity = useRef(1);
  const currentY = useRef(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let animationId: number;

    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const animate = () => {
      currentOpacity.current = lerp(currentOpacity.current, targetOpacity.current, 0.1);
      currentY.current = lerp(currentY.current, targetY.current, 0.1);

      element.style.opacity = `${currentOpacity.current}`;
      element.style.transform = `translateY(${currentY.current}px)`;

      animationId = requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // Much slower fade - only start fading after 30% scroll, complete at 100%
      const progress = Math.max(0, Math.min((scrollY - windowHeight * 0.3) / (windowHeight * 0.7), 1));

      targetOpacity.current = 1 - progress * 0.9;
      targetY.current = progress * 30;
    };

    animate();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

interface ScrollScaleProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function ScrollScale({ children, className = '', intensity = 1 }: ScrollScaleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const targetScale = useRef(1);
  const currentScale = useRef(1);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let animationId: number;

    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const animate = () => {
      currentScale.current = lerp(currentScale.current, targetScale.current, 0.1);
      element.style.transform = `scale(${currentScale.current})`;
      animationId = requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(scrollY / windowHeight, 1);

      targetScale.current = 1 - progress * 0.05 * intensity;
    };

    animate();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [intensity]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function ScrollReveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`scroll-reveal ${className}`}>
      {children}
    </div>
  );
}
