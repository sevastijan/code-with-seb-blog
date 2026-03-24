'use client';

import { useEffect, useRef, useCallback } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);
  const rafId = useRef<number>(0);
  const mousePos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });

  const animate = useCallback(() => {
    // Lerp for smooth trailing effect
    currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.15;
    currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.15;

    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${currentPos.current.x - 10}px, ${currentPos.current.y - 10}px, 0)`;
    }
    if (dotRef.current) {
      dotRef.current.style.transform = `translate3d(${mousePos.current.x - 3}px, ${mousePos.current.y - 3}px, 0)`;
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth <= 1024) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverable = target.closest('a, button, [data-cursor-hover]');
      if (hoverable && !isHovering.current) {
        isHovering.current = true;
        cursorRef.current?.classList.add('cursor-hover');
        if (dotRef.current) dotRef.current.style.opacity = '0';
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.relatedTarget as HTMLElement | null;
      if (!target?.closest('a, button, [data-cursor-hover]') && isHovering.current) {
        isHovering.current = false;
        cursorRef.current?.classList.remove('cursor-hover');
        if (dotRef.current) dotRef.current.style.opacity = '1';
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(rafId.current);
    };
  }, [animate]);

  if (typeof window !== 'undefined' && window.innerWidth <= 1024) {
    return null;
  }

  return (
    <>
      <div ref={cursorRef} className="cursor" style={{ willChange: 'transform' }} />
      <div ref={dotRef} className="cursor-dot" style={{ willChange: 'transform' }} />
    </>
  );
}
