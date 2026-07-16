'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const aiServices = {
  en: [
    { name: 'AI Strategy', href: '/services/ai' },
    { name: 'AI Automation', href: '/services/ai' },
    { name: 'LLM Integration', href: '/services/ai' },
    { name: 'AI Agents', href: '/services/ai' },
  ],
  pl: [
    { name: 'Strategia AI', href: '/services/ai' },
    { name: 'Automatyzacja AI', href: '/services/ai' },
    { name: 'Integracja LLM', href: '/services/ai' },
    { name: 'Agenty AI', href: '/services/ai' },
  ],
};

const devServices = {
  en: [
    { name: 'Web Development', href: '/services/development' },
    { name: 'Technical Architecture', href: '/services/development' },
    { name: 'Technical Consulting', href: '/services/consulting' },
    { name: 'Code Review', href: '/services/development' },
  ],
  pl: [
    { name: 'Web Development', href: '/services/development' },
    { name: 'Architektura techniczna', href: '/services/development' },
    { name: 'Konsulting techniczny', href: '/services/consulting' },
    { name: 'Code Review', href: '/services/development' },
  ],
};

const footerCopy = {
  en: {
    tagline: <>Turning &quot;it can&apos;t be done&quot; into &quot;it&apos;s already live.&quot;<br />AI, code &amp; strategy for founders who ship.</>,
    aiServices: 'AI Services', development: 'Development', connect: 'Connect',
    localTime: 'Local time', availability: 'Available for work', builtWith: 'Built with', location: 'in Cracow',
  },
  pl: {
    tagline: <>Zamieniam &quot;to się nie da&quot; w &quot;to już działa na produkcji.&quot;<br />AI, kod i strategia dla founderów, którzy wdrażają.</>,
    aiServices: 'Usługi AI', development: 'Development', connect: 'Kontakt',
    localTime: 'Czas lokalny', availability: 'Dostępny do współpracy', builtWith: 'Zbudowane z', location: 'w Krakowie',
  },
};

const socialLinks = [
  { name: 'GH', fullName: 'GitHub', href: 'https://github.com/sevastijan' },
  { name: 'YT', fullName: 'YouTube', href: 'https://www.youtube.com/@CodeWithSeb' },
  { name: 'LI', fullName: 'LinkedIn', href: 'https://www.linkedin.com/in/sebastiansleczka/' },
  { name: 'IG', fullName: 'Instagram', href: 'https://www.instagram.com/codewithseb/' },
];

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

