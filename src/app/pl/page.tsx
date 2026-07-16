import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ScrollProgress } from '@/components/ScrollProgress';
import { HeroParallax } from '@/components/HeroParallax';
import { HeroCodeSymbol } from '@/components/HeroCodeSymbol';
import { ScrollFade, ScrollScale } from '@/components/HeroScrollAnimations';
import { FeaturedPostBrutalist } from '@/components/FeaturedPostBrutalist';
import { MarqueeAwwwardsPl } from '@/components/MarqueeAwwwardsPl';
import { BlogGridAwwwardsPl } from '@/components/BlogGridAwwwardsPl';
import { ServicesAwwwardsPl } from '@/components/ServicesAwwwardsPl';
import { CTAAwwwardsPl } from '@/components/CTAAwwwardsPl';
import { FooterAwwwards } from '@/components/FooterAwwwards';
import { getAllPosts, getFeaturedPosts } from '@/lib/mdx';

export default function HomePagePl() {
  const allPosts = getAllPosts('pl');
  const featuredPosts = getFeaturedPosts('pl');

  // Use first featured post, or fall back to latest post
  const featuredPost = featuredPosts[0] || allPosts[0];

  // Get latest posts excluding the featured one, limit to 4
  const latestPosts = allPosts
    .filter(p => p.slug !== featuredPost?.slug)
    .slice(0, 4)
    .map(p => ({
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

            {/* Intro */}
            <ScrollFade delay={0}>
              <div className="mb-6 relative">
                <span className="label">@codewithseb • Senior Software Developer i Specjalista AI</span>
              </div>
            </ScrollFade>

            {/* Mega headline with parallax */}
            <ScrollScale intensity={0.5}>
              <div className="mb-10 md:mb-14 relative">
                <h1 className="text-display">
                  <HeroParallax direction="right" speed={0.15}>
                    <span className="block">Koduj</span>
                  </HeroParallax>
                  <HeroParallax direction="left" speed={0.25}>
                    <span className="block text-stroke">Pisz</span>
                  </HeroParallax>
                  <HeroParallax direction="right" speed={0.1}>
                    <span className="block text-gradient-animated">Wdrażaj.</span>
                  </HeroParallax>
                </h1>
              </div>
            </ScrollScale>

            {/* Tagline */}
            <ScrollFade delay={50}>
              <div className="max-w-lg mb-10">
                <p className="text-xl md:text-2xl leading-relaxed">
                  <span className="text-[var(--c-text)]">Senior software developer i specjalista AI.</span>
                  <span className="text-[var(--c-text-muted)]"> Zamieniam złożoną technologię w przewagę konkurencyjną.</span>
                </p>
              </div>
            </ScrollFade>

            {/* CTA */}
            <ScrollFade delay={100}>
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/pl/blog" className="btn-magnetic">
                  <span>Czytaj blog</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/pl/contact" className="link-underline text-lg">
                  <span>Współpracuj ze mną</span>
                </Link>
              </div>
            </ScrollFade>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--c-text-muted)]">
            <span className="label text-xs">Przewiń</span>
            <div className="w-px h-12 bg-gradient-to-b from-[var(--c-text-muted)] to-transparent" />
          </div>
        </div>
      </section>

      {/* Featured Post - Brutalist Takeover */}
      {featuredPost && (
        <FeaturedPostBrutalist
          slug={featuredPost.slug}
          title={featuredPost.title}
          excerpt={featuredPost.excerpt}
          category={featuredPost.category}
          date={featuredPost.date}
          readTime={featuredPost.readTime}
          basePath="/pl"
        />
      )}

      {/* Marquee - Awwwards style */}
      <MarqueeAwwwardsPl />

      {/* Latest Posts Grid - Awwwards Edition */}
      <BlogGridAwwwardsPl posts={latestPosts} />

      {/* Services - Awwwards Edition */}
      <ServicesAwwwardsPl />

      {/* CTA - Awwwards Edition */}
      <CTAAwwwardsPl />

      {/* Footer - Awwwards Edition */}
      <FooterAwwwards />
    </div>
  );
}
