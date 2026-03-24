import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getPostBySlug,
  getPostSlugs,
  getRelatedPosts,
  extractTableOfContents,
  parseMarkdown,
} from '@/lib/mdx';
import { ArticleHero } from '@/components/blog/ArticleHero';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { ArticleContent } from '@/components/blog/ArticleContent';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { CopyLinkButton } from '@/components/blog/ShareButton';
import { NewsletterCTA } from '@/components/blog/NewsletterCTA';
import { FooterAwwwards } from '@/components/FooterAwwwards';
import { CustomCursor } from '@/components/CustomCursor';
import { ScrollProgress } from '@/components/ScrollProgress';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const url = `https://codewithseb.com/blog/${slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url,
      publishedTime: post.date,
      authors: [post.author || 'Sebastian Sleczka'],
      tags: post.tags,
      siteName: 'Code With Seb',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || (process.env.NODE_ENV === 'production' && post.draft)) {
    notFound();
  }

  const toc = extractTableOfContents(post.content);
  const htmlContent = parseMarkdown(post.content);
  const relatedPosts = getRelatedPosts(slug, 3);

  // Split content into sections at <h2> boundaries for newsletter injection
  const sections = htmlContent.split(/(?=<h2 )/);
  const newsletterConfigs = [
    { variant: 'minimal' as const, description: 'Liked this article? Get more insights delivered to your inbox.' },
    { variant: 'default' as const, title: 'Stay ahead of the curve', description: 'Join 5,000+ developers getting weekly insights on AI, automation, and building products that matter.' },
    { variant: 'featured' as const, title: "Don't miss the next deep dive", description: 'I write about AI, web development, and the business of building software. No fluff, no spam—just actionable insights from real experience.', buttonText: 'Join the newsletter' },
  ];

  // Deterministic "random" positions based on slug hash
  const slugHash = slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const newsletterPositions: number[] = [];
  if (sections.length >= 6) {
    // Place 3 newsletters spread across the article
    const step = Math.floor((sections.length - 1) / 4);
    newsletterPositions.push(
      Math.max(2, (slugHash % step) + step),
      Math.max(2, (slugHash % step) + step * 2),
      Math.max(2, (slugHash % step) + step * 3),
    );
  } else if (sections.length >= 4) {
    // Place 2 newsletters
    const mid = Math.floor(sections.length / 2);
    newsletterPositions.push(mid, sections.length - 1);
  } else if (sections.length >= 2) {
    // Place 1 newsletter
    newsletterPositions.push(sections.length - 1);
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author || 'Sebastian Sleczka',
      url: 'https://codewithseb.com',
    },
    publisher: {
      '@type': 'Person',
      name: 'Sebastian Sleczka',
      url: 'https://codewithseb.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://codewithseb.com/blog/${slug}`,
    },
    keywords: post.tags?.join(', '),
    articleSection: post.category,
    wordCount: post.content.split(/\s+/).length,
  };

  return (
    <div className="grain blog-post-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <CustomCursor />
      <ScrollProgress />

      {/* Hero section */}
      <ArticleHero
        title={post.title}
        excerpt={post.excerpt}
        category={post.category}
        date={post.date}
        readTime={post.readTime}
        author={post.author}
      />

      {/* Main content area */}
      <div className="article-layout">
        {/* Sidebar with TOC */}
        <aside className="article-sidebar">
          <div className="article-sidebar-sticky">
            <TableOfContents items={toc} />
          </div>
        </aside>

        {/* Article content with inline newsletters */}
        <div className="article-main">
          {sections.map((section, i) => {
            const nlIndex = newsletterPositions.indexOf(i);
            const nl = nlIndex !== -1 ? newsletterConfigs[nlIndex % newsletterConfigs.length] : null;
            return (
              <div key={i}>
                {/* Newsletter hidden temporarily */}
                <ArticleContent content={section} />
              </div>
            );
          })}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="article-tags">
              {post.tags.map(tag => (
                <span key={tag} className="article-tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Share section */}
          <div className="article-share">
            <span className="article-share-label">Share this article</span>
            <div className="article-share-buttons">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://codewithseb.com/blog/${slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="article-share-btn"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://codewithseb.com/blog/${slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="article-share-btn"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <CopyLinkButton url={`https://codewithseb.com/blog/${slug}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Related posts */}
      <RelatedPosts posts={relatedPosts} />

      {/* Footer */}
      <FooterAwwwards />
    </div>
  );
}
