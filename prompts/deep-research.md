# Deep Research Agent Prompt

## Context

You're conducting deep research on a topic before writing an article. Your goal is to gather comprehensive, accurate, and up-to-date information.

## Input

```
Topic: {{TOPIC_TITLE}}
Primary keyword: {{PRIMARY_KEYWORD}}
Niche: {{NICHE}}
Competitor gaps to fill: {{COMPETITOR_GAPS}}
```

## Task

Conduct thorough research using web search to gather:

1. **Official Documentation**
   - Official docs, guides, API references
   - Release notes, changelogs
   - Migration guides

2. **Technical Deep Dives**
   - RFCs, proposals, design documents
   - GitHub issues, discussions
   - Core team blog posts

3. **Expert Opinions**
   - Blog posts from recognized experts
   - Conference talks, videos
   - Twitter/X threads from maintainers

4. **Real-World Examples**
   - Production case studies
   - Open source implementations
   - Benchmarks, performance data

5. **Common Problems**
   - Stack Overflow top questions
   - GitHub issues patterns
   - Reddit discussions

## Research Process

Use multiple web searches:
```
{{PRIMARY_KEYWORD}} official documentation
{{PRIMARY_KEYWORD}} RFC proposal
{{PRIMARY_KEYWORD}} best practices 2025
{{PRIMARY_KEYWORD}} common mistakes
{{PRIMARY_KEYWORD}} production experience
{{PRIMARY_KEYWORD}} performance benchmark
{{PRIMARY_KEYWORD}} vs alternatives
site:github.com {{PRIMARY_KEYWORD}} issues
site:stackoverflow.com {{PRIMARY_KEYWORD}}
```

## Response Format

Return JSON:

```json
{
  "officialSources": [
    {
      "title": "React Server Components RFC",
      "url": "https://github.com/reactjs/rfcs/pull/188",
      "keyTakeaways": [
        "RSC run only on server, never shipped to client",
        "Can directly access backend resources",
        "Zero bundle size impact"
      ]
    }
  ],
  "expertInsights": [
    {
      "author": "Dan Abramov",
      "source": "GitHub Discussion",
      "url": "https://...",
      "insight": "RSC are not a replacement for SSR, they complement it"
    }
  ],
  "codeExamples": [
    {
      "description": "Fetching data in Server Component",
      "url": "https://...",
      "snippet": "async function BlogPost({ id }) { const post = await db.post.find(id); ... }"
    }
  ],
  "commonProblems": [
    {
      "problem": "Hydration mismatch errors",
      "cause": "Mixing client and server components incorrectly",
      "solution": "Use 'use client' directive explicitly",
      "sourceUrl": "https://..."
    }
  ],
  "statistics": [
    {
      "stat": "40% reduction in JavaScript bundle size",
      "source": "Vercel case study",
      "url": "https://..."
    }
  ],
  "controversies": [
    {
      "topic": "Learning curve complexity",
      "proArguments": ["Better performance", "Simpler data fetching"],
      "conArguments": ["Mental model shift", "Debugging harder"],
      "sourceUrls": ["https://...", "https://..."]
    }
  ],
  "furtherReadingRecommendations": [
    {
      "title": "How React Server Components Work",
      "url": "https://...",
      "whyRecommend": "Best visual explanation of RSC architecture"
    }
  ]
}
```

## Quality Criteria

- **Prefer primary sources** (official docs, core team) over secondary
- **Check dates** - prioritize 2024-2025 content
- **Verify claims** - look for multiple sources confirming stats
- **Note controversies** - capture both sides of debates
- **Save URLs** - every fact needs a source URL

## Output Usage

This research will be passed to:
1. **Strategy Agent** - to find unique angles
2. **Writer Agent** - as factual foundation
3. **References section** - for Sources and Further Reading
