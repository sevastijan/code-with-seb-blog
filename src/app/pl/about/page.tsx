'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Code2, Brain, Zap, Heart, Shield, Rocket, Terminal, Globe } from 'lucide-react';
import { ScrollProgress } from '@/components/ScrollProgress';
import { FooterAwwwards } from '@/components/FooterAwwwards';


const values = [
  {
    icon: Shield,
    title: 'Odpowiedzialność',
    description: "Kiedy podejmuję się projektu, staje się on moim problemem do rozwiązania. Bez wymówek, bez zrzucania winy. Tylko rezultaty.",
    color: '#ff3d00',
  },
  {
    icon: Zap,
    title: 'Szybkość',
    description: "Szybko nie znaczy niechlujnie. Działam sprawnie, podejmując mądre decyzje na starcie i iterując z rozmysłem.",
    color: '#00ff88',
  },
  {
    icon: Heart,
    title: 'Jakość',
    description: "Nie wypuszczam niczego, pod czym nie byłbym dumny podpisać się swoim nazwiskiem. Każda linia kodu, każdy piksel ma znaczenie.",
    color: '#8b5cf6',
  },
  {
    icon: Brain,
    title: 'Klarowność',
    description: 'Złożone problemy zasługują na proste wyjaśnienia. Komunikuję się precyzyjnie i przebijam przez szum informacyjny.',
    color: '#f59e0b',
  },
];

const stats = [
  { value: '10+', label: 'Lat tworzenia', suffix: '' },
  { value: '100+', label: 'Ukończonych projektów', suffix: '' },
  { value: '50+', label: 'Zadowolonych klientów', suffix: '' },
  { value: '∞', label: 'Ciekawości', suffix: '' },
];

