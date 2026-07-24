# Services Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `/services` (EN) as a calm, editorial-minimal page with 3 concretely-described services, replacing the gimmicky 3D hero and the 12-item "derivative services" section.

**Architecture:** `src/app/services/page.tsx` becomes a server component (no `'use client'`, no mouse-tracking state) rendering four sections: hero, 3 service sections, process, CTA. New `srv2-*` CSS classes are appended to `src/app/globals.css`. Old `srv-*` classes MUST NOT be removed — `/pl/services` and all `/services/{ai,development,consulting}` subpages (EN + PL) still use them.

**Tech Stack:** Next.js 14 App Router, React 18, plain CSS in `globals.css` (no Tailwind utilities for new sections beyond what exists), lucide-react icons.

**Spec:** `docs/superpowers/specs/2026-07-24-services-page-redesign-design.md`

## Global Constraints

- Scope is **only** `src/app/services/page.tsx` + additive CSS in `src/app/globals.css`. Do not touch `/pl/services/**`, `/services/ai|development|consulting/**`, or `src/app/services/layout.tsx`.
- Do not delete or modify any existing `srv-*` CSS rules in `globals.css` — other pages depend on them.
- The only numeric claim allowed anywhere on the page is "10+ years" (in the hero subtitle). No "10x", no "50+".
- Banned copy: "10X AI", "Ships that scale", "No BS", fabricated stats.
- Per-service accent colors: AI `#00ff88`, Development `#ff3d00`, Consulting `#8b5cf6` — used only on section numbers and CTA hover.
- No JS-driven animation (no `useEffect`, no mouse tracking). Scroll fade-in is CSS-only via `animation-timeline: view()` behind `@supports`, disabled under `prefers-reduced-motion`.
- This project has no test framework. Verification is `npm run build` (must pass with no new warnings) plus rendering checks described in Task 3.

---

### Task 1: Add `srv2-*` styles to globals.css

**Files:**
- Modify: `src/app/globals.css` (append at end of file, top level — NOT inside any `@layer` or `@media` block)

**Interfaces:**
- Produces: CSS classes consumed by Task 2's JSX: `srv2-hero`, `srv2-hero-title`, `srv2-hero-sub`, `srv2-hero-nav`, `srv2-hero-link`, `srv2-hero-link-num`, `srv2-hero-link-arrow`, `srv2-services`, `srv2-service`, `srv2-service-head`, `srv2-service-num`, `srv2-service-title`, `srv2-service-tagline`, `srv2-service-body`, `srv2-service-desc`, `srv2-service-lists`, `srv2-list`, `srv2-service-cta`, `srv2-process`, `srv2-process-header`, `srv2-process-title`, `srv2-process-steps`, `srv2-process-step`, `srv2-process-step-num`, `srv2-process-step-title`, `srv2-process-step-desc`, `srv2-cta`, `srv2-cta-title`, `srv2-cta-desc`, `srv2-cta-btn`. Accent color arrives via the `--srv2-accent` custom property set inline in JSX.
- Consumes: existing CSS vars `--c-bg`, `--c-bg-elevated`, `--c-text`, `--c-text-muted`, `--c-border`, `--c-border-hover`, `--font-display`, `--font-mono` and existing classes `.container`, `.label`, `.grain` (all already defined in `globals.css`).

- [ ] **Step 1: Append the following CSS to the very end of `src/app/globals.css`**

