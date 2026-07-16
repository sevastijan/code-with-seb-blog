'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Users, Shield, Lightbulb, Target, CheckCircle2, TrendingUp, Building2, Scale, Compass, FileSearch, UserCheck, BarChart3 } from 'lucide-react';
import { CustomCursor } from '@/components/CustomCursor';
import { ScrollProgress } from '@/components/ScrollProgress';
import { FooterAwwwards } from '@/components/FooterAwwwards';

const whatYouGet = [
  {
    icon: Compass,
    title: 'Strategia techniczna',
    description: 'Trzeźwa ocena tego, gdzie jesteś i dokąd musisz zmierzać. Pomagam podejmować decyzje technologiczne, które wspierają cele biznesowe — a nie odwrotnie.',
    details: ['Mapa drogowa technologii i priorytetyzacja', 'Analiza build vs. buy', 'Ocena i wybór dostawców', 'Strategia długu technologicznego'],
  },
  {
    icon: Users,
    title: 'Code review i mentoring',
    description: 'Doświadczone spojrzenie na Twój kod i Twój zespół. Przeglądam PR-y, wspólnie rozwiązuję trudne problemy i podnoszę poziom Twoich inżynierów — bez wchodzenia komukolwiek w drogę.',
    details: ['Przegląd i feedback do PR-ów', 'Programowanie w parze przy trudnych problemach', 'Najlepsze praktyki inżynierskie', 'Mentoring inżynierów mid-level'],
  },
  {
    icon: FileSearch,
    title: 'Strategia i mapa drogowa AI',
    description: 'Zidentyfikuj, gdzie agenci AI, automatyzacja i LLM-y mogą przekształcić Twój biznes. Otrzymaj spriorytetyzowaną mapę drogową wdrożenia z jasnymi prognozami ROI.',
    details: ['Ocena możliwości AI', 'Wybór i ewaluacja narzędzi', 'Mapa drogowa wdrożenia', 'Modelowanie ROI i kosztów'],
  },
  {
    icon: Shield,
    title: 'Przegląd architektury',
    description: 'Niezależny przegląd architektury Twojego systemu. Znajduję wąskie gardła, pojedyncze punkty awarii i ryzyka skalowalności, zanim zamienią się w produkcyjne incydenty.',
    details: ['Przegląd projektu systemu', 'Analiza wydajności i skalowalności', 'Audyt architektury bezpieczeństwa', 'Optymalizacja kosztów infrastruktury'],
  },
];

const engagementModels = [
  {
    title: 'Wbudowany senior developer',
    description: 'Dołączam do Twojego zespołu na część etatu jako doświadczony inżynier. Piszę kod, przeglądam PR-y, wspólnie rozwiązuję trudne problemy i mentoruję Twój zespół — praktycznie, bez wieży z kości słoniowej.',
    ideal: 'Zespoły, które potrzebują doświadczonego IC, by podnieść poprzeczkę jakości kodu i odblokować trudne problemy techniczne.',
    commitment: '10-20 godz./tydzień',
    duration: '3-12 miesięcy',
    color: '#8b5cf6',
  },
  {
    title: 'Retainer doradczy',
    description: 'Strategiczny dostęp na żądanie. Cotygodniowe lub co dwa tygodnie rozmowy, asynchroniczny dostęp na Slacku i przeglądy dokumentów. Potraktuj to jak doświadczonego inżyniera pod ręką.',
    ideal: 'Founderzy i zespoły, którzy potrzebują technicznej tablicy rezonansowej i okazjonalnych głębokich analiz.',
    commitment: '4-8 godz./miesiąc',
    duration: 'Ciągły',
    color: '#8b5cf6',
  },
  {
    title: 'Projektowo',
    description: 'Skupione zaangażowanie przy konkretnym wyzwaniu: przegląd architektury, warsztat strategii AI, audyt kodu lub planowanie migracji technologicznej. Analiza wspierana przez AI oznacza, że dostarczam w dni, a nie tygodnie.',
    ideal: 'Firmy stojące przed konkretną decyzją lub zmianą techniczną.',
    commitment: 'Pełne skupienie',
    duration: '2-5 dni',
    color: '#8b5cf6',
  },
];

