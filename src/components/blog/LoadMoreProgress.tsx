'use client';

import { useState, useEffect } from 'react';

interface LoadMoreProgressProps {
  loaded: number;
  total: number;
  onLoadMore: () => void;
  isLoading?: boolean;
}

export function LoadMoreProgress({ loaded, total, onLoadMore, isLoading = false }: LoadMoreProgressProps) {
  const [displayLoaded, setDisplayLoaded] = useState(loaded);
  const [glitchText, setGlitchText] = useState('LOAD MORE');
  const progress = (loaded / total) * 100;

  // Animate counter
  useEffect(() => {
    if (displayLoaded !== loaded) {
      const timer = setTimeout(() => setDisplayLoaded(loaded), 50);
      return () => clearTimeout(timer);
    }
  }, [loaded, displayLoaded]);

  // Glitch effect when loading
  useEffect(() => {
    if (!isLoading) {
      setGlitchText('LOAD MORE');
      return;
    }

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*01';
    const target = 'LOADING...';
    let frame = 0;

    const interval = setInterval(() => {
      setGlitchText(
        target.split('').map((char, i) => {
          if (char === ' ' || char === '.') return char;
          if (i < frame / 2) return target[i];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
      frame++;
      if (frame > target.length * 2) {
        setGlitchText(target);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (loaded >= total) return null;

  return (
    <div className="load-more-progress">
      {/* Progress bar container */}
      <button
        className={`load-more-progress-btn ${isLoading ? 'loading' : ''}`}
        onClick={onLoadMore}
        disabled={isLoading}
      >
        {/* Background track */}
        <div className="load-more-progress-track">
          {/* Progress fill */}
          <div
            className="load-more-progress-fill"
            style={{ width: `${progress}%` }}
          />

          {/* Animated scanline */}
          <div className="load-more-progress-scanline" />
        </div>

        {/* Text overlay */}
        <div className="load-more-progress-content">
          <span className="load-more-progress-text" data-text={glitchText}>
            {glitchText}
          </span>
          <span className="load-more-progress-counter">
            {displayLoaded}/{total}
          </span>
        </div>

        {/* Corner brackets */}
        <div className="load-more-progress-bracket load-more-progress-bracket-tl" />
        <div className="load-more-progress-bracket load-more-progress-bracket-tr" />
        <div className="load-more-progress-bracket load-more-progress-bracket-bl" />
        <div className="load-more-progress-bracket load-more-progress-bracket-br" />
      </button>

      {/* Decorative lines */}
      <div className="load-more-progress-line load-more-progress-line-left" />
      <div className="load-more-progress-line load-more-progress-line-right" />
    </div>
  );
}
