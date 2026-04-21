'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Users, Shield, Lightbulb, Target, CheckCircle2, TrendingUp, Building2, Scale, Compass, FileSearch, UserCheck, BarChart3 } from 'lucide-react';
import { CustomCursor } from '@/components/CustomCursor';
import { ScrollProgress } from '@/components/ScrollProgress';
import { FooterAwwwards } from '@/components/FooterAwwwards';

const whatYouGet = [
  {
    icon: Compass,
    title: 'Technical Strategy',
    description: 'Clear-eyed assessment of where you are and where you need to go. I help you make technology decisions that align with your business goals — not the other way around.',
    details: ['Technology roadmap & prioritization', 'Build vs. buy analysis', 'Vendor evaluation & selection', 'Technical debt strategy'],
  },
  {
    icon: Users,
    title: 'Code Review & Mentoring',
    description: 'Senior eyes on your codebase and your team. I review PRs, pair on hard problems, and level up your engineers — without stepping on toes.',
    details: ['PR review & feedback', 'Pair programming on hard problems', 'Engineering best practices', 'Mentoring mid-level engineers'],
  },
  {
    icon: FileSearch,
    title: 'AI Strategy & Roadmap',
    description: 'Identify where AI agents, automation, and LLMs can transform your business. Get a prioritized implementation roadmap with clear ROI projections.',
    details: ['AI opportunity assessment', 'Tool selection & evaluation', 'Implementation roadmap', 'ROI & cost modeling'],
  },
  {
    icon: Shield,
    title: 'Architecture Review',
    description: 'Independent review of your system architecture. I find the bottlenecks, single points of failure, and scalability risks before they become production incidents.',
    details: ['System design review', 'Performance & scalability analysis', 'Security architecture audit', 'Infrastructure cost optimization'],
  },
];

const engagementModels = [
  {
    title: 'Embedded Senior Dev',
    description: 'I join your team part-time as a senior engineer. I ship code, review PRs, pair on hard problems, and mentor your team — all hands-on, no ivory tower.',
    ideal: 'Teams that need a senior IC to raise the bar on code quality and unblock hard technical problems.',
    commitment: '10-20 hrs/week',
    duration: '3-12 months',
    color: '#8b5cf6',
  },
  {
    title: 'Advisory Retainer',
    description: 'Strategic access on demand. Weekly or bi-weekly calls, async Slack access, and document reviews. Think of it as a senior engineer on speed dial.',
    ideal: 'Founders and teams that need a technical sounding board and occasional deep dives.',
    commitment: '4-8 hrs/month',
    duration: 'Ongoing',
    color: '#8b5cf6',
  },
  {
    title: 'Project-Based',
    description: 'Focused engagement for a specific challenge: architecture review, AI strategy workshop, code audit, or technology migration planning. AI-assisted analysis means I deliver in days, not weeks.',
    ideal: 'Companies facing a specific technical decision or transition.',
    commitment: 'Full focus',
    duration: '2-5 days',
    color: '#8b5cf6',
  },
];

const whoIWorkWith = [
  {
    icon: Building2,
    title: 'Funded Startups',
    description: 'Seed to Series B companies that need senior engineering judgment to match their ambition. I help you build the right thing, the right way, alongside your team.',
  },
  {
    icon: TrendingUp,
    title: 'Scale-ups',
    description: 'Growing companies hitting technical growing pains. Architecture that worked at 10 users doesn\'t work at 10,000. I help you navigate that transition — with code, not slides.',
  },
  {
    icon: Scale,
    title: 'Investors & PE Firms',
    description: 'Technical assessment for investment decisions. I give you an honest, AI-assisted analysis of what\'s under the hood — not what the pitch deck says.',
  },
  {
    icon: UserCheck,
    title: 'Non-Technical Founders',
    description: 'You have the vision and domain expertise. I provide the technical judgment: what to build, what to skip, and how to avoid expensive mistakes.',
  },
];

const results = [
  { metric: '50+', label: 'Projects delivered', desc: 'Across AI, web, and mobile' },
  { metric: '10+', label: 'Years shipping code', desc: 'From junior dev to senior IC' },
  { metric: '1000+', label: 'PRs reviewed', desc: 'Across startups and enterprise codebases' },
  { metric: '100+', label: 'AI automations shipped', desc: 'Agents, workflows, integrations' },
];

