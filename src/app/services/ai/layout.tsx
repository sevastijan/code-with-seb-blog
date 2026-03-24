import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '10X AI — Custom AI Agents & Workflow Automation',
  description:
    'Transform your business with AI that actually works. Custom AI agents, workflow automation, LLM integration, and data pipelines — POC in days, production in weeks.',
  openGraph: {
    title: '10X AI — Custom AI Agents & Workflow Automation',
    description:
      'Custom AI agents, workflow automation, and LLM integration that delivers measurable ROI. POC in days, production in weeks.',
  },
};

export default function AIServiceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
