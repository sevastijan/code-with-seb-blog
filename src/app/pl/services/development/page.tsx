'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Code2, Layers, Gauge, Shield, CheckCircle2, Smartphone, Globe, Server, Wrench, GitBranch, MonitorSmartphone } from 'lucide-react';
import { CustomCursor } from '@/components/CustomCursor';
import { ScrollProgress } from '@/components/ScrollProgress';
import { FooterAwwwards } from '@/components/FooterAwwwards';

const techStack = [
  {
    category: 'Frontend',
    icon: MonitorSmartphone,
    technologies: [
      { name: 'React / Next.js', desc: 'Server components, SSR, ISR — pełne spektrum renderowania' },
      { name: 'TypeScript', desc: 'Bezpieczeństwo typów domyślnie, a nie na doczepkę' },
      { name: 'Tailwind CSS', desc: 'Stylowanie utility-first dla szybkiego i spójnego tworzenia UI' },
      { name: 'Framer Motion', desc: 'Animacje i mikrointerakcje jakości produkcyjnej' },
    ],
  },
  {
    category: 'Backend',
    icon: Server,
    technologies: [
      { name: 'Node.js / Bun', desc: 'Wydajne środowisko uruchomieniowe JavaScript po stronie serwera' },
      { name: 'REST & GraphQL', desc: 'Projektowanie API, które skaluje się razem z Twoim produktem' },
      { name: 'PostgreSQL / Redis', desc: 'Sprawdzona w boju warstwa danych ze strategiami cache’owania' },
      { name: 'Serverless & Edge', desc: 'Wdrażanie tam, gdzie ma to sens — a nie tam, gdzie jest modne' },
    ],
  },
  {
    category: 'DevOps',
    icon: GitBranch,
    technologies: [
      { name: 'Vercel / AWS', desc: 'Infrastruktura chmurowa dopasowana do Twojej skali i budżetu' },
      { name: 'CI/CD Pipelines', desc: 'Zautomatyzowane testowanie, budowanie i wdrażanie' },
      { name: 'Docker / Kubernetes', desc: 'Wdrożenia w kontenerach, gdy uzasadnia to złożoność' },
      { name: 'Monitoring & Observability', desc: 'Wiedz, co się dzieje, zanim dowiedzą się Twoi użytkownicy' },
    ],
  },
];

const serviceTypes = [
  {
    icon: Smartphone,
    title: 'Tworzenie MVP',
    description: 'Od pomysłu do działającego produktu w kilka dni. Development przyspieszony przez AI oznacza, że Twoje MVP trafi na produkcję, zanim konkurencja skończy planować sprint.',
    ideal: 'Startupy weryfikujące dopasowanie produktu do rynku',
    timeline: '5-10 dni',
    color: '#ff3d00',
  },
  {
    icon: Globe,
    title: 'Aplikacje webowe',
    description: 'W pełni funkcjonalne aplikacje webowe ze złożoną logiką biznesową, funkcjami czasu rzeczywistego i integracjami. AI zajmuje się boilerplate’em — ja skupiam się na trudnych częściach.',
    ideal: 'Rozwijające się firmy, które potrzebują niezawodności',
    timeline: '2-4 tygodnie',
    color: '#ff3d00',
  },
  {
    icon: Wrench,
    title: 'Ratowanie i refaktoryzacja',
    description: 'Odziedziczyłeś kod, który się sypie? Analiza wspierana przez AI diagnozuje problemy w godziny, a nie dni. Stabilizuję krytyczne ścieżki i szybko wracam Cię na właściwe tory.',
    ideal: 'Zespoły utknięte z kodem legacy lub pisanym w pośpiechu',
    timeline: '3-10 dni',
    color: '#ff3d00',
  },
  {
    icon: Layers,
    title: 'Projektowanie API i systemów',
    description: 'Czyste, udokumentowane API i architektura systemu, na której Twój zespół będzie budował przez lata. Wygenerowana przez AI dokumentacja, schematy i zestawy testów włączone od pierwszego dnia.',
    ideal: 'Firmy budujące produkty platformowe',
    timeline: '3-7 dni',
    color: '#ff3d00',
  },
];

const principles = [
  {
    num: '01',
    title: 'Dostarczaj szybko, dostarczaj dobrze',
    desc: 'Szybkość i jakość nie są przeciwieństwami. Nowoczesne narzędzia i dekada doświadczenia sprawiają, że dostajesz jedno i drugie. Tnę zakres, a nie jakość.',
  },
  {
    num: '02',
    title: 'Żadnych czarnych skrzynek',
    desc: 'Widzisz postępy codziennie. Każda decyzja jest udokumentowana. Gdy projekt się kończy, Twój zespół potrafi utrzymać i rozwijać wszystko, co zbudowałem.',
  },
  {
    num: '03',
    title: 'Wydajność to funkcja',
    desc: 'Core Web Vitals, rozmiar bundle’a, zapytania do bazy danych — optymalizuję pod kątem wydajności w realnym świecie, a nie wyników w benchmarkach.',
  },
  {
    num: '04',
    title: 'Zbudowane, by się zmieniać',
    desc: 'Wymagania ewoluują. Dobra architektura absorbuje zmiany bez przepisywania wszystkiego. Projektuję z myślą o adaptacji, a nie o perfekcji.',
  },
];

