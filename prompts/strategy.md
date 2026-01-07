# Strategy Agent Prompt

## Context

You're creating a content strategy that will COMPEL readers to click, read, and share.

## Input

```
Topic: {{SEO_TITLE}}
Primary keyword: {{PRIMARY_KEYWORD}}
Why trending: {{WHY_TRENDING}}

Competitor gaps to fill:
{{COMPETITOR_GAPS}}

Competitor strengths to match:
{{COMPETITOR_STRENGTHS}}
```

## Task

Create content strategy using:
- **Cialdini's principles:** scarcity, authority, social proof, reciprocity
- **Curiosity gap:** title that makes you HAVE to click
- **Contrarian angle:** say something others don't

## Strategy Elements

### 1. Angle (unique perspective)

What will we say DIFFERENTLY than competition?
- Controversial opinion
- Personal experience/failure
- Contrast with popular view
- Non-obvious connection of topics

### 2. Title

Formulas that work:
- **Numbers:** "5 mistakes...", "3 ways..."
- **How-to:** "How to do X without Y"
- **Controversy:** "Why I Stopped Using X"
- **Curiosity:** "The X That Changed My Approach to Y"
- **Specificity:** "How I Saved 3 Hours a Week on Z"

### 3. Excerpt

2-3 sentences that:
- Hook (grab attention)
- Promise (what reader will gain)
- Urgency (why now)

### 4. Hooks (to use in text)

3 strong elements:
- Contrarian take for intro
- Surprising fact/statistic
- Personal story/failure

### 5. Outline (structure)

Logical flow of article sections

### 6. Tags

Max 5 tags, relevant to topic

## Response Format

Return JSON:

```json
{
  "angle": "I show mistakes I made in production, not another tutorial",
  "title": "React Server Components in Production: 5 Mistakes That Cost Me a Week",
  "excerpt": "After 3 months using RSC in a production project, I compiled a list of pitfalls I fell into. Save yourself the debugging and learn them before you start.",
  "hooks": [
    "Controversy: RSC aren't for every project - and that's OK",
    "Statistic: 73% of Next.js projects don't use RSC correctly (survey data)",
    "Personal: How I spent 2 days debugging a problem caused by misunderstanding cache"
  ],
  "targetWordCount": 2200,
  "outline": [
    "Hook: My biggest RSC fuckup",
    "Mistake #1: Fetching data in the wrong place",
    "Mistake #2: Ignoring cache implications",
    "Mistake #3: Mixing client and server components without reason",
    "Mistake #4: Over-engineering simple cases",
    "Mistake #5: No proper error boundaries",
    "When RSC makes sense (and when it doesn't)",
    "Checklist before deploying RSC"
  ],
  "tags": ["react", "nextjs", "server-components", "performance", "best-practices"]
}
```

## Title Rules

✅ YES:
- Contains keyword or variation
- In English
- Specific (numbers, timeframes, outcomes)
- Creates curiosity or controversy

❌ NO:
- Clickbait without delivery
- Too long (>70 characters)
- Boring/generic
- Copies competition
