import type { CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ScrollProgress } from '@/components/ScrollProgress';
import { FooterAwwwards } from '@/components/FooterAwwwards';

const services = [
  {
    id: '01',
    slug: 'development',
    name: 'Software Engineering',
    tagline: 'Software that gets out of the way.',
    description:
      'Full-stack products built with Next.js, React, and TypeScript, with the API design and cloud architecture underneath to hold up under real traffic long after launch day.',
    color: '#ff3d00',
    goodFit: [
      'You need an MVP that can grow into the real product',
      'Your current app slows down or buckles under load',
      'You want senior hands without hiring a full team',
    ],
    deliverables: [
      'Typed, reviewed code that lives in your repository',
      'A CI/CD pipeline and deployment ready to run',
      'Weekly releases you can actually click through',
    ],
  },
  {
    id: '02',
    slug: 'ai',
    name: 'AI Engineering',
    tagline: 'Agents and automations that hold up in production.',
    description:
      'Custom agents, LLM integration, and workflow automation, built into your stack and measured against real outcomes rather than benchmarks on a slide.',
    color: '#00ff88',
    goodFit: [
      'A repetitive process is quietly eating hours every week',
      'You want an LLM feature in the product, not another proof of concept',
      'You shipped an AI tool and it broke the moment real users arrived',
    ],
    deliverables: [
      'A working integration running inside your own stack',
      'Evaluations and tests that keep model behavior honest',
      'Documentation your team can maintain after I hand it over',
    ],
  },
  {
    id: '03',
    slug: 'consulting',
    name: 'Technical Consulting',
    tagline: 'The hard technical calls, made with you.',
    description:
      'Architecture and code review, including AI-generated codebases, plus technology strategy from someone who still ships production code every week.',
    color: '#8b5cf6',
    goodFit: [
      'You are facing an architecture decision you would rather not make blind',
      'A codebase needs expert eyes before you invest further in it',
      'You want a second opinion on a vendor or a stack choice',
    ],
    deliverables: [
      'Written recommendations with priorities you can act on',
      'The real risks and trade-offs, not generic advice',
      'A decision you can defend to your team and your board',
    ],
  },
];

const steps = [
  {
    hash: 'a1f3c9e',
    ref: 'scope',
    color: '#00ff88',
    message: 'Define the problem, the constraints, and what “done” means before any code gets written.',
    head: false,
  },
  {
    hash: '7b2e40d',
    ref: 'build',
    color: '#ff3d00',
    message: 'Release working software every week, so progress is something you can run, not a status report.',
    head: false,
  },
  {
    hash: 'e4d8a1c',
    ref: 'ship',
    color: '#8b5cf6',
    message: 'Deploy, monitor, and hand over a codebase your team can keep running without me.',
    head: true,
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
            No agency overhead, no juniors on your budget. Just a senior engineer
            who ships production software and AI, and still writes the code every
            week.{' '}
            <strong>10+ years in.</strong>
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

          <div className="srv2-graph">
            <div className="srv2-graph-cmd">
              <span className="srv2-graph-prompt">$</span> git log --graph --oneline --reverse
            </div>

            <ol className="srv2-graph-log">
              {steps.map((step) => (
                <li
                  key={step.hash}
                  className="srv2-graph-commit"
                  style={{ '--srv2-accent': step.color } as CSSProperties}
                >
                  <span className="srv2-graph-rail" aria-hidden="true">
                    <span className="srv2-graph-node" />
                  </span>
                  <div className="srv2-graph-body">
                    <div className="srv2-graph-meta">
                      <span className="srv2-graph-hash">{step.hash}</span>
                      <span className="srv2-graph-ref">{step.ref}</span>
                      {step.head && <span className="srv2-graph-ref srv2-graph-head">HEAD → main</span>}
                    </div>
                    <p className="srv2-graph-msg">{step.message}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="srv2-cta">
        <div className="container">
          <h2 className="srv2-cta-title">
            Not sure which
            <br />
            one fits?
          </h2>
          <p className="srv2-cta-desc">
            Tell me what you&apos;re building. I&apos;ll point you to the right one, or tell
            you honestly if I&apos;m not it.
          </p>
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
