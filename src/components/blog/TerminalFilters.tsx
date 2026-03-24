'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

interface CategoryCount {
  name: string;
  count: number;
}

interface TerminalFiltersProps {
  categories: CategoryCount[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*01';

export function TerminalFilters({ categories, activeCategory, onCategoryChange }: TerminalFiltersProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [displayTexts, setDisplayTexts] = useState<Record<string, string>>({});
  const scrambleRefs = useRef<Record<string, NodeJS.Timeout | null>>({});
  const [isRevealed, setIsRevealed] = useState(false);

  // Initialize display texts
  useEffect(() => {
    const initial: Record<string, string> = {};
    categories.forEach(cat => {
      initial[cat.name] = cat.name.toUpperCase();
    });
    setDisplayTexts(initial);
  }, [categories]);

  // Reveal animation
  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 400);
    return () => clearTimeout(timer);
  }, []);

  // Cleanup scramble intervals
  useEffect(() => {
    return () => {
      Object.values(scrambleRefs.current).forEach(ref => {
        if (ref) clearInterval(ref);
      });
    };
  }, []);

  const triggerScramble = useCallback((categoryName: string) => {
    const finalText = categoryName.toUpperCase();

    // Clear existing interval
    if (scrambleRefs.current[categoryName]) {
      clearInterval(scrambleRefs.current[categoryName]!);
    }

    let iterations = 0;
    scrambleRefs.current[categoryName] = setInterval(() => {
      setDisplayTexts(prev => ({
        ...prev,
        [categoryName]: finalText.split('').map((char, i) => {
          if (char === ' ') return ' ';
          if (i < iterations) return finalText[i];
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }).join('')
      }));

      iterations += 0.5;

      if (iterations > finalText.length) {
        if (scrambleRefs.current[categoryName]) {
          clearInterval(scrambleRefs.current[categoryName]!);
        }
        setDisplayTexts(prev => ({
          ...prev,
          [categoryName]: finalText
        }));
      }
    }, 30);
  }, []);

  const handleMouseEnter = (categoryName: string) => {
    setHoveredCategory(categoryName);
    triggerScramble(categoryName);
  };

  const handleMouseLeave = (categoryName: string) => {
    setHoveredCategory(null);
    // Reset text smoothly
    setTimeout(() => {
      setDisplayTexts(prev => ({
        ...prev,
        [categoryName]: categoryName.toUpperCase()
      }));
    }, 100);
  };

  return (
    <div className={`terminal-filters ${isRevealed ? 'revealed' : ''}`}>
      <div className="terminal-filters-prompt">
        <span className="terminal-filters-symbol">$</span>
        <span className="terminal-filters-command">filter</span>
      </div>

      <div className="terminal-filters-list">
        {categories.map((category, index) => (
          <button
            key={category.name}
            className={`terminal-filter-btn ${activeCategory === category.name ? 'active' : ''} ${hoveredCategory === category.name ? 'hovered' : ''}`}
            onClick={() => onCategoryChange(category.name)}
            onMouseEnter={() => handleMouseEnter(category.name)}
            onMouseLeave={() => handleMouseLeave(category.name)}
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            <span className="terminal-filter-bracket">[</span>
            <span className="terminal-filter-text">
              {displayTexts[category.name] || category.name.toUpperCase()}
            </span>
            <span className="terminal-filter-count">({category.count})</span>
            <span className="terminal-filter-bracket">]</span>

            {/* Active indicator */}
            {activeCategory === category.name && (
              <span className="terminal-filter-cursor">_</span>
            )}

            {/* Hover glow */}
            <div className="terminal-filter-glow" />
          </button>
        ))}
      </div>

      {/* Decorative line */}
      <div className="terminal-filters-line" />
    </div>
  );
}
