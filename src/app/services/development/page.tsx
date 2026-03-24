'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Code2, Layers, Gauge, Shield, CheckCircle2, Smartphone, Globe, Server, Wrench, GitBranch, MonitorSmartphone } from 'lucide-react';
import { CustomCursor } from '@/components/CustomCursor';
import { ScrollProgress } from '@/components/ScrollProgress';
import { FooterAwwwards } from '@/components/FooterAwwwards';

const techStack = [
  {
    category: 'Frontend',
    icon: MonitorSmartphone,
    technologies: [
      { name: 'React / Next.js', desc: 'Server components, SSR, ISR — the full rendering spectrum' },
      { name: 'TypeScript', desc: 'Type-safe by default, not as an afterthought' },
      { name: 'Tailwind CSS', desc: 'Utility-first styling for rapid, consistent UI development' },
      { name: 'Framer Motion', desc: 'Production-quality animations and micro-interactions' },
    ],
  },
  {
    category: 'Backend',
    icon: Server,
    technologies: [
      { name: 'Node.js / Bun', desc: 'High-performance server-side JavaScript runtime' },
      { name: 'REST & GraphQL', desc: 'API design that scales with your product' },
      { name: 'PostgreSQL / Redis', desc: 'Battle-tested data layer with caching strategies' },
      { name: 'Serverless & Edge', desc: 'Deploy where it makes sense — not where it\'s trendy' },
    ],
  },
  {
    category: 'DevOps',
    icon: GitBranch,
    technologies: [
      { name: 'Vercel / AWS', desc: 'Cloud infrastructure matched to your scale and budget' },
      { name: 'CI/CD Pipelines', desc: 'Automated testing, building, and deployment' },
      { name: 'Docker / Kubernetes', desc: 'Containerized deployments when complexity warrants it' },
      { name: 'Monitoring & Observability', desc: 'Know what\'s happening before your users do' },
    ],
  },
];

const serviceTypes = [
  {
    icon: Smartphone,
    title: 'MVP Development',
    description: 'Go from idea to live product in days. AI-accelerated development means your MVP ships before your competitors finish their sprint planning.',
    ideal: 'Startups validating product-market fit',
    timeline: '5-10 days',
    color: '#ff3d00',
  },
  {
    icon: Globe,
    title: 'Web Applications',
    description: 'Full-featured web applications with complex business logic, real-time features, and integrations. AI handles the boilerplate — I focus on the hard parts.',
    ideal: 'Growing companies that need reliability',
    timeline: '2-4 weeks',
    color: '#ff3d00',
  },
  {
    icon: Wrench,
    title: 'Rescue & Refactor',
    description: 'Inherited a codebase that\'s falling apart? AI-assisted analysis diagnoses issues in hours, not days. I stabilize critical paths and get you back on track fast.',
    ideal: 'Teams stuck with legacy or rushed code',
    timeline: '3-10 days',
    color: '#ff3d00',
  },
  {
    icon: Layers,
    title: 'API & System Design',
    description: 'Clean, documented APIs and system architecture that your team can build on for years. AI-generated docs, schemas, and test suites included from day one.',
    ideal: 'Companies building platform products',
    timeline: '3-7 days',
    color: '#ff3d00',
  },
];

const principles = [
  {
    num: '01',
    title: 'Ship Fast, Ship Right',
    desc: 'Speed and quality aren\'t opposites. Modern tooling and decade of experience means you get both. I cut scope, not corners.',
  },
  {
    num: '02',
    title: 'No Black Boxes',
    desc: 'You see progress daily. Every decision is documented. When the project ends, your team can maintain and extend everything I built.',
  },
  {
    num: '03',
    title: 'Performance is a Feature',
    desc: 'Core Web Vitals, bundle size, database queries — I optimize for real-world performance, not benchmark scores.',
  },
  {
    num: '04',
    title: 'Built to Change',
    desc: 'Requirements evolve. Good architecture absorbs change without rewriting everything. I design for adaptation, not perfection.',
  },
];

