import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Sebastian Sleczka',
  description:
    'Fractional CTO and AI automation expert with 10+ years of experience. I help startups ship faster with AI-powered development, custom agents, and strategic technical leadership.',
  openGraph: {
    title: 'About — Sebastian Sleczka',
    description:
      'Fractional CTO and AI automation expert with 10+ years of experience building products that matter.',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
