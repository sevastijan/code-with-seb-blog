import type { CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Plus, Check } from 'lucide-react';
import { ScrollProgress } from '@/components/ScrollProgress';
import { FooterAwwwards } from '@/components/FooterAwwwards';
import { ContactForm } from '@/components/ContactForm';

const ACCENT = '#00ff88';

const outcomes = [
  {
    title: 'Automate a manual process',
    desc: 'Turn a repetitive, human-in-the-loop task into an AI workflow that runs on its own: document processing, triage, reporting, data entry.',
    ideal: 'Teams drowning in repetitive work',
    timeline: '1–3 weeks',
  },
  {
    title: 'Put AI inside your product',
    desc: 'Ship an LLM feature your users actually reach for: assistants, search, generation, classification. Wired into your stack, not a standalone demo.',
    ideal: 'Product teams adding AI',
    timeline: '2–5 weeks',
  },
  {
    title: 'Make sense of your data',
    desc: 'Retrieval and extraction over your own documents and systems. Semantic search, RAG, and enrichment that turn messy data into answers.',
    ideal: 'Companies sitting on unstructured data',
    timeline: '2–4 weeks',
  },
  {
    title: 'Rescue a stalled AI project',
    desc: 'A prototype that impressed in the demo but fell apart in production. I stabilise accuracy, cost, and reliability so it can actually ship.',
    ideal: 'Teams stuck with a POC that broke',
    timeline: '1–2 weeks',
  },
];

const promises = [
  {
    title: 'Problem first, not the model',
    desc: 'I start from your business problem. If AI is not the right tool, I say so before you spend a cent on it.',
  },
  {
    title: 'Proof before you commit',
    desc: 'A working proof of concept on your real data comes first. If the numbers do not hold up, we stop there.',
  },
  {
    title: 'Your data stays yours',
    desc: 'Private deployments on your infrastructure, GDPR-ready. Your data never trains someone else’s model.',
  },
  {
    title: 'Production-grade, not a notebook',
    desc: 'Evals, error handling, monitoring, and cost controls. Built to run unattended, not to demo once and break.',
  },
  {
    title: 'Costs you can predict',
    desc: 'Model choice, caching, and routing tuned so the bill does not surprise you when usage grows.',
  },
  {
    title: 'A clean handover, always',
    desc: 'Documented prompts, evals, and infrastructure your team can own and extend without me on call.',
  },
];

const techStack = [
  {
    category: 'Models & SDKs',
    items: [
      { name: 'OpenAI / Anthropic', desc: 'Frontier models chosen per task, not by hype' },
      { name: 'Open models', desc: 'Llama, Mistral, and friends when private or cheaper wins' },
      { name: 'Vercel AI SDK', desc: 'Streaming, tools, and structured output done cleanly' },
      { name: 'Structured output', desc: 'Zod-typed responses so bad data fails loudly' },
    ],
  },
  {
    category: 'Agents & Orchestration',
    items: [
      { name: 'Tool & function calling', desc: 'Models that take actions, not just chat' },
      { name: 'Multi-step agents', desc: 'Planning, memory, and human-in-the-loop safeguards' },
      { name: 'Inngest / queues', desc: 'Durable background jobs for anything slow or scheduled' },
      { name: 'Workflow engines', desc: 'Reliable pipelines instead of one giant prompt' },
    ],
  },
  {
    category: 'Retrieval & Data',
    items: [
      { name: 'pgvector / Pinecone', desc: 'Semantic search and RAG on your own data' },
      { name: 'Embeddings & chunking', desc: 'Retrieval tuned for precision, not just recall' },
      { name: 'Document extraction', desc: 'Parse PDFs, contracts, and forms into clean fields' },
      { name: 'Entity linking', desc: 'Connect messy records into something queryable' },
    ],
  },
  {
    category: 'Evaluation & Safety',
    items: [
      { name: 'Eval suites', desc: 'Measured accuracy before and after every change' },
      { name: 'Guardrails', desc: 'Validation, moderation, and fallback behaviour' },
      { name: 'Langfuse / tracing', desc: 'See what the model did and why, in production' },
      { name: 'Prompt versioning', desc: 'Changes you can test, ship, and roll back' },
    ],
  },
  {
    category: 'Infra & Delivery',
    items: [
      { name: 'Serverless & Edge', desc: 'Deploy where it fits the workload and the budget' },
      { name: 'Private deployments', desc: 'On your cloud, your VPC, your compliance rules' },
      { name: 'Monitoring & cost caps', desc: 'Know spend and latency before your users do' },
      { name: 'CI/CD', desc: 'Automated tests, builds, and deploys on every push' },
    ],
  },
];

