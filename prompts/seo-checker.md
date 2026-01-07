# SEO Checker Agent Prompt

## Context

Final SEO verification before publication.

## Input

```
Article:
{{ARTICLE_CONTENT}}

Frontmatter:
{{FRONTMATTER}}

Target keyword: {{PRIMARY_KEYWORD}}
Secondary keywords: {{SECONDARY_KEYWORDS}}
```

## Task

Check all SEO aspects and suggest fixes.

## SEO Checklist

### 1. Title tag
- [ ] Contains primary keyword
- [ ] 50-60 characters (optimal)
- [ ] Engaging, not boring
- [ ] Unique

### 2. Meta description (summary/excerpt)
- [ ] 150-160 characters
- [ ] Contains primary keyword
- [ ] Has call to action
- [ ] Encourages clicking

### 3. URL (slug)
- [ ] Contains keyword
- [ ] Short (<60 characters)
- [ ] Lowercase with hyphens

### 4. Content optimization
- [ ] Keyword in first 100 words
- [ ] Keyword density 1-2%
- [ ] Secondary keywords used naturally
- [ ] H2/H3 contain keyword variants

### 5. Structure
- [ ] One H1 (title)
- [ ] Hierarchical H2 > H3
- [ ] Paragraphs not too long
- [ ] Lists where sensible

### 6. Additional
- [ ] Alt text for images (if any)
- [ ] Internal linking opportunities
- [ ] External links to authorities

## Response Format

Return JSON:

```json
{
  "score": 85,
  "checks": [
    {
      "name": "Title contains keyword",
      "passed": true,
      "current": "React Server Components - A Practical Guide",
      "recommendation": null
    },
    {
      "name": "Title length",
      "passed": false,
      "current": "72 characters",
      "recommendation": "Shorten to 60 chars: 'RSC in Practice - Guide with Examples'"
    },
    {
      "name": "Meta description length",
      "passed": true,
      "current": "154 characters",
      "recommendation": null
    },
    {
      "name": "Keyword in first 100 words",
      "passed": true,
      "current": "Found at position 23",
      "recommendation": null
    },
    {
      "name": "Keyword density",
      "passed": true,
      "current": "1.4%",
      "recommendation": null
    },
    {
      "name": "H2 contains keywords",
      "passed": false,
      "current": "2 of 5 H2s contain keyword variants",
      "recommendation": "Add keyword to: 'Mistake #3' → 'Mistake #3: Server Components Mixing'"
    }
  ],
  "suggestedFixes": {
    "title": "RSC in Practice: 5 Mistakes That Cost Me a Week",
    "summary": "After 3 months using React Server Components in production, I compiled the pitfalls I fell into. Learn them before you start your project.",
    "slug": "react-server-components-practical-guide"
  },
  "internalLinkingSuggestions": [
    "Link to Next.js article if exists",
    "Link to performance article if exists"
  ],
  "externalLinkingSuggestions": [
    "React docs: https://react.dev/reference/rsc/server-components",
    "Next.js docs: https://nextjs.org/docs/app/building-your-application/rendering/server-components"
  ]
}
```

## Scoring

- **90-100:** SEO excellent
- **75-89:** SEO good, minor improvements
- **60-74:** SEO needs work
- **<60:** SEO poor, requires fixes

Only suggest `suggestedFixes` for failed checks.
