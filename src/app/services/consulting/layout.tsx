import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Technical Consulting — Senior Engineering Judgment On Demand',
  description:
    'Technical consulting for startups and scale-ups. Architecture review, AI strategy, code review, and senior engineering judgment — from someone who ships production code.',
  openGraph: {
    title: 'Technical Consulting — Senior Engineering Judgment On Demand',
    description:
      'Technical consulting: architecture review, AI strategy, and code review from a senior software developer who ships production code.',
  },
};

export default function ConsultingServiceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
