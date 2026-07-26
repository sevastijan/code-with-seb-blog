import type { CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Plus, Check } from 'lucide-react';
import { ScrollProgress } from '@/components/ScrollProgress';
import { FooterAwwwards } from '@/components/FooterAwwwards';
import { ContactForm } from '@/components/ContactForm';

const ACCENT = '#ff3d00';

const buildTypes = [
  {
    num: '01',
    title: 'MVP Development',
    desc: 'Idea to a live product in a couple of weeks, not quarters. I cut scope to the core that proves the idea, ship it, and leave you something real to put in front of users.',
    ideal: 'Founders validating product-market fit',
    timeline: '1–2 weeks',
  },
  {
    num: '02',
    title: 'Web Applications',
    desc: 'Full-featured applications with real business logic, real-time features, and the integrations your product actually needs — built to stay maintainable as it grows.',
    ideal: 'Teams past the prototype stage',
    timeline: '3–6 weeks',
  },
  {
    num: '03',
    title: 'Rescue & Refactor',
    desc: 'Inherited a codebase that fights back? I stabilize the critical paths first, then untangle the rest — so you can ship again without betting the company on a full rewrite.',
    ideal: 'Teams stuck with rushed or legacy code',
    timeline: '1–3 weeks',
  },
  {
    num: '04',
    title: 'API & System Design',
    desc: 'Clean, documented APIs and a system architecture your team can build on for years — with schemas and tests in place from the first commit, not bolted on later.',
    ideal: 'Companies building platform products',
    timeline: '1–2 weeks',
  },
];

const promises = [
  {
    title: 'Runnable progress every week',
    desc: 'You click through working software every Friday, not a status report. Feedback lands while changes are still cheap.',
  },
  {
    title: 'Your code from commit one',
    desc: 'Everything lives in your repository, typed and documented. No lock-in, no “it only runs on my machine.”',
  },
  {
    title: 'Fast delivery, no cleanup bill',
    desc: 'A decade of shipping means speed that does not turn into next quarter’s rewrite. I cut scope, never corners.',
  },
  {
    title: 'Performance where users feel it',
    desc: 'Core Web Vitals, bundle size, query times — tuned for the real experience, not a screenshot of a benchmark.',
  },
  {
    title: 'Architecture that bends',
    desc: 'Requirements change. Good structure absorbs it without a rewrite, so the product keeps moving as you grow.',
  },
  {
    title: 'A clean handover, always',
    desc: 'When we are done your team owns it: documented decisions, a walkthrough, and code they can extend without me.',
  },
];

