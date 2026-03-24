import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  author?: string;
  coverImage?: string;
  tags?: string[];
  featured?: boolean;
  draft?: boolean;
}

export interface Post extends PostMeta {
  content: string;
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

// Ensure content directory exists
function ensureContentDirectory() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
}

// Get all post slugs
export function getPostSlugs(): string[] {
  ensureContentDirectory();
  try {
    return fs.readdirSync(postsDirectory)
      .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
      .map(file => file.replace(/\.(md|mdx)$/, ''));
  } catch {
    return [];
  }
}

// Get post by slug
export function getPostBySlug(slug: string): Post | null {
  ensureContentDirectory();
  const realSlug = slug.replace(/\.(md|mdx)$/, '');

  // Try .mdx first, then .md
  let fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(postsDirectory, `${realSlug}.md`);
  }

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Calculate read time
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/g).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);

  return {
    slug: realSlug,
    title: data.title || 'Untitled',
    excerpt: data.excerpt || data.description || '',
    date: data.date ? new Date(data.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : '',
    category: data.category || 'Uncategorized',
    readTime: `${readTime} min read`,
    author: data.author || 'Sebastian',
    coverImage: data.coverImage || data.cover || null,
    tags: data.tags || [],
    featured: data.featured || false,
    draft: data.draft || false,
    content,
  };
}

// Get all posts sorted by date
export function getAllPosts(): PostMeta[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map(slug => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .filter(post => process.env.NODE_ENV === 'development' || !post.draft)
    .map(({ content, ...meta }) => meta)
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });

  return posts;
}

// Get featured posts
export function getFeaturedPosts(): PostMeta[] {
  return getAllPosts().filter(post => post.featured);
}

// Get posts by category
export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter(
    post => post.category.toLowerCase() === category.toLowerCase()
  );
}

// Get all categories
export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map(post => post.category));
  return Array.from(categories);
}

// Get related posts (same category, excluding current)
export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const currentPost = getPostBySlug(slug);
  if (!currentPost) return [];

  return getAllPosts()
    .filter(post => post.slug !== slug && post.category === currentPost.category)
    .slice(0, limit);
}

// Extract table of contents from markdown
export function extractTableOfContents(content: string): TableOfContentsItem[] {
  // Normalize line endings
  const normalizedContent = content.replace(/\r\n/g, '\n');

  // Remove code blocks first to avoid matching headings inside them
  const contentWithoutCode = normalizedContent.replace(/```[\s\S]*?```/g, '');

  const toc: TableOfContentsItem[] = [];

  // Split by lines and find headings manually for more reliability
  const lines = contentWithoutCode.split('\n');

  for (const line of lines) {
    const match = line.match(/^(#{2,4})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const title = match[2].trim();
      const id = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      toc.push({ id, title, level });
    }
  }

  return toc;
}

// Parse markdown to HTML with custom rendering
export function parseMarkdown(content: string): string {
  // Normalize line endings first
  let html = content.replace(/\r\n/g, '\n');

  // Store code blocks with placeholders to protect them from paragraph processing
  const codeBlocks: string[] = [];

  // Code blocks with language - handle with or without language specifier
  html = html.replace(/```(\w+)?[\s]*\n([\s\S]*?)```/g, (_, lang, code) => {
    const language = lang || 'text';
    const escapedCode = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .trimEnd();
    const codeBlockHtml = `<div class="code-block-wrapper" data-language="${language}"><div class="code-block-header"><span class="code-block-lang">${language}</span><button class="code-block-copy" data-code="${encodeURIComponent(escapedCode)}">Copy</button></div><pre class="code-block language-${language}"><code class="language-${language}">${escapedCode}</code></pre></div>`;

    // Store and replace with placeholder
    const placeholder = `%%%CODEBLOCK_${codeBlocks.length}%%%`;
    codeBlocks.push(codeBlockHtml);
    return placeholder;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

  // Headers with IDs for anchor links
  html = html.replace(/^#### (.+)$/gm, (_, text) => {
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return `<h4 id="${id}" class="prose-h4">${text}</h4>`;
  });
  html = html.replace(/^### (.+)$/gm, (_, text) => {
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return `<h3 id="${id}" class="prose-h3">${text}</h3>`;
  });
  html = html.replace(/^## (.+)$/gm, (_, text) => {
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return `<h2 id="${id}" class="prose-h2">${text}</h2>`;
  });

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="prose-link">$1</a>');

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g,
    '<figure class="prose-figure"><img src="$2" alt="$1" class="prose-img" /><figcaption class="prose-figcaption">$1</figcaption></figure>');

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote class="prose-blockquote">$1</blockquote>');

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li class="prose-li">$1</li>');
  html = html.replace(/(<li class="prose-li">.*<\/li>\n?)+/g, '<ul class="prose-ul">$&</ul>');

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="prose-li-ordered">$1</li>');
  html = html.replace(/(<li class="prose-li-ordered">.*<\/li>\n?)+/g, '<ol class="prose-ol">$&</ol>');

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr class="prose-hr" />');

  // Tables - parse markdown tables into HTML
  const tableBlocks: string[] = [];
  html = html.replace(/((?:^\|.+\|[ ]*\n)+)/gm, (tableMatch) => {
    const rows = tableMatch.trim().split('\n');
    if (rows.length < 2) return tableMatch;

    // Check if second row is separator (|---|---|)
    const isSeparator = (row: string) => /^\|[\s\-:]+\|/.test(row) && !row.replace(/[\s|:\-]/g, '').length;

    let headerRow: string | null = null;
    let dataRows: string[] = [];

    if (isSeparator(rows[1])) {
      headerRow = rows[0];
      dataRows = rows.slice(2);
    } else {
      dataRows = rows;
    }

    const parseRow = (row: string) =>
      row.split('|').slice(1, -1).map(cell => cell.trim());

    let tableHtml = '<div class="prose-table-wrapper"><table class="prose-table">';

    if (headerRow) {
      const headers = parseRow(headerRow);
      tableHtml += '<thead><tr>';
      headers.forEach(h => { tableHtml += `<th>${h}</th>`; });
      tableHtml += '</tr></thead>';
    }

    tableHtml += '<tbody>';
    dataRows.forEach(row => {
      if (!row.trim()) return;
      const cells = parseRow(row);
      tableHtml += '<tr>';
      cells.forEach(c => { tableHtml += `<td>${c}</td>`; });
      tableHtml += '</tr>';
    });
    tableHtml += '</tbody></table></div>';

    const placeholder = `%%%TABLEBLOCK_${tableBlocks.length}%%%`;
    tableBlocks.push(tableHtml);
    return placeholder;
  });

  // Paragraphs (wrap remaining text blocks)
  html = html
    .split('\n\n')
    .map(block => {
      const trimmed = block.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('<')) return trimmed;
      // Check if it's a code block placeholder
      if (trimmed.startsWith('%%%CODEBLOCK_')) return trimmed;
      return `<p class="prose-p">${trimmed.replace(/\n/g, '<br />')}</p>`;
    })
    .join('\n');

  // Restore code blocks from placeholders
  codeBlocks.forEach((codeBlock, index) => {
    html = html.replace(`%%%CODEBLOCK_${index}%%%`, codeBlock);
  });

  // Restore table blocks from placeholders
  tableBlocks.forEach((tableBlock, index) => {
    html = html.replace(`%%%TABLEBLOCK_${index}%%%`, tableBlock);
  });

  return html;
}
