'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { LogoAnimated } from '@/components/LogoAnimated';

const navigation = [
  { name: 'Blog', href: '/blog', num: '01' },
  { name: 'Services', href: '/services', num: '02' },
  { name: 'About', href: '/about', num: '03' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? 'header-scrolled' : 'header-top'
        }`}
      >
        <nav className="container flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="nav-logo group" data-cursor-hover>
            <LogoAnimated />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-cursor-hover
                  className="nav-link group"
                >
                  <span className="nav-link-num">{item.num}</span>
                  <span className={`nav-link-text ${isActive ? 'text-[var(--c-text)]' : ''}`}>
                    {item.name}
                  </span>
                  <span className={`nav-link-line ${isActive ? 'nav-link-line-active' : ''}`} />
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden lg:block">
            <Link href="/contact" className="nav-cta group" data-cursor-hover>
              <span className="nav-cta-text">Let's Talk</span>
              <span className="nav-cta-icon">
                <ArrowUpRight className="w-4 h-4" />
              </span>
              <span className="nav-cta-bg" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden nav-burger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={`nav-burger-line ${mobileMenuOpen ? 'nav-burger-line-1-open' : ''}`} />
            <span className={`nav-burger-line ${mobileMenuOpen ? 'nav-burger-line-2-open' : ''}`} />
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div className={`nav-mobile ${mobileMenuOpen ? 'nav-mobile-open' : ''}`}>
        {/* Background layers */}
        <div className={`nav-mobile-bg nav-mobile-bg-1 ${mobileMenuOpen ? 'nav-mobile-bg-open' : ''}`} />
        <div className={`nav-mobile-bg nav-mobile-bg-2 ${mobileMenuOpen ? 'nav-mobile-bg-open' : ''}`} style={{ transitionDelay: '50ms' }} />

        <div className="nav-mobile-content">
          <nav className="nav-mobile-nav">
            {navigation.map((item, i) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-mobile-link ${mobileMenuOpen ? 'nav-mobile-link-open' : ''}`}
                  style={{ transitionDelay: mobileMenuOpen ? `${150 + i * 75}ms` : '0ms' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="nav-mobile-link-num">{item.num}</span>
                  <span className={`nav-mobile-link-text ${isActive ? 'text-[var(--c-accent)]' : ''}`}>
                    {item.name}
                  </span>
                  <span className="nav-mobile-link-arrow">→</span>
                </Link>
              );
            })}
          </nav>

          <div
            className={`nav-mobile-footer ${mobileMenuOpen ? 'nav-mobile-footer-open' : ''}`}
            style={{ transitionDelay: mobileMenuOpen ? '450ms' : '0ms' }}
          >
            <Link
              href="/contact"
              className="nav-cta nav-cta-mobile group"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="nav-cta-text">Let's Talk</span>
              <span className="nav-cta-icon">
                <ArrowUpRight className="w-5 h-5" />
              </span>
              <span className="nav-cta-bg" />
            </Link>

            <div className="nav-mobile-socials">
              <a href="https://github.com/sevastijan" target="_blank" rel="noopener noreferrer" className="nav-mobile-social">GitHub</a>
              <a href="https://www.youtube.com/@CodeWithSeb" target="_blank" rel="noopener noreferrer" className="nav-mobile-social">YouTube</a>
              <a href="https://www.linkedin.com/in/sebastiansleczka/" target="_blank" rel="noopener noreferrer" className="nav-mobile-social">LinkedIn</a>
              <a href="https://www.instagram.com/codewithseb/" target="_blank" rel="noopener noreferrer" className="nav-mobile-social">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
