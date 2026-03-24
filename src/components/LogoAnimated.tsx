'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

export function LogoAnimated() {
  const [displayText, setDisplayText] = useState('</>');
  const [targetText, setTargetText] = useState('</>');
  const [isHovered, setIsHovered] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'deleting' | 'typing'>('idle');
  const texts = ['</>', '@codewithseb'];
  const currentIndex = useRef(0);
  const characters = '!@#$%^&*<>/|01_';

  // Color changes only when text is fully displayed
  const isCodeSymbol = displayText === '</>';

  // Typing/deleting animation
  useEffect(() => {
    if (phase === 'idle') return;

    let timeout: NodeJS.Timeout;

    if (phase === 'deleting') {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          // Random glitch char before deleting
          const glitchChar = characters[Math.floor(Math.random() * characters.length)];
          setDisplayText(prev => {
            if (prev.length > 1) {
              return prev.slice(0, -2) + glitchChar;
            }
            return '';
          });
          setTimeout(() => {
            setDisplayText(prev => prev.slice(0, -1));
          }, 30);
        }, 50);
      } else {
        setPhase('typing');
      }
    }

    if (phase === 'typing') {
      if (displayText.length < targetText.length) {
        timeout = setTimeout(() => {
          const nextChar = targetText[displayText.length];
          // Show random char first, then correct char
          const glitchChar = characters[Math.floor(Math.random() * characters.length)];
          setDisplayText(prev => prev + glitchChar);
          setTimeout(() => {
            setDisplayText(prev => prev.slice(0, -1) + nextChar);
          }, 40);
        }, 60);
      } else {
        setPhase('idle');
      }
    }

    return () => clearTimeout(timeout);
  }, [phase, displayText, targetText]);

  // Cycle texts every 10s
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered && phase === 'idle') {
        currentIndex.current = (currentIndex.current + 1) % texts.length;
        setTargetText(texts[currentIndex.current]);
        setPhase('deleting');
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [isHovered, phase]);

  return (
    <div
      className="nav-logo-symbol"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={`nav-logo-code ${!isCodeSymbol ? 'nav-logo-code-white' : ''}`}>
        {displayText}
      </span>

      {/* Glitch layers */}
      <span className="nav-logo-code nav-logo-glitch-1" aria-hidden="true">
        {displayText}
      </span>
      <span className="nav-logo-code nav-logo-glitch-2" aria-hidden="true">
        {displayText}
      </span>

      {/* Particles */}
      <div className="nav-logo-particles">
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            className="nav-logo-particle"
            style={{ '--i': i } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
