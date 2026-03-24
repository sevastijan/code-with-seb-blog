'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Code2, Users, Sparkles, Shield, Rocket, Target, Zap, Brain, GitBranch, Search, Layers } from 'lucide-react';
import { CustomCursor } from '@/components/CustomCursor';
import { ScrollProgress } from '@/components/ScrollProgress';
import { FooterAwwwards } from '@/components/FooterAwwwards';

// Core services with expanded data
const coreServices = [
  {
    id: '01',
    slug: 'ai',
    title: '10X AI',
    subtitle: 'Artificial Intelligence',
    tagline: 'Your digital workforce',
    description: 'Transform your business with intelligent automation. Custom AI agents, workflow automation, and LLM integration that actually delivers ROI.',
    color: '#00ff88',
    features: ['Custom AI Agents', 'Workflow Automation', 'LLM Integration', 'Data Pipelines'],
    stats: { value: '10x', label: 'Productivity Boost' },
  },
  {
    id: '02',
    slug: 'development',
    title: 'CODE',
    subtitle: 'Development',
    tagline: 'Ships that scale',
    description: 'Production-grade web applications built with modern stack. From MVP to enterprise scale, code that performs under pressure.',
    color: '#ff3d00',
    features: ['Next.js / React', 'TypeScript', 'API Design', 'Cloud Architecture'],
    stats: { value: '50+', label: 'Projects Shipped' },
  },
  {
    id: '03',
    slug: 'consulting',
    title: 'LEAD',
    subtitle: 'Fractional CTO',
    tagline: 'Vision that wins',
    description: 'Strategic technology leadership without the full-time cost. AI strategy, team building, and architecture decisions.',
    color: '#8b5cf6',
    features: ['Tech Strategy', 'AI Integration', 'Team Building', 'Architecture Review'],
    stats: { value: '8+', label: 'Years Experience' },
  },
];

// Derivative services from research
const derivativeServices = [
  {
    id: 'd01',
    title: 'AI Readiness Assessment',
    description: 'Comprehensive evaluation of your AI maturity with a prioritized implementation roadmap.',
    icon: Search,
    color: '#00ff88',
    duration: '3-5 days',
    featured: true,
  },
  {
    id: 'd02',
    title: 'Vibe Code Audit',
    description: 'Expert review of AI-generated codebases. Security, logic errors, and production readiness.',
    icon: Code2,
    color: '#ff3d00',
    duration: '24-48 hours',
    featured: true,
  },
  {
    id: 'd03',
    title: 'AI Strategy Workshop',
    description: 'Identify the highest-impact AI opportunities in your business. Prioritized roadmap in days.',
    icon: Shield,
    color: '#8b5cf6',
    duration: '2-3 days',
    featured: true,
  },
  {
    id: 'd04',
    title: 'AI Automation Sprints',
    description: 'Fixed 5-day intensive to automate specific workflows using AI tools.',
    icon: Zap,
    color: '#00ff88',
    duration: '5 days',
    featured: false,
  },
  {
    id: 'd05',
    title: 'Fractional AI Officer',
    description: 'Ongoing AI advisory. Strategy, tool selection, and implementation oversight.',
    icon: Brain,
    color: '#ff3d00',
    duration: 'Retainer',
    featured: false,
  },
  {
    id: 'd06',
    title: 'Tech Founder Coaching',
    description: '1:1 coaching for non-technical founders. Hiring, architecture, vendor management.',
    icon: Users,
    color: '#8b5cf6',
    duration: 'Monthly',
    featured: false,
  },
  {
    id: 'd07',
    title: 'Architecture Blueprint',
    description: 'Tech stack selection and architecture design before development begins.',
    icon: Layers,
    color: '#00ff88',
    duration: '2-3 days',
    featured: false,
  },
  {
    id: 'd08',
    title: 'Security Accelerator',
    description: 'SOC 2, GDPR, HIPAA preparation. Unblock enterprise sales.',
    icon: Shield,
    color: '#ff3d00',
    duration: '1-2 weeks',
    featured: false,
  },
  {
    id: 'd09',
    title: 'AI-Powered MVP',
    description: 'Fixed-price MVP using AI-accelerated development with expert oversight.',
    icon: Rocket,
    color: '#8b5cf6',
    duration: '1-2 weeks',
    featured: false,
  },
  {
    id: 'd10',
    title: 'AI Tool Selection',
    description: 'Navigate the AI tool landscape. Evaluate, pilot, and implement the right solutions.',
    icon: Target,
    color: '#00ff88',
    duration: '2-3 days',
    featured: false,
  },
  {
    id: 'd11',
    title: 'M&A Tech Advisory',
    description: 'Buy-side and sell-side technical advisory for mergers and acquisitions.',
    icon: GitBranch,
    color: '#ff3d00',
    duration: 'Per deal',
    featured: false,
  },
  {
    id: 'd12',
    title: 'AI Agents Development',
    description: 'Custom autonomous agents for complex multi-step business tasks.',
    icon: Sparkles,
    color: '#8b5cf6',
    duration: '1-3 weeks',
    featured: false,
  },
];