const whoIWorkWith = [
  {
    icon: Building2,
    title: 'Finansowane startupy',
    description: 'Firmy od seed do Series B, które potrzebują doświadczonego osądu inżynierskiego na miarę swoich ambicji. Pomagam budować właściwą rzecz, we właściwy sposób, u boku Twojego zespołu.',
  },
  {
    icon: TrendingUp,
    title: 'Scale-upy',
    description: 'Rozwijające się firmy zderzające się z technicznymi bólami wzrostu. Architektura, która działała przy 10 użytkownikach, nie działa przy 10 000. Pomagam przejść tę zmianę — kodem, nie slajdami.',
  },
  {
    icon: Scale,
    title: 'Inwestorzy i fundusze PE',
    description: 'Ocena techniczna na potrzeby decyzji inwestycyjnych. Daję Ci uczciwą, wspieraną przez AI analizę tego, co jest pod maską — a nie tego, co mówi pitch deck.',
  },
  {
    icon: UserCheck,
    title: 'Nietechniczni founderzy',
    description: 'Masz wizję i wiedzę branżową. Ja dostarczam osąd techniczny: co budować, co pominąć i jak uniknąć kosztownych błędów.',
  },
];

const results = [
  { metric: '50+', label: 'Dostarczonych projektów', desc: 'W obszarze AI, web i mobile' },
  { metric: '10+', label: 'Lat pisania kodu', desc: 'Od juniora do senior IC' },
  { metric: '1000+', label: 'Przejrzanych PR-ów', desc: 'W startupach i kodzie enterprise' },
  { metric: '100+', label: 'Wdrożonych automatyzacji AI', desc: 'Agenci, workflow, integracje' },
];

const faqs = [
  {
    q: 'Czym to się różni od zatrudnienia typowego konsultanta?',
    a: 'Większość konsultantów daje rady z boku i odchodzi. Ja pracuję wewnątrz Twojego kodu — otwieram PR-y, przeglądam kod Twojego zespołu, wspólnie rozwiązuję trudne bugi i siedzę na Waszych standupach, jeśli to przydatne. Rady są tanie, gdy nikt nie musi ich wdrożyć. Ja robię jedno i drugie.',
  },
  {
    q: 'Jak pracujesz u boku istniejących inżynierów?',
    a: 'Jak partner, a nie nadzorca. Najpierw słucham, czytam kod, rozumiem historię i ograniczenia, a potem wspólnie proponuję zmiany. Celem jest podniesienie poprzeczki jakości i odblokowanie trudnych problemów — a nie przypisywanie sobie zasług czy narzucanie się Twojemu zespołowi.',
  },
  {
    q: 'Czy piszesz też kod, czy tylko go przeglądasz?',
    a: 'Jedno i drugie. Jestem praktykującym doświadczonym programistą — przeglądanie kodu to kluczowa część pracy, ale również dostarczam produkcyjne funkcje, prototypuję integracje AI i wspólnie rozwiązuję problemy, na których Twój zespół utknął. Jeśli potrzebujesz tylko recenzenta, to również w porządku.',
  },
  {
    q: 'Czy pomożesz w technical due diligence?',
    a: 'Tak. Regularnie pomagam z techniczną stroną rozmów z inwestorami: uczciwe oceny kodu, raporty ryzyka architektury i gotowość do integracji AI. Inwestorzy chcą wiedzieć, że technologia jest solidna — pomagam to udowodnić (albo sprawdzić, że nie jest, zanim oni to zrobią).',
  },
  {
    q: 'Jak szybko możesz się wdrożyć?',
    a: 'Szybko. Analiza kodu wspierana przez AI oznacza, że rozumiem Twoją architekturę w godziny, a nie tygodnie. Zwykle spędzam 2-3 dni w trybie głębokiej analizy, a pod koniec pierwszego tygodnia otwieram wartościowe PR-y. Do 3. tygodnia jestem w pełni produktywny w Twoim kodzie.',
  },
];

