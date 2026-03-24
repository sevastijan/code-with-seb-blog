import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Development — AI-Accelerated Web Applications',
  description:
    'Production-grade web applications built with Next.js, React, and TypeScript. AI-accelerated development means MVPs in days and full apps in weeks, not months.',
  openGraph: {
    title: 'Development — AI-Accelerated Web Applications',
    description:
      'Production-grade web applications with AI-accelerated development. MVPs in days, full apps in weeks.',
  },
};

export default function DevelopmentServiceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
