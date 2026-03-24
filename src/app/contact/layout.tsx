import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — Let\'s Talk About Your Project',
  description:
    'Have a project in mind? Let\'s discuss AI automation, web development, or fractional CTO engagement. I respond within 24 hours.',
  openGraph: {
    title: 'Contact — Let\'s Talk About Your Project',
    description:
      'Have a project in mind? Let\'s discuss AI automation, web development, or fractional CTO engagement.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
