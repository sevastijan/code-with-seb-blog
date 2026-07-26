import type { CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Plus, Check } from 'lucide-react';
import { ScrollProgress } from '@/components/ScrollProgress';
import { FooterAwwwards } from '@/components/FooterAwwwards';
import { ContactForm } from '@/components/ContactForm';

const ACCENT = '#8b5cf6';

const services = [
  {
    title: 'Architecture review',
    desc: 'An independent read of your system. I find the bottlenecks, single points of failure, and scaling risks before they become production incidents.',
    ideal: 'Teams facing a scaling or reliability decision',
    format: 'Written report, 3–5 days',
  },
  {
    title: 'Code review & mentoring',
    desc: 'Senior eyes on your codebase and your team, including AI-generated code. PRs, standards, and pairing on the problems your engineers have been stuck on.',
    ideal: 'Teams raising the quality bar',
    format: 'Ongoing or per-PR',
  },
  {
    title: 'Technology strategy',
    desc: 'Build vs buy, stack selection, and a technical-debt plan that fits your reality. Decisions you can defend to your team and your board.',
    ideal: 'Build-vs-buy or stack decisions',
    format: 'Workshop + roadmap',
  },
  {
    title: 'Technical due diligence',
    desc: 'An honest look under the hood for an investment or acquisition. What the code actually is, what the risks are, and what the pitch deck left out.',
    ideal: 'Investors and acquirers',
    format: 'Report, per deal',
  },
];

const promises = [
  {
    title: 'Hands on the code, not the sidelines',
    desc: 'I open PRs and pair on hard problems. Advice is cheap when nobody has to ship it, so I do both.',
  },
  {
    title: 'A peer, not an overseer',
    desc: 'I read the history and the constraints first, then propose changes with your team, not over their heads.',
  },
  {
    title: 'Honest, even when it costs me the deal',
    desc: 'If the right answer is “don’t build this” or “you don’t need me”, that is what you will hear.',
  },
  {
    title: 'Recommendations you can act on',
    desc: 'Written findings with clear priorities and the real trade-offs, not a vague slide deck.',
  },
  {
    title: 'Ramp in days, not weeks',
    desc: 'I understand your architecture fast and start contributing meaningfully in the first week.',
  },
  {
    title: 'No lock-in by design',
    desc: 'The goal is to raise your team’s bar so they can keep going without me on call.',
  },
];

const engagements = [
  {
    title: 'Embedded senior dev',
    desc: 'I join your team part-time as a senior engineer: shipping code, reviewing PRs, pairing, and mentoring. Hands-on, no ivory tower.',
    commitment: '10–20 hrs/week',
    duration: '3–12 months',
  },
  {
    title: 'Advisory retainer',
    desc: 'Strategic access on demand: regular calls, async questions, and document reviews. A senior engineer on speed dial.',
    commitment: '4–8 hrs/month',
    duration: 'Ongoing',
  },
  {
    title: 'Project-based',
    desc: 'A focused engagement for one decision: architecture review, strategy workshop, code audit, or a due-diligence report.',
    commitment: 'Full focus',
    duration: '2–5 days',
  },
];

const steps = [
  {
    hash: 'b31a7f0',
    ref: 'scope',
    message:
      'We define the decision or the codebase in question, and what a good outcome actually looks like.',
    head: false,
  },
  {
    hash: 'd90c4a2',
    ref: 'review',
    message:
      'I read the code, the architecture, and the history in depth. A real deep dive, not a skim.',
    head: false,
  },
  {
    hash: 'a1e6c73',
    ref: 'recommend',
    message:
      'Written findings with priorities and trade-offs. The real risks, not a generic checklist.',
    head: false,
  },
  {
    hash: 'e4d8a1c',
    ref: 'follow-through',
    message:
      'Where it helps, I stay hands-on with PRs, pairing, and unblocking until it actually lands.',
    head: true,
  },
];