export default function ConsultingServicePage() {
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
          <span className="srv-hero-giant-text" style={{ color: 'rgba(139, 92, 246, 0.03)' }}>DEV</span>
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
                Konsulting
              </span>
              <span
                className="srv-hero-title-line srv-hero-title-line-2"
                style={{ transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -8}px)` }}
              >
                <span style={{ color: '#8b5cf6' }}>techniczny</span>
              </span>
            </h1>

            <p className="srv-hero-subtitle">
              Doświadczony osąd inżynierski na żądanie — bez zatrudniania na pełen etat.
              <br />
              <span className="text-[var(--c-text-muted)]">Architektura, code review i strategia AI — od kogoś, kto pisze kod.</span>
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <Link href="/pl/contact" className="btn-magnetic">
                <span>Umów rozmowę wstępną</span>
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

      {/* THE PROBLEM */}
      <section className="srv-process" style={{ borderTop: '1px solid var(--c-border)' }}>
        <div className="container">
          <div className="srv-process-header">
            <span className="label">Wyzwanie</span>
            <h2 className="srv-process-title">
              Potrzebujesz doświadczonego osądu,
              <span className="text-stroke"> a nie większego zespołu</span>
            </h2>
            <p className="srv-derivative-desc" style={{ maxWidth: '680px', margin: '0 auto' }}>
              Zatrudnienie doświadczonego inżyniera zajmuje 3-6 miesięcy i kosztuje 150-250 tys. USD w pełni obłożone. Potrzebujesz doświadczonego osądu przy konkretnych problemach — teraz, a nie w przyszłym kwartale. Dzięki analizie kodu wspieranej przez AI wdrażam się w dni i wnoszę wartość jak senior IC za ułamek kosztu.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
            {results.map((r) => (
              <div
                key={r.label}
                style={{
                  background: 'var(--c-surface)',
                  border: '1px solid var(--c-border)',
                  padding: '2rem',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#8b5cf6', lineHeight: 1 }}>{r.metric}</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--c-text)', marginTop: '0.5rem' }}>{r.label}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--c-text-muted)', marginTop: '0.25rem' }}>{r.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="srv-derivative">
        <div className="container">
          <div className="srv-derivative-header">
            <span className="label">Co otrzymujesz</span>
            <h2 className="srv-derivative-title">
              Praktyczna
              <span style={{ color: '#8b5cf6' }}> inżynieria</span>
            </h2>
            <p className="srv-derivative-desc">
              Nie rady z boku. Doświadczony programista wbudowany w Twój kod i Twój zespół.
            </p>
          </div>

          <div className="srv-derivative-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            {whatYouGet.map((item) => (
              <div
                key={item.title}
                className="srv-derivative-card srv-derivative-card-featured"
                style={{ '--card-color': '#8b5cf6' } as React.CSSProperties}
              >
                <div className="srv-derivative-card-icon">
                  <item.icon />
                </div>
                <div className="srv-derivative-card-content">
                  <h3 className="srv-derivative-card-title">{item.title}</h3>
                  <p className="srv-derivative-card-desc">{item.description}</p>
                  <ul style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {item.details.map((detail) => (
                      <li key={detail} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--c-text-muted)' }}>
                        <CheckCircle2 className="w-3.5 h-3.5" style={{ color: '#8b5cf6', flexShrink: 0 }} />
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

      {/* WHO I WORK WITH */}
      <section className="srv-process" style={{ borderTop: '1px solid var(--c-border)' }}>
        <div className="container">
          <div className="srv-process-header">
            <span className="label">Idealni klienci</span>
            <h2 className="srv-process-title">
              Z kim
              <span style={{ color: '#8b5cf6' }}> pracuję</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
            {whoIWorkWith.map((client) => (
              <div
                key={client.title}
                style={{
                  background: 'var(--c-surface)',
                  border: '1px solid var(--c-border)',
                  padding: '2rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <client.icon className="w-6 h-6" style={{ color: '#8b5cf6', marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--c-text)', marginBottom: '0.75rem' }}>
                  {client.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--c-text-muted)', lineHeight: 1.6 }}>
                  {client.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENGAGEMENT MODELS */}
      <section className="srv-derivative" style={{ borderTop: '1px solid var(--c-border)' }}>
        <div className="container">
          <div className="srv-derivative-header">
            <span className="label">Modele współpracy</span>
            <h2 className="srv-derivative-title">
              Jak
              <span style={{ color: '#8b5cf6' }}> współpracujemy</span>
            </h2>
            <p className="srv-derivative-desc">
              Elastyczne rozwiązania dopasowane do Twojego etapu, potrzeb i budżetu.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
            {engagementModels.map((model) => (
              <div
                key={model.title}
                style={{
                  background: 'var(--c-surface)',
                  border: '1px solid var(--c-border)',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--c-text)' }}>{model.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--c-text-muted)', lineHeight: 1.6, flex: 1 }}>{model.description}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--c-text-muted)', fontStyle: 'italic' }}>
                  <Lightbulb className="w-3.5 h-3.5 inline-block mr-1" style={{ color: '#8b5cf6' }} />
                  {model.ideal}
                </p>
                <div style={{ display: 'flex', gap: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--c-border)' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--c-text-muted)' }}>Zaangażowanie</span>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#8b5cf6', marginTop: '0.25rem' }}>{model.commitment}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--c-text-muted)' }}>Czas trwania</span>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#8b5cf6', marginTop: '0.25rem' }}>{model.duration}</div>
                  </div>
                </div>
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
              <span style={{ color: '#8b5cf6' }}> pytania</span>
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
              Potrzebujesz doświadczonego
              <span className="srv-cta-title-accent"> spojrzenia inżynierskiego?</span>
            </h2>
            <p className="srv-cta-desc">
              Porozmawiajmy o problemie, na którym utknąłeś, i o tym, dokąd chcesz zmierzać.
              <br />
              30-minutowa rozmowa wstępna — bez pitchu, po prostu jasność.
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