const steps = [
  {
    hash: 'a91f2c4',
    ref: 'assess',
    message:
      'Map your workflows, find where AI actually pays off, and score each opportunity by impact and feasibility. You get a roadmap, not a pitch.',
    head: false,
  },
  {
    hash: 'c47db09',
    ref: 'prototype',
    message:
      'Build a working proof of concept on your real data. We prove the value before committing to a full build.',
    head: false,
  },
  {
    hash: 'f2a6e18',
    ref: 'build',
    message:
      'Turn the validated concept into production software: evals, monitoring, security, and cost controls from day one.',
    head: false,
  },
  {
    hash: 'e4d8a1c',
    ref: 'launch',
    message:
      'Deploy with feedback loops, then tune accuracy, speed, and coverage against real usage. Your team owns it.',
    head: true,
  },
];

const faqs = [
  {
    q: 'Do I need a large dataset to get started?',
    a: 'No. Many AI solutions work with your existing data, documents, and systems. For LLM-based work we can start with zero training data and iterate. The key is a clear problem to solve, not a massive dataset.',
  },
  {
    q: 'How do you handle data privacy and security?',
    a: 'Data security is non-negotiable. I work with private deployments and on-premise models when needed, and keep processing within GDPR and SOC 2 expectations. Your data never leaves your infrastructure unless you decide it should.',
  },
  {
    q: 'What is the typical ROI timeline?',
    a: 'Most clients see measurable value within a few weeks of deployment. The proof-of-concept phase is designed to validate that value before you commit to a full build. If the numbers do not work, we stop.',
  },
  {
    q: 'Can you integrate with our existing stack?',
    a: 'Yes. I build AI that plugs into what you already run, whether that is Salesforce, Slack, custom APIs, or legacy systems. The goal is augmentation, not a rip-and-replace.',
  },
  {
    q: 'What if AI is not the right solution?',
    a: 'I will tell you. Not every problem needs AI. Sometimes a well-designed automation, a better query, or a process change is the right answer. I am here to solve the problem, not to sell you a model.',
  },
];

export default function AIServicePage() {
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
            Ship AI that <em>earns its keep.</em>
          </h1>
          <p className="dev-hero-sub">
            I find where AI actually pays off in your business, prove it on your real
            data, and ship it to production. No hype, no demo-ware. 10+ years of
            engineering behind every call.
          </p>
          <div className="dev-hero-cta">
            <Link href="#contact" className="dev-btn dev-btn-primary">
              <span>Book a call</span>
              <ArrowRight />
            </Link>
            <a href="#outcomes" className="dev-btn dev-btn-ghost">
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
                <div className="dev-stat-num">Days</div>
                <div className="dev-stat-label">To a working proof of concept</div>
              </div>
              <div>
                <div className="dev-stat-num">Yours</div>
                <div className="dev-stat-label">Models, code, full handover</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT I BUILD */}
      <section id="outcomes" className="srv2-sec">
        <div className="container">
          <div className="srv2-process-header">
            <span className="label">What I build</span>
            <h2 className="srv2-process-title">Outcomes</h2>
            <p className="srv2-sec-lead">
              I sell results, not model names. These are the shapes most AI projects take.
            </p>
          </div>

          <div className="srv2-cards">
            {outcomes.map((item) => (
              <article key={item.title} className="srv2-card">
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
                AI is easy to demo and hard to trust. Here is how I earn it.
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
              I pick the right model and tool for the job, not the loudest one on the timeline.
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
            <h2 className="srv2-process-title">Assess to launch.</h2>
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
              <h2 className="dev-contact-title">Tell me what you want AI to do.</h2>
              <p className="dev-contact-lead">
                A few lines about the process or product and where it&apos;s stuck is
                enough. I read every message and reply within 24 hours, honestly, even if
                the answer is that AI isn&apos;t the right fit.
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
