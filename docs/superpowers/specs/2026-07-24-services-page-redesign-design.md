# Services Page Redesign — Design Spec

**Date:** 2026-07-24
**Scope:** `/services` (EN) only. `/pl/services` and the `/services/{ai,development,consulting}` subpages are explicitly out of scope for this iteration.

## Problem

The current `/services` page (`src/app/services/page.tsx`) has:

- Salesy, artificial copy ("10X AI", "Ships that scale", "No BS") and fabricated stats ("10x Productivity Boost", "50+ Projects Shipped").
- An overloaded offer: 3 core services plus 12 loosely-scoped "derivative services" that dilute the message.
- A heavy hero: 3D mouse-tracking typography, floating orbs, giant background "03", nav pills.

## Direction (approved)

**Editorial minimal.** Calm, typographic, credible. Three services only, each described concretely. Fits the site's existing dark/brutalist design language without gimmicks.

## Page Structure (top to bottom)

### 1. Hero

- No 3D effect, no orbs, no mouse tracking, no giant background number.
- Headline: **"Software that ships. AI that works."**
- Subtitle: *"I design, build, and review production systems — web applications, AI integrations, and the architecture behind them. 10+ years of hands-on engineering."*
- Below: three anchor links (01 AI · 02 Development · 03 Consulting) that smooth-scroll to their sections.

### 2. Three service sections

Stacked vertically, separated by thin border lines, numbered `01/02/03`, large display typography. Each section shares the same skeleton:

- Service name + one concrete sentence describing it
- **"Good fit if…"** — 2–3 bullets describing who it's for
- **"What you get"** — 3–4 concrete deliverables
- CTA linking to the existing subpage (`/services/ai`, `/services/development`, `/services/consulting`)

Copy per service:

**01 · AI Engineering** — "Practical AI, not demos."
- Scope: custom agents, LLM integration, workflow automation.
- Good fit if: you have a repetitive process worth automating; you want an LLM in your product, not in a slide deck.
- You get: a working integration in your stack, evaluation/tests, documentation.

**02 · Web Development** — "Production-grade web applications."
- Scope: Next.js/React/TypeScript, API design, cloud architecture.
- Good fit if: you need an MVP that survives contact with real users; you have an existing app that needs to scale.
- You get: code in your repo, CI/CD, predictable iterations.

**03 · Technical Consulting** — "Senior judgment, on demand."
- Scope: architecture review, code review (including AI-generated code), technology strategy.
- Good fit if: you face an architecture decision you don't want to make blind; you have a codebase that needs expert eyes.
- You get: written recommendations with priorities — not a slide presentation.

### 3. How it works

Three steps instead of four: **Scope → Build → Ship**, one factual sentence each. No "No BS" phrasing.

### 4. Final CTA

Simple bar: "Have a project in mind?" + button linking to `/contact`. No orbs.

### Removed entirely

- The 12 "derivative services" section (featured cards + grid)
- All fabricated stats blocks (10x, 50+); the only number on the page is **10+ years**, woven into the hero subtitle
- Giant background "03", hero pills, glow cards, mouse-tracking transforms

## Visual Design

- Stays within the existing dark/brutalist system: `--c-bg #050505`, display font for headings, thin `--c-border` separators.
- Per-service accent colors remain (green `#00ff88` / orange `#ff3d00` / violet `#8b5cf6`) but used subtly: section number and CTA hover only — no full-section glow.
- Service sections: two-column grid on desktop (left: number + title, right: content), single column on mobile.
- Subtle fade-in on scroll via CSS only — no JS mouse tracking.

## Technical Scope

- **Rewritten:** `src/app/services/page.tsx`. Mouse-tracking `useEffect` removed; if no interactive state remains (anchor links can be plain `<a href="#...">` with CSS `scroll-behavior: smooth`), drop `'use client'` and make it a server component.
- **Added:** new `srv2-*` classes in `src/app/globals.css`.
- **Kept for now:** old `srv-*` classes in `globals.css` — still used by `/pl/services` and the service subpages until those are redesigned. Remove them when the PL page and subpages migrate.
- **Unchanged:** `/pl/services`, `/services/{ai,development,consulting}` and their layouts.

## Testing / Verification

- `npm run build` passes with no new warnings.
- Visual check of `/services` at desktop and mobile widths.
- Anchor links scroll to the correct sections.
- Confirm `/pl/services` and subpages still render (they depend on old `srv-*` styles that must not be removed yet).
