'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Bot, Workflow, BrainCircuit, Database, Gauge, Shield, CheckCircle2, Zap, Search, Target } from 'lucide-react';
import { CustomCursor } from '@/components/CustomCursor';
import { ScrollProgress } from '@/components/ScrollProgress';
import { FooterAwwwards } from '@/components/FooterAwwwards';

const capabilities = [
  {
    icon: Bot,
    title: 'Custom AI Agents',
    description: 'Autonomous agents that handle complex, multi-step business tasks — from customer support triage to data processing pipelines. Built to reason, act, and learn.',
    details: ['Multi-agent orchestration', 'Tool use & function calling', 'Memory & context management', 'Human-in-the-loop safeguards'],
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description: 'Replace manual, repetitive processes with intelligent automation. From document processing to reporting, AI handles the grunt work so your team can focus on what matters.',
    details: ['Document extraction & classification', 'Automated reporting & summaries', 'Email & communication automation', 'Cross-system data sync'],
  },
  {
    icon: BrainCircuit,
    title: 'LLM Integration',
    description: 'Integrate large language models into your existing products and internal tools. RAG pipelines, fine-tuning, prompt engineering — whatever it takes to get real results.',
    details: ['RAG (Retrieval-Augmented Generation)', 'Prompt engineering & optimization', 'Fine-tuning & evaluation', 'Model selection & cost optimization'],
  },
  {
    icon: Database,
    title: 'Data Pipelines',
    description: 'AI-powered data ingestion, transformation, and enrichment. Turn messy, unstructured data into clean, actionable intelligence your team can actually use.',
    details: ['Unstructured data parsing', 'Entity extraction & linking', 'Semantic search & embeddings', 'Real-time data enrichment'],
  },
];

const useCases = [
  {
    industry: 'SaaS',
    problem: 'Customer support team overwhelmed by repetitive tickets',
    solution: 'AI agent that auto-resolves 60% of tier-1 tickets, routes the rest with full context',
    impact: '60% reduction in response time',
  },
  {
    industry: 'Finance',
    problem: 'Manual data entry from invoices and contracts',
    solution: 'Document processing pipeline that extracts, validates, and enters data automatically',
    impact: '40 hours/week saved',
  },
  {
    industry: 'E-commerce',
    problem: 'Product descriptions inconsistent and slow to produce',
    solution: 'AI content pipeline generating SEO-optimized descriptions from product specs',
    impact: '10x faster content production',
  },
  {
    industry: 'Legal',
    problem: 'Contract review taking days per document',
    solution: 'AI-assisted review that flags risks, extracts key terms, and summarizes obligations',
    impact: '80% faster review cycles',
  },
];

const processSteps = [
  {
    num: '01',
    title: 'AI Readiness Assessment',
    desc: 'We map your workflows, identify automation opportunities, and score them by impact and feasibility. You get a prioritized roadmap — not a generic pitch.',
    duration: '2-3 days',
  },
  {
    num: '02',
    title: 'Proof of Concept',
    desc: 'We pick the highest-impact opportunity and build a working prototype. Real data, real results. If it doesn\'t work, we pivot before you invest more.',
    duration: '3-5 days',
  },
  {
    num: '03',
    title: 'Production Build',
    desc: 'The validated concept becomes production-grade software. Error handling, monitoring, security, and scalability built in from day one.',
    duration: '1-3 weeks',
  },
  {
    num: '04',
    title: 'Deploy & Iterate',
    desc: 'Launch with monitoring and feedback loops. Continuously improve accuracy, speed, and coverage based on real-world performance data.',
    duration: 'Ongoing',
  },
];

const faqs = [
  {
    q: 'Do I need a large dataset to get started with AI?',
    a: 'No. Many AI solutions work with your existing data, documents, and systems. For LLM-based solutions, we can start with zero training data and iterate from there. The key is having a clear problem to solve, not a massive dataset.',
  },
  {
    q: 'How do you handle data privacy and security?',
    a: 'Data security is non-negotiable. I work with private deployments, on-premise models when needed, and ensure all data processing meets GDPR/SOC 2 standards. Your data never leaves your infrastructure unless you want it to.',
  },
  {
    q: 'What\'s the typical ROI timeline?',
    a: 'Most clients see measurable ROI within 2-3 weeks of deployment. The POC phase is designed to validate value before you commit to a full build. If the numbers don\'t work, we stop — no sunk cost fallacy.',
  },
  {
    q: 'Can you integrate with our existing tech stack?',
    a: 'Yes. I build AI solutions that plug into what you already have — whether that\'s Salesforce, Slack, custom APIs, or legacy systems. The goal is augmentation, not replacement.',
  },
  {
    q: 'What if AI isn\'t the right solution for our problem?',
    a: 'I\'ll tell you. Not every problem needs AI. Sometimes a well-designed automation, a better database query, or a process change is the right answer. I\'m not here to sell AI — I\'m here to solve your problem.',
  },
];

