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
    title: 'Własne agenty AI',
    description: 'Autonomiczne agenty, które obsługują złożone, wieloetapowe zadania biznesowe — od segregacji zgłoszeń wsparcia klienta po pipeline\'y przetwarzania danych. Zbudowane, aby rozumować, działać i uczyć się.',
    details: ['Orkiestracja wielu agentów', 'Użycie narzędzi i wywoływanie funkcji', 'Pamięć i zarządzanie kontekstem', 'Zabezpieczenia z człowiekiem w pętli'],
  },
  {
    icon: Workflow,
    title: 'Automatyzacja procesów',
    description: 'Zastąp ręczne, powtarzalne procesy inteligentną automatyzacją. Od przetwarzania dokumentów po raportowanie — AI zajmuje się żmudną pracą, aby Twój zespół mógł skupić się na tym, co ważne.',
    details: ['Ekstrakcja i klasyfikacja dokumentów', 'Automatyczne raporty i podsumowania', 'Automatyzacja e-maili i komunikacji', 'Synchronizacja danych między systemami'],
  },
  {
    icon: BrainCircuit,
    title: 'Integracja LLM',
    description: 'Zintegruj duże modele językowe z istniejącymi produktami i narzędziami wewnętrznymi. Pipeline\'y RAG, fine-tuning, inżynieria promptów — cokolwiek potrzeba, aby osiągnąć realne rezultaty.',
    details: ['RAG (generowanie wspomagane wyszukiwaniem)', 'Inżynieria i optymalizacja promptów', 'Fine-tuning i ewaluacja', 'Dobór modelu i optymalizacja kosztów'],
  },
  {
    icon: Database,
    title: 'Pipeline\'y danych',
    description: 'Napędzane przez AI pozyskiwanie, transformacja i wzbogacanie danych. Zamień chaotyczne, nieustrukturyzowane dane w czystą, użyteczną wiedzę, z której Twój zespół faktycznie skorzysta.',
    details: ['Parsowanie danych nieustrukturyzowanych', 'Ekstrakcja i łączenie encji', 'Wyszukiwanie semantyczne i osadzenia', 'Wzbogacanie danych w czasie rzeczywistym'],
  },
];

const useCases = [
  {
    industry: 'SaaS',
    problem: 'Zespół wsparcia klienta przytłoczony powtarzalnymi zgłoszeniami',
    solution: 'Agent AI, który automatycznie rozwiązuje 60% zgłoszeń pierwszej linii, a pozostałe kieruje z pełnym kontekstem',
    impact: '60% krótszy czas odpowiedzi',
  },
  {
    industry: 'Finanse',
    problem: 'Ręczne wprowadzanie danych z faktur i umów',
    solution: 'Pipeline przetwarzania dokumentów, który automatycznie wyodrębnia, weryfikuje i wprowadza dane',
    impact: '40 godzin/tydzień zaoszczędzone',
  },
  {
    industry: 'E-commerce',
    problem: 'Opisy produktów niespójne i wolne w tworzeniu',
    solution: 'Pipeline treści AI generujący zoptymalizowane pod SEO opisy na podstawie specyfikacji produktów',
    impact: '10x szybsza produkcja treści',
  },
  {
    industry: 'Prawo',
    problem: 'Przegląd umów zajmujący dni na dokument',
    solution: 'Przegląd wspomagany przez AI, który sygnalizuje ryzyka, wyodrębnia kluczowe warunki i podsumowuje zobowiązania',
    impact: '80% szybsze cykle przeglądu',
  },
];

const processSteps = [
  {
    num: '01',
    title: 'Ocena gotowości na AI',
    desc: 'Mapujemy Twoje procesy, identyfikujemy możliwości automatyzacji i oceniamy je pod kątem wpływu i wykonalności. Otrzymujesz priorytetyzowaną mapę drogową — a nie ogólną prezentację.',
    duration: '2-3 dni',
  },
  {
    num: '02',
    title: 'Proof of Concept',
    desc: 'Wybieramy możliwość o największym wpływie i budujemy działający prototyp. Prawdziwe dane, prawdziwe rezultaty. Jeśli nie zadziała, zmieniamy kierunek, zanim zainwestujesz więcej.',
    duration: '3-5 dni',
  },
  {
    num: '03',
    title: 'Budowa produkcyjna',
    desc: 'Zwalidowana koncepcja staje się oprogramowaniem klasy produkcyjnej. Obsługa błędów, monitoring, bezpieczeństwo i skalowalność wbudowane od pierwszego dnia.',
    duration: '1-3 tygodnie',
  },
  {
    num: '04',
    title: 'Wdrożenie i iteracja',
    desc: 'Uruchomienie z monitoringiem i pętlami informacji zwrotnej. Ciągłe poprawianie dokładności, szybkości i zasięgu na podstawie danych o rzeczywistej wydajności.',
    duration: 'Na bieżąco',
  },
];

