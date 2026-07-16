import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Konsulting techniczny — doświadczenie inżynierskie na żądanie',
  description:
    'Konsulting techniczny dla startupów i scale-upów. Przegląd architektury, strategia AI, code review i doświadczony osąd inżynierski — od kogoś, kto pisze produkcyjny kod.',
  openGraph: {
    title: 'Konsulting techniczny — doświadczenie inżynierskie na żądanie',
    description:
      'Konsulting techniczny: przegląd architektury, strategia AI i code review od doświadczonego programisty, który pisze produkcyjny kod.',
  },
};

export default function ConsultingServiceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
