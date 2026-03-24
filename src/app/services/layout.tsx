import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services — AI Automation, Development & Fractional CTO',
  description:
    'AI automation, production-grade web development, and fractional CTO services. From custom AI agents to full-stack applications — shipped in days, not months.',
  openGraph: {
    title: 'Services — AI Automation, Development & Fractional CTO',
    description:
      'AI automation, production-grade web development, and fractional CTO services. Shipped in days, not months.',
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