const techStack = [
  {
    category: 'Frontend',
    items: [
      { name: 'React / Next.js', desc: 'Server components, SSR, ISR — the full rendering spectrum' },
      { name: 'TypeScript', desc: 'Type-safe by default, not bolted on later' },
      { name: 'Tailwind CSS', desc: 'Consistent UI without a bespoke design system to maintain' },
      { name: 'shadcn/ui & Radix', desc: 'Accessible components you own, not a black-box library' },
      { name: 'TanStack Query', desc: 'Server state, caching, and mutations handled properly' },
      { name: 'Framer Motion', desc: 'Motion and micro-interactions that feel intentional' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js / Bun', desc: 'High-performance server-side JavaScript' },
      { name: 'REST, GraphQL & tRPC', desc: 'API design that scales with the product, type-safe end to end' },
      { name: 'Prisma / Drizzle', desc: 'Typed database access with migrations you can trust' },
      { name: 'PostgreSQL / Redis', desc: 'A battle-tested data layer with sensible caching' },
      { name: 'Auth & Payments', desc: 'Auth.js, Clerk, and Stripe wired in without the footguns' },
      { name: 'Serverless & Edge', desc: 'Deploy where it fits the workload, not the hype' },
    ],
  },
  {
    category: 'DevOps',
    items: [
      { name: 'Vercel / AWS / Cloudflare', desc: 'Infrastructure matched to your scale and budget' },
      { name: 'GitHub Actions CI/CD', desc: 'Automated testing, builds, and deploys on every push' },
      { name: 'Docker / Kubernetes', desc: 'Containers when the complexity actually warrants them' },
      { name: 'Terraform', desc: 'Infrastructure as code, reproducible across environments' },
      { name: 'Sentry & OpenTelemetry', desc: 'Know what is breaking before your users tell you' },
    ],
  },
  {
    category: 'Testing & Quality',
    items: [
      { name: 'Vitest / Jest', desc: 'Fast unit tests that actually get written' },
      { name: 'Playwright', desc: 'End-to-end coverage on the flows that make you money' },
      { name: 'Testing Library', desc: 'Tests that mirror how real users behave' },
      { name: 'ESLint / Prettier / Biome', desc: 'A consistent codebase without bikeshedding in reviews' },
      { name: 'Type-safe contracts', desc: 'Zod schemas so bad data fails loudly, not silently' },
    ],
  },
  {
    category: 'AI & Data',
    items: [
      { name: 'OpenAI / Anthropic SDKs', desc: 'LLM features wired into the product, not a demo' },
      { name: 'Vercel AI SDK', desc: 'Streaming, tools, and structured output done cleanly' },
      { name: 'pgvector / Pinecone', desc: 'Semantic search and RAG on your own data' },
      { name: 'Background jobs & queues', desc: 'Inngest and workers for anything slow or scheduled' },
      { name: 'Analytics & events', desc: 'Product data you can actually make decisions from' },
    ],
  },
];

const steps = [
  {
    hash: 'd15c0e7',
    ref: 'discovery',
    message:
      'Align on what you are building, who it is for, and what “done” means. I ask the hard questions early, so nothing surprises us later.',
    head: false,
  },
  {
    hash: 'a3c4172',
    ref: 'architecture',
    message:
      'Stack, project structure, CI/CD, and environments — the foundation set up right before any feature work begins.',
    head: false,
  },
  {
    hash: 'b8e9f04',
    ref: 'build',
    message:
      'Deployable increments every week. You run working software and give feedback while it is still cheap to change.',
    head: false,
  },
  {
    hash: 'e4d8a1c',
    ref: 'launch',
    message:
      'Production deployment, documentation, and a handover. Your team owns the codebase — not a dependency on me.',
    head: true,
  },
];

const faqs = [
  {
    q: 'What technologies do you specialize in?',
    a: 'My core stack is React/Next.js, TypeScript, and Node.js. But I am technology-agnostic when it matters — if the project needs Vue, Python, or Go, I will build it or bring in the right person. The goal is solving your problem, not defending a stack.',
  },
  {
    q: 'Can you work with our existing team?',
    a: 'Yes. I integrate into existing teams, follow your git workflow, join standups, and review code. I am an extension of your engineering org for the duration of the project, not a black box.',
  },
  {
    q: 'How do you handle project management?',
    a: 'I keep it simple: Linear or GitHub Issues for tasks, a weekly demo, async updates. No 30-page status reports — you always know where things stand because you can run the software.',
  },
  {
    q: 'What about maintenance after launch?',
    a: 'I offer retainer arrangements for ongoing work and support, but the goal is always something your team can own independently. Clean code, documented decisions, and a proper handover.',
  },
  {
    q: 'Do you do design work too?',
    a: 'I can build polished interfaces from wireframes or an existing design system. For ground-up brand design I partner with designers I trust. Either way, you get a product that looks and feels considered.',
  },
];

export default function DevelopmentServicePage() {
  return (
    <div className="grain" style={{ '--srv2-accent': ACCENT } as CSSProperties}>
      <ScrollProgress />

      {/* HERO */}
      <section className="dev-hero">
        <div className="container">
          <Link href="/services" className="srv2-back">
            <ArrowLeft />
            <span>All services</span>
          </Link>
          <h1 className="dev-hero-title">
            Ship the product your roadmap keeps <em>promising.</em>
          </h1>
          <p className="dev-hero-sub">
            I design and build production web apps and AI features end to end — from an
            empty repo to live, scalable, and handed to your team. 10+ years, senior-only,
            no agency overhead.
          </p>
          <div className="dev-hero-cta">
            <Link href="/contact" className="dev-btn dev-btn-primary">
              <span>Book a call</span>
              <ArrowRight />
            </Link>
            <a href="#engagements" className="dev-btn dev-btn-ghost">
              <span>See what I build</span>
            </a>
          </div>
          <div className="dev-hero-proof">
            <div className="dev-hero-stats">
              <div>
                <div className="dev-stat-num">10<span>+</span></div>
                <div className="dev-stat-label">Years in production</div>
              </div>
              <div>
                <div className="dev-stat-num">Weekly</div>
                <div className="dev-stat-label">Releases you can run</div>
              </div>
              <div>
                <div className="dev-stat-num">Yours</div>
                <div className="dev-stat-label">Code, docs, full handover</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT I BUILD */}
      <section id="engagements" className="srv2-sec">
        <div className="container">
          <div className="srv2-process-header">
            <span className="label">What I build</span>
            <h2 className="srv2-process-title">Engagements</h2>
            <p className="srv2-sec-lead">
              Every project is different. These are the shapes most of them take.
            </p>
          </div>

          <div className="srv2-cards">
            {buildTypes.map((item) => (
              <article key={item.num} className="srv2-card">
                <h3 className="srv2-card-title">{item.title}</h3>
                <p className="srv2-card-desc">{item.desc}</p>
                <div className="srv2-card-meta">
                  <div className="srv2-card-meta-row">
                    <span className="srv2-card-meta-key">Ideal</span>
                    <span>{item.ideal}</span>
                  </div>
                  <div className="srv2-card-meta-row">
                    <span className="srv2-card-meta-key">Timeline</span>
                    <span>{item.timeline}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU CAN COUNT ON */}
      <section className="dev-promises">
        <div className="container">
          <div className="dev-promises-layout">
            <div className="dev-promises-intro">
              <span className="label">How I work</span>
              <h2 className="dev-promises-title">
                Hiring an engineer is a risk. Here is how I take it off the table.
              </h2>
              <p className="srv2-sec-lead">
                Six things you can hold me to on every engagement. No fine print.
              </p>
              <a href="#contact" className="dev-btn dev-btn-primary dev-promises-cta">
                <span>Start a project</span>
                <ArrowRight />
              </a>
            </div>

            <ul className="dev-promises-list">
              {promises.map((p) => (
                <li key={p.title} className="dev-promise">
                  <span className="dev-promise-check" aria-hidden="true">
                    <Check />
                  </span>
                  <div>
                    <h3 className="dev-promise-title">{p.title}</h3>
                    <p className="dev-promise-desc">{p.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="srv2-sec">
        <div className="container">
          <div className="srv2-process-header">
            <span className="label">Tech stack</span>
            <h2 className="srv2-process-title">Tools of the trade</h2>
            <p className="srv2-sec-lead">
              I pick the right tool for the job — not the trendiest one on Hacker
              News.
            </p>
          </div>

          <div className="srv2-stack">
            {techStack.map((group) => (
              <div key={group.category} className="srv2-stack-group">
                <h3 className="srv2-stack-cat">{group.category}</h3>
                <div className="srv2-stack-list">
                  {group.items.map((tech) => (
                    <div key={tech.name}>
                      <div className="srv2-stack-name">{tech.name}</div>
                      <div className="srv2-stack-desc">{tech.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="srv2-process">
        <div className="container">
          <div className="srv2-process-header">
            <span className="label">How it ships</span>
            <h2 className="srv2-process-title">Discovery to launch.</h2>
          </div>

          <div className="srv2-graph">
            <div className="srv2-graph-cmd">
              <span className="srv2-graph-prompt">$</span> git log --graph --oneline --reverse
            </div>

            <ol className="srv2-graph-log">
              {steps.map((step) => (
                <li key={step.hash} className="srv2-graph-commit">
                  <span className="srv2-graph-rail" aria-hidden="true">
                    <span className="srv2-graph-node" />
                  </span>
                  <div className="srv2-graph-body">
                    <div className="srv2-graph-meta">
                      <span className="srv2-graph-hash">{step.hash}</span>
                      <span className="srv2-graph-ref">{step.ref}</span>
                      {step.head && (
                        <span className="srv2-graph-ref srv2-graph-head">HEAD → main</span>
                      )}
                    </div>
                    <p className="srv2-graph-msg">{step.message}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="srv2-sec">
        <div className="container">
          <div className="srv2-process-header">
            <span className="label">FAQ</span>
            <h2 className="srv2-process-title">Common questions</h2>
          </div>

          <div className="srv2-faq">
            {faqs.map((faq, index) => (
              <details key={faq.q} className="srv2-faq-item">
                <summary className="srv2-faq-q">
                  <span className="srv2-faq-num">{String(index + 1).padStart(2, '0')}</span>
                  <span>{faq.q}</span>
                  <Plus className="srv2-faq-icon" />
                </summary>
                <p className="srv2-faq-a">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="dev-contact">
        <div className="container">
          <div className="dev-contact-layout">
            <div className="dev-contact-intro">
              <span className="label">Start a project</span>
              <h2 className="dev-contact-title">
                Tell me what you&apos;re building.
              </h2>
              <p className="dev-contact-lead">
                A few lines about the product and where it&apos;s stuck is enough. I read
                every message and reply within 24 hours — honestly, even if the answer is
                that I&apos;m not the right fit.
              </p>
              <ul className="dev-contact-points">
                <li>
                  <Check aria-hidden="true" />
                  <span>No sales call, just a real conversation</span>
                </li>
                <li>
                  <Check aria-hidden="true" />
                  <span>Reply within 24 hours, usually faster</span>
                </li>
                <li>
                  <Check aria-hidden="true" />
                  <span>Currently accepting new projects</span>
                </li>
              </ul>
            </div>

            <div className="dev-contact-form">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <FooterAwwwards />
    </div>
  );
}