const faqs = [
  {
    q: 'How is this different from hiring a typical consultant?',
    a: 'Most consultants give advice from the sidelines and leave. I work inside your codebase — I open PRs, review your team\'s code, pair on hard bugs, and sit in your standups if that\'s useful. Advice is cheap when nobody has to ship it. I do both.',
  },
  {
    q: 'How do you work alongside existing engineers?',
    a: 'As a peer, not as an overseer. I listen first, read the code, understand the history and constraints, and then propose changes collaboratively. The goal is to raise the bar on quality and unblock hard problems — not to take credit or override your team.',
  },
  {
    q: 'Do you also write code, or just review it?',
    a: 'Both. I\'m a hands-on senior developer — reviewing code is a core part of the job, but I also ship production features, prototype AI integrations, and pair on the problems your team has been stuck on. If you just need a reviewer, that\'s fine too.',
  },
  {
    q: 'Can you help with technical due diligence?',
    a: 'Yes. I regularly help with the technical side of investor conversations: honest assessments of codebases, architecture risk reports, and AI integration readiness. Investors want to know the tech is solid — I help you prove it (or find out it isn\'t, before they do).',
  },
  {
    q: 'How quickly can you ramp up?',
    a: 'Fast. AI-assisted codebase analysis means I understand your architecture in hours, not weeks. I typically spend 2-3 days in deep-dive mode, and by the end of the first week I\'m opening meaningful PRs. By week 3, I\'m fully productive in your codebase.',
  },
];

