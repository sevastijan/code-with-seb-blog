import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '10X AI — Własne agenty AI i automatyzacja procesów',
  description:
    'Zmień swój biznes dzięki AI, które naprawdę działa. Własne agenty AI, automatyzacja procesów, integracja LLM i pipeline\'y danych — POC w kilka dni, produkcja w kilka tygodni.',
  openGraph: {
    title: '10X AI — Własne agenty AI i automatyzacja procesów',
    description:
      'Własne agenty AI, automatyzacja procesów i integracja LLM, które dostarczają mierzalny ROI. POC w kilka dni, produkcja w kilka tygodni.',
  },
};

export default function AIServiceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
