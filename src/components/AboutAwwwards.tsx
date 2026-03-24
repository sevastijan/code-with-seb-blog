'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const stats = [
  { value: '10+', label: 'Years of code' },
  { value: '50+', label: 'Projects shipped' },
  { value: '∞', label: 'Coffee consumed' },
];

export function AboutAwwwards() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`about-editorial ${isVisible ? 'visible' : ''}`}>
      {/* Giant 04 */}
      <div className="about-editorial-giant">
        <span>04</span>
      </div>

      <div className="container">
        {/* Label */}
        <div className="about-editorial-label">
          <span className="about-editorial-label-text">About</span>
          <span className="about-editorial-label-ghost" aria-hidden="true">About</span>
        </div>

        {/* Main grid */}
        <div className="about-editorial-grid">
          {/* Left: Quote & Bio */}
          <div className="about-editorial-content">
            <blockquote className="about-editorial-quote">
              <span className="about-editorial-quote-mark">"</span>
              <p>
                I don't just write code.
                <br />
                <span className="about-editorial-quote-accent">I architect solutions.</span>
              </p>
            </blockquote>

            <div className="about-editorial-bio">
              <p>
                <strong>Sebastian</strong> — Fractional CTO & AI specialist with 10+ years
                turning complex technical challenges into competitive advantages.
              </p>
              <p>
                From startups to enterprises, I've shipped products that scale
                and led teams that deliver.
              </p>
            </div>

            <Link href="/about" className="about-editorial-cta">
              <span>Full story</span>
              <ArrowUpRight />
            </Link>
          </div>

          {/* Right: Visual */}
          <div className="about-editorial-visual">
            <div className="about-editorial-image-wrap">
              {/* Abstract visual instead of photo */}
              <div className="about-editorial-abstract">
                <div className="about-editorial-abstract-letter">S</div>
                <div className="about-editorial-abstract-grid" />
                <div className="about-editorial-abstract-accent" />
              </div>
              {/* Diagonal mask overlay */}
              <div className="about-editorial-mask" />
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="about-editorial-stats">
          {stats.map((stat, i) => (
            <div key={stat.label} className="about-editorial-stat" style={{ '--i': i } as React.CSSProperties}>
              <span className="about-editorial-stat-value">{stat.value}</span>
              <span className="about-editorial-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