```css
/* ============================================
   SERVICES V2 — editorial minimal
   (old srv-* classes above are still used by
   /pl/services and service subpages — keep them)
   ============================================ */

/* --- Hero --- */
.srv2-hero {
  padding: clamp(9rem, 20vh, 14rem) 0 clamp(4rem, 8vh, 6rem);
}

.srv2-hero .label {
  display: block;
  margin-bottom: 2rem;
}

.srv2-hero-title {
  font-family: var(--font-display), system-ui, sans-serif;
  font-size: clamp(2.75rem, 8.5vw, 8rem);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.03em;
  text-transform: uppercase;
}

.srv2-hero-sub {
  max-width: 44rem;
  margin-top: 2.5rem;
  font-size: clamp(1.0625rem, 1.6vw, 1.375rem);
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.6);
}

.srv2-hero-sub strong {
  color: var(--c-text);
  font-weight: 600;
}

.srv2-hero-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0 3rem;
  margin-top: clamp(3rem, 6vh, 5rem);
  border-top: 1px solid var(--c-border);
}

.srv2-hero-link {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 0;
  font-family: var(--font-mono), monospace;
  font-size: 0.8125rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--c-text);
  transition: color 0.25s ease;
}

.srv2-hero-link-num {
  color: var(--srv2-accent);
}

.srv2-hero-link-arrow {
  width: 0.875rem;
  height: 0.875rem;
  color: var(--c-text-muted);
  transition: transform 0.25s ease, color 0.25s ease;
}

.srv2-hero-link:hover {
  color: var(--srv2-accent);
}

.srv2-hero-link:hover .srv2-hero-link-arrow {
  color: var(--srv2-accent);
  transform: translate(2px, -2px);
}

/* --- Service sections --- */
.srv2-service {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr);
  gap: clamp(2rem, 5vw, 5rem);
  padding: clamp(4rem, 10vh, 7rem) 0;
  border-top: 1px solid var(--c-border);
  scroll-margin-top: 5rem;
}

.srv2-service-num {
  display: block;
  font-family: var(--font-mono), monospace;
  font-size: 0.8125rem;
  letter-spacing: 0.2em;
  color: var(--srv2-accent);
  margin-bottom: 1.25rem;
}

.srv2-service-title {
  font-family: var(--font-display), system-ui, sans-serif;
  font-size: clamp(2.25rem, 4.5vw, 4.25rem);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.srv2-service-tagline {
  margin-top: 1rem;
  font-size: clamp(1rem, 1.4vw, 1.25rem);
  color: var(--c-text-muted);
}

.srv2-service-desc {
  font-size: clamp(1.0625rem, 1.5vw, 1.3125rem);
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.75);
  max-width: 40rem;
}

.srv2-service-lists {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
}

.srv2-service-lists .label {
  display: block;
  margin-bottom: 1rem;
}

.srv2-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.srv2-list li {
  position: relative;
  padding-left: 1.25rem;
  font-size: 0.9375rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.65);
}

.srv2-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.6em;
  width: 0.375rem;
  height: 1px;
  background: var(--srv2-accent);
}

.srv2-service-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  margin-top: 3rem;
  padding: 0.875rem 1.5rem;
  border: 1px solid var(--c-border-hover);
  font-family: var(--font-mono), monospace;
  font-size: 0.8125rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--c-text);
  transition: border-color 0.25s ease, color 0.25s ease;
}

.srv2-service-cta svg {
  width: 0.875rem;
  height: 0.875rem;
  transition: transform 0.25s ease;
}

.srv2-service-cta:hover {
  border-color: var(--srv2-accent);
  color: var(--srv2-accent);
}

.srv2-service-cta:hover svg {
  transform: translateX(3px);
}

/* --- Process --- */
.srv2-process {
  padding: clamp(5rem, 12vh, 8rem) 0;
  border-top: 1px solid var(--c-border);
}

.srv2-process-header {
  margin-bottom: clamp(3rem, 7vh, 5rem);
}

.srv2-process-title {
  margin-top: 1.25rem;
  font-family: var(--font-display), system-ui, sans-serif;
  font-size: clamp(2rem, 4vw, 3.75rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.srv2-process-steps {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(2rem, 4vw, 4rem);
}

.srv2-process-step {
  border-top: 1px solid var(--c-border);
  padding-top: 1.5rem;
}

.srv2-process-step-num {
  font-family: var(--font-mono), monospace;
  font-size: 0.8125rem;
  letter-spacing: 0.2em;
  color: var(--c-text-muted);
}

.srv2-process-step-title {
  margin-top: 1rem;
  font-family: var(--font-display), system-ui, sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.01em;
}

.srv2-process-step-desc {
  margin-top: 0.875rem;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.6);
}

/* --- Final CTA --- */
.srv2-cta {
  padding: clamp(5rem, 14vh, 9rem) 0;
  border-top: 1px solid var(--c-border);
  background: var(--c-bg-elevated);
}

.srv2-cta .container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 2.5rem;
}

.srv2-cta-title {
  font-family: var(--font-display), system-ui, sans-serif;
  font-size: clamp(2rem, 4.5vw, 4rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.srv2-cta-desc {
  margin-top: 1rem;
  font-size: 1.0625rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.6);
  max-width: 32rem;
}

.srv2-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.125rem 2rem;
  background: var(--c-text);
  color: var(--c-bg);
  font-family: var(--font-mono), monospace;
  font-size: 0.875rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  transition: background 0.25s ease;
}

.srv2-cta-btn svg {
  width: 1rem;
  height: 1rem;
  transition: transform 0.25s ease;
}

.srv2-cta-btn:hover {
  background: var(--c-accent);
  color: var(--c-text);
}

.srv2-cta-btn:hover svg {
  transform: translateX(4px);
}

/* --- Scroll fade-in (CSS only, progressive enhancement) --- */
@supports (animation-timeline: view()) {
  .srv2-service,
  .srv2-process-step {
    animation: srv2-fade-in 1ms linear both;
    animation-timeline: view();
    animation-range: entry 0% entry 35%;
  }
}

@keyframes srv2-fade-in {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .srv2-service,
  .srv2-process-step {
    animation: none;
  }
}

/* --- Responsive --- */
@media (max-width: 900px) {
  .srv2-service {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .srv2-process-steps {
    grid-template-columns: 1fr;
  }

  .srv2-cta .container {
    flex-direction: column;
    align-items: flex-start;
  }
}
```

