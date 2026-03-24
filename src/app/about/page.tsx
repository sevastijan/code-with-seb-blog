'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Code2, Brain, Zap, Heart, Shield, Rocket, Terminal, Globe } from 'lucide-react';
import { CustomCursor } from '@/components/CustomCursor';
import { ScrollProgress } from '@/components/ScrollProgress';
import { FooterAwwwards } from '@/components/FooterAwwwards';


const values = [
  {
    icon: Shield,
    title: 'Ownership',
    description: "When I take on a project, it becomes my problem to solve. No excuses, no finger-pointing. Just results.",
    color: '#ff3d00',
  },
  {
    icon: Zap,
    title: 'Speed',
    description: "Fast doesn't mean sloppy. I move quickly by making smart decisions upfront and iterating with purpose.",
    color: '#00ff88',
  },
  {
    icon: Heart,
    title: 'Quality',
    description: "I don't ship anything I wouldn't be proud to put my name on. Every line of code, every pixel matters.",
    color: '#8b5cf6',
  },
  {
    icon: Brain,
    title: 'Clarity',
    description: 'Complex problems deserve simple explanations. I communicate with precision and cut through the noise.',
    color: '#f59e0b',
  },
];

const stats = [
  { value: '10+', label: 'Years Building', suffix: '' },
  { value: '100+', label: 'Projects Shipped', suffix: '' },
  { value: '50+', label: 'Happy Clients', suffix: '' },
  { value: '∞', label: 'Curiosity', suffix: '' },
];