export function FooterAwwwards() {
  const pathname = usePathname() || '/';
  const isPl = pathname === '/pl' || pathname.startsWith('/pl/');
  const lang = isPl ? 'pl' : 'en';
  const p = isPl ? '/pl' : '';
  const c = footerCopy[lang];
  const footerRef = useRef<HTMLElement>(null);
  const [time, setTime] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [scrambleText, setScrambleText] = useState('SUBSCRIBE');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Live time - runs in browser but displays Warsaw timezone
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Europe/Warsaw'
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Intersection observer
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // Scramble effect for button
  const triggerScramble = useCallback((finalText: string) => {
    let iterations = 0;
    const interval = setInterval(() => {
      setScrambleText(
        finalText
          .split('')
          .map((char, i) => {
            if (i < iterations) return finalText[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      iterations += 1 / 2;
      if (iterations > finalText.length) {
        clearInterval(interval);
        setScrambleText(finalText);
      }
    }, 30);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !consent) return;

    setIsSubmitting(true);
    triggerScramble('SENDING...');

    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    triggerScramble('SUBSCRIBED!');
    setEmail('');
    setConsent(false);
    setIsSubmitting(false);

    setTimeout(() => {
      triggerScramble('SUBSCRIBE');
    }, 2000);
  };

  return (
    <footer
      ref={footerRef}
      className={`footer-mega ${isVisible ? 'visible' : ''}`}
    >
      <div className="container">
        {/* Top section: Brand + Newsletter */}
        <div className="footer-mega-top">
          {/* Logo + tagline */}
          <div className="footer-mega-brand">
            <Link href={p || '/'} className="footer-mega-logo">
              <span className="footer-mega-logo-main">
                <span className="footer-mega-logo-at">@</span>
                <span className="footer-mega-logo-text">codewithseb</span>
              </span>
              <span className="footer-mega-logo-glitch footer-mega-logo-glitch-1" aria-hidden="true">
                @codewithseb
              </span>
              <span className="footer-mega-logo-glitch footer-mega-logo-glitch-2" aria-hidden="true">
                @codewithseb
              </span>
            </Link>
            <p className="footer-mega-tagline">
              {c.tagline}
            </p>
          </div>

          {/* Newsletter - hidden temporarily */}
          <div className="footer-mega-newsletter" style={{ display: 'none' }}>
            <p className="footer-mega-nav-label">Stay Updated</p>
            <form onSubmit={handleSubmit} className="footer-mega-form">
              <div className={`footer-mega-input-wrap ${isInputFocused ? 'focused' : ''}`}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => {
                    setIsInputFocused(true);
                    triggerScramble('SUBSCRIBE');
                  }}
                  onBlur={() => setIsInputFocused(false)}
                  placeholder="your@email.com"
                  className="footer-mega-input"
                  disabled={isSubmitting}
                />
                <div className="footer-mega-input-line" />
              </div>
              <button
                type="submit"
                className="footer-mega-submit"
                disabled={isSubmitting || !email || !consent}
                onMouseEnter={() => !isSubmitting && triggerScramble('SUBSCRIBE')}
              >
                <span className="footer-mega-submit-text">{scrambleText}</span>
                <span className="footer-mega-submit-arrow">→</span>
              </button>
            </form>

            {/* Consent checkbox */}
            <label className="footer-mega-consent">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="footer-mega-checkbox"
                disabled={isSubmitting}
              />
              <span className="footer-mega-checkmark" />
              <span className="footer-mega-consent-text">
                I agree to receive newsletters and accept the privacy policy
              </span>
            </label>
          </div>
        </div>

        {/* Services grid */}
        <div className="footer-mega-services">
          {/* AI Services */}
          <div className="footer-mega-service-col">
            <p className="footer-mega-nav-label">
              <span className="footer-mega-label-icon">◈</span>
              {c.aiServices}
            </p>
            <div className="footer-mega-service-links">
              {aiServices[lang].map((service, i) => (
                <Link
                  key={service.name}
                  href={`${p}${service.href}`}
                  className="footer-mega-service-link"
                  style={{ '--i': i } as React.CSSProperties}
                >
                  <span className="footer-mega-service-arrow">↗</span>
                  <span>{service.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Dev Services */}
          <div className="footer-mega-service-col">
            <p className="footer-mega-nav-label">
              <span className="footer-mega-label-icon">◇</span>
              {c.development}
            </p>
            <div className="footer-mega-service-links">
              {devServices[lang].map((service, i) => (
                <Link
                  key={service.name}
                  href={`${p}${service.href}`}
                  className="footer-mega-service-link"
                  style={{ '--i': i } as React.CSSProperties}
                >
                  <span className="footer-mega-service-arrow">↗</span>
                  <span>{service.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div className="footer-mega-service-col">
            <p className="footer-mega-nav-label">{c.connect}</p>
            <div className="footer-mega-social-links">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-mega-social"
                >
                  <span className="footer-mega-social-short">{link.name}</span>
                  <span className="footer-mega-social-full">{link.fullName}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Local time */}
          <div className="footer-mega-service-col">
            <p className="footer-mega-nav-label">{c.localTime}</p>
            <div className="footer-mega-clock">
              <span className="footer-mega-clock-time">{time}</span>
              <span className="footer-mega-clock-zone">Warsaw, PL</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-mega-bottom">
          <p className="footer-mega-copy">
            {c.builtWith}
            <svg className="footer-mega-copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
              <line x1="14" y1="4" x2="10" y2="20" />
            </svg>
            &
            <svg className="footer-mega-copy-icon footer-mega-copy-icon-coffee" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
              <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
              <line x1="6" x2="6" y1="2" y2="4" />
              <line x1="10" x2="10" y1="2" y2="4" />
              <line x1="14" x2="14" y1="2" y2="4" />
            </svg>
            {c.location}
          </p>

          <div className="footer-mega-status">
            <span className="footer-mega-status-dot" />
            <span>{c.availability}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
