import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Realizacje',
  description: 'Wybrane projekty prezentujące automatyzację AI i tworzenie stron internetowych.',
};

const projects = [
  {
    id: '01',
    title: 'System obsługi klienta oparty na AI',
    client: 'Startup SaaS',
    year: '2025',
    category: 'Automatyzacja AI',
    description: 'Zbudowałem inteligentny system wsparcia, który automatycznie obsługuje 70% zapytań klientów, skracając czas odpowiedzi z godzin do sekund.',
    tags: ['OpenAI', 'LangChain', 'Next.js', 'PostgreSQL'],
    metrics: ['70% automatyzacji', 'odpowiedź < 2s', '95% satysfakcji'],
  },
  {
    id: '02',
    title: 'Przebudowa platformy e-commerce',
    client: 'Marka modowa',
    year: '2025',
    category: 'Tworzenie stron',
    description: 'Kompletna przebudowa przestarzałej platformy e-commerce. Poprawiłem wydajność 3-krotnie, a współczynnik konwersji o 40%.',
    tags: ['Next.js', 'Shopify', 'TypeScript', 'Tailwind'],
    metrics: ['3x szybciej', '+40% konwersji', '99,9% dostępności'],
  },
  {
    id: '03',
    title: 'Inteligentny potok danych',
    client: 'Firma fintech',
    year: '2024',
    category: 'Automatyzacja AI',
    description: 'Zautomatyzowany potok przetwarzania danych z wykrywaniem anomalii opartym na ML, obsługujący ponad 1 mln transakcji dziennie.',
    tags: ['Python', 'AWS', 'Machine Learning', 'PostgreSQL'],
    metrics: ['1M+ transakcji dziennie', '99,7% dokładności', '10x niższe koszty'],
  },
  {
    id: '04',
    title: 'Panel analityczny',
    client: 'B2B SaaS',
    year: '2024',
    category: 'Tworzenie stron',
    description: 'Panel analityczny działający w czasie rzeczywistym ze złożonymi wizualizacjami danych i konfigurowalnymi raportami.',
    tags: ['React', 'D3.js', 'Node.js', 'WebSocket'],
    metrics: ['500+ użytkowników dziennie', 'aktualizacje < 100ms', '25 typów wykresów'],
  },
];

export default function WorkPage() {
  return (
    <div className="grain">
      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-24 md:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600 rounded-full blur-[200px] opacity-10" />

        <div className="container relative z-10">
          <span className="label mb-6 block">Realizacje</span>
          <h1 className="text-headline mb-8">
            <span className="block">Projekty, które</span>
            <span className="block text-accent">dostarczyły.</span>
          </h1>
          <p className="text-xl md:text-2xl text-[var(--c-text-muted)] leading-relaxed max-w-2xl">
            Starannie dobrany wybór projektów prezentujących moje podejście do tworzenia produktów, które przynoszą realne rezultaty.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="pb-24 md:pb-40">
        <div className="container">
          <div className="space-y-24">
            {projects.map((project) => (
              <article key={project.id} className="group">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  {/* Left: Number & Meta */}
                  <div className="lg:col-span-4">
                    <span className="text-[8rem] md:text-[12rem] font-black leading-none text-white/[0.02] group-hover:text-[var(--c-accent)]/10 transition-colors duration-500 block">
                      {project.id}
                    </span>
                    <div className="space-y-4 -mt-8">
                      <div>
                        <span className="label">Klient</span>
                        <p className="text-lg font-medium">{project.client}</p>
                      </div>
                      <div>
                        <span className="label">Rok</span>
                        <p className="text-lg font-medium">{project.year}</p>
                      </div>
                      <div>
                        <span className="label">Kategoria</span>
                        <p className="text-[var(--c-accent)] font-medium">{project.category}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="lg:col-span-8">
                    <h2 className="text-3xl md:text-4xl font-semibold mb-6 group-hover:text-[var(--c-accent)] transition-colors duration-300">
                      {project.title}
                    </h2>
                    <p className="text-xl text-[var(--c-text-muted)] leading-relaxed mb-8">
                      {project.description}
                    </p>

                    {/* Metrics */}
                    <div className="flex flex-wrap gap-4 mb-8">
                      {project.metrics.map((metric) => (
                        <div
                          key={metric}
                          className="px-5 py-3 bg-[var(--c-accent)]/10 border border-[var(--c-accent)]/20 text-[var(--c-accent)] font-medium"
                        >
                          {metric}
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-2 border border-[var(--c-border)] text-[var(--c-text-muted)] text-sm font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="divider mt-24" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="footer-cta">
        <div className="container relative z-10">
          <span className="label mb-6 block">Twój projekt następny?</span>
          <h2 className="text-headline mb-12">
            Stwórzmy <span className="text-accent">coś razem.</span>
          </h2>
          <Link href="/pl/contact" className="btn-magnetic">
            <span>Rozpocznij rozmowę</span>
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