const stackCategories = [
  {
    title: 'AI & AUTOMATION',
    color: '#00ff88',
    items: [
      { name: 'Claude Code / Cursor', desc: 'AI pair-programming' },
      { name: 'OpenAI / Anthropic APIs', desc: 'LLM integration' },
      { name: 'LangChain / LangGraph', desc: 'Agent orchestration' },
      { name: 'CrewAI', desc: 'Multi-agent systems' },
      { name: 'Vercel AI SDK', desc: 'Streaming & tool use' },
      { name: 'MCP (Model Context Protocol)', desc: 'Agent-tool connectivity' },
      { name: 'RAG / Vector DBs', desc: 'Pinecone, Weaviate, pgvector' },
      { name: 'n8n / Zapier', desc: 'No-code automation' },
      { name: 'Hugging Face', desc: 'Open-source models' },
      { name: 'Python', desc: 'ML pipelines & scripting' },
    ],
  },
  {
    title: 'LANGUAGES',
    color: '#ff3d00',
    items: [
      { name: 'TypeScript', desc: 'Type-safe everything' },
      { name: 'JavaScript', desc: 'The foundation' },
      { name: 'Java', desc: 'Enterprise & Spring Boot' },
      { name: 'PHP', desc: 'WordPress & server-side' },
      { name: 'Dart', desc: 'Flutter mobile apps' },
      { name: 'HTML / CSS', desc: 'Semantic markup & styling' },
    ],
  },
  {
    title: 'FRONTEND',
    color: '#61dafb',
    items: [
      { name: 'React', desc: 'UI library of choice' },
      { name: 'Next.js', desc: 'Full-stack React framework' },
      { name: 'React Native', desc: 'Cross-platform mobile' },
      { name: 'Flutter', desc: 'Cross-platform UI toolkit' },
      { name: 'Gatsby', desc: 'Static site generation' },
      { name: 'Vite', desc: 'Build tooling' },
      { name: 'Redux', desc: 'State management' },
      { name: 'Tailwind CSS', desc: 'Utility-first styling' },
      { name: 'Cypress / Jest', desc: 'Testing & E2E' },
    ],
  },
  {
    title: 'BACKEND & DATA',
    color: '#8b5cf6',
    items: [
      { name: 'Node.js', desc: 'Server runtime' },
      { name: 'Express.js', desc: 'HTTP framework' },
      { name: 'Spring / Spring Boot', desc: 'Java enterprise framework' },
      { name: 'GraphQL', desc: 'Query language for APIs' },
      { name: 'JWT', desc: 'Token-based auth' },
      { name: 'MySQL', desc: 'Relational database' },
      { name: 'MongoDB', desc: 'Document database' },
      { name: 'Firebase', desc: 'Realtime & serverless' },
    ],
  },
  {
    title: 'CMS & PLATFORMS',
    color: '#06b6d4',
    items: [
      { name: 'WordPress', desc: 'Custom themes & plugins' },
      { name: 'Sanity', desc: 'Headless CMS' },
      { name: 'Shopify', desc: 'E-commerce' },
    ],
  },
  {
    title: 'INFRA & DEVOPS',
    color: '#f59e0b',
    items: [
      { name: 'AWS', desc: 'Cloud infrastructure' },
      { name: 'Vercel', desc: 'Edge deployment' },
      { name: 'Docker', desc: 'Containerization' },
      { name: 'Kubernetes', desc: 'Container orchestration' },
      { name: 'ArgoCD', desc: 'GitOps delivery' },
      { name: 'CI/CD', desc: 'GitHub Actions & pipelines' },
      { name: 'Git', desc: 'Version control' },
    ],
  },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height,
        });
      }
    };

    let rafId = 0;
    const throttledMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => handleMouseMove(e));
    };
    window.addEventListener('mousemove', throttledMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="grain">
      <CustomCursor />
      <ScrollProgress />

      {/* HERO - Full Viewport with 3D Typography */}
      <section ref={heroRef} className="abt-hero">
        {/* Animated grid background */}
        <div className="abt-hero-grid" />

        {/* Floating orbs */}
        <div className="abt-hero-orb abt-hero-orb-1" />
        <div className="abt-hero-orb abt-hero-orb-2" />
        <div className="abt-hero-orb abt-hero-orb-3" />

        {/* Giant "SEB" in background */}
        <div
          className="abt-hero-giant"
          style={{
            transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)`,
          }}
        >
          <span className="abt-hero-giant-text">SEB</span>
        </div>

        {/* Main content */}
        <div className="container relative z-10">
          <div className="abt-hero-content">
            {/* Label */}
            <div className="abt-hero-label">
              <span className="abt-hero-label-dot" />
              <span>About</span>
            </div>

            {/* Mega headline with 3D effect */}
            <h1 className="abt-hero-title">
              <span
                className="abt-hero-title-line abt-hero-title-line-1"
                style={{
                  transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 10}px) rotateX(${mousePos.y * 5}deg) rotateY(${mousePos.x * 5}deg)`,
                }}
              >
                Building
              </span>
              <span
                className="abt-hero-title-line abt-hero-title-line-2"
                style={{
                  transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -8}px) rotateX(${mousePos.y * -3}deg) rotateY(${mousePos.x * -3}deg)`,
                }}
              >
                <span className="text-stroke">Since</span>
              </span>
              <span
                className="abt-hero-title-line abt-hero-title-line-3"
                style={{
                  transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 15}px) rotateX(${mousePos.y * 7}deg) rotateY(${mousePos.x * 7}deg)`,
                }}
              >
                <span className="text-gradient-animated">2012.</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="abt-hero-subtitle">
              I&apos;m Sebastian — a senior developer who believes
              <br />
              <span className="text-[var(--c-text-muted)]">great software is built by people who care.</span>
            </p>

            {/* Quick nav pills */}
            <div className="abt-hero-pills">
              {[
                { label: 'Story', href: '#story' },
                { label: 'Values', href: '#values' },
                { label: 'Stack', href: '#stack' },
              ].map((pill) => (
                <button
                  key={pill.label}
                  className="abt-hero-pill"
                  onClick={() => {
                    document.querySelector(pill.href)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span className="abt-hero-pill-title">{pill.label}</span>
                  <ArrowUpRight className="abt-hero-pill-arrow" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="abt-hero-scroll">
          <span>Scroll to explore</span>
          <div className="abt-hero-scroll-line" />
        </div>
      </section>

      {/* STATS - Big Numbers with Glow */}
      <section className="abt-stats">
        <div className="abt-stats-line" />
        <div className="container">
          <div className="abt-stats-grid">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="abt-stat"
                style={{ '--stat-delay': `${index * 100}ms` } as React.CSSProperties}
              >
                <div className="abt-stat-value">{stat.value}</div>
                <div className="abt-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="abt-stats-line" />
      </section>

      {/* STORY - Split Layout with Visual Depth */}
      <section id="story" className="abt-story">
        <div className="abt-story-bg">
          <div className="abt-story-glow" />
        </div>

        <div className="container">
          <div className="abt-story-layout">
            {/* Left - Visual Element */}
            <div className="abt-story-visual">
              <div className="abt-story-card">
                <div className="abt-story-card-border" />
                <div className="abt-story-card-content">
                  <Terminal className="abt-story-card-icon" />
                  <div className="abt-story-card-code">
                    <span className="abt-code-keyword">const</span>{' '}
                    <span className="abt-code-var">sebastian</span>{' '}
                    <span className="abt-code-op">=</span>{' '}
                    <span className="abt-code-bracket">{'{'}</span>
                    <br />
                    {'  '}<span className="abt-code-key">role</span>: <span className="abt-code-string">&quot;Fractional CTO&quot;</span>,
                    <br />
                    {'  '}<span className="abt-code-key">focus</span>: <span className="abt-code-string">&quot;AI + Web&quot;</span>,
                    <br />
                    {'  '}<span className="abt-code-key">years</span>: <span className="abt-code-num">10</span>,
                    <br />
                    {'  '}<span className="abt-code-key">passion</span>: <span className="abt-code-string">&quot;∞&quot;</span>,
                    <br />
                    <span className="abt-code-bracket">{'}'}</span>;
                  </div>
                  <div className="abt-story-card-cursor">▌</div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="abt-story-badge abt-story-badge-1">
                <Code2 className="w-4 h-4" />
                <span>Clean Code</span>
              </div>
              <div className="abt-story-badge abt-story-badge-2">
                <Rocket className="w-4 h-4" />
                <span>Ship Fast</span>
              </div>
              <div className="abt-story-badge abt-story-badge-3">
                <Globe className="w-4 h-4" />
                <span>Remote</span>
              </div>
            </div>

            {/* Right - Story Text */}
            <div className="abt-story-text">
              <div className="abt-story-label">
                <span className="abt-story-label-dot" />
                <span>The Short Version</span>
              </div>
              <h2 className="abt-story-title">
                A decade of
                <span className="abt-story-title-accent"> building things</span>
                {' '}that matter.
              </h2>
              <div className="abt-story-paragraphs">
                <p>
                  I&apos;ve spent over a decade building software — from scrappy startups to enterprise
                  systems used by millions. Along the way, I&apos;ve learned that the difference between
                  good and great isn&apos;t just about code.
                </p>
                <p>
                  It&apos;s about <strong>taking ownership</strong>. It&apos;s about clear communication.
                  It&apos;s about understanding that software exists to solve real problems for real people.
                </p>
                <p>
                  Today, I work with select clients on projects where I can make a real impact —
                  from AI automation that saves thousands of hours, to web applications that scale
                  to millions. And I write about everything I learn along the way.
                </p>
              </div>
              <Link href="/blog" className="abt-story-cta">
                <span>Read my writing</span>
                <ArrowRight className="abt-story-cta-arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES - Interactive Cards with Glow */}
      <section id="values" className="abt-values">
        <div className="container">
          <div className="abt-values-header">
            <span className="label">What I Believe</span>
            <h2 className="abt-values-title">
              Core
              <span className="text-gradient-animated"> Values</span>
            </h2>
            <p className="abt-values-desc">
              These aren&apos;t corporate buzzwords. They&apos;re the principles that guide every decision I make.
            </p>
          </div>

          <div className="abt-values-grid">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="abt-value-card"
                style={{
                  '--value-color': value.color,
                  '--value-delay': `${index * 80}ms`,
                } as React.CSSProperties}
              >
                <div className="abt-value-card-icon">
                  <value.icon />
                </div>
                <h3 className="abt-value-card-title">{value.title}</h3>
                <p className="abt-value-card-desc">{value.description}</p>
                <div className="abt-value-card-glow" />
                <div className="abt-value-card-line" />
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* TECH STACK - Categorized Grid */}
      <section id="stack" className="abt-stack">
        <div className="container">
          <div className="abt-stack-header">
            <span className="label">Tools of the Trade</span>
            <h2 className="abt-stack-title">
              Tech
              <span className="abt-stack-title-accent"> Stack</span>
            </h2>
          </div>

          <div className="stack-categories">
            {stackCategories.map((cat, catIndex) => (
              <div
                key={cat.title}
                className="stack-category"
                style={{ '--cat-color': cat.color, '--cat-delay': `${catIndex * 100}ms` } as React.CSSProperties}
              >
                <div className="stack-category-header">
                  <div className="stack-category-line" />
                  <h3 className="stack-category-title">{cat.title}</h3>
                  <span className="stack-category-count">{String(cat.items.length).padStart(2, '0')}</span>
                </div>
                <div className="stack-category-items">
                  {cat.items.map((item, i) => (
                    <div
                      key={item.name}
                      className="stack-item"
                      style={{ '--item-delay': `${catIndex * 100 + i * 50}ms` } as React.CSSProperties}
                    >
                      <div className="stack-item-indicator" />
                      <div className="stack-item-content">
                        <span className="stack-item-name">{item.name}</span>
                        <span className="stack-item-desc">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Let's Talk */}
      <section className="abt-cta">
        <div className="abt-cta-bg">
          <div className="abt-cta-orb abt-cta-orb-1" />
          <div className="abt-cta-orb abt-cta-orb-2" />
        </div>

        <div className="container relative z-10">
          <div className="abt-cta-content">
            <h2 className="abt-cta-title">
              Let&apos;s Build
              <span className="abt-cta-title-accent"> Together.</span>
            </h2>
            <p className="abt-cta-desc">
              Have a project in mind? I&apos;d love to hear about it.
              <br />
              No pitch decks, no sales calls. Just a real conversation.
            </p>
            <Link href="/contact" className="abt-cta-btn">
              <span className="abt-cta-btn-text">Start a conversation</span>
              <span className="abt-cta-btn-arrow">
                <ArrowRight />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <FooterAwwwards />
    </div>
  );
}
