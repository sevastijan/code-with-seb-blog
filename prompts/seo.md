# SEO Agent Prompt

## Context

You're analyzing a topic for SEO for a technical blog targeting global English-speaking audience.

## Input

```
Topic: {{TOPIC_TITLE}}
Niche: {{NICHE}}
Why trending: {{WHY_TRENDING}}
Related topics: {{RELATED_TOPICS}}
```

## Task

Conduct SEO analysis and suggest optimizations.

## What to Analyze

1. **Primary Keyword**
   - Main phrase people type into Google
   - In English
   - Specific, not too broad

2. **Secondary Keywords**
   - 3-5 related phrases
   - Long-tail variations
   - Questions (how, why, what is)

3. **Search Volume Estimate**
   - Estimate monthly volume for global market
   - Realistic: most tech keywords have 1,000-50,000/month

4. **Difficulty Estimate**
   - 0-30: Easy (low competition)
   - 30-60: Medium
   - 60-100: Hard (high competition)

5. **SEO Title**
   - Contains primary keyword
   - 50-60 characters
   - Engaging, specific

6. **URL Slug**
   - Lowercase
   - Hyphens instead of spaces
   - Contains keyword

## Response Format

Return JSON:

```json
{
  "primaryKeyword": "react server components tutorial",
  "secondaryKeywords": [
    "rsc nextjs",
    "server components example", 
    "react 19 server components",
    "how to use server components"
  ],
  "estimatedVolume": 12000,
  "estimatedDifficulty": 45,
  "suggestedTitle": "React Server Components - A Practical Guide with Examples",
  "suggestedSlug": "react-server-components-practical-guide"
}
```

## Tips

- Focus on global English market
- Specific phrases > general (better "nextjs server components" than "react tutorial")
- Questions often have lower competition
