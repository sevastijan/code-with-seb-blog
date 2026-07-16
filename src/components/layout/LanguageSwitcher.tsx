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

// Compute the URL for a target locale from the current path.
// Blog article detail pages have locale-specific slugs the client can't map,
// so we fall back to the target locale's blog index for those (avoids 404s).
function hrefForLocale(pathname: string, target: Locale): string {
  const bare = stripLocale(pathname); // e.g. /blog/some-slug, /about, /
  const prefix = target === defaultLocale ? '' : `/${target}`;

  const isArticleDetail = /^\/blog\/.+/.test(bare);
  if (isArticleDetail) {
    return `${prefix}/blog`;
  }
  const path = bare === '/' ? '' : bare;
  return `${prefix}${path}` || '/';
}

interface Props {
  className?: string;
  // Optional explicit targets (e.g. article pages that know the counterpart slug).
  hrefs?: Partial<Record<Locale, string>>;
}

export function LanguageSwitcher({ className = '', hrefs }: Props) {
  const pathname = usePathname() || '/';
  const current = localeFromPathname(pathname);

  return (
    <div className={`lang-switcher ${className}`} role="group" aria-label="Language">
      {locales.map((loc, i) => {
        const href = hrefs?.[loc] ?? hrefForLocale(pathname, loc);
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