const stackCategories = [
  {
    title: 'AI I AUTOMATYZACJA',
    color: '#00ff88',
    items: [
      { name: 'Claude Code / Cursor', desc: 'Programowanie w parze z AI' },
      { name: 'OpenAI / Anthropic APIs', desc: 'Integracja z LLM' },
      { name: 'LangChain / LangGraph', desc: 'Orkiestracja agentów' },
      { name: 'CrewAI', desc: 'Systemy wieloagentowe' },
      { name: 'Vercel AI SDK', desc: 'Streaming i użycie narzędzi' },
      { name: 'MCP (Model Context Protocol)', desc: 'Łączność agent-narzędzie' },
      { name: 'RAG / Vector DBs', desc: 'Pinecone, Weaviate, pgvector' },
      { name: 'n8n / Zapier', desc: 'Automatyzacja no-code' },
      { name: 'Hugging Face', desc: 'Modele open-source' },
      { name: 'Python', desc: 'Pipeline ML i skrypty' },
    ],
  },
  {
    title: 'JĘZYKI',
    color: '#ff3d00',
    items: [
      { name: 'TypeScript', desc: 'Wszystko z pełnym typowaniem' },
      { name: 'JavaScript', desc: 'Fundament' },
      { name: 'Java', desc: 'Enterprise i Spring Boot' },
      { name: 'PHP', desc: 'WordPress i strona serwerowa' },
      { name: 'Dart', desc: 'Aplikacje mobilne Flutter' },
      { name: 'HTML / CSS', desc: 'Semantyczny markup i stylowanie' },
    ],
  },
  {
    title: 'FRONTEND',
    color: '#61dafb',
    items: [
      { name: 'React', desc: 'Wybrana biblioteka UI' },
      { name: 'Next.js', desc: 'Fullstackowy framework React' },
      { name: 'React Native', desc: 'Aplikacje wieloplatformowe' },
      { name: 'Flutter', desc: 'Wieloplatformowy toolkit UI' },
      { name: 'Gatsby', desc: 'Generowanie stron statycznych' },
      { name: 'Vite', desc: 'Narzędzia buildowe' },
      { name: 'Redux', desc: 'Zarządzanie stanem' },
      { name: 'Tailwind CSS', desc: 'Stylowanie utility-first' },
      { name: 'Cypress / Jest', desc: 'Testy i E2E' },
    ],
  },
  {
    title: 'BACKEND I DANE',
    color: '#8b5cf6',
    items: [
      { name: 'Node.js', desc: 'Środowisko serwerowe' },
      { name: 'Express.js', desc: 'Framework HTTP' },
      { name: 'Spring / Spring Boot', desc: 'Framework enterprise dla Javy' },
      { name: 'GraphQL', desc: 'Język zapytań dla API' },
      { name: 'JWT', desc: 'Uwierzytelnianie oparte na tokenach' },
      { name: 'MySQL', desc: 'Relacyjna baza danych' },
      { name: 'MongoDB', desc: 'Dokumentowa baza danych' },
      { name: 'Firebase', desc: 'Realtime i serverless' },
    ],
  },
  {
    title: 'CMS I PLATFORMY',
    color: '#06b6d4',
    items: [
      { name: 'WordPress', desc: 'Własne motywy i wtyczki' },
      { name: 'Sanity', desc: 'Headless CMS' },
      { name: 'Shopify', desc: 'E-commerce' },
    ],
  },
  {
    title: 'INFRA I DEVOPS',
    color: '#f59e0b',
    items: [
      { name: 'AWS', desc: 'Infrastruktura chmurowa' },
      { name: 'Vercel', desc: 'Wdrożenia edge' },
      { name: 'Docker', desc: 'Konteneryzacja' },
      { name: 'Kubernetes', desc: 'Orkiestracja kontenerów' },
      { name: 'ArgoCD', desc: 'Dostarczanie GitOps' },
      { name: 'CI/CD', desc: 'GitHub Actions i pipeline' },
      { name: 'Git', desc: 'Kontrola wersji' },
    ],
  },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
      <ScrollProgress />

      {/* HERO - Full Viewport with 3D Typography */}
      <section ref={heroRef} className="abt-hero">
        {/* Animated grid background */}
        <div className="abt-hero-grid" />

        {/* Floating orbs */}
        <div className="abt-hero-orb abt-hero-orb-1" />
        <div className="abt-hero-orb abt-hero-orb-2" />
        <div className="abt-hero-orb abt-hero-orb-3" />

        {/* Giant "SEB" in background */}
        <div
          className="abt-hero-giant"
          style={{
            transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)`,
          }}
        >
          <span className="abt-hero-giant-text">SEB</span>
        </div>

        {/* Main content */}
        <div className="container relative z-10">
          <div className="abt-hero-content">
            {/* Label */}
            <div className="abt-hero-label">
              <span className="abt-hero-label-dot" />
              <span>O mnie</span>
            </div>

            {/* Mega headline with 3D effect */}
            <h1 className="abt-hero-title">
              <span
                className="abt-hero-title-line abt-hero-title-line-1"
                style={{
                  transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 10}px) rotateX(${mousePos.y * 5}deg) rotateY(${mousePos.x * 5}deg)`,
                }}
              >
                Tworzę
              </span>
              <span
                className="abt-hero-title-line abt-hero-title-line-2"
                style={{
                  transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -8}px) rotateX(${mousePos.y * -3}deg) rotateY(${mousePos.x * -3}deg)`,
                }}
              >
                <span className="text-stroke">Od</span>
              </span>
              <span
                className="abt-hero-title-line abt-hero-title-line-3"
                style={{
                  transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 15}px) rotateX(${mousePos.y * 7}deg) rotateY(${mousePos.x * 7}deg)`,
                }}
              >
                <span className="text-gradient-animated">2012.</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="abt-hero-subtitle">
              Jestem Sebastian — senior developer, który wierzy,
              <br />
              <span className="text-[var(--c-text-muted)]">że świetne oprogramowanie tworzą ludzie, którym zależy.</span>
            </p>

            {/* Quick nav pills */}
            <div className="abt-hero-pills">
              {[
                { label: 'Historia', href: '#story' },
                { label: 'Wartości', href: '#values' },
                { label: 'Stack', href: '#stack' },
              ].map((pill) => (
                <button
                  key={pill.label}
                  className="abt-hero-pill"
                  onClick={() => {
                    document.querySelector(pill.href)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span className="abt-hero-pill-title">{pill.label}</span>
                  <ArrowUpRight className="abt-hero-pill-arrow" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="abt-hero-scroll">
          <span>Przewiń, aby odkrywać</span>
          <div className="abt-hero-scroll-line" />
        </div>
      </section>

      {/* STATS - Big Numbers with Glow */}
      <section className="abt-stats">
        <div className="abt-stats-line" />
        <div className="container">
          <div className="abt-stats-grid">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="abt-stat"
                style={{ '--stat-delay': `${index * 100}ms` } as React.CSSProperties}
              >
                <div className="abt-stat-value">{stat.value}</div>
                <div className="abt-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="abt-stats-line" />
      </section>

      {/* STORY - Split Layout with Visual Depth */}
      <section id="story" className="abt-story">
        <div className="abt-story-bg">
          <div className="abt-story-glow" />
        </div>

        <div className="container">
          <div className="abt-story-layout">
            {/* Left - Visual Element */}
            <div className="abt-story-visual">
              <div className="abt-story-card">
                <div className="abt-story-card-border" />
                <div className="abt-story-card-content">
                  <Terminal className="abt-story-card-icon" />
                  <div className="abt-story-card-code">
                    <span className="abt-code-keyword">const</span>{' '}
                    <span className="abt-code-var">sebastian</span>{' '}
                    <span className="abt-code-op">=</span>{' '}
                    <span className="abt-code-bracket">{'{'}</span>
                    <br />
                    {'  '}<span className="abt-code-key">role</span>: <span className="abt-code-string">&quot;Senior Software Dev&quot;</span>,
                    <br />
                    {'  '}<span className="abt-code-key">focus</span>: <span className="abt-code-string">&quot;AI + Web&quot;</span>,
                    <br />
                    {'  '}<span className="abt-code-key">years</span>: <span className="abt-code-num">10</span>,
                    <br />
                    {'  '}<span className="abt-code-key">passion</span>: <span className="abt-code-string">&quot;∞&quot;</span>,
                    <br />
                    <span className="abt-code-bracket">{'}'}</span>;
                  </div>
                  <div className="abt-story-card-cursor">▌</div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="abt-story-badge abt-story-badge-1">
                <Code2 className="w-4 h-4" />
                <span>Czysty kod</span>
              </div>
              <div className="abt-story-badge abt-story-badge-2">
                <Rocket className="w-4 h-4" />
                <span>Szybka realizacja</span>
              </div>
              <div className="abt-story-badge abt-story-badge-3">
                <Globe className="w-4 h-4" />
                <span>Zdalnie</span>
              </div>
            </div>

            {/* Right - Story Text */}
            <div className="abt-story-text">
              <div className="abt-story-label">
                <span className="abt-story-label-dot" />
                <span>W skrócie</span>
              </div>
              <h2 className="abt-story-title">
                Dekada
                <span className="abt-story-title-accent"> tworzenia rzeczy</span>
                {' '}które mają znaczenie.
              </h2>
              <div className="abt-story-paragraphs">
                <p>
                  Od ponad dekady tworzę oprogramowanie — od zwinnych startupów po systemy
                  klasy enterprise używane przez miliony. Po drodze nauczyłem się, że różnica między
                  dobrym a świetnym to nie tylko kwestia kodu.
                </p>
                <p>
                  Chodzi o <strong>branie odpowiedzialności</strong>. O jasną komunikację.
                  O zrozumienie, że oprogramowanie istnieje, aby rozwiązywać prawdziwe problemy prawdziwych ludzi.
                </p>
                <p>
                  Dziś współpracuję z wybranymi klientami przy projektach, w których mogę wywrzeć realny wpływ —
                  od automatyzacji AI, która oszczędza tysiące godzin, po aplikacje webowe skalujące się
                  do milionów użytkowników. I piszę o wszystkim, czego uczę się po drodze.
                </p>
              </div>
              <Link href="/pl/blog" className="abt-story-cta">
                <span>Przeczytaj moje teksty</span>
                <ArrowRight className="abt-story-cta-arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES - Interactive Cards with Glow */}
      <section id="values" className="abt-values">
        <div className="container">
          <div className="abt-values-header">
            <span className="label">W co wierzę</span>
            <h2 className="abt-values-title">
              Kluczowe
              <span className="text-gradient-animated"> wartości</span>
            </h2>
            <p className="abt-values-desc">
              To nie są korporacyjne slogany. To zasady, którymi kieruję się przy każdej podejmowanej decyzji.
            </p>
          </div>

          <div className="abt-values-grid">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="abt-value-card"
                style={{
                  '--value-color': value.color,
                  '--value-delay': `${index * 80}ms`,
                } as React.CSSProperties}
              >
                <div className="abt-value-card-icon">
                  <value.icon />
                </div>
                <h3 className="abt-value-card-title">{value.title}</h3>
                <p className="abt-value-card-desc">{value.description}</p>
                <div className="abt-value-card-glow" />
                <div className="abt-value-card-line" />
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* TECH STACK - Categorized Grid */}
      <section id="stack" className="abt-stack">
        <div className="container">
          <div className="abt-stack-header">
            <span className="label">Narzędzia pracy</span>
            <h2 className="abt-stack-title">
              Stack
              <span className="abt-stack-title-accent"> technologiczny</span>
            </h2>
          </div>

          <div className="stack-categories">
            {stackCategories.map((cat, catIndex) => (
              <div
                key={cat.title}
                className="stack-category"
                style={{ '--cat-color': cat.color, '--cat-delay': `${catIndex * 100}ms` } as React.CSSProperties}
              >
                <div className="stack-category-header">
                  <div className="stack-category-line" />
                  <h3 className="stack-category-title">{cat.title}</h3>
                  <span className="stack-category-count">{String(cat.items.length).padStart(2, '0')}</span>
                </div>
                <div className="stack-category-items">
                  {cat.items.map((item, i) => (
                    <div
                      key={item.name}
                      className="stack-item"
                      style={{ '--item-delay': `${catIndex * 100 + i * 50}ms` } as React.CSSProperties}
                    >
                      <div className="stack-item-indicator" />
                      <div className="stack-item-content">
                        <span className="stack-item-name">{item.name}</span>
                        <span className="stack-item-desc">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Let's Talk */}
      <section className="abt-cta">
        <div className="abt-cta-bg">
          <div className="abt-cta-orb abt-cta-orb-1" />
          <div className="abt-cta-orb abt-cta-orb-2" />
        </div>

        <div className="container relative z-10">
          <div className="abt-cta-content">
            <h2 className="abt-cta-title">
              Zbudujmy to
              <span className="abt-cta-title-accent"> razem.</span>
            </h2>
            <p className="abt-cta-desc">
              Masz pomysł na projekt? Chętnie o nim posłucham.
              <br />
              Bez prezentacji sprzedażowych, bez telefonów handlowych. Po prostu szczera rozmowa.
            </p>
            <Link href="/pl/contact" className="abt-cta-btn">
              <span className="abt-cta-btn-text">Rozpocznij rozmowę</span>
              <span className="abt-cta-btn-arrow">
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
