'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowRight, Sparkles, Zap, Mail } from 'lucide-react';

interface NewsletterCTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  variant?: 'default' | 'minimal' | 'featured';
}

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

export function NewsletterCTA({
  title = "Don't miss the next one",
  description = "Join 5,000+ developers getting weekly insights on AI, web dev, and building products. No spam, just substance.",
  buttonText = "Subscribe",
  variant = 'default'
}: NewsletterCTAProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isVisible, setIsVisible] = useState(false);
  const [scrambleText, setScrambleText] = useState('SUBSCRIBE');
  const [consent, setConsent] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const scrambleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const triggerScramble = useCallback((finalText: string) => {
    if (scrambleIntervalRef.current) {
      clearInterval(scrambleIntervalRef.current);
    }

    let iterations = 0;
    scrambleIntervalRef.current = setInterval(() => {
      setScrambleText(
        finalText.split('').map((char, i) => {
          if (i < iterations) return finalText[i];
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
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

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (scrambleIntervalRef.current) {
        clearInterval(scrambleIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    // Simulate API call - replace with actual newsletter API
    await new Promise(resolve => setTimeout(resolve, 1000));

    setStatus('success');
    setEmail('');

    setTimeout(() => setStatus('idle'), 3000);
  };

  if (variant === 'minimal') {
    const hasEmail = email.length > 0;
    const canSubmit = hasEmail && consent;
    const btnText = status === 'success' ? 'JOINED!' : 'SUBSCRIBE';

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newEmail = e.target.value;
      const hadEmail = email.length > 0;
      const hasNewEmail = newEmail.length > 0;

      setEmail(newEmail);

      // Trigger scramble when email state changes
      if (!hadEmail && hasNewEmail) {
        triggerScramble('SUBSCRIBE');
      }
    };

    const handleButtonHover = () => {
      if (status !== 'loading' && status !== 'success' && canSubmit) {
        triggerScramble(btnText);
      }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 20;
      const y = (e.clientY - rect.top - rect.height / 2) / 20;
      setMousePos({ x, y });
    };

    const handleMouseLeave = () => {
      setMousePos({ x: 0, y: 0 });
    };

    return (
      <div
        ref={containerRef}
        className={`newsletter-minimal ${isVisible ? 'visible' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Mouse-reactive SUBSCRIBE text */}
        <span
          className="newsletter-minimal-bg-text"
          style={{
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
            transition: 'transform 0.15s ease-out'
          }}
        >
          SUBSCRIBE
        </span>

        <div className="newsletter-minimal-content">
          <p className="newsletter-minimal-text" data-text={description}>
            {description}
          </p>
          <form onSubmit={handleSubmit} className="newsletter-minimal-form">
            <div className="newsletter-minimal-fields">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="enter@email.com"
                className="newsletter-minimal-input"
                disabled={status === 'loading' || status === 'success'}
              />
              <button
                type="submit"
                className={`newsletter-minimal-btn ${canSubmit ? 'active' : ''} ${status === 'success' ? 'success' : ''}`}
                disabled={status === 'loading' || status === 'success' || !canSubmit}
                onMouseEnter={handleButtonHover}
              >
                {status === 'loading' && <span className="newsletter-minimal-spinner" />}
                <span className="newsletter-minimal-btn-text">
                  {(status === 'success' ? 'JOINED!' : scrambleText).split('').map((char, i) => (
                    <span
                      key={i}
                      className="newsletter-minimal-btn-char"
                      style={{ '--char-i': i } as React.CSSProperties}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              </button>
            </div>
            <label className="newsletter-minimal-consent">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="newsletter-minimal-checkbox"
                disabled={status === 'loading' || status === 'success'}
              />
              <span className="newsletter-minimal-checkmark" />
              <span className="newsletter-minimal-consent-text">
                I agree to receive the newsletter
              </span>
            </label>
          </form>
        </div>
      </div>
    );
  }

  if (variant === 'featured') {
    const hasEmail = email.length > 0;
    const canSubmit = hasEmail && consent;
    const btnText = status === 'success' ? 'JOINED!' : 'SUBSCRIBE';

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newEmail = e.target.value;
      const hadEmail = email.length > 0;
      const hasNewEmail = newEmail.length > 0;
      setEmail(newEmail);
      if (!hadEmail && hasNewEmail) {
        triggerScramble('SUBSCRIBE');
      }
    };

    const handleButtonHover = () => {
      if (status !== 'loading' && status !== 'success' && canSubmit) {
        triggerScramble(btnText);
      }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 15;
      const y = (e.clientY - rect.top - rect.height / 2) / 15;
      setMousePos({ x, y });
    };

    const handleMouseLeave = () => {
      setMousePos({ x: 0, y: 0 });
    };

    return (
      <div
        ref={containerRef}
        className={`newsletter-orange ${isVisible ? 'visible' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <span
          className="newsletter-orange-bg-text"
          style={{
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
            transition: 'transform 0.15s ease-out'
          }}
        >
          NEWSLETTER
        </span>

        <div className="newsletter-orange-content">
          <h3 className="newsletter-orange-title" data-text={title}>{title}</h3>
          <p className="newsletter-orange-text" data-text={description}>
            {description}
          </p>
          <form onSubmit={handleSubmit} className="newsletter-orange-form">
            <div className="newsletter-orange-fields">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="enter@email.com"
                className="newsletter-orange-input"
                disabled={status === 'loading' || status === 'success'}
              />
              <button
                type="submit"
                className={`newsletter-orange-btn ${canSubmit ? 'active' : ''} ${status === 'success' ? 'success' : ''}`}
                disabled={status === 'loading' || status === 'success' || !canSubmit}
                onMouseEnter={handleButtonHover}
              >
                {status === 'loading' && <span className="newsletter-orange-spinner" />}
                <span className="newsletter-orange-btn-text">
                  {(status === 'success' ? 'JOINED!' : scrambleText).split('').map((char, i) => (
                    <span
                      key={i}
                      className="newsletter-orange-btn-char"
                      style={{ '--char-i': i } as React.CSSProperties}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              </button>
            </div>
            <label className="newsletter-orange-consent">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="newsletter-orange-checkbox"
                disabled={status === 'loading' || status === 'success'}
              />
              <span className="newsletter-orange-checkmark" />
              <span className="newsletter-orange-consent-text">
                I agree to receive the newsletter
              </span>
            </label>
          </form>
        </div>
      </div>
    );
  }

  // Default variant - Purple
  const hasEmail = email.length > 0;
  const canSubmit = hasEmail && consent;
  const btnText = status === 'success' ? 'JOINED!' : 'SUBSCRIBE';

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    const hadEmail = email.length > 0;
    const hasNewEmail = newEmail.length > 0;
    setEmail(newEmail);
    if (!hadEmail && hasNewEmail) {
      triggerScramble('SUBSCRIBE');
    }
  };

  const handleButtonHover = () => {
    if (status !== 'loading' && status !== 'success' && canSubmit) {
      triggerScramble(btnText);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      className={`newsletter-purple ${isVisible ? 'visible' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <span
        className="newsletter-purple-bg-text"
        style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          transition: 'transform 0.15s ease-out'
        }}
      >
        JOIN
      </span>

      <div className="newsletter-purple-content">
        <p className="newsletter-purple-text" data-text={description}>
          {description}
        </p>
        <form onSubmit={handleSubmit} className="newsletter-purple-form">
          <div className="newsletter-purple-fields">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="enter@email.com"
              className="newsletter-purple-input"
              disabled={status === 'loading' || status === 'success'}
            />
            <button
              type="submit"
              className={`newsletter-purple-btn ${canSubmit ? 'active' : ''} ${status === 'success' ? 'success' : ''}`}
              disabled={status === 'loading' || status === 'success' || !canSubmit}
              onMouseEnter={handleButtonHover}
            >
              {status === 'loading' && <span className="newsletter-purple-spinner" />}
              <span className="newsletter-purple-btn-text">
                {(status === 'success' ? 'JOINED!' : scrambleText).split('').map((char, i) => (
                  <span
                    key={i}
                    className="newsletter-purple-btn-char"
                    style={{ '--char-i': i } as React.CSSProperties}
                  >
                    {char}
                  </span>
                ))}
              </span>
            </button>
          </div>
          <label className="newsletter-purple-consent">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="newsletter-purple-checkbox"
              disabled={status === 'loading' || status === 'success'}
            />
            <span className="newsletter-purple-checkmark" />
            <span className="newsletter-purple-consent-text">
              I agree to receive the newsletter
            </span>
          </label>
        </form>
      </div>
    </div>
  );
}
