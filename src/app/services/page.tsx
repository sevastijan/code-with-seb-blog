import type { CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ScrollProgress } from '@/components/ScrollProgress';
import { FooterAwwwards } from '@/components/FooterAwwwards';

const services = [
  {
    id: '01',
    slug: 'ai',
    name: 'AI Engineering',
    tagline: 'Practical AI, not demos.',
    description:
      'Custom agents, LLM integration, and workflow automation — built into your stack and measured against real outcomes, not benchmarks in a slide deck.',
    color: '#00ff88',
    goodFit: [
      'You have a repetitive process that eats hours every week',
      'You want an LLM feature in your product, not a proof of concept',
      'You tried an AI tool and it fell apart in production',
    ],
    deliverables: [
      'A working integration running in your stack',
      'Evaluation and tests for model behavior',
      'Documentation your team can maintain without me',
    ],
  },
  {
    id: '02',
    slug: 'development',
    name: 'Web Development',
    tagline: 'Production-grade web applications.',
    description:
      'Next.js, React, and TypeScript applications with solid API design and cloud architecture. Built to survive real users, not just the demo.',
    color: '#ff3d00',
    goodFit: [
      'You need an MVP that can grow into the real product',
      'Your existing app is slowing down or breaking under load',
      'You need senior hands without hiring a full team',
    ],
    deliverables: [
      'Code in your repository, reviewed and typed',
      'CI/CD pipeline and deployment setup',
      'Predictable iterations with working software each week',
    ],
  },
  {
    id: '03',
    slug: 'consulting',
    name: 'Technical Consulting',
    tagline: 'Senior judgment, on demand.',
    description:
      'Architecture review, code review — including AI-generated codebases — and technology strategy from someone who still ships production code every week.',
    color: '#8b5cf6',
    goodFit: [
      'You face an architecture decision you don\'t want to make blind',
      'A codebase needs expert eyes before you invest further',
      'You need a second opinion on a vendor or stack choice',
    ],
    deliverables: [
      'Written recommendations with clear priorities',
      'Concrete risks and trade-offs, not generic advice',
      'A decision you can defend to your team and board',
    ],
  },
];

const steps = [
  {
    num: '01',
    title: 'Scope',
    desc: 'We define the problem, the constraints, and what done means — before any code is written.',
  },
  {
    num: '02',
    title: 'Build',
    desc: 'Short iterations with working software at the end of each one. You see progress, not status reports.',
  },
  {
    num: '03',
    title: 'Ship',
    desc: 'Deployment, monitoring, and a handover your team can maintain without me on speed dial.',
  },
];

export default function ServicesPage() {
  return (
    <div className="grain">
      <ScrollProgress />

      {/* HERO */}
      <section className="srv2-hero">
        <div className="container">
          <span className="label">Services</span>
          <h1 className="srv2-hero-title">
            Software that ships.
            <br />
            AI that works.
          </h1>
          <p className="srv2-hero-sub">
            I design, build, and review production systems — web applications, AI
            integrations, and the architecture behind them.{' '}
            <strong>10+ years of hands-on engineering.</strong>
          </p>
          <nav className="srv2-hero-nav" aria-label="Services on this page">
            {services.map((service) => (
              <a
                key={service.id}
                href={`#${service.slug}`}
                className="srv2-hero-link"
                style={{ '--srv2-accent': service.color } as CSSProperties}
              >
                <span className="srv2-hero-link-num">{service.id}</span>
                <span>{service.name}</span>
                <ArrowUpRight className="srv2-hero-link-arrow" />
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* SERVICES */}
      <section className="srv2-services">
        <div className="container">
          {services.map((service) => (
            <article
              key={service.id}
              id={service.slug}
              className="srv2-service"
              style={{ '--srv2-accent': service.color } as CSSProperties}
            >
              <div className="srv2-service-head">
                <span className="srv2-service-num">{service.id}</span>
                <h2 className="srv2-service-title">{service.name}</h2>
                <p className="srv2-service-tagline">{service.tagline}</p>
              </div>

              <div className="srv2-service-body">
                <p className="srv2-service-desc">{service.description}</p>

                <div className="srv2-service-lists">
                  <div>
                    <h3 className="label">Good fit if</h3>
                    <ul className="srv2-list">
                      {service.goodFit.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="label">What you get</h3>
                    <ul className="srv2-list">
                      {service.deliverables.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link href={`/services/${service.slug}`} className="srv2-service-cta">
                  <span>Learn more</span>
                  <ArrowRight />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="srv2-process">
        <div className="container">
          <div className="srv2-process-header">
            <span className="label">How it works</span>
            <h2 className="srv2-process-title">Scope. Build. Ship.</h2>
          </div>

          <div className="srv2-process-steps">
            {steps.map((step) => (
              <div key={step.num} className="srv2-process-step">
                <span className="srv2-process-step-num">{step.num}</span>
                <h3 className="srv2-process-step-title">{step.title}</h3>
                <p className="srv2-process-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="srv2-cta">
        <div className="container">
          <div>
            <h2 className="srv2-cta-title">Have a project in mind?</h2>
            <p className="srv2-cta-desc">
              Tell me what you&apos;re building and where it&apos;s stuck. I&apos;ll tell you
              honestly whether I can help.
            </p>
          </div>
          <Link href="/contact" className="srv2-cta-btn">
            <span>Start a conversation</span>
            <ArrowRight />
          </Link>
        </div>
      </section>

      <FooterAwwwards />
    </div>
  );
}
