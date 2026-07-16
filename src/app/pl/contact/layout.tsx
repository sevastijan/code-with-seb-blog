import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontakt — Porozmawiajmy o Twoim projekcie',
  description:
    'Masz pomysł na projekt? Porozmawiajmy o automatyzacji AI, tworzeniu stron internetowych lub współpracy w zakresie doradztwa technicznego. Odpowiadam w ciągu 24 godzin.',
  openGraph: {
    title: 'Kontakt — Porozmawiajmy o Twoim projekcie',
    description:
      'Masz pomysł na projekt? Porozmawiajmy o automatyzacji AI, tworzeniu stron internetowych lub współpracy w zakresie doradztwa technicznego.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
