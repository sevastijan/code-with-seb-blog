# Competitor Agent Prompt

## Context

You're analyzing competing articles to find gaps we can fill.

## Input

```
Topic: {{TOPIC_TITLE}}
Primary keyword: {{PRIMARY_KEYWORD}}
Niche: {{NICHE}}

Competitor search results:
{{COMPETITOR_SEARCH_RESULTS}}
```

## Task

Analyze what competitors do well and poorly, find gaps to fill.

## What to Look For

### Gaps (to fill)

1. **Missing code examples**
   - Do they show working code?
   - Can you copy and run it?

2. **Outdated information**
   - Old library versions
   - Outdated APIs
   - Deprecated methods

3. **No real-world scenarios**
   - Only "hello world"
   - No edge cases
   - No error handling

4. **Omitted topics**
   - Performance considerations
   - Security implications
   - Testing
   - Debugging

5. **Shallow coverage**
   - Topic only superficially covered
   - Opportunity to go deeper

### Strengths (what they do well)

- Article structure
- Technical depth
- Visualizations/diagrams
- Interactive demos

## Response Format

Return JSON:

```json
{
  "analyzedUrls": [
    "https://example.com/article1",
    "https://example.com/article2"
  ],
  "gaps": [
    "No real-world project examples - only hello world",
    "Nobody shows how to debug issues",
    "Missing performance implications",
    "Outdated - covers React 18, not React 19"
  ],
  "strengths": [
    "Good step-by-step structure",
    "Clear architecture diagrams"
  ],
  "averageWordCount": 2000,
  "commonStructure": [
    "Introduction/problem",
    "Theory/concepts",
    "Basic example",
    "Advanced usage",
    "Conclusion"
  ]
}
```

## Tips

- Focus on ACTIONABLE gaps - ones we can actually fill
- Evaluate realistically - not everything they write is bad
- Average length helps set target word count
