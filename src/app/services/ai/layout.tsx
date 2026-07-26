import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Engineering — Agents, Automation & LLM Integration',
  description:
    'Practical AI that ships to production: custom agents, workflow automation, LLM integration, and retrieval on your own data. Proof of concept in days, production in weeks.',
  openGraph: {
    title: 'AI Engineering — Agents, Automation & LLM Integration',
    description:
      'Practical AI that ships to production, not demos. Proof of concept in days, production in weeks.',
  },
};

export default function AIServiceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
