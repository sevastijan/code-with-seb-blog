# Overview

This is a **Tailwind Next.js Starter Blog** - a feature-rich, modern blogging platform built with Next.js 15, React Server Components, and Tailwind CSS. The project serves as a highly customizable blogging template designed to replace traditional static site generators like Jekyll and Hugo.

**Key Features:**
- Markdown/MDX-based content management using Contentlayer
- Static site generation with Next.js App Router
- Responsive design with Tailwind CSS
- Dark/light theme support
- Search functionality (Algolia/KBar)
- Analytics integration (Umami, Plausible, Google Analytics)
- Newsletter subscription support
- Comment systems (Giscus)
- SEO optimized with metadata management
- Code syntax highlighting with Prism
- Math equation support with KaTeX
- Blog tagging and categorization

**Purpose:**
The application provides a ready-to-deploy blogging solution for developers and technical writers who want a modern, performant, and customizable platform without the complexity of a full CMS.

# Recent Changes

**October 17, 2025 - Vercel to Replit Migration**
- Migrated project from Vercel to Replit environment
- Updated package.json scripts to bind to port 5000 and host 0.0.0.0 for Replit compatibility
- Removed husky prepare script to avoid git configuration conflicts in Replit
- Installed dependencies using npm with --legacy-peer-deps flag (React 19 RC peer dependency conflicts)
- Configured development workflow: npm run dev on port 5000 with webview output
- Configured deployment for autoscale: npm run build && npm run serve
- Server running successfully with Contentlayer processing 14 blog documents

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework:** Next.js 15 with React 19 (RC) using the App Router pattern and React Server Components (RSC)

**Rationale:** Next.js App Router provides built-in server-side rendering, static site generation, and optimal performance through automatic code splitting. React Server Components reduce client-side JavaScript bundle size by rendering components on the server.

**Styling:** Tailwind CSS with custom configuration and typography plugin

**Rationale:** Utility-first CSS framework enables rapid UI development with consistent design patterns. The typography plugin provides optimized styles for markdown content rendering.

**Type Safety:** TypeScript with strict configuration

**Rationale:** Static typing catches errors during development and improves code maintainability across components and layouts.

**Component Structure:**
- Reusable components in `/components` directory
- Layout components in `/layouts` directory (PostLayout, PostSimple, PostBanner, AuthorLayout, ListLayout)
- Page components following Next.js App Router conventions in `/app` directory

**State Management:** React hooks (useState, useEffect) with client-side components marked with 'use client' directive

**Routing:** File-based routing using Next.js App Router with dynamic segments for blog posts and tags

## Content Management

**Content Layer:** Contentlayer 2 for type-safe content processing

**Rationale:** Contentlayer transforms MDX/Markdown files into type-safe JSON data at build time, enabling fast content querying and validation. It provides computed fields (reading time, slugs, table of contents) and integrates seamlessly with Next.js.

**Content Processing Pipeline:**
- Markdown/MDX files stored in `/data` directory (blogs, authors)
- Remark plugins for GitHub-flavored markdown, math equations, code titles
- Rehype plugins for syntax highlighting (Prism), autolinks, KaTeX math rendering, citations
- Generated types and JSON output in `.contentlayer/generated`

**Alternatives Considered:** Direct file system reading with gray-matter
**Pros:** Type safety, computed fields, plugin ecosystem, build-time validation
**Cons:** Additional build step, learning curve for configuration

## Build & Deployment

**Build Process:**
1. Contentlayer processes markdown/MDX files into typed JSON
2. Next.js builds static pages and API routes
3. Post-build script generates tag data and search index
4. Assets optimized and bundled with automatic code splitting

**Deployment Target:** Static export compatible with Vercel, Netlify, or any static hosting

**Performance Optimizations:**
- Image optimization with Next.js Image component
- Bundle analysis available via @next/bundle-analyzer
- Font optimization with next/font
- Server Components reduce client JavaScript

## Security

**Content Security Policy:** Configured in next.config.js with strict directives

**Security Headers:**
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Strict-Transport-Security with HSTS
- Referrer-Policy: strict-origin-when-cross-origin

**Rationale:** Defense-in-depth approach prevents common web vulnerabilities (XSS, clickjacking, MIME sniffing)

## Theme System

**Implementation:** next-themes with system preference detection

**Rationale:** Provides seamless dark/light mode switching with localStorage persistence and system theme detection, avoiding flash of unstyled content.

# External Dependencies

## Core Framework Dependencies

- **Next.js 15.0.2** - React framework for production
- **React 19 (RC)** - UI library with Server Components
- **Tailwind CSS 3.4.14** - Utility-first CSS framework
- **contentlayer2 0.5.3** - Type-safe content SDK
- **next-contentlayer2 0.5.3** - Next.js integration for Contentlayer

## Content Processing

- **remark-gfm** - GitHub-flavored Markdown support
- **remark-math** - Math equation parsing
- **rehype-katex** - Math rendering with KaTeX
- **rehype-prism-plus** - Syntax highlighting
- **rehype-slug** - Heading ID generation
- **rehype-autolink-headings** - Automatic heading links
- **rehype-citation** - Citation processing
- **gray-matter** - Frontmatter parsing
- **github-slugger** - URL-safe slug generation
- **reading-time** - Reading time estimation

## UI Components & Utilities

- **@headlessui/react** - Unstyled, accessible UI components
- **@tailwindcss/typography** - Prose styling for markdown
- **@tailwindcss/forms** - Form styling
- **next-themes** - Theme switching
- **body-scroll-lock** - Scroll locking for modals

## Analytics & Integrations

**Pliny Package (0.4.0):** Unified package providing:
- Search implementations (Algolia, KBar)
- Analytics integrations (Umami, Plausible, Google Analytics)
- Newsletter integrations (Mailchimp, Buttondown, ConvertKit, etc.)
- Comment system integration (Giscus)
- MDX utilities and components

**Configuration:** Site-specific settings in `/data/siteMetadata.js` enable/disable integrations without code changes

## Development Tools

- **TypeScript** - Type checking
- **ESLint** - Code linting
- **Prettier** - Code formatting with Tailwind plugin
- **cross-env** - Cross-platform environment variables
- **@next/bundle-analyzer** - Bundle size analysis

## Build Dependencies

- **esbuild 0.20.2** - Fast JavaScript bundler
- **autoprefixer** - CSS vendor prefixing
- **PostCSS** - CSS transformation

## External Services (Optional Configuration)

- **Umami Analytics** - Privacy-focused web analytics (configured via environment variable)
- **Giscus** - GitHub Discussions-based comments
- **Newsletter providers** - Mailchimp, Buttondown, ConvertKit, Klaviyo, Revue, EmailOctopus, Beehive
- **Search providers** - Algolia or KBar for in-site search

**Note:** All external services are optional and configured through `siteMetadata.js`. The application functions as a static blog without any external service dependencies.