const processSteps = [
  {
    num: '01',
    title: 'Discovery & Scoping',
    desc: 'We align on what you\'re building, who it\'s for, and what success looks like. I ask hard questions early so there are no surprises later.',
    duration: '1-2 days',
  },
  {
    num: '02',
    title: 'Architecture & Setup',
    desc: 'Tech stack selection, project structure, CI/CD pipeline, and development environment. AI scaffolds the foundation in hours — I fine-tune it.',
    duration: '1 day',
  },
  {
    num: '03',
    title: 'Build Sprints',
    desc: 'Daily deployable increments, not weekly. AI pair-programming means 10x output — you see working software every day. Feedback loops are instant.',
    duration: '1-3 weeks',
  },
  {
    num: '04',
    title: 'Launch & Handoff',
    desc: 'Production deployment, AI-generated docs, and knowledge transfer. Your team gets a codebase they can own, not a dependency on me.',
    duration: '1-2 days',
  },
];

const faqs = [
  {
    q: 'What technologies do you specialize in?',
    a: 'My core stack is React/Next.js, TypeScript, and Node.js. But I\'m technology-agnostic when it matters — if your project needs Vue, Python, or Go, I\'ll either build it or bring in the right person. The goal is solving your problem, not pushing a stack.',
  },
  {
    q: 'Can you work with our existing team?',
    a: 'Absolutely. I integrate into existing teams, follow your git workflow, participate in standups, and do code reviews. I\'m not a black box — I\'m an extension of your engineering org for the duration of the project.',
  },
  {
    q: 'How do you handle project management?',
    a: 'I keep it simple. Linear or GitHub Issues for task tracking, weekly demos, async updates via Slack. No 30-page status reports. You always know where things stand because you see working software, not slides.',
  },
  {
    q: 'What about ongoing maintenance after launch?',
    a: 'I offer retainer arrangements for ongoing maintenance, feature development, and support. But the goal is always to build something your team can own independently. I write clean code, document decisions, and do proper handoffs.',
  },
  {
    q: 'Do you do design work too?',
    a: 'I have strong UI/UX sensibilities and can build polished interfaces from wireframes or design systems. For ground-up brand design, I partner with designers I trust. Either way, you get a product that looks and feels premium.',
  },
];