export default function ConsultingServicePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

      {/* HERO */}
      <section ref={heroRef} className="srv-hero">
        <div className="srv-hero-grid" />
        <div className="srv-hero-orb srv-hero-orb-1" />
        <div className="srv-hero-orb srv-hero-orb-2" />
        <div className="srv-hero-orb srv-hero-orb-3" />

        <div
          className="srv-hero-giant"
          style={{ transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)` }}
        >
          <span className="srv-hero-giant-text" style={{ color: 'rgba(139, 92, 246, 0.03)' }}>DEV</span>
        </div>

        <div className="container relative z-10">
          <div className="srv-hero-content">
            <Link href="/services" className="srv-hero-label" style={{ textDecoration: 'none' }}>
              <ArrowLeft className="w-4 h-4" />
              <span>All Services</span>
            </Link>

            <h1 className="srv-hero-title">
              <span
                className="srv-hero-title-line srv-hero-title-line-1"
                style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 10}px)` }}
              >
                Technical
              </span>
              <span
                className="srv-hero-title-line srv-hero-title-line-2"
                style={{ transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -8}px)` }}
              >
                <span style={{ color: '#8b5cf6' }}>Consulting</span>
              </span>
            </h1>

            <p className="srv-hero-subtitle">
              Senior engineering judgment on demand — without a full-time hire.
              <br />
              <span className="text-[var(--c-text-muted)]">Architecture, code review, and AI strategy — from someone who ships code.</span>
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <Link href="/contact" className="btn-magnetic">
                <span>Book a discovery call</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="srv-hero-scroll">
          <span>Scroll to explore</span>
          <div className="srv-hero-scroll-line" />
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="srv-process" style={{ borderTop: '1px solid var(--c-border)' }}>
        <div className="container">
          <div className="srv-process-header">
            <span className="label">The Challenge</span>
            <h2 className="srv-process-title">
              You Need Senior Judgment,
              <span className="text-stroke"> Not More Headcount</span>
            </h2>
            <p className="srv-derivative-desc" style={{ maxWidth: '680px', margin: '0 auto' }}>
              Hiring a senior engineer takes 3-6 months and $150-250K fully loaded. You need experienced judgment on specific problems — now, not next quarter. With AI-assisted codebase analysis I ramp up in days and contribute as a senior IC at a fraction of the cost.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
            {results.map((r) => (
              <div
                key={r.label}
                style={{
                  background: 'var(--c-surface)',
                  border: '1px solid var(--c-border)',
                  padding: '2rem',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#8b5cf6', lineHeight: 1 }}>{r.metric}</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--c-text)', marginTop: '0.5rem' }}>{r.label}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--c-text-muted)', marginTop: '0.25rem' }}>{r.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="srv-derivative">
        <div className="container">
          <div className="srv-derivative-header">
            <span className="label">What You Get</span>
            <h2 className="srv-derivative-title">
              Hands-on
              <span style={{ color: '#8b5cf6' }}> Engineering</span>
            </h2>
            <p className="srv-derivative-desc">
              Not advice from the sidelines. A senior developer embedded in your codebase and your team.
            </p>
          </div>

          <div className="srv-derivative-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            {whatYouGet.map((item) => (
              <div
                key={item.title}
                className="srv-derivative-card srv-derivative-card-featured"
                style={{ '--card-color': '#8b5cf6' } as React.CSSProperties}
              >
                <div className="srv-derivative-card-icon">
                  <item.icon />
                </div>
                <div className="srv-derivative-card-content">
                  <h3 className="srv-derivative-card-title">{item.title}</h3>
                  <p className="srv-derivative-card-desc">{item.description}</p>
                  <ul style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {item.details.map((detail) => (
                      <li key={detail} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--c-text-muted)' }}>
                        <CheckCircle2 className="w-3.5 h-3.5" style={{ color: '#8b5cf6', flexShrink: 0 }} />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="srv-derivative-card-glow" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO I WORK WITH */}
      <section className="srv-process" style={{ borderTop: '1px solid var(--c-border)' }}>
        <div className="container">
          <div className="srv-process-header">
            <span className="label">Ideal Clients</span>
            <h2 className="srv-process-title">
              Who I
              <span style={{ color: '#8b5cf6' }}> Work With</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
            {whoIWorkWith.map((client) => (
              <div
                key={client.title}
                style={{
                  background: 'var(--c-surface)',
                  border: '1px solid var(--c-border)',
                  padding: '2rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <client.icon className="w-6 h-6" style={{ color: '#8b5cf6', marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--c-text)', marginBottom: '0.75rem' }}>
                  {client.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--c-text-muted)', lineHeight: 1.6 }}>
                  {client.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENGAGEMENT MODELS */}
      <section className="srv-derivative" style={{ borderTop: '1px solid var(--c-border)' }}>
        <div className="container">
          <div className="srv-derivative-header">
            <span className="label">Engagement Models</span>
            <h2 className="srv-derivative-title">
              How We
              <span style={{ color: '#8b5cf6' }}> Work Together</span>
            </h2>
            <p className="srv-derivative-desc">
              Flexible arrangements designed to match your stage, needs, and budget.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
            {engagementModels.map((model) => (
              <div
                key={model.title}
                style={{
                  background: 'var(--c-surface)',
                  border: '1px solid var(--c-border)',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--c-text)' }}>{model.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--c-text-muted)', lineHeight: 1.6, flex: 1 }}>{model.description}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--c-text-muted)', fontStyle: 'italic' }}>
                  <Lightbulb className="w-3.5 h-3.5 inline-block mr-1" style={{ color: '#8b5cf6' }} />
                  {model.ideal}
                </p>
                <div style={{ display: 'flex', gap: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--c-border)' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--c-text-muted)' }}>Commitment</span>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#8b5cf6', marginTop: '0.25rem' }}>{model.commitment}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--c-text-muted)' }}>Duration</span>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#8b5cf6', marginTop: '0.25rem' }}>{model.duration}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="cnt-faq">
        <div className="container">
          <div className="cnt-faq-header">
            <span className="label">FAQ</span>
            <h2 className="cnt-faq-title">
              Common
              <span style={{ color: '#8b5cf6' }}> Questions</span>
            </h2>
          </div>

          <div className="cnt-faq-list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`cnt-faq-item ${openFaq === index ? 'cnt-faq-item-open' : ''}`}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <div className="cnt-faq-item-header">
                  <span className="cnt-faq-item-num">0{index + 1}</span>
                  <h3 className="cnt-faq-item-question">{faq.q}</h3>
                </div>
                <div className="cnt-faq-item-body">
                  <p className="cnt-faq-item-answer">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="srv-cta">
        <div className="srv-cta-bg">
          <div className="srv-cta-orb srv-cta-orb-1" />
          <div className="srv-cta-orb srv-cta-orb-2" />
        </div>

        <div className="container relative z-10">
          <div className="srv-cta-content">
            <h2 className="srv-cta-title">
              Need senior
              <span className="srv-cta-title-accent"> engineering eyes?</span>
            </h2>
            <p className="srv-cta-desc">
              Let&apos;s talk about the problem you&apos;re stuck on and where you want to go.
              <br />
              30-minute discovery call — no pitch, just clarity.
            </p>
            <Link href="/contact" className="srv-cta-btn">
              <span className="srv-cta-btn-text">Book a discovery call</span>
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
