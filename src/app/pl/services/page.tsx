'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Code2, Users, Sparkles, Shield, Rocket, Target, Zap, Brain, GitBranch, Search, Layers } from 'lucide-react';
import { CustomCursor } from '@/components/CustomCursor';
import { ScrollProgress } from '@/components/ScrollProgress';
import { FooterAwwwards } from '@/components/FooterAwwwards';

// Core services with expanded data
const coreServices = [
  {
    id: '01',
    slug: 'ai',
    title: '10X AI',
    subtitle: 'Sztuczna Inteligencja',
    tagline: 'Twoja cyfrowa siła robocza',
    description: 'Przekształć swój biznes dzięki inteligentnej automatyzacji. Niestandardowe agenty AI, automatyzacja procesów i integracja LLM, która naprawdę przynosi zwrot z inwestycji.',
    color: '#00ff88',
    features: ['Niestandardowe Agenty AI', 'Automatyzacja Procesów', 'Integracja LLM', 'Potoki Danych'],
    stats: { value: '10x', label: 'Wzrost Produktywności' },
  },
  {
    id: '02',
    slug: 'development',
    title: 'CODE',
    subtitle: 'Programowanie',
    tagline: 'Wdrożenia, które skalują',
    description: 'Aplikacje webowe klasy produkcyjnej zbudowane na nowoczesnym stacku. Od MVP po skalę korporacyjną — kod, który działa pod presją.',
    color: '#ff3d00',
    features: ['Next.js / React', 'TypeScript', 'Projektowanie API', 'Architektura Chmurowa'],
    stats: { value: '50+', label: 'Wdrożonych Projektów' },
  },
  {
    id: '03',
    slug: 'consulting',
    title: 'ADVISE',
    subtitle: 'Doradztwo Techniczne',
    tagline: 'Doświadczone spojrzenie na Twój kod',
    description: 'Osąd doświadczonego inżyniera na żądanie. Przegląd architektury, strategia AI i przegląd kodu — od kogoś, kto co tydzień wdraża kod produkcyjny.',
    color: '#8b5cf6',
    features: ['Przegląd Architektury', 'Integracja AI', 'Przegląd Kodu', 'Strategia Techniczna'],
    stats: { value: '10+', label: 'Lat Doświadczenia' },
  },
];

// Derivative services from research
const derivativeServices = [
  {
    id: 'd01',
    title: 'Ocena Gotowości na AI',
    description: 'Kompleksowa ocena dojrzałości Twojej organizacji w zakresie AI wraz z priorytetyzowaną mapą drogową wdrożenia.',
    icon: Search,
    color: '#00ff88',
    duration: '3-5 dni',
    featured: true,
  },
  {
    id: 'd02',
    title: 'Audyt Vibe Code',
    description: 'Ekspercki przegląd baz kodu wygenerowanych przez AI. Bezpieczeństwo, błędy logiczne i gotowość produkcyjna.',
    icon: Code2,
    color: '#ff3d00',
    duration: '24-48 godzin',
    featured: true,
  },
  {
    id: 'd03',
    title: 'Warsztat Strategii AI',
    description: 'Zidentyfikuj najbardziej wpływowe możliwości AI w Twoim biznesie. Priorytetyzowana mapa drogowa w kilka dni.',
    icon: Shield,
    color: '#8b5cf6',
    duration: '2-3 dni',
    featured: true,
  },
  {
    id: 'd04',
    title: 'Sprinty Automatyzacji AI',
    description: 'Intensywny, 5-dniowy sprint o stałym zakresie do automatyzacji konkretnych procesów przy użyciu narzędzi AI.',
    icon: Zap,
    color: '#00ff88',
    duration: '5 dni',
    featured: false,
  },
  {
    id: 'd05',
    title: 'Fractional AI Officer',
    description: 'Stałe doradztwo w zakresie AI. Strategia, dobór narzędzi i nadzór nad wdrożeniem.',
    icon: Brain,
    color: '#ff3d00',
    duration: 'Abonament',
    featured: false,
  },
  {
    id: 'd06',
    title: 'Coaching dla Tech Founderów',
    description: 'Coaching 1:1 dla nietechnicznych założycieli. Rekrutacja, architektura, zarządzanie dostawcami.',
    icon: Users,
    color: '#8b5cf6',
    duration: 'Miesięcznie',
    featured: false,
  },
  {
    id: 'd07',
    title: 'Plan Architektury',
    description: 'Dobór stacku technologicznego i projektowanie architektury przed rozpoczęciem prac deweloperskich.',
    icon: Layers,
    color: '#00ff88',
    duration: '2-3 dni',
    featured: false,
  },
  {
    id: 'd08',
    title: 'Akcelerator Bezpieczeństwa',
    description: 'Przygotowanie do SOC 2, RODO, HIPAA. Odblokuj sprzedaż korporacyjną.',
    icon: Shield,
    color: '#ff3d00',
    duration: '1-2 tygodnie',
    featured: false,
  },
  {
    id: 'd09',
    title: 'MVP Wspierane przez AI',
    description: 'MVP w stałej cenie z wykorzystaniem programowania przyspieszonego AI pod eksperckim nadzorem.',
    icon: Rocket,
    color: '#8b5cf6',
    duration: '1-2 tygodnie',
    featured: false,
  },
  {
    id: 'd10',
    title: 'Dobór Narzędzi AI',
    description: 'Poruszaj się po świecie narzędzi AI. Oceniaj, testuj i wdrażaj właściwe rozwiązania.',
    icon: Target,
    color: '#00ff88',
    duration: '2-3 dni',
    featured: false,
  },
  {
    id: 'd11',
    title: 'Doradztwo Techniczne M&A',
    description: 'Doradztwo techniczne po stronie kupującego i sprzedającego przy fuzjach i przejęciach.',
    icon: GitBranch,
    color: '#ff3d00',
    duration: 'Za transakcję',
    featured: false,
  },
  {
    id: 'd12',
    title: 'Tworzenie Agentów AI',
    description: 'Niestandardowe autonomiczne agenty do złożonych, wieloetapowych zadań biznesowych.',
    icon: Sparkles,
    color: '#8b5cf6',
    duration: '1-3 tygodnie',
    featured: false,
  },
];

