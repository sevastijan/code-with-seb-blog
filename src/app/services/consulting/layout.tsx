import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fractional CTO — Strategic AI-Powered Technical Leadership',
  description:
    'Fractional CTO services for startups and scale-ups. AI strategy, team building, architecture decisions, and technical leadership — without the full-time cost.',
  openGraph: {
    title: 'Fractional CTO — Strategic AI-Powered Technical Leadership',
    description:
      'Fractional CTO services: AI strategy, team building, and architecture decisions without the full-time cost.',
  },
};

export default function ConsultingServiceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