- [ ] **Step 2: Verify the CSS parses**

Run: `cd /Users/sebastiansleczka/Code/code-with-seb-blog && npm run build 2>&1 | tail -20`
Expected: build succeeds (`✓ Generating static pages` / no CSS syntax errors). The page still uses old classes at this point — that's fine, old classes are untouched.

- [ ] **Step 3: Commit**

```bash
cd /Users/sebastiansleczka/Code/code-with-seb-blog
git add src/app/globals.css
git commit -m "feat(services): add srv2-* editorial-minimal styles"
```

---

### Task 2: Rewrite `src/app/services/page.tsx` as a server component

**Files:**
- Modify: `src/app/services/page.tsx` (full replacement of file contents)

**Interfaces:**
- Consumes: `srv2-*` classes from Task 1; existing components `ScrollProgress` (`@/components/ScrollProgress`) and `FooterAwwwards` (`@/components/FooterAwwwards`) — both are client components, importing them from a server component is fine; existing classes `.container`, `.label`, `.grain`.
- Produces: the final `/services` route. Anchor targets `#ai`, `#development`, `#consulting` (plain `<a href>` — `html { scroll-behavior: smooth }` already exists in `globals.css`, so smooth scrolling works without JS).

- [ ] **Step 1: Replace the entire contents of `src/app/services/page.tsx` with:**

```tsx
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
      'You face an architecture decision you don’t want to make blind',
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
```

Note: there is deliberately no `'use client'` directive, no `useState`/`useEffect`, and no lucide icons other than `ArrowRight` and `ArrowUpRight`.

- [ ] **Step 2: Build**

Run: `cd /Users/sebastiansleczka/Code/code-with-seb-blog && npm run build 2>&1 | tail -30`
Expected: build succeeds; `/services` appears in the route list as `○ (Static)`. No TypeScript errors.

- [ ] **Step 3: Commit**

```bash
cd /Users/sebastiansleczka/Code/code-with-seb-blog
git add src/app/services/page.tsx
git commit -m "feat(services): rewrite /services as editorial-minimal server component"
```

---

### Task 3: Verification

**Files:**
- No new files. Read-only checks plus fixes if anything fails.

**Interfaces:**
- Consumes: the built app from Tasks 1–2.

- [ ] **Step 1: Confirm no page still references removed content and old pages are intact**

Run:
```bash
cd /Users/sebastiansleczka/Code/code-with-seb-blog
grep -rn "10X AI\|Productivity Boost\|derivative" src/app/services/page.tsx || echo "CLEAN"
grep -c "srv-hero" src/app/globals.css
grep -rn "use client" src/app/services/page.tsx || echo "SERVER COMPONENT"
```
Expected: `CLEAN`, a non-zero count for `srv-hero` (old styles preserved), `SERVER COMPONENT`.

- [ ] **Step 2: Render check in dev**

Run: `cd /Users/sebastiansleczka/Code/code-with-seb-blog && npm run dev` (background), then:
```bash
curl -s http://localhost:3000/services | grep -o "Software that ships\|AI Engineering\|Web Development\|Technical Consulting\|Have a project in mind" | sort -u
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/pl/services
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/services/ai
```
Expected: all five strings present; both status codes `200`. Stop the dev server afterwards.

- [ ] **Step 3: Visual check (if browser tooling available)**

Open `http://localhost:3000/services` at desktop (~1440px) and mobile (~390px) widths. Verify: hero readable, anchor links scroll to sections, service sections stack to one column on mobile, no horizontal scrollbar.

- [ ] **Step 4: Final commit (only if fixes were needed in Steps 1–3)**

```bash
cd /Users/sebastiansleczka/Code/code-with-seb-blog
git add -A src/app/services/page.tsx src/app/globals.css
git commit -m "fix(services): post-verification fixes"
```
