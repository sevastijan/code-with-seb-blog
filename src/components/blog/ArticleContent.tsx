'use client';

import { useEffect, useRef } from 'react';

interface ArticleContentProps {
  content: string;
}

// Cache for loaded Prism instance
let prismInstance: typeof import('prismjs') | null = null;
let prismLoading: Promise<typeof import('prismjs')> | null = null;

// Dynamically load Prism to avoid SSR issues
const loadPrism = async () => {
  if (prismInstance) return prismInstance;
  if (prismLoading) return prismLoading;

  prismLoading = (async () => {
    const Prism = await import('prismjs');

    // Load common languages sequentially to avoid conflicts
    await import('prismjs/components/prism-markup');
    await import('prismjs/components/prism-css');
    await import('prismjs/components/prism-javascript');
    await import('prismjs/components/prism-typescript');
    await import('prismjs/components/prism-jsx');
    await import('prismjs/components/prism-tsx');
    await import('prismjs/components/prism-scss');
    await import('prismjs/components/prism-json');
    await import('prismjs/components/prism-bash');
    await import('prismjs/components/prism-python');
    await import('prismjs/components/prism-yaml');
    await import('prismjs/components/prism-sql');
    await import('prismjs/components/prism-markdown');

    prismInstance = Prism;
    return Prism;
  })();

  return prismLoading;
};

export function ArticleContent({ content }: ArticleContentProps) {
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;

    // Apply Prism syntax highlighting with retry
    const highlightCode = async () => {
      const Prism = await loadPrism();

      // Multiple attempts to ensure highlighting works
      const highlight = () => {
        const codeBlocks = article.querySelectorAll('code[class*="language-"]');
        codeBlocks.forEach((block) => {
          if (!block.classList.contains('prism-highlighted')) {
            Prism.highlightElement(block as HTMLElement);
            block.classList.add('prism-highlighted');
          }
        });
      };

      // Immediate attempt
      highlight();

      // Retry after short delays
      setTimeout(highlight, 100);
      setTimeout(highlight, 300);
    };

    highlightCode();

    // Add copy functionality to code blocks
    const copyButtons = article.querySelectorAll('.code-block-copy');
    copyButtons.forEach(button => {
      button.addEventListener('click', async () => {
        const code = decodeURIComponent(button.getAttribute('data-code') || '');
        try {
          await navigator.clipboard.writeText(code);
          button.textContent = 'Copied!';
          setTimeout(() => {
            button.textContent = 'Copy';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      });
    });

    // Animate elements on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const animatableElements = article.querySelectorAll(
      '.prose-h2, .prose-h3, .prose-h4, .prose-p, .prose-ul, .prose-ol, .prose-blockquote, .code-block-wrapper, .prose-figure'
    );
    animatableElements.forEach(el => {
      el.classList.add('prose-animate');
      observer.observe(el);
    });

    return () => {
      copyButtons.forEach(button => {
        button.replaceWith(button.cloneNode(true));
      });
      observer.disconnect();
    };
  }, [content]);

  return (
    <article
      ref={articleRef}
      className="article-content prose"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
