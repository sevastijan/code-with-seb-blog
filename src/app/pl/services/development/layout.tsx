import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Development — aplikacje webowe tworzone z pomocą AI',
  description:
    'Aplikacje webowe klasy produkcyjnej budowane w Next.js, React i TypeScript. Development przyspieszony przez AI oznacza MVP w kilka dni i pełne aplikacje w kilka tygodni, a nie miesięcy.',
  openGraph: {
    title: 'Development — aplikacje webowe tworzone z pomocą AI',
    description:
      'Aplikacje webowe klasy produkcyjnej z developmentem przyspieszonym przez AI. MVP w kilka dni, pełne aplikacje w kilka tygodni.',
  },
};

export default function DevelopmentServiceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
