'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, Locale, defaultLocale } from '@/lib/i18n';

// Derive the active locale from the current pathname.
export function localeFromPathname(pathname: string): Locale {
  const seg = pathname.split('/')[1];
  return (locales as readonly string[]).includes(seg) ? (seg as Locale) : defaultLocale;
}

// Strip a leading locale segment ('/pl/...' -> '/...'). Returns '/' for the bare locale root.
function stripLocale(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length && (locales as readonly string[]).includes(parts[0]) && parts[0] !== defaultLocale) {
    parts.shift();
  }
  return '/' + parts.join('/');
}

export type BlogSlugMap = { enToPl: Record<string, string>; plToEn: Record<string, string> };

// Compute the URL for a target locale from the current path.
// For blog article detail pages we resolve the exact translated slug via the
// slug map; if no translation exists we fall back to the blog index (no 404).
function hrefForLocale(pathname: string, target: Locale, map?: BlogSlugMap): string {
  const bare = stripLocale(pathname); // e.g. /blog/some-slug, /about, /
  const prefix = target === defaultLocale ? '' : `/${target}`;

  const articleMatch = bare.match(/^\/blog\/(.+)$/);
  if (articleMatch) {
    const slug = decodeURIComponent(articleMatch[1]);
    const current = localeFromPathname(pathname);
    // Same locale as current: keep the same article.
    if (target === current) return `${prefix}/blog/${slug}`;
    if (map) {
      const counterpart = target === defaultLocale ? map.plToEn[slug] : map.enToPl[slug];
      if (counterpart) return `${prefix}/blog/${counterpart}`;
    }
    return `${prefix}/blog`;
  }
  const path = bare === '/' ? '' : bare;
  return `${prefix}${path}` || '/';
}

interface Props {
  className?: string;
  // Optional explicit targets (e.g. article pages that know the counterpart slug).
  hrefs?: Partial<Record<Locale, string>>;
  blogSlugMap?: BlogSlugMap;
}

export function LanguageSwitcher({ className = '', hrefs, blogSlugMap }: Props) {
  const pathname = usePathname() || '/';
  const current = localeFromPathname(pathname);

  return (
    <div className={`lang-switcher ${className}`} role="group" aria-label="Language">
      {locales.map((loc, i) => {
        const href = hrefs?.[loc] ?? hrefForLocale(pathname, loc, blogSlugMap);
        const isActive = loc === current;
        return (
          <span key={loc} className="lang-switcher-item">
            {i > 0 && <span className="lang-switcher-sep" aria-hidden>/</span>}
            {isActive ? (
              <span className="lang-switcher-link lang-switcher-active" aria-current="true">
                {loc.toUpperCase()}
              </span>
            ) : (
              <Link href={href} className="lang-switcher-link" hrefLang={loc}>
                {loc.toUpperCase()}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
}
