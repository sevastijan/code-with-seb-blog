import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CustomCursor } from '@/components/CustomCursor';
import { ScrollProgress } from '@/components/ScrollProgress';
import { HeroParallax } from '@/components/HeroParallax';
import { HeroCodeSymbol } from '@/components/HeroCodeSymbol';
import { ScrollFade, ScrollScale } from '@/components/HeroScrollAnimations';
import { FeaturedPostBrutalist } from '@/components/FeaturedPostBrutalist';
import { MarqueeAwwwards } from '@/components/MarqueeAwwwards';
import { BlogGridAwwwards } from '@/components/BlogGridAwwwards';
import { ServicesAwwwards } from '@/components/ServicesAwwwards';
import { CTAAwwwards } from '@/components/CTAAwwwards';
import { FooterAwwwards } from '@/components/FooterAwwwards';
import { getAllPosts, getFeaturedPosts } from '@/lib/mdx';

export default function HomePage() {
  const allPosts = getAllPosts();
  const featuredPosts = getFeaturedPosts();

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
      <CustomCursor />
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
                <span className="label">@codewithseb • Fractional CTO & AI Expert</span>
              </div>
            </ScrollFade>

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

            {/* Tagline - AI expert + CTO */}
            <ScrollFade delay={50}>
              <div className="max-w-lg mb-10">
                <p className="text-xl md:text-2xl leading-relaxed">
                  <span className="text-[var(--c-text)]">Fractional CTO & AI specialist.</span>
                  <span className="text-[var(--c-text-muted)]"> Turning complex tech into competitive advantage.</span>
                </p>
              </div>
            </ScrollFade>

            {/* CTA */}
            <ScrollFade delay={100}>
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/blog" className="btn-magnetic">
                  <span>Read the blog</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/contact" className="link-underline text-lg">
                  <span>Work with me</span>
                </Link>
              </div>
            </ScrollFade>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--c-text-muted)]">
            <span className="label text-xs">Scroll</span>
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
        />
      )}

      {/* Marquee - Awwwards style */}
      <MarqueeAwwwards />

      {/* Latest Posts Grid - Awwwards Edition */}
      <BlogGridAwwwards posts={latestPosts} />

      {/* Services - Awwwards Edition */}
      <ServicesAwwwards />

      {/* CTA - Awwwards Edition */}
      <CTAAwwwards />

      {/* Footer - Awwwards Edition */}
      <FooterAwwwards />
    </div>
  );
}
