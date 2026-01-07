# Blog Agents - Documentation

## Setup

```bash
# Extract
tar -xzf blog-agents.tar.gz

# Copy contents to blog repo
cp -r blog-agents/* /Users/sebastiansleczka/Code/code-with-seb-blog/
```

**Structure after setup:**

```
/Users/sebastiansleczka/Code/code-with-seb-blog/
├── CLAUDE.md           # Instructions for Claude Code
├── prompts/            # Agent prompts
├── topics/             # Research, queue, archive
├── scripts/            # Templates
├── data/
│   └── blog/           # ← Articles are saved here
└── ... (rest of blog)
```

## Usage

Open Claude Code **in blog directory**:

```bash
cd /Users/sebastiansleczka/Code/code-with-seb-blog
claude
```

### Flow

```
> research frontend        # Finds trends → 10 topics
> pick 1, 3                # Adds to queue
> write article            # Pipeline → article in data/blog/
> publish                  # Branch + push
```

### Pipeline (automatic)

```
[1/9] 🔍 SEO Analysis
[2/9] 🕵️ Competitor Analysis
[3/9] 📚 Deep Research          ← searches docs, RFCs, GitHub, SO
[4/9] 🎯 Strategy (title, hooks, outline)
[5/9] ✍️ Writing                ← exhaustive 100% topic coverage
[6/9] 📝 Editing
[7/9] ✅ Validation
[8/9] 🔎 SEO Check
[9/9] 🏗️ Build Verification     ← runs npm build, fixes errors

✅ DONE: data/blog/react-server-components.mdx
```

## Commands

| Command            | Description                   |
| ------------------ | ----------------------------- |
| `research [niche]` | Find 10 trending topics       |
| `pick 1, 3`        | Add to queue                  |
| `write article`    | Write article (full pipeline) |
| `publish`          | Git branch + push             |
| `list`             | Show topics                   |

## Available Niches

### General

| Niche       | Scope                                                |
| ----------- | ---------------------------------------------------- |
| `frontend`  | React, Vue, Angular, CSS, JS, UX, browsers           |
| `backend`   | Node, Python, Go, APIs, databases, auth              |
| `fullstack` | Everything - front + back + infra                    |
| `devops`    | Docker, Kubernetes, CI/CD, GitHub Actions, Terraform |
| `ai`        | LLMs, Claude, GPT, LangChain, RAG, AI agents         |
| `mobile`    | React Native, Flutter, iOS, Android                  |

### Specific Technologies

| Niche        | Scope                                             |
| ------------ | ------------------------------------------------- |
| `react`      | React 19, hooks, RSC, Server Components, Suspense |
| `nextjs`     | App Router, SSR, ISR, middleware, caching         |
| `typescript` | Types, generics, inference, utility types         |
| `nodejs`     | Node, Bun, Deno, Express, Fastify                 |
| `css`        | Tailwind, Container Queries, CSS Grid, animations |
| `python`     | FastAPI, Django, async, ML                        |
| `vue`        | Vue 3, Nuxt, Composition API                      |
| `testing`    | Jest, Vitest, Playwright, Cypress, TDD            |

### Special Topics

| Niche          | Scope                                       |
| -------------- | ------------------------------------------- |
| `performance`  | Core Web Vitals, optimization, lazy loading |
| `security`     | Auth, OWASP, XSS, CSRF, security            |
| `architecture` | Patterns, microservices, monorepo, DDD      |
| `career`       | Growth, interviews, portfolio, promotions   |

### Usage Examples

```bash
# Broad - many different topics
> research frontend
> research ai

# Narrow - focused on one technology
> research react
> research nextjs

# Very narrow - specific problem
> research react server components
> research nextjs caching
> research typescript generics
```

### Combinations (advanced)

```bash
> research react performance      # React performance
> research nextjs seo            # SEO in Next.js
> research typescript patterns   # TypeScript patterns
> research frontend testing      # Frontend testing
> research ai coding tools       # AI tools for devs
```

## Customization

- **Writing style:** `prompts/writer.md`
- **Titles/hooks:** `prompts/strategy.md`
- **MDX format:** `scripts/templates/article.mdx`

## Cost

**$0** - through your Claude plan