const processSteps = [
  {
    num: '01',
    title: 'Odkrywanie i określanie zakresu',
    desc: 'Ustalamy, co budujesz, dla kogo i jak wygląda sukces. Zadaję trudne pytania na początku, żeby później nie było niespodzianek.',
    duration: '1-2 dni',
  },
  {
    num: '02',
    title: 'Architektura i konfiguracja',
    desc: 'Dobór stacku technologicznego, struktura projektu, pipeline CI/CD i środowisko developerskie. AI stawia fundamenty w godziny — ja je dostrajam.',
    duration: '1 dzień',
  },
  {
    num: '03',
    title: 'Sprinty budowania',
    desc: 'Codzienne wdrażalne przyrosty, a nie tygodniowe. Programowanie w parze z AI oznacza 10-krotną wydajność — działające oprogramowanie widzisz każdego dnia. Pętle informacji zwrotnej są natychmiastowe.',
    duration: '1-3 tygodnie',
  },
  {
    num: '04',
    title: 'Uruchomienie i przekazanie',
    desc: 'Wdrożenie produkcyjne, wygenerowana przez AI dokumentacja i transfer wiedzy. Twój zespół dostaje kod, który może przejąć na własność, a nie zależność ode mnie.',
    duration: '1-2 dni',
  },
];

const faqs = [
  {
    q: 'W jakich technologiach się specjalizujesz?',
    a: 'Mój podstawowy stack to React/Next.js, TypeScript i Node.js. Ale jestem agnostyczny technologicznie, gdy ma to znaczenie — jeśli Twój projekt potrzebuje Vue, Pythona czy Go, albo to zbuduję, albo znajdę właściwą osobę. Celem jest rozwiązanie Twojego problemu, a nie promowanie stacku.',
  },
  {
    q: 'Czy możesz pracować z naszym istniejącym zespołem?',
    a: 'Oczywiście. Integruję się z istniejącymi zespołami, stosuję się do Waszego workflow w git, biorę udział w standupach i robię code review. Nie jestem czarną skrzynką — jestem rozszerzeniem Waszego działu inżynierii na czas trwania projektu.',
  },
  {
    q: 'Jak zarządzasz projektem?',
    a: 'Trzymam to w prostocie. Linear lub GitHub Issues do śledzenia zadań, cotygodniowe demo, asynchroniczne aktualizacje przez Slacka. Żadnych 30-stronicowych raportów statusu. Zawsze wiesz, na czym stoisz, bo widzisz działające oprogramowanie, a nie slajdy.',
  },
  {
    q: 'A co z bieżącym utrzymaniem po uruchomieniu?',
    a: 'Oferuję umowy retainerowe na bieżące utrzymanie, rozwój funkcji i wsparcie. Ale celem zawsze jest zbudowanie czegoś, co Twój zespół może przejąć samodzielnie. Piszę czysty kod, dokumentuję decyzje i robię porządne przekazania.',
  },
  {
    q: 'Czy zajmujesz się też projektowaniem?',
    a: 'Mam mocne wyczucie UI/UX i potrafię budować dopracowane interfejsy z wireframe’ów lub systemów projektowych. Przy projektowaniu marki od zera współpracuję z zaufanymi projektantami. Tak czy inaczej, dostajesz produkt, który wygląda i działa premium.',
  },
];

