const fs = require('fs');
const path = require('path');

// Polish locale is temporarily disabled (translations need rework).
// Every /pl URL redirects (307) to its English counterpart so nothing
// serves the Polish content while it's being fixed. Remove this block
// (and restore the language switcher + sitemap entries) to re-enable.
function polishRedirects() {
  const redirects = [];

  // Polish blog article -> its English original (enSlug frontmatter).
  const plDir = path.join(__dirname, 'content', 'blog', 'pl');
  if (fs.existsSync(plDir)) {
    for (const file of fs.readdirSync(plDir)) {
      if (!file.endsWith('.mdx') && !file.endsWith('.md')) continue;
      const raw = fs.readFileSync(path.join(plDir, file), 'utf8');
      const match = raw.match(/^enSlug:\s*['"]?([^'"\n]+)['"]?\s*$/m);
      if (!match) continue;
      const plSlug = file.replace(/\.(md|mdx)$/, '');
      redirects.push({
        source: `/pl/blog/${plSlug}`,
        destination: `/blog/${match[1].trim()}`,
        permanent: false,
      });
    }
  }

  // Chrome pages map 1:1; anything else falls back to the homepage.
  for (const p of ['/blog', '/about', '/contact', '/work', '/services', '/services/ai', '/services/development', '/services/consulting']) {
    redirects.push({ source: `/pl${p}`, destination: p, permanent: false });
  }
  redirects.push({ source: '/pl/:path*', destination: '/', permanent: false });

  return redirects;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return polishRedirects();
  },
};

module.exports = nextConfig;
