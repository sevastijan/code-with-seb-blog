import type { CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ScrollProgress } from '@/components/ScrollProgress';
import { FooterAwwwards } from '@/components/FooterAwwwards';

const ACCENT = '#ff3d00';

const sections = [
  { id: 'story', num: '01', label: 'Story' },
  { id: 'values', num: '02', label: 'Values' },
  { id: 'stack', num: '03', label: 'Stack' },
];

const values = [
  {
    title: 'Ownership',
    description:
      'When I take on a project, it becomes my problem to solve. No excuses, no finger-pointing, just results.',
    color: '#ff3d00',
  },
  {
    title: 'Speed',
    description:
      'Fast does not mean sloppy. I move quickly by making smart decisions upfront and iterating with purpose.',
    color: '#00ff88',
  },
  {
    title: 'Quality',
    description:
      'I do not ship anything I would not be proud to put my name on. Every line of code and every pixel matters.',
    color: '#8b5cf6',
  },
  {
    title: 'Clarity',
    description:
      'Complex problems deserve simple explanations. I communicate with precision and cut through the noise.',
    color: '#f59e0b',
  },
];

const stackCategories = [
  {
    title: 'AI & Automation',
    items: [
      { name: 'Claude Code / Cursor', desc: 'AI pair-programming' },
      { name: 'OpenAI / Anthropic APIs', desc: 'LLM integration' },
      { name: 'LangChain / LangGraph', desc: 'Agent orchestration' },
      { name: 'Vercel AI SDK', desc: 'Streaming & tool use' },
      { name: 'MCP', desc: 'Agent-tool connectivity' },
      { name: 'RAG / Vector DBs', desc: 'Pinecone, Weaviate, pgvector' },
      { name: 'Python', desc: 'ML pipelines & scripting' },
    ],
  },
  {
    title: 'Languages',
    items: [
      { name: 'TypeScript', desc: 'Type-safe everything' },
      { name: 'JavaScript', desc: 'The foundation' },
      { name: 'Java', desc: 'Enterprise & Spring Boot' },
      { name: 'PHP', desc: 'WordPress & server-side' },
      { name: 'Dart', desc: 'Flutter mobile apps' },
    ],
  },
  {
    title: 'Frontend',
    items: [
      { name: 'React', desc: 'UI library of choice' },
      { name: 'Next.js', desc: 'Full-stack React framework' },
      { name: 'React Native', desc: 'Cross-platform mobile' },
      { name: 'Tailwind CSS', desc: 'Utility-first styling' },
      { name: 'Redux', desc: 'State management' },
      { name: 'Vitest / Playwright', desc: 'Testing & E2E' },
    ],
  },
  {
    title: 'Backend & Data',
    items: [
      { name: 'Node.js', desc: 'Server runtime' },
      { name: 'Express.js', desc: 'HTTP framework' },
      { name: 'Spring Boot', desc: 'Java enterprise framework' },
      { name: 'GraphQL', desc: 'Query language for APIs' },
      { name: 'PostgreSQL / MySQL', desc: 'Relational databases' },
      { name: 'MongoDB', desc: 'Document database' },
      { name: 'Firebase', desc: 'Realtime & serverless' },
    ],
  },
  {
    title: 'Infra & DevOps',
    items: [
      { name: 'AWS', desc: 'Cloud infrastructure' },
      { name: 'Vercel', desc: 'Edge deployment' },
      { name: 'Docker / Kubernetes', desc: 'Containers & orchestration' },
      { name: 'CI/CD', desc: 'GitHub Actions & pipelines' },
      { name: 'Git', desc: 'Version control' },
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="grain about-page" style={{ '--srv2-accent': ACCENT } as CSSProperties}>
      <ScrollProgress />

      {/* HERO */}
      <section className="srv2-hero">
        <div className="container">
          <span className="label">About</span>
          <h1 className="srv2-hero-title">
            I&apos;m Sebastian.
          </h1>
          <p className="srv2-hero-sub">
            Senior software developer and AI specialist. Ten years shipping production
            software, and writing about how it&apos;s done.{' '}
            <strong>Based in Cracow, working worldwide.</strong>
          </p>
          <nav className="srv2-hero-nav" aria-label="On this page">
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className="srv2-hero-link">
                <span className="srv2-hero-link-num">{section.num}</span>
                <span>{section.label}</span>
                <ArrowUpRight className="srv2-hero-link-arrow" />
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="srv2-sec">
        <div className="container">
          <div className="srv2-process-header">
            <span className="label">The short version</span>
            <h2 className="srv2-process-title">A decade of building things that matter.</h2>
          </div>

          <div className="abt2-story abt2-story-split">
            <div className="abt2-story-main">
              <div className="abt2-prose">
                <p>
                  I&apos;ve spent over a decade building software, from scrappy startups to
                  enterprise systems used by millions. Along the way I learned that the
                  difference between good and great is not just about code.
                </p>
                <p>
                  It&apos;s about <strong>taking ownership</strong>. It&apos;s about clear
                  communication. It&apos;s about understanding that software exists to solve
                  real problems for real people.
                </p>
                <p>
                  Today I work with a handful of clients on projects where I can make a real
                  impact, from AI automation that saves thousands of hours to web
                  applications that scale. And I write about everything I learn along the way.
                </p>
              </div>

              <Link href="/blog" className="srv2-service-cta abt2-prose-cta">
                <span>Read my writing</span>
                <ArrowRight />
              </Link>
            </div>

            <figure className="abt2-story-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sebastian.jpg" alt="Sebastian Ślęczka" loading="lazy" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sebastian.jpg" alt="" aria-hidden="true" className="abt2-photo-fx abt2-photo-fx-1" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sebastian.jpg" alt="" aria-hidden="true" className="abt2-photo-fx abt2-photo-fx-2" />
              <figcaption className="abt2-story-caption" data-text="// yep, that's me :)">
                yep, that&apos;s me :)
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section id="values" className="srv2-sec">
        <div className="container">
          <div className="srv2-process-header">
            <span className="label">What I believe</span>
            <h2 className="srv2-process-title">Values</h2>
            <p className="srv2-sec-lead">
              Not corporate buzzwords. The principles behind every decision I make.
            </p>
          </div>

          <div className="srv2-cards">
            {values.map((value) => (
              <article
                key={value.title}
                className="srv2-card"
                style={{ '--srv2-accent': value.color } as CSSProperties}
              >
                <h3 className="srv2-card-title">{value.title}</h3>
                <p className="srv2-card-desc">{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* STACK */}
      <section id="stack" className="srv2-sec">
        <div className="container">
          <div className="srv2-process-header">
            <span className="label">Tools of the trade</span>
            <h2 className="srv2-process-title">Tech stack</h2>
            <p className="srv2-sec-lead">
              A decade of range. I pick the right tool for the job, not the trendiest one.
            </p>
          </div>

          <div className="srv2-stack">
            {stackCategories.map((cat) => (
              <div key={cat.title} className="srv2-stack-group">
                <h3 className="srv2-stack-cat">{cat.title}</h3>
                <div className="srv2-stack-list">
                  {cat.items.map((item) => (
                    <div key={item.name}>
                      <div className="srv2-stack-name">{item.name}</div>
                      <div className="srv2-stack-desc">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="srv2-cta">
        <div className="container">
          <h2 className="srv2-cta-title">
            Let&apos;s build
            <br />
            something.
          </h2>
          <p className="srv2-cta-desc">
            Have a project in mind? Tell me what you&apos;re working on. No pitch decks, no
            sales calls, just a real conversation.
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
