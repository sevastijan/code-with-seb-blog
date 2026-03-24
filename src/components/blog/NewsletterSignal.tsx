'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  angle: number;
}

export function NewsletterSignal() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isRevealed, setIsRevealed] = useState(false);
  const [scrambleText, setScrambleText] = useState('SUBSCRIBE');
  const [focusRipple, setFocusRipple] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [glitchFrame, setGlitchFrame] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const scrambleIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number>();

  // Generate particles
  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.5 + 0.1,
      angle: Math.random() * 360,
    }));
    setParticles(newParticles);
  }, []);

  // Animate particles
  useEffect(() => {
    let lastTime = 0;

    const animate = (time: number) => {
      if (time - lastTime > 50) {
        setParticles(prev => prev.map(p => ({
          ...p,
          y: p.y - p.speed,
          x: p.x + Math.sin(p.angle + time * 0.001) * 0.1,
          angle: p.angle + 0.5,
          // Reset if off screen
          ...(p.y < -5 ? { y: 105, x: Math.random() * 100 } : {}),
        })));
        lastTime = time;
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Glitch effect
  useEffect(() => {
    if (!isRevealed) return;

    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchFrame(Math.floor(Math.random() * 3) + 1);
        setTimeout(() => setGlitchFrame(0), 150);
      }
    }, 2000);

    return () => clearInterval(glitchInterval);
  }, [isRevealed]);

  // Reveal on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);


  // Scramble effect
  const triggerScramble = useCallback((finalText: string) => {
    if (scrambleIntervalRef.current) {
      clearInterval(scrambleIntervalRef.current);
    }

    let iterations = 0;
    scrambleIntervalRef.current = setInterval(() => {
      setScrambleText(
        finalText.split('').map((_, i) => {
          if (i < iterations) return finalText[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('')
      );
      iterations += 0.5;
      if (iterations > finalText.length) {
        if (scrambleIntervalRef.current) {
          clearInterval(scrambleIntervalRef.current);
        }
        setScrambleText(finalText);
      }
    }, 30);
  }, []);

  useEffect(() => {
    return () => {
      if (scrambleIntervalRef.current) {
        clearInterval(scrambleIntervalRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !consent || status === 'loading') return;

    setStatus('loading');
    triggerScramble('SENDING...');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setStatus('success');
    triggerScramble('JOINED!');
    setEmail('');

    setTimeout(() => {
      setStatus('idle');
      triggerScramble('SUBSCRIBE');
    }, 4000);
  };

  const handleButtonHover = () => {
    if (status !== 'loading' && status !== 'success') {
      triggerScramble('SUBSCRIBE');
    }
  };

  const handleInputFocus = () => {
    setFocusRipple(true);
    setTimeout(() => setFocusRipple(false), 600);
  };


  return (
    <section
      ref={sectionRef}
      className={`nl-signal ${isRevealed ? 'revealed' : ''} ${glitchFrame > 0 ? `glitch-${glitchFrame}` : ''}`}
    >
      {/* Animated Background */}
      <div className="nl-signal-bg">
        {/* Gradient orbs */}
        <div className="nl-signal-orb nl-signal-orb-1" />
        <div className="nl-signal-orb nl-signal-orb-2" />
        <div className="nl-signal-orb nl-signal-orb-3" />

        {/* Grid overlay */}
        <div className="nl-signal-grid" />

        {/* Noise texture */}
        <div className="nl-signal-noise" />

        {/* Floating particles */}
        <div className="nl-signal-particles">
          {particles.map(p => (
            <div
              key={p.id}
              className="nl-signal-particle"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                opacity: p.opacity,
              }}
            />
          ))}
        </div>

        {/* Scan lines */}
        <div className="nl-signal-scanlines" />
      </div>

      {/* Top Marquee */}
      <div className="nl-signal-marquee">
        <div className="nl-signal-marquee-track">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} className="nl-signal-marquee-item">
              <span className="nl-signal-marquee-dot" />
              NEWSLETTER
              <span className="nl-signal-marquee-dot" />
              WEEKLY INSIGHTS
            </span>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="nl-signal-container">
        <div className="nl-signal-content">
          {/* Giant Typography */}
          <h2 className="nl-signal-title">
            <span className="nl-signal-title-line" data-text="STAY">STAY</span>
            <span className="nl-signal-title-line nl-signal-title-accent" data-text="AHEAD">AHEAD</span>
          </h2>

          {/* Description with typing effect */}
          <p className="nl-signal-desc">
            <span className="nl-signal-desc-line">Weekly deep-dives into AI, modern web dev,</span>
            <span className="nl-signal-desc-line">and shipping products that matter.</span>
          </p>

          {/* Form */}
          <form ref={formRef} className="nl-signal-form" onSubmit={handleSubmit}>
            <div className={`nl-signal-input-group ${focusRipple ? 'ripple' : ''}`}>
              <div className="nl-signal-input-wrapper">
                <span className="nl-signal-input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={handleInputFocus}
                  placeholder="your@email.com"
                  className="nl-signal-input"
                  disabled={status === 'loading' || status === 'success'}
                  required
                />
                <div className="nl-signal-input-glow" />
              </div>

              <button
                type="submit"
                className={`nl-signal-btn ${status === 'loading' ? 'loading' : ''} ${status === 'success' ? 'success' : ''}`}
                disabled={status === 'loading' || status === 'success'}
                onMouseEnter={handleButtonHover}
              >
                <span className="nl-signal-btn-bg" />
                {status === 'loading' && (
                  <span className="nl-signal-btn-spinner">
                    <svg viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="60" strokeDashoffset="20" />
                    </svg>
                  </span>
                )}
                <span className="nl-signal-btn-text">
                  {scrambleText.split('').map((char, i) => (
                    <span
                      key={i}
                      className="nl-signal-btn-char"
                      style={{ '--char-i': i } as React.CSSProperties}
                    >
                      {char}
                    </span>
                  ))}
                </span>
                <span className="nl-signal-btn-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Consent checkbox */}
            <label className="nl-signal-consent">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="nl-signal-checkbox"
                disabled={status === 'loading' || status === 'success'}
              />
              <span className="nl-signal-checkmark" />
              <span className="nl-signal-consent-text">
                I agree to receive the newsletter. Unsubscribe anytime.
              </span>
            </label>
          </form>
        </div>
      </div>

      {/* Bottom Marquee (reversed) */}
      <div className="nl-signal-marquee nl-signal-marquee-bottom">
        <div className="nl-signal-marquee-track nl-signal-marquee-reverse">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} className="nl-signal-marquee-item">
              <span className="nl-signal-marquee-dot" />
              NO SPAM
              <span className="nl-signal-marquee-dot" />
              PURE SIGNAL
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
