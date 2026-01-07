# Research Agent Prompt

## Context

You're analyzing global trends in `{{NICHE}}` to propose technical blog topics.

## Input

Search results from various sources:
```
{{SEARCH_RESULTS}}
```

## Task

Generate 10 blog post topic proposals.

For each topic evaluate:
- **Trend Score (0-100):** How "hot" the topic is + SEO potential
- **Why Trending:** Why it's worth writing about now
- **Related Topics:** Related topics for internal linking

## Good Topic Criteria

1. **Timeliness** - something changed, new version, new trend
2. **SEO Potential** - people are searching for this
3. **Practical Value** - can show code, examples
4. **Unique Angle** - can say something new
5. **Controversy/Opinion** - sparks discussion

## Response Format

Return JSON (no markdown code blocks):

```json
[
  {
    "title": "English title - specific, engaging",
    "trendScore": 85,
    "whyTrending": "Brief explanation why now",
    "relatedTopics": ["topic1", "topic2"],
    "sources": ["hackernews", "reddit", "devto"]
  }
]
```

## Good Title Examples

- "React Server Components in Practice - What Tutorials Don't Tell You"
- "Bun 1.2 vs Node.js - Step by Step Migration Guide"
- "Why I Stopped Using useEffect (And You Should Too)"
- "TypeScript 5.4 - 3 Features That Will Change Your Code"
- "CSS Container Queries - A Practical Guide with Examples"

## What to Avoid

- Too general topics ("Introduction to React")
- Topics without timeliness ("JavaScript Basics")
- Clickbait without value
- Topics requiring very specialized knowledge
