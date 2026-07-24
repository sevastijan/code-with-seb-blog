'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface RelatedPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
}

interface RelatedPostsProps {
  posts: RelatedPost[];
  basePath?: string;
  labelText?: string;
  title?: string;
  viewAllLabel?: string;
}

export function RelatedPosts({
  posts,
  basePath = '',
  labelText = 'RELATED',
  title = 'Keep reading',
  viewAllLabel = 'View all articles',
}: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="related-posts">
      <div className="container">
        {/* Section header */}
        <div className="related-header">
          <div className="related-label">
            <span className="related-label-text">{labelText}</span>
            <div className="related-label-line" />
            <span className="related-label-num">{String(posts.length).padStart(2, '0')}</span>
          </div>
          <h2 className="related-title">{title}</h2>
        </div>

        {/* Cards grid */}
        <div className="related-grid">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`${basePath}/blog/${post.slug}`}
              className="related-card"
            >
              {/* Category */}
              <div className="related-card-category">{post.category}</div>

              {/* Title */}
              <h3 className="related-card-title">{post.title}</h3>

              {/* Excerpt */}
              <p className="related-card-excerpt">{post.excerpt}</p>

              {/* Footer */}
              <div className="related-card-footer">
                <span>{post.date}</span>
                <span className="related-card-dot">·</span>
                <span>{post.readTime}</span>
                <ArrowUpRight className="related-card-arrow" />
              </div>
            </Link>
          ))}
        </div>

        {/* View all link */}
        <div className="related-cta">
          <Link href={`${basePath}/blog`} className="btn-magnetic">
            <span>{viewAllLabel}</span>
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