const faqs = [
  {
    q: 'Czy potrzebuję dużego zbioru danych, aby zacząć z AI?',
    a: 'Nie. Wiele rozwiązań AI działa na Twoich istniejących danych, dokumentach i systemach. W przypadku rozwiązań opartych na LLM możemy zacząć od zera danych treningowych i iterować dalej. Kluczem jest jasno określony problem do rozwiązania, a nie ogromny zbiór danych.',
  },
  {
    q: 'Jak dbacie o prywatność i bezpieczeństwo danych?',
    a: 'Bezpieczeństwo danych jest niepodlegalne negocjacjom. Pracuję z prywatnymi wdrożeniami, modelami on-premise, gdy to potrzebne, i dbam o to, aby całe przetwarzanie danych spełniało standardy RODO/SOC 2. Twoje dane nigdy nie opuszczają Twojej infrastruktury, chyba że tego chcesz.',
  },
  {
    q: 'Jaki jest typowy horyzont czasowy zwrotu z inwestycji (ROI)?',
    a: 'Większość klientów widzi mierzalny ROI w ciągu 2-3 tygodni od wdrożenia. Faza POC ma na celu zweryfikowanie wartości, zanim zdecydujesz się na pełną budowę. Jeśli liczby się nie zgadzają, przerywamy — bez błędu utopionych kosztów.',
  },
  {
    q: 'Czy potraficie zintegrować się z naszym istniejącym stosem technologicznym?',
    a: 'Tak. Buduję rozwiązania AI, które integrują się z tym, co już masz — czy to Salesforce, Slack, własne API, czy systemy legacy. Celem jest wzmocnienie, a nie zastąpienie.',
  },
  {
    q: 'A co, jeśli AI nie jest właściwym rozwiązaniem naszego problemu?',
    a: 'Powiem Ci o tym. Nie każdy problem wymaga AI. Czasem dobrze zaprojektowana automatyzacja, lepsze zapytanie do bazy danych lub zmiana procesu to właściwa odpowiedź. Nie jestem tu, aby sprzedawać AI — jestem tu, aby rozwiązać Twój problem.',
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
            <Link href="/pl/services" className="srv-hero-label" style={{ textDecoration: 'none' }}>
              <ArrowLeft className="w-4 h-4" />
              <span>Wszystkie usługi</span>
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
              AI, które naprawdę działa. Nie hype, nie dema — klasy produkcyjnej
              <br />
              <span className="text-[var(--c-text-muted)]">inteligentna automatyzacja dostarczająca mierzalny ROI.</span>
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
          <span>Przewiń, aby odkryć</span>
          <div className="srv-hero-scroll-line" />
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="srv-process" style={{ borderTop: '1px solid var(--c-border)' }}>
        <div className="container">
          <div className="srv-process-header">
            <span className="label">Rzeczywistość</span>
            <h2 className="srv-process-title">
              Większość projektów AI
              <span className="text-stroke"> Upada</span>
            </h2>
            <p className="srv-derivative-desc" style={{ maxWidth: '640px', margin: '0 auto' }}>
              87% projektów AI nigdy nie trafia na produkcję. Nie dlatego, że technologia nie działa — ale dlatego, że zaczynają od modelu zamiast od problemu. Ja robię to inaczej.
            </p>
          </div>

          <div className="srv-process-steps">
            {[
              { num: '01', icon: Search, title: 'Najpierw problem', desc: 'Zaczynam od Twojego problemu biznesowego, a nie od dema technologii. Jeśli AI nie jest odpowiedzią, powiem Ci o tym.' },
              { num: '02', icon: Target, title: 'Szybko to udowodnij', desc: 'POC w dni, nie miesiące. Prawdziwe dane, mierzalne rezultaty, zanim zainwestujesz w pełną budowę.' },
              { num: '03', icon: Shield, title: 'Klasa produkcyjna', desc: 'Obsługa błędów, monitoring, bezpieczeństwo i skalowalność. Nie notatnik — prawdziwe oprogramowanie.' },
              { num: '04', icon: Gauge, title: 'Mierz wszystko', desc: 'Jasne KPI od pierwszego dnia. Jeśli nie robi różnicy, zmieniamy podejście.' },
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
            <span className="label">Możliwości</span>
            <h2 className="srv-derivative-title">
              Co
              <span style={{ color: '#00ff88' }}> Buduję</span>
            </h2>
            <p className="srv-derivative-desc">
              Kompleksowe rozwiązania AI — od strategii po wdrożenie produkcyjne.
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
            <span className="label">Przypadki użycia</span>
            <h2 className="srv-process-title">
              Prawdziwe problemy,
              <span style={{ color: '#00ff88' }}> Prawdziwe rezultaty</span>
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
            <span className="label">Proces</span>
            <h2 className="srv-derivative-title">
              Od pomysłu do
              <span style={{ color: '#00ff88' }}> Produkcji</span>
            </h2>
            <p className="srv-derivative-desc">
              Sprawdzony framework, który redukuje ryzyko inwestycji w AI i przyspiesza czas do osiągnięcia wartości.
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
              Częste
              <span style={{ color: '#00ff88' }}> Pytania</span>
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
              Gotowy, aby
              <span className="srv-cta-title-accent"> Automatyzować?</span>
            </h2>
            <p className="srv-cta-desc">
              Znajdźmy w Twoim biznesie możliwość AI o największym wpływie.
              <br />
              Darmowa rozmowa oceniająca — bez sprzedaży, tylko jasność.
            </p>
            <Link href="/pl/contact" className="srv-cta-btn">
              <span className="srv-cta-btn-text">Umów rozmowę wstępną</span>
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