export default function ServicesPage() {
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

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="grain">
      <CustomCursor />
      <ScrollProgress />

      {/* HERO - Mind-blowing 3D Typography */}
      <section ref={heroRef} className="srv-hero">
        {/* Animated grid background */}
        <div className="srv-hero-grid" />

        {/* Floating orbs */}
        <div className="srv-hero-orb srv-hero-orb-1" />
        <div className="srv-hero-orb srv-hero-orb-2" />
        <div className="srv-hero-orb srv-hero-orb-3" />

        {/* Giant "03" in background */}
        <div
          className="srv-hero-giant"
          style={{
            transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)`,
          }}
        >
          <span className="srv-hero-giant-text">03</span>
        </div>

        {/* Main content */}
        <div className="container relative z-10">
          <div className="srv-hero-content">
            {/* Label */}
            <div className="srv-hero-label">
              <span className="srv-hero-label-dot" />
              <span>Services</span>
            </div>

            {/* Mega headline with 3D effect */}
            <h1 className="srv-hero-title">
              <span
                className="srv-hero-title-line srv-hero-title-line-1"
                style={{
                  transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 10}px) rotateX(${mousePos.y * 5}deg) rotateY(${mousePos.x * 5}deg)`,
                }}
              >
                What I
              </span>
              <span
                className="srv-hero-title-line srv-hero-title-line-2"
                style={{
                  transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -8}px) rotateX(${mousePos.y * -3}deg) rotateY(${mousePos.x * -3}deg)`,
                }}
              >
                <span className="text-stroke">Build</span>
              </span>
              <span
                className="srv-hero-title-line srv-hero-title-line-3"
                style={{
                  transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 15}px) rotateX(${mousePos.y * 7}deg) rotateY(${mousePos.x * 7}deg)`,
                }}
              >
                <span className="text-gradient-animated">&amp; Ship</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="srv-hero-subtitle">
              From AI automation to production-grade applications.
              <br />
              <span className="text-[var(--c-text-muted)]">Technology that actually works.</span>
            </p>

            {/* Quick nav pills */}
            <div className="srv-hero-pills">
              {coreServices.map((service) => (
                <button
                  key={service.id}
                  className="srv-hero-pill"
                  style={{ '--pill-color': service.color } as React.CSSProperties}
                  onClick={() => {
                    document.getElementById(`core-${service.slug}`)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span className="srv-hero-pill-num">{service.id}</span>
                  <span className="srv-hero-pill-title">{service.title}</span>
                  <ArrowUpRight className="srv-hero-pill-arrow" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="srv-hero-scroll">
          <span>Scroll to explore</span>
          <div className="srv-hero-scroll-line" />
        </div>
      </section>

      {/* CORE SERVICES - Fullscreen Scroll Takeover */}
      <section className="srv-core">
        {coreServices.map((service) => (
          <div
            key={service.id}
            id={`core-${service.slug}`}
            className="srv-core-section"
            style={{ '--srv-color': service.color } as React.CSSProperties}
          >
            {/* Background elements */}
            <div className="srv-core-bg">
              <div className="srv-core-glow" />
              <div className="srv-core-grid" />
            </div>

            {/* Giant number */}
            <div className="srv-core-number">{service.id}</div>

            {/* Content */}
            <div className="container">
              <div className="srv-core-layout">
                {/* Left - Title */}
                <div className="srv-core-left">
                  <span className="srv-core-subtitle">{service.subtitle}</span>
                  <h2 className="srv-core-title">{service.title}</h2>
                  <p className="srv-core-tagline">{service.tagline}</p>
                </div>

                {/* Right - Details */}
                <div className="srv-core-right">
                  <p className="srv-core-desc">{service.description}</p>

                  <div className="srv-core-features">
                    {service.features.map((feature, i) => (
                      <span key={i} className="srv-core-feature">
                        <span className="srv-core-feature-dot" />
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="srv-core-stats">
                    <span className="srv-core-stats-value">{service.stats.value}</span>
                    <span className="srv-core-stats-label">{service.stats.label}</span>
                  </div>

                  <Link href={`/services/${service.slug}`} className="srv-core-cta">
                    <span>Learn more</span>
                    <ArrowRight className="srv-core-cta-arrow" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* DERIVATIVE SERVICES - Bento Grid */}
      <section className="srv-derivative">
        <div className="container">
          {/* Section header */}
          <div className="srv-derivative-header">
            <span className="label">Specialized Services</span>
            <h2 className="srv-derivative-title">
              Beyond the
              <span className="text-gradient-animated"> Basics</span>
            </h2>
            <p className="srv-derivative-desc">
              Productized offerings for specific needs. Fixed scope, clear outcomes.
            </p>
          </div>

          {/* Featured services - large cards */}
          <div className="srv-derivative-featured">
            {derivativeServices.filter(s => s.featured).map((service) => (
              <div
                key={service.id}
                className="srv-derivative-card srv-derivative-card-featured"
                style={{ '--card-color': service.color } as React.CSSProperties}
              >
                <div className="srv-derivative-card-icon">
                  <service.icon />
                </div>
                <div className="srv-derivative-card-content">
                  <h3 className="srv-derivative-card-title">{service.title}</h3>
                  <p className="srv-derivative-card-desc">{service.description}</p>
                </div>
                <div className="srv-derivative-card-meta">
                  <span className="srv-derivative-card-duration">{service.duration}</span>
                  <ArrowUpRight className="srv-derivative-card-arrow" />
                </div>
                <div className="srv-derivative-card-glow" />
              </div>
            ))}
          </div>

          {/* Grid of remaining services */}
          <div className="srv-derivative-grid">
            {derivativeServices.filter(s => !s.featured).map((service, index) => (
              <div
                key={service.id}
                className="srv-derivative-card"
                style={{
                  '--card-color': service.color,
                  '--card-delay': `${index * 50}ms`
                } as React.CSSProperties}
              >
                <div className="srv-derivative-card-icon">
                  <service.icon />
                </div>
                <h3 className="srv-derivative-card-title">{service.title}</h3>
                <p className="srv-derivative-card-desc">{service.description}</p>
                <span className="srv-derivative-card-duration">{service.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS - How I Work */}
      <section className="srv-process">
        <div className="container">
          <div className="srv-process-header">
            <span className="label">The Process</span>
            <h2 className="srv-process-title">
              How We
              <span className="text-stroke"> Ship</span>
            </h2>
          </div>

          <div className="srv-process-steps">
            {[
              { num: '01', title: 'Discovery', desc: 'Deep dive into your challenges, goals, and constraints. No BS, just clarity.' },
              { num: '02', title: 'Strategy', desc: 'Architecture decisions and technology choices that fit your reality.' },
              { num: '03', title: 'Build', desc: 'Rapid iteration with constant communication. You see progress daily.' },
              { num: '04', title: 'Ship', desc: 'Launch, monitor, iterate. The work continues until results are proven.' },
            ].map((step) => (
              <div key={step.num} className="srv-process-step">
                <div className="srv-process-step-num">{step.num}</div>
                <div className="srv-process-step-line" />
                <h3 className="srv-process-step-title">{step.title}</h3>
                <p className="srv-process-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Let's Talk */}
      <section className="srv-cta">
        <div className="srv-cta-bg">
          <div className="srv-cta-orb srv-cta-orb-1" />
          <div className="srv-cta-orb srv-cta-orb-2" />
        </div>

        <div className="container relative z-10">
          <div className="srv-cta-content">
            <h2 className="srv-cta-title">
              Ready to
              <span className="srv-cta-title-accent"> Ship?</span>
            </h2>
            <p className="srv-cta-desc">
              Let's discuss your project. No pitch decks, no sales calls.
              <br />
              Just a conversation about what you're building.
            </p>
            <Link href="/contact" className="srv-cta-btn">
              <span className="srv-cta-btn-text">Start a conversation</span>
              <span className="srv-cta-btn-arrow">
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