export default function ServicesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let rafId = 0;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (heroRef.current) {
          const rect = heroRef.current.getBoundingClientRect();
          setMousePos({
            x: (e.clientX - rect.left - rect.width / 2) / rect.width,
            y: (e.clientY - rect.top - rect.height / 2) / rect.height,
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="grain">
      <CustomCursor />
      <ScrollProgress />

      {/* HERO - Mind-blowing 3D Typography */}
      <section ref={heroRef} className="srv-hero">
        {/* Animated grid background */}
        <div className="srv-hero-grid" />

        {/* Floating orbs */}
        <div className="srv-hero-orb srv-hero-orb-1" />
        <div className="srv-hero-orb srv-hero-orb-2" />
        <div className="srv-hero-orb srv-hero-orb-3" />

        {/* Giant "03" in background */}
        <div
          className="srv-hero-giant"
          style={{
            transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)`,
          }}
        >
          <span className="srv-hero-giant-text">03</span>
        </div>

        {/* Main content */}
        <div className="container relative z-10">
          <div className="srv-hero-content">
            {/* Label */}
            <div className="srv-hero-label">
              <span className="srv-hero-label-dot" />
              <span>Usługi</span>
            </div>

            {/* Mega headline with 3D effect */}
            <h1 className="srv-hero-title">
              <span
                className="srv-hero-title-line srv-hero-title-line-1"
                style={{
                  transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 10}px) rotateX(${mousePos.y * 5}deg) rotateY(${mousePos.x * 5}deg)`,
                }}
              >
                Co
              </span>
              <span
                className="srv-hero-title-line srv-hero-title-line-2"
                style={{
                  transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -8}px) rotateX(${mousePos.y * -3}deg) rotateY(${mousePos.x * -3}deg)`,
                }}
              >
                <span className="text-stroke">Buduję</span>
              </span>
              <span
                className="srv-hero-title-line srv-hero-title-line-3"
                style={{
                  transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 15}px) rotateX(${mousePos.y * 7}deg) rotateY(${mousePos.x * 7}deg)`,
                }}
              >
                <span className="text-gradient-animated">i Wdrażam</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="srv-hero-subtitle">
              Od automatyzacji AI po aplikacje klasy produkcyjnej.
              <br />
              <span className="text-[var(--c-text-muted)]">Technologia, która naprawdę działa.</span>
            </p>

            {/* Quick nav pills */}
            <div className="srv-hero-pills">
              {coreServices.map((service) => (
                <button
                  key={service.id}
                  className="srv-hero-pill"
                  style={{ '--pill-color': service.color } as React.CSSProperties}
                  onClick={() => {
                    document.getElementById(`core-${service.slug}`)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span className="srv-hero-pill-num">{service.id}</span>
                  <span className="srv-hero-pill-title">{service.title}</span>
                  <ArrowUpRight className="srv-hero-pill-arrow" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="srv-hero-scroll">
          <span>Przewiń, aby odkryć więcej</span>
          <div className="srv-hero-scroll-line" />
        </div>
      </section>

      {/* CORE SERVICES - Fullscreen Scroll Takeover */}
      <section className="srv-core">
        {coreServices.map((service) => (
          <div
            key={service.id}
            id={`core-${service.slug}`}
            className="srv-core-section"
            style={{ '--srv-color': service.color } as React.CSSProperties}
          >
            {/* Background elements */}
            <div className="srv-core-bg">
              <div className="srv-core-glow" />
              <div className="srv-core-grid" />
            </div>

            {/* Giant number */}
            <div className="srv-core-number">{service.id}</div>

            {/* Content */}
            <div className="container">
              <div className="srv-core-layout">
                {/* Left - Title */}
                <div className="srv-core-left">
                  <span className="srv-core-subtitle">{service.subtitle}</span>
                  <h2 className="srv-core-title">{service.title}</h2>
                  <p className="srv-core-tagline">{service.tagline}</p>
                </div>

                {/* Right - Details */}
                <div className="srv-core-right">
                  <p className="srv-core-desc">{service.description}</p>

                  <div className="srv-core-features">
                    {service.features.map((feature, i) => (
                      <span key={i} className="srv-core-feature">
                        <span className="srv-core-feature-dot" />
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="srv-core-stats">
                    <span className="srv-core-stats-value">{service.stats.value}</span>
                    <span className="srv-core-stats-label">{service.stats.label}</span>
                  </div>

                  <Link href={`/pl/services/${service.slug}`} className="srv-core-cta">
                    <span>Dowiedz się więcej</span>
                    <ArrowRight className="srv-core-cta-arrow" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* DERIVATIVE SERVICES - Bento Grid */}
      <section className="srv-derivative">
        <div className="container">
          {/* Section header */}
          <div className="srv-derivative-header">
            <span className="label">Usługi Specjalistyczne</span>
            <h2 className="srv-derivative-title">
              Poza
              <span className="text-gradient-animated"> Podstawami</span>
            </h2>
            <p className="srv-derivative-desc">
              Sproduktyzowane oferty dla konkretnych potrzeb. Ustalony zakres, jasne rezultaty.
            </p>
          </div>

          {/* Featured services - large cards */}
          <div className="srv-derivative-featured">
            {derivativeServices.filter(s => s.featured).map((service) => (
              <div
                key={service.id}
                className="srv-derivative-card srv-derivative-card-featured"
                style={{ '--card-color': service.color } as React.CSSProperties}
              >
                <div className="srv-derivative-card-icon">
                  <service.icon />
                </div>
                <div className="srv-derivative-card-content">
                  <h3 className="srv-derivative-card-title">{service.title}</h3>
                  <p className="srv-derivative-card-desc">{service.description}</p>
                </div>
                <div className="srv-derivative-card-meta">
                  <span className="srv-derivative-card-duration">{service.duration}</span>
                  <ArrowUpRight className="srv-derivative-card-arrow" />
                </div>
                <div className="srv-derivative-card-glow" />
              </div>
            ))}
          </div>

          {/* Grid of remaining services */}
          <div className="srv-derivative-grid">
            {derivativeServices.filter(s => !s.featured).map((service, index) => (
              <div
                key={service.id}
                className="srv-derivative-card"
                style={{
                  '--card-color': service.color,
                  '--card-delay': `${index * 50}ms`
                } as React.CSSProperties}
              >
                <div className="srv-derivative-card-icon">
                  <service.icon />
                </div>
                <h3 className="srv-derivative-card-title">{service.title}</h3>
                <p className="srv-derivative-card-desc">{service.description}</p>
                <span className="srv-derivative-card-duration">{service.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS - How I Work */}
      <section className="srv-process">
        <div className="container">
          <div className="srv-process-header">
            <span className="label">Proces</span>
            <h2 className="srv-process-title">
              Jak
              <span className="text-stroke"> Wdrażamy</span>
            </h2>
          </div>

          <div className="srv-process-steps">
            {[
              { num: '01', title: 'Odkrywanie', desc: 'Głębokie zanurzenie w Twoje wyzwania, cele i ograniczenia. Bez ściemy, sama jasność.' },
              { num: '02', title: 'Strategia', desc: 'Decyzje architektoniczne i wybory technologiczne dopasowane do Twojej rzeczywistości.' },
              { num: '03', title: 'Budowa', desc: 'Szybkie iteracje przy stałej komunikacji. Widzisz postępy każdego dnia.' },
              { num: '04', title: 'Wdrożenie', desc: 'Uruchomienie, monitorowanie, iteracja. Praca trwa, dopóki wyniki nie zostaną potwierdzone.' },
            ].map((step) => (
              <div key={step.num} className="srv-process-step">
                <div className="srv-process-step-num">{step.num}</div>
                <div className="srv-process-step-line" />
                <h3 className="srv-process-step-title">{step.title}</h3>
                <p className="srv-process-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Let's Talk */}
      <section className="srv-cta">
        <div className="srv-cta-bg">
          <div className="srv-cta-orb srv-cta-orb-1" />
          <div className="srv-cta-orb srv-cta-orb-2" />
        </div>

        <div className="container relative z-10">
          <div className="srv-cta-content">
            <h2 className="srv-cta-title">
              Gotowy na
              <span className="srv-cta-title-accent"> Wdrożenie?</span>
            </h2>
            <p className="srv-cta-desc">
              Porozmawiajmy o Twoim projekcie. Bez prezentacji, bez rozmów sprzedażowych.
              <br />
              Po prostu rozmowa o tym, co budujesz.
            </p>
            <Link href="/pl/contact" className="srv-cta-btn">
              <span className="srv-cta-btn-text">Rozpocznij rozmowę</span>
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
