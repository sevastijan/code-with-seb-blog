// Internationalization config and UI string dictionaries.
// English is the default locale (served at the root); Polish is served under /pl.

export const locales = ['en', 'pl'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Map our locale to a BCP-47 tag (used for <html lang>, hreflang, date formatting).
export const localeToBCP47: Record<Locale, string> = {
  en: 'en-US',
  pl: 'pl-PL',
};

// Path prefix for a locale ('' for the default English, '/pl' for Polish).
export function localePrefix(locale: Locale): string {
  return locale === defaultLocale ? '' : `/${locale}`;
}

// Build a locale-aware blog URL for a given slug.
export function blogPath(locale: Locale, slug?: string): string {
  const base = `${localePrefix(locale)}/blog`;
  return slug ? `${base}/${slug}` : base;
}

// UI strings used across the blog and site chrome.
type UIStrings = {
  // generic / nav
  nav: { blog: string; about: string; services: string; work: string; contact: string };
  languageName: string;
  switchTo: string; // aria-label prefix for the language switcher
  // blog
  readTime: (min: number) => string;
  backToBlog: string;
  shareArticle: string;
  relatedPosts: string;
  tableOfContents: string;
  allArticles: string;
  blogTitle: string;
  blogSubtitle: string;
  minRead: string;
  translationMissing: string; // shown when a PL translation doesn't exist yet
};

export const ui: Record<Locale, UIStrings> = {
  en: {
    nav: { blog: 'Blog', about: 'About', services: 'Services', work: 'Work', contact: 'Contact' },
    languageName: 'English',
    switchTo: 'Switch language to',
    readTime: (min) => `${min} min read`,
    backToBlog: 'Back to blog',
    shareArticle: 'Share this article',
    relatedPosts: 'Related articles',
    tableOfContents: 'Table of contents',
    allArticles: 'All articles',
    blogTitle: 'Blog',
    blogSubtitle: 'Notes on AI, web development, and building software that matters.',
    minRead: 'min read',
    translationMissing: 'This article is not available in English yet.',
  },
  pl: {
    nav: { blog: 'Blog', about: 'O mnie', services: 'Usługi', work: 'Realizacje', contact: 'Kontakt' },
    languageName: 'Polski',
    switchTo: 'Zmień język na',
    readTime: (min) => `${min} min czytania`,
    backToBlog: 'Wróć do bloga',
    shareArticle: 'Udostępnij artykuł',
    relatedPosts: 'Powiązane artykuły',
    tableOfContents: 'Spis treści',
    allArticles: 'Wszystkie artykuły',
    blogTitle: 'Blog',
    blogSubtitle: 'Notatki o AI, web developmencie i tworzeniu oprogramowania, które ma znaczenie.',
    minRead: 'min czytania',
    translationMissing: 'Ten artykuł nie jest jeszcze dostępny po polsku.',
  },
};

export function t(locale: Locale): UIStrings {
  return ui[locale] ?? ui[defaultLocale];
}
