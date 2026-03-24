'use client';

import { useEffect, useState, useRef } from 'react';
import { List } from 'lucide-react';

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const headingElementsRef = useRef<{ [key: string]: IntersectionObserverEntry }>({});

  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      // Update the ref with current intersection states
      entries.forEach((entry) => {
        headingElementsRef.current[entry.target.id] = entry;
      });

      // Find visible headings sorted by their position
      const visibleHeadings: string[] = [];
      items.forEach((item) => {
        const entry = headingElementsRef.current[item.id];
        if (entry?.isIntersecting) {
          visibleHeadings.push(item.id);
        }
      });

      // If we have visible headings, use the first one
      if (visibleHeadings.length > 0) {
        setActiveId(visibleHeadings[0]);
      } else {
        // If no headings are visible, find the one closest above viewport
        const scrollY = window.scrollY;
        let closestId = items[0]?.id || '';
        let closestDistance = Infinity;

        items.forEach((item) => {
          const element = document.getElementById(item.id);
          if (element) {
            const rect = element.getBoundingClientRect();
            const absoluteTop = rect.top + scrollY;
            // Only consider headings above current scroll position
            if (absoluteTop <= scrollY + 150) {
              const distance = scrollY - absoluteTop;
              if (distance < closestDistance) {
                closestDistance = distance;
                closestId = item.id;
              }
            }
          }
        });

        setActiveId(closestId);
      }
    };

    // Create observer with rootMargin to trigger earlier
    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: '-80px 0px -60% 0px',
      threshold: [0, 1],
    });

    // Observe all heading elements
    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [items]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const rect = element.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;
      const offset = 120; // Fixed offset from top
      window.scrollTo({ top: absoluteTop - offset, behavior: 'smooth' });
    }
  };

  if (items.length === 0) return null;

  return (
    <nav className="toc">
      <button
        className="toc-header"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <List className="w-4 h-4" />
        <span>Contents</span>
        <span className={`toc-toggle ${isExpanded ? 'expanded' : ''}`}>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>

      <div className={`toc-content ${isExpanded ? 'expanded' : ''}`}>
        <div className="toc-progress">
          <div
            className="toc-progress-fill"
            style={{
              height: `${(items.findIndex(i => i.id === activeId) + 1) / items.length * 100}%`
            }}
          />
        </div>

        <ul className="toc-list">
          {items.map((item, index) => (
            <li key={item.id} className="toc-item">
              <button
                onClick={() => scrollToHeading(item.id)}
                className={`toc-link ${activeId === item.id ? 'active' : ''}`}
                style={{ paddingLeft: `${(item.level - 2) * 1}rem` }}
              >
                <span className="toc-link-num">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="toc-link-text">{item.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
