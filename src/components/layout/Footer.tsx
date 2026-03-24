import Link from 'next/link';
import { ArrowUpRight, Github, Linkedin, Youtube, Instagram } from 'lucide-react';

const navigation = [
  { name: 'Blog', href: '/blog' },
  { name: 'Work', href: '/work' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const social = [
  { name: 'GitHub', href: 'https://github.com/sevastijan', icon: Github },
  { name: 'YouTube', href: 'https://www.youtube.com/@CodeWithSeb', icon: Youtube },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/sebastiansleczka/', icon: Linkedin },
  { name: 'Instagram', href: 'https://www.instagram.com/codewithseb/', icon: Instagram },
];

export function Footer() {
  return (
    <footer className="relative bg-[var(--c-bg)] border-t border-[var(--c-border)]">
      {/* Bottom Bar */}
      <div className="container py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[var(--c-accent)] flex items-center justify-center">
                <span className="text-[var(--c-bg)] font-bold text-sm">S</span>
              </div>
              <span className="text-sm font-medium">codewithseb</span>
            </Link>
            <span className="text-[var(--c-text-muted)] text-sm">
              © {new Date().getFullYear()}
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center gap-6 md:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[var(--c-text-muted)] hover:text-[var(--c-text)] transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-4">
            {social.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-[var(--c-border)] flex items-center justify-center text-[var(--c-text-muted)] hover:text-[var(--c-accent)] hover:border-[var(--c-accent)] transition-all duration-300"
                  aria-label={item.name}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