export default function DevelopmentServicePage() {
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
          <span className="srv-hero-giant-text" style={{ color: 'rgba(255, 61, 0, 0.03)' }}>{'{}'}</span>
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
                CODE
              </span>
              <span
                className="srv-hero-title-line srv-hero-title-line-2"
                style={{ transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -8}px)` }}
              >
                <span className="text-stroke">That</span>
              </span>
              <span
                className="srv-hero-title-line srv-hero-title-line-3"
                style={{ transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 15}px)` }}
              >
                <span style={{ color: '#ff3d00' }}>Ships</span>
              </span>
            </h1>

            <p className="srv-hero-subtitle">
              Production-grade web applications built with modern stack.
              <br />
              <span className="text-[var(--c-text-muted)]">From MVP to enterprise scale — code that performs under pressure.</span>
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <Link href="/contact" className="btn-magnetic">
                <span>Start a project</span>
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

      {/* PRINCIPLES */}
      <section className="srv-process" style={{ borderTop: '1px solid var(--c-border)' }}>
        <div className="container">
          <div className="srv-process-header">
            <span className="label">Philosophy</span>
            <h2 className="srv-process-title">
              How I
              <span style={{ color: '#ff3d00' }}> Think</span>
            </h2>
            <p className="srv-derivative-desc" style={{ maxWidth: '640px', margin: '0 auto' }}>
              Good code is code that solves the problem, ships on time, and doesn&apos;t break at 3 AM. Everything else is ego.
            </p>
          </div>

          <div className="srv-process-steps">
            {principles.map((p) => (
              <div key={p.num} className="srv-process-step">
                <div className="srv-process-step-num" style={{ color: '#ff3d00' }}>{p.num}</div>
                <div className="srv-process-step-line" />
                <h3 className="srv-process-step-title">{p.title}</h3>
                <p className="srv-process-step-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE TYPES */}
      <section className="srv-derivative">
        <div className="container">
          <div className="srv-derivative-header">
            <span className="label">What I Build</span>
            <h2 className="srv-derivative-title">
              Service
              <span style={{ color: '#ff3d00' }}> Types</span>
            </h2>
            <p className="srv-derivative-desc">
              Every project is different. Here&apos;s how engagements typically look.
            </p>
          </div>

          <div className="srv-derivative-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {serviceTypes.map((svc) => (
              <div
                key={svc.title}
                className="srv-derivative-card srv-derivative-card-featured"
                style={{ '--card-color': svc.color } as React.CSSProperties}
              >
                <div className="srv-derivative-card-icon">
                  <svc.icon />
                </div>
                <div className="srv-derivative-card-content">
                  <h3 className="srv-derivative-card-title">{svc.title}</h3>
                  <p className="srv-derivative-card-desc">{svc.description}</p>
                  <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--c-text-muted)' }}>
                      <CheckCircle2 className="w-3.5 h-3.5" style={{ color: '#ff3d00', flexShrink: 0 }} />
                      Ideal for: {svc.ideal}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--c-text-muted)' }}>
                      <Gauge className="w-3.5 h-3.5" style={{ color: '#ff3d00', flexShrink: 0 }} />
                      Timeline: {svc.timeline}
                    </span>
                  </div>
                </div>
                <div className="srv-derivative-card-glow" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="srv-process" style={{ borderTop: '1px solid var(--c-border)' }}>
        <div className="container">
          <div className="srv-process-header">
            <span className="label">Tech Stack</span>
            <h2 className="srv-process-title">
              Tools of
              <span style={{ color: '#ff3d00' }}> the Trade</span>
            </h2>
            <p className="srv-derivative-desc" style={{ maxWidth: '640px', margin: '0 auto' }}>
              I pick the right tool for the job — not the trendiest one on Hacker News.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            {techStack.map((stack) => (
              <div
                key={stack.category}
                style={{
                  background: 'var(--c-surface)',
                  border: '1px solid var(--c-border)',
                  padding: '2rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <stack.icon className="w-5 h-5" style={{ color: '#ff3d00' }} />
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--c-text)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {stack.category}
                  </h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {stack.technologies.map((tech) => (
                    <div key={tech.name}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--c-text)', marginBottom: '0.25rem' }}>
                        {tech.name}
                      </h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--c-text-muted)', lineHeight: 1.5 }}>
                        {tech.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="srv-derivative" style={{ borderTop: '1px solid var(--c-border)' }}>
        <div className="container">
          <div className="srv-derivative-header">
            <span className="label">The Process</span>
            <h2 className="srv-derivative-title">
              How We
              <span style={{ color: '#ff3d00' }}> Ship</span>
            </h2>
          </div>

          <div className="srv-process-steps">
            {processSteps.map((step) => (
              <div key={step.num} className="srv-process-step">
                <div className="srv-process-step-num" style={{ color: '#ff3d00' }}>{step.num}</div>
                <div className="srv-process-step-line" />
                <h3 className="srv-process-step-title">{step.title}</h3>
                <p className="srv-process-step-desc">{step.desc}</p>
                <span style={{ display: 'inline-block', marginTop: '0.75rem', fontSize: '0.75rem', fontWeight: 600, color: '#ff3d00', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {step.duration}
                </span>
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
              <span style={{ color: '#ff3d00' }}> Questions</span>
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
              Let&apos;s Build
              <span className="srv-cta-title-accent"> Something</span>
            </h2>
            <p className="srv-cta-desc">
              Tell me what you&apos;re building. I&apos;ll tell you how I can help.
              <br />
              No sales pitch — just a technical conversation.
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
