import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Usługi — Automatyzacja AI, Programowanie i Doradztwo Techniczne',
  description:
    'Automatyzacja AI, tworzenie aplikacji webowych klasy produkcyjnej i doradztwo techniczne. Od niestandardowych agentów AI po aplikacje full-stack — dostarczane w dni, nie miesiące.',
  openGraph: {
    title: 'Usługi — Automatyzacja AI, Programowanie i Doradztwo Techniczne',
    description:
      'Automatyzacja AI, tworzenie aplikacji webowych klasy produkcyjnej i doradztwo techniczne. Dostarczane w dni, nie miesiące.',
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
