'use client';

import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if we're on mobile
    if (typeof window !== 'undefined' && window.innerWidth <= 1024) {
      return;
    }

    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setDotPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Track hoverable elements
    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll('a, button, [data-cursor-hover]');
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    window.addEventListener('mousemove', updateCursor);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    // Add hover listeners after a short delay to ensure DOM is ready
    setTimeout(addHoverListeners, 100);

    // Re-add listeners when new content is added
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
    };
  }, [isVisible]);

  // Don't render on mobile
  if (typeof window !== 'undefined' && window.innerWidth <= 1024) {
    return null;
  }

  return (
    <>
      <div
        className={`cursor ${isHovering ? 'cursor-hover' : ''}`}
        style={{
          left: position.x - 10,
          top: position.y - 10,
          opacity: isVisible ? 1 : 0,
        }}
      />
      <div
        className="cursor-dot"
        style={{
          left: dotPosition.x - 3,
          top: dotPosition.y - 3,
          opacity: isVisible && !isHovering ? 1 : 0,
        }}
      />
    </>
  );
}
