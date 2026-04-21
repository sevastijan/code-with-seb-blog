import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services — AI Automation, Development & Technical Consulting',
  description:
    'AI automation, production-grade web development, and technical consulting. From custom AI agents to full-stack applications — shipped in days, not months.',
  openGraph: {
    title: 'Services — AI Automation, Development & Technical Consulting',
    description:
      'AI automation, production-grade web development, and technical consulting. Shipped in days, not months.',
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