const faqs = [
  {
    q: 'How is this different from a typical consultant?',
    a: 'Most consultants advise from the sidelines and leave. I work inside your codebase: I open PRs, review your team’s code, pair on hard bugs, and join standups when that helps. Advice is cheap when nobody has to ship it. I do both.',
  },
  {
    q: 'How do you work alongside our existing engineers?',
    a: 'As a peer, not an overseer. I listen first, read the code, understand the history and constraints, then propose changes collaboratively. The goal is to raise the quality bar and unblock hard problems, not to take credit or override your team.',
  },
  {
    q: 'Do you write code, or just review it?',
    a: 'Both. I am a hands-on senior developer. Reviewing code is core to the work, but I also ship production features, prototype AI integrations, and pair on the problems your team has been stuck on. If you only need a reviewer, that works too.',
  },
  {
    q: 'Can you help with technical due diligence?',
    a: 'Yes. I regularly support the technical side of investor conversations: honest codebase assessments, architecture risk reports, and AI-readiness reviews. Investors want proof the tech is solid, and I help you show it, or find out it is not before they do.',
  },
  {
    q: 'How quickly can you ramp up?',
    a: 'Fast. I understand most architectures in hours, not weeks. I usually spend the first couple of days in deep-dive mode, and by the end of the first week I am opening meaningful PRs.',
  },
];

export default function ConsultingServicePage() {
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
            The hard technical calls, <em>made with you.</em>
          </h1>
          <p className="dev-hero-sub">
            Architecture and code review, technology strategy, and a senior pair of hands
            in your codebase. From an engineer who still ships production code every week,
            10+ years in.
          </p>
          <div className="dev-hero-cta">
            <Link href="#contact" className="dev-btn dev-btn-primary">
              <span>Book a call</span>
              <ArrowRight />
            </Link>
            <a href="#services" className="dev-btn dev-btn-ghost">
              <span>See how I help</span>
            </a>
          </div>
          <div className="dev-hero-proof">
            <div className="dev-hero-stats">
              <div>
                <div className="dev-stat-num">10<span>+</span></div>
                <div className="dev-stat-label">Years shipping code</div>
              </div>
              <div>
                <div className="dev-stat-num">In your repo</div>
                <div className="dev-stat-label">PRs, not slide decks</div>
              </div>
              <div>
                <div className="dev-stat-num">Days</div>
                <div className="dev-stat-label">To ramp on your codebase</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section id="services" className="srv2-sec">
        <div className="container">
          <div className="srv2-process-header">
            <span className="label">What you get</span>
            <h2 className="srv2-process-title">Senior judgment</h2>
            <p className="srv2-sec-lead">
              Not advice from the sidelines. A senior developer in your codebase and your
              team.
            </p>
          </div>

          <div className="srv2-cards">
            {services.map((item) => (
              <article key={item.title} className="srv2-card">
                <h3 className="srv2-card-title">{item.title}</h3>
                <p className="srv2-card-desc">{item.desc}</p>
                <div className="srv2-card-meta">
                  <div className="srv2-card-meta-row">
                    <span className="srv2-card-meta-key">Ideal</span>
                    <span>{item.ideal}</span>
                  </div>
                  <div className="srv2-card-meta-row">
                    <span className="srv2-card-meta-key">Format</span>
                    <span>{item.format}</span>
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
                Consultants are easy to hire and hard to trust. Here is how I earn it.
              </h2>
              <p className="srv2-sec-lead">
                Six things you can hold me to on every engagement. No fine print.
              </p>
              <a href="#contact" className="dev-btn dev-btn-primary dev-promises-cta">
                <span>Start a conversation</span>
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

      {/* ENGAGEMENT MODELS */}
      <section className="srv2-sec">
        <div className="container">
          <div className="srv2-process-header">
            <span className="label">Engagement models</span>
            <h2 className="srv2-process-title">How we work together</h2>
            <p className="srv2-sec-lead">
              Flexible arrangements matched to your stage, your needs, and your budget.
            </p>
          </div>

          <div className="srv2-cards">
            {engagements.map((model) => (
              <article key={model.title} className="srv2-card">
                <h3 className="srv2-card-title">{model.title}</h3>
                <p className="srv2-card-desc">{model.desc}</p>
                <div className="srv2-card-meta">
                  <div className="srv2-card-meta-row">
                    <span className="srv2-card-meta-key">Time</span>
                    <span>{model.commitment}</span>
                  </div>
                  <div className="srv2-card-meta-row">
                    <span className="srv2-card-meta-key">Length</span>
                    <span>{model.duration}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="srv2-process">
        <div className="container">
          <div className="srv2-process-header">
            <span className="label">How it works</span>
            <h2 className="srv2-process-title">Scope to follow-through.</h2>
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
              <span className="label">Start a conversation</span>
              <h2 className="dev-contact-title">Tell me what you&apos;re stuck on.</h2>
              <p className="dev-contact-lead">
                A few lines about the decision or the codebase is enough. I read every
                message and reply within 24 hours, honestly, even if the answer is that you
                don&apos;t need me.
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
                  <span>Currently accepting new engagements</span>
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
