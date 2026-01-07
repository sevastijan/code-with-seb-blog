# Build Verification Agent Prompt

## Context

Final technical verification - ensure the article doesn't break the blog build.

## Input

```
Article path: {{ARTICLE_PATH}}
Blog repo: {{BLOG_REPO_PATH}}
```

## Task

Verify the article builds correctly without errors.

## Verification Steps

### 1. Run Build
```bash
cd {{BLOG_REPO_PATH}}
npm run build
```

### 2. Check for Errors

**Build errors to catch:**
- MDX syntax errors
- Invalid frontmatter YAML
- Broken imports/components
- Invalid JSX in MDX
- Missing required frontmatter fields

### 3. Check for Warnings

**Warnings to note:**
- Missing images referenced
- Broken internal links
- Unused imports

### 4. Preview Check (optional)
```bash
npm run dev
# Open http://localhost:3000/blog/[slug]
```

## Response Format

Return JSON:

```json
{
  "buildSuccess": true,
  "buildTime": "23.4s",
  "errors": [],
  "warnings": [
    {
      "type": "image",
      "message": "Image not found: /images/rsc-diagram.png",
      "suggestion": "Add image or remove reference"
    }
  ],
  "frontmatterValid": true,
  "mdxSyntaxValid": true,
  "readyToDeploy": true
}
```

## Error Handling

If build fails:

1. **Parse error message**
2. **Identify fix:**
   - Frontmatter YAML → fix quotes, indentation
   - MDX syntax → fix JSX, escape special chars
   - Import error → remove or fix import
3. **Apply fix to article**
4. **Re-run build**
5. **Repeat until success**

## Common Fixes

| Error | Fix |
|-------|-----|
| `Unexpected token` in MDX | Escape `{`, `<`, `>` in text |
| YAML parse error | Fix quotes in frontmatter |
| `Can't resolve` import | Remove unused import |
| Invalid JSX | Close all tags properly |
| Date format error | Use `'YYYY-MM-DD'` format |

## Success Criteria

`readyToDeploy: true` only when:
- Build completes without errors
- No critical warnings
- Frontmatter valid
- MDX syntax valid