export default function AIServicePage() {
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
          <span className="srv-hero-giant-text" style={{ color: 'rgba(0, 255, 136, 0.03)' }}>AI</span>
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
                10X
              </span>
              <span
                className="srv-hero-title-line srv-hero-title-line-2"
                style={{ transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -8}px)` }}
              >
                <span style={{ color: '#00ff88' }}>AI</span>
              </span>
            </h1>

            <p className="srv-hero-subtitle">
              AI that actually works. Not hype, not demos — production-grade
              <br />
              <span className="text-[var(--c-text-muted)]">intelligent automation that delivers measurable ROI.</span>
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

      {/* THE PROBLEM */}
      <section className="srv-process" style={{ borderTop: '1px solid var(--c-border)' }}>
        <div className="container">
          <div className="srv-process-header">
            <span className="label">The Reality</span>
            <h2 className="srv-process-title">
              Most AI Projects
              <span className="text-stroke"> Fail</span>
            </h2>
            <p className="srv-derivative-desc" style={{ maxWidth: '640px', margin: '0 auto' }}>
              87% of AI projects never make it to production. Not because the technology doesn&apos;t work — but because they start with the model instead of the problem. I do it differently.
            </p>
          </div>

          <div className="srv-process-steps">
            {[
              { num: '01', icon: Search, title: 'Problem First', desc: 'I start with your business problem, not a technology demo. If AI isn\'t the answer, I\'ll tell you.' },
              { num: '02', icon: Target, title: 'Prove It Fast', desc: 'POC in days, not months. Real data, measurable results before you invest in a full build.' },
              { num: '03', icon: Shield, title: 'Production Grade', desc: 'Error handling, monitoring, security, and scalability. Not a notebook — real software.' },
              { num: '04', icon: Gauge, title: 'Measure Everything', desc: 'Clear KPIs from day one. If it doesn\'t move the needle, we change the approach.' },
            ].map((step) => (
              <div key={step.num} className="srv-process-step">
                <div className="srv-process-step-num" style={{ color: '#00ff88' }}>{step.num}</div>
                <div className="srv-process-step-line" />
                <h3 className="srv-process-step-title">{step.title}</h3>
                <p className="srv-process-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="srv-derivative">
        <div className="container">
          <div className="srv-derivative-header">
            <span className="label">Capabilities</span>
            <h2 className="srv-derivative-title">
              What I
              <span style={{ color: '#00ff88' }}> Build</span>
            </h2>
            <p className="srv-derivative-desc">
              End-to-end AI solutions — from strategy to production deployment.
            </p>
          </div>

          <div className="srv-derivative-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className="srv-derivative-card srv-derivative-card-featured"
                style={{ '--card-color': '#00ff88' } as React.CSSProperties}
              >
                <div className="srv-derivative-card-icon">
                  <cap.icon />
                </div>
                <div className="srv-derivative-card-content">
                  <h3 className="srv-derivative-card-title">{cap.title}</h3>
                  <p className="srv-derivative-card-desc">{cap.description}</p>
                  <ul style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {cap.details.map((detail) => (
                      <li key={detail} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--c-text-muted)' }}>
                        <CheckCircle2 className="w-3.5 h-3.5" style={{ color: '#00ff88', flexShrink: 0 }} />
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

      {/* USE CASES */}
      <section className="srv-process" style={{ borderTop: '1px solid var(--c-border)' }}>
        <div className="container">
          <div className="srv-process-header">
            <span className="label">Use Cases</span>
            <h2 className="srv-process-title">
              Real Problems,
              <span style={{ color: '#00ff88' }}> Real Results</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
            {useCases.map((uc) => (
              <div
                key={uc.industry}
                style={{
                  background: 'var(--c-surface)',
                  border: '1px solid var(--c-border)',
                  borderRadius: '0',
                  padding: '2rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <span className="label" style={{ color: '#00ff88' }}>{uc.industry}</span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '0.75rem', marginBottom: '0.75rem', color: 'var(--c-text)' }}>
                  {uc.problem}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--c-text-muted)', marginBottom: '1rem', lineHeight: 1.6 }}>
                  {uc.solution}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--c-border)' }}>
                  <Zap className="w-4 h-4" style={{ color: '#00ff88' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#00ff88' }}>{uc.impact}</span>
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
              From Idea to
              <span style={{ color: '#00ff88' }}> Production</span>
            </h2>
            <p className="srv-derivative-desc">
              A proven framework that de-risks AI investment and accelerates time to value.
            </p>
          </div>

          <div className="srv-process-steps">
            {processSteps.map((step) => (
              <div key={step.num} className="srv-process-step">
                <div className="srv-process-step-num" style={{ color: '#00ff88' }}>{step.num}</div>
                <div className="srv-process-step-line" />
                <h3 className="srv-process-step-title">{step.title}</h3>
                <p className="srv-process-step-desc">{step.desc}</p>
                <span style={{ display: 'inline-block', marginTop: '0.75rem', fontSize: '0.75rem', fontWeight: 600, color: '#00ff88', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
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
              <span style={{ color: '#00ff88' }}> Questions</span>
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
              Ready to
              <span className="srv-cta-title-accent"> Automate?</span>
            </h2>
            <p className="srv-cta-desc">
              Let&apos;s find the highest-impact AI opportunity in your business.
              <br />
              Free assessment call — no pitch, just clarity.
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
