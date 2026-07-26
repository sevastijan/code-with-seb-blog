import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ScrollProgress } from '@/components/ScrollProgress';
import { HeroParallax } from '@/components/HeroParallax';
import { HeroCodeSymbol } from '@/components/HeroCodeSymbol';
import { ScrollFade, ScrollScale } from '@/components/HeroScrollAnimations';
import { ServicesAwwwards } from '@/components/ServicesAwwwards';
import { FooterAwwwards } from '@/components/FooterAwwwards';
import { getAllPosts } from '@/lib/mdx';

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function HomePage() {
  const allPosts = getAllPosts();
  const latest = allPosts[0];
  const recentPosts = allPosts
    .filter((p) => p.slug !== latest?.slug)
    .slice(0, 4)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      category: p.category,
      date: p.date,
      readTime: p.readTime,
    }));

  return (
    <div className="grain">
      <ScrollProgress />

      {/* Hero - Blog First */}
      <section className="min-h-screen relative overflow-hidden">
        {/* 3D </> symbol */}
        <HeroCodeSymbol />

        {/* Animated blob */}
        <div className="blob w-[600px] h-[600px] bg-[var(--c-accent)] top-0 right-0 opacity-10" />

        <div className="container pt-32 md:pt-40 pb-20 relative z-10">
          <div className="max-w-4xl min-h-[70vh] flex flex-col justify-center">
            {/* Dark gradient backdrop for readability */}
            <div className="hero-text-backdrop" />

            {/* Mega headline with parallax */}
            <ScrollScale intensity={0.5}>
              <div className="mb-10 md:mb-14 relative">
                <h1 className="text-display">
                  <HeroParallax direction="right" speed={0.15}>
                    <span className="block">Code</span>
                  </HeroParallax>
                  <HeroParallax direction="left" speed={0.25}>
                    <span className="block text-stroke">Write</span>
                  </HeroParallax>
                  <HeroParallax direction="right" speed={0.1}>
                    <span className="block text-gradient-animated">Ship.</span>
                  </HeroParallax>
                </h1>
              </div>
            </ScrollScale>

            {/* Tagline */}
            <ScrollFade delay={50}>
              <div className="max-w-xl mb-10">
                <p className="text-xl md:text-2xl leading-relaxed">
                  <span className="text-[var(--c-text)]">I build production software and the AI that runs inside it.</span>
                  <span className="text-[var(--c-text-muted)]"> Here I write about how it&apos;s done, and where you can put me to work.</span>
                </p>
              </div>
            </ScrollFade>

            {/* CTA */}
            <ScrollFade delay={100}>
              <div className="home-hero-cta">
                <Link href="/services" className="home-hero-btn home-hero-btn-primary">
                  <span>Work with me</span>
                  <ArrowRight />
                </Link>
                <Link href="/blog" className="home-hero-btn home-hero-btn-ghost">
                  <span>Read the blog</span>
                </Link>
              </div>
            </ScrollFade>
          </div>

          {/* Scroll hint - mouse with scrolling wheel */}
          <div className="home-scroll-hint" aria-hidden="true">
            <span className="home-scroll-mouse">
              <span className="home-scroll-wheel" />
            </span>
          </div>
        </div>
      </section>

      {/* LATEST ARTICLES - featured + list, one section */}
      {latest && (
        <section className="home-blog">
          <div className="container">
            <div className="home-blog-head">
              <div>
                <span className="label">From the blog</span>
                <h2 className="home-blog-title">Latest articles</h2>
              </div>
              <Link href="/blog" className="home-blog-all">
                <span>All posts</span>
                <ArrowUpRight />
              </Link>
            </div>

            <Link href={`/blog/${latest.slug}`} className="home-blog-featured">
              <div className="home-blog-meta">
                <span className="home-blog-cat">{latest.category}</span>
                <span>{formatDate(latest.date)}</span>
                <span>{latest.readTime}</span>
              </div>
              <h3 className="home-blog-featured-title">{latest.title}</h3>
              <p className="home-blog-featured-excerpt">{latest.excerpt}</p>
              <span className="home-blog-read">
                Read article
                <ArrowRight />
              </span>
            </Link>

            <div className="home-blog-grid">
              {recentPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="home-blog-card">
                  <div className="home-blog-meta">
                    <span className="home-blog-cat">{post.category}</span>
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <h3 className="home-blog-card-title">{post.title}</h3>
                  <span className="home-blog-card-arrow">
                    <ArrowUpRight />
                  </span>
                </Link>
              ))}
            </div>

            <div className="home-blog-more-wrap">
              <Link href="/blog" className="home-blog-more">
                <span>View all articles</span>
                <ArrowRight />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* SERVICES - Awwwards carousel (unchanged) */}
      <ServicesAwwwards />

      {/* CTA */}
      <section className="srv2-cta">
        <div className="container">
          <h2 className="srv2-cta-title">
            Let&apos;s build
            <br />
            something.
          </h2>
          <p className="srv2-cta-desc">
            Tell me what you&apos;re working on and where it&apos;s stuck. No pitch, no sales
            call, just a straight answer on whether I can help.
          </p>
          <Link href="/contact" className="srv2-cta-btn">
            <span>Start a conversation</span>
            <ArrowRight />
          </Link>
        </div>
      </section>

      <FooterAwwwards />
    </div>
  );
}