export default function DevelopmentServicePage() {
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
          <span className="srv-hero-giant-text" style={{ color: 'rgba(255, 61, 0, 0.03)' }}>{'{}'}</span>
        </div>

        <div className="container relative z-10">
          <div className="srv-hero-content">
            <Link href="/pl/services" className="srv-hero-label" style={{ textDecoration: 'none' }}>
              <ArrowLeft className="w-4 h-4" />
              <span>Wszystkie usługi</span>
            </Link>

            <h1 className="srv-hero-title">
              <span
                className="srv-hero-title-line srv-hero-title-line-1"
                style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 10}px)` }}
              >
                CODE
              </span>
              <span
                className="srv-hero-title-line srv-hero-title-line-2"
                style={{ transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -8}px)` }}
              >
                <span className="text-stroke">That</span>
              </span>
              <span
                className="srv-hero-title-line srv-hero-title-line-3"
                style={{ transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 15}px)` }}
              >
                <span style={{ color: '#ff3d00' }}>Ships</span>
              </span>
            </h1>

            <p className="srv-hero-subtitle">
              Aplikacje webowe klasy produkcyjnej budowane w nowoczesnym stacku.
              <br />
              <span className="text-[var(--c-text-muted)]">Od MVP po skalę enterprise — kod, który sprawdza się pod presją.</span>
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <Link href="/pl/contact" className="btn-magnetic">
                <span>Rozpocznij projekt</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="srv-hero-scroll">
          <span>Przewiń, aby odkryć więcej</span>
          <div className="srv-hero-scroll-line" />
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="srv-process" style={{ borderTop: '1px solid var(--c-border)' }}>
        <div className="container">
          <div className="srv-process-header">
            <span className="label">Filozofia</span>
            <h2 className="srv-process-title">
              Jak
              <span style={{ color: '#ff3d00' }}> Myślę</span>
            </h2>
            <p className="srv-derivative-desc" style={{ maxWidth: '640px', margin: '0 auto' }}>
              Dobry kod to kod, który rozwiązuje problem, trafia na czas i nie psuje się o 3 nad ranem. Cała reszta to ego.
            </p>
          </div>

          <div className="srv-process-steps">
            {principles.map((p) => (
              <div key={p.num} className="srv-process-step">
                <div className="srv-process-step-num" style={{ color: '#ff3d00' }}>{p.num}</div>
                <div className="srv-process-step-line" />
                <h3 className="srv-process-step-title">{p.title}</h3>
                <p className="srv-process-step-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE TYPES */}
      <section className="srv-derivative">
        <div className="container">
          <div className="srv-derivative-header">
            <span className="label">Co Buduję</span>
            <h2 className="srv-derivative-title">
              Rodzaje
              <span style={{ color: '#ff3d00' }}> Usług</span>
            </h2>
            <p className="srv-derivative-desc">
              Każdy projekt jest inny. Oto jak zazwyczaj wyglądają współprace.
            </p>
          </div>

          <div className="srv-derivative-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {serviceTypes.map((svc) => (
              <div
                key={svc.title}
                className="srv-derivative-card srv-derivative-card-featured"
                style={{ '--card-color': svc.color } as React.CSSProperties}
              >
                <div className="srv-derivative-card-icon">
                  <svc.icon />
                </div>
                <div className="srv-derivative-card-content">
                  <h3 className="srv-derivative-card-title">{svc.title}</h3>
                  <p className="srv-derivative-card-desc">{svc.description}</p>
                  <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--c-text-muted)' }}>
                      <CheckCircle2 className="w-3.5 h-3.5" style={{ color: '#ff3d00', flexShrink: 0 }} />
                      Idealne dla: {svc.ideal}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--c-text-muted)' }}>
                      <Gauge className="w-3.5 h-3.5" style={{ color: '#ff3d00', flexShrink: 0 }} />
                      Czas realizacji: {svc.timeline}
                    </span>
                  </div>
                </div>
                <div className="srv-derivative-card-glow" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="srv-process" style={{ borderTop: '1px solid var(--c-border)' }}>
        <div className="container">
          <div className="srv-process-header">
            <span className="label">Tech Stack</span>
            <h2 className="srv-process-title">
              Narzędzia
              <span style={{ color: '#ff3d00' }}> Warsztatu</span>
            </h2>
            <p className="srv-derivative-desc" style={{ maxWidth: '640px', margin: '0 auto' }}>
              Wybieram właściwe narzędzie do zadania — a nie najmodniejsze na Hacker News.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            {techStack.map((stack) => (
              <div
                key={stack.category}
                style={{
                  background: 'var(--c-surface)',
                  border: '1px solid var(--c-border)',
                  padding: '2rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <stack.icon className="w-5 h-5" style={{ color: '#ff3d00' }} />
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--c-text)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {stack.category}
                  </h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {stack.technologies.map((tech) => (
                    <div key={tech.name}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--c-text)', marginBottom: '0.25rem' }}>
                        {tech.name}
                      </h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--c-text-muted)', lineHeight: 1.5 }}>
                        {tech.desc}
                      </p>
                    </div>
                  ))}
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
            <span className="label">Proces</span>
            <h2 className="srv-derivative-title">
              Jak
              <span style={{ color: '#ff3d00' }}> Dostarczamy</span>
            </h2>
          </div>

          <div className="srv-process-steps">
            {processSteps.map((step) => (
              <div key={step.num} className="srv-process-step">
                <div className="srv-process-step-num" style={{ color: '#ff3d00' }}>{step.num}</div>
                <div className="srv-process-step-line" />
                <h3 className="srv-process-step-title">{step.title}</h3>
                <p className="srv-process-step-desc">{step.desc}</p>
                <span style={{ display: 'inline-block', marginTop: '0.75rem', fontSize: '0.75rem', fontWeight: 600, color: '#ff3d00', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
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
              Częste
              <span style={{ color: '#ff3d00' }}> Pytania</span>
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
              Zbudujmy
              <span className="srv-cta-title-accent"> Coś</span>
            </h2>
            <p className="srv-cta-desc">
              Powiedz mi, co budujesz. Powiem Ci, jak mogę pomóc.
              <br />
              Bez sprzedażowego gadania — po prostu techniczna rozmowa.
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
