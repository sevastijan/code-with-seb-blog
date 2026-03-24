# Blog Agents - Instrukcja dla Claude Code

Ten projekt to system agentów AI do tworzenia artykułów na bloga. Ty (Claude Code) jesteś silnikiem LLM - nie potrzebujemy zewnętrznego API.

## WAŻNE: Tryb automatyczny

Gdy użytkownik wyda komendę, **wykonuj wszystkie kroki automatycznie bez pytania**. Nie pytaj o potwierdzenie między krokami. Po prostu działaj i raportuj postęp.

## Konfiguracja

```
Project dir: /Users/sebastiansleczka/Code/code-with-seb-blog
Blog posts:  /Users/sebastiansleczka/Code/code-with-seb-blog/content/blog
Język:       English
```

---

## KOMENDY

### 1. RESEARCH

**Trigger:** "research [niche]", "znajdź tematy", "trendy"

**Wykonaj automatycznie:**

```
KROK 1/4: Szukam trendów...
```

Użyj web_search:

- `[niche] trends 2025`
- `[niche] best practices 2025`
- `site:news.ycombinator.com [niche]`
- `site:reddit.com/r/programming [niche]`
- `site:dev.to [niche]`

```
KROK 2/4: Analizuję wyniki...
```

Przeczytaj `prompts/research.md` i wygeneruj 10 tematów.

```
KROK 3/4: Zapisuję sesję...
```

Zapisz do `topics/research/[YYYY-MM-DD].json`

```
KROK 4/4: Gotowe!
```

Wyświetl wyniki:

```
📊 Research: frontend (2026-01-07)

1. [87] React Server Components - praktyczny przewodnik
   → Next.js 15 release, duże zainteresowanie RSC

2. [82] Bun vs Node w 2026 - czy migrować?
   → Bun 1.2 z pełną kompatybilnością

3. [78] CSS Container Queries - koniec media queries
   → Pełne wsparcie przeglądarek od Q4 2025
...

💡 Wybierz tematy: "wybierz 1, 3" lub "wybierz 1-5"
```

---

### 2. WYBIERZ / PICK

**Trigger:** "wybierz [numery]", "pick [numery]", "dodaj [numery]"

**Wykonaj automatycznie:**

1. Załaduj ostatni research z `topics/research/`
2. Dla każdego wybranego numeru:
   - Wygeneruj ID (8 znaków lowercase alphanumeric)
   - Skopiuj topic do `topics/queue/[id].json`
   - Ustaw status: "queued"
3. Wyświetl potwierdzenie:

```
✅ Dodano do kolejki:

[abc12345] React Server Components - praktyczny przewodnik
[xyz98765] CSS Container Queries - koniec media queries

💡 Następny krok: "write article" lub "write article abc12345"
```

---

### 3. WRITE ARTICLE

**Trigger:** "write article", "write article [id]", "napisz artykuł", "napisz [id]"

**Jeśli nie podano ID:**

- Wyświetl listę tematów z kolejki (`topics/queue/`)
- Użyj pierwszego tematu ze statusem "queued"

**Jeśli podano ID:**

- Załaduj `topics/queue/[id].json`

**WYKONAJ CAŁY PIPELINE AUTOMATYCZNIE:**

```
🚀 START: [tytuł tematu]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**KROK 1/9: SEO Analysis**

```
[1/9] 🔍 SEO Analysis...
```

- Przeczytaj `prompts/seo.md`
- Wygeneruj: primaryKeyword, secondaryKeywords, suggestedTitle, suggestedSlug
- Zapisz do topic.seo
- Zaktualizuj status: "seo_analysis"

**KROK 2/9: Competitor Analysis**

```
[2/9] 🕵️ Competitor Analysis...
```

- Użyj web_search: `[primaryKeyword] tutorial`, `[primaryKeyword] guide`
- Przeczytaj `prompts/competitor.md`
- Wygeneruj: gaps, strengths, averageWordCount
- Zapisz do topic.competitors
- Zaktualizuj status: "competitor_analysis"

**KROK 3/9: Deep Research**

```
[3/9] 📚 Deep Research...
```

- Przeczytaj `prompts/deep-research.md`
- Użyj WIELU web_search queries:
  - `[primaryKeyword] official documentation`
  - `[primaryKeyword] RFC proposal`
  - `[primaryKeyword] best practices 2025`
  - `[primaryKeyword] common mistakes`
  - `[primaryKeyword] production experience`
  - `[primaryKeyword] performance benchmark`
  - `site:github.com [primaryKeyword] issues`
  - `site:stackoverflow.com [primaryKeyword]`
- Zbierz: officialSources, expertInsights, codeExamples, commonProblems, statistics
- Zapisz do topic.deepResearch
- Zaktualizuj status: "deep_research"

**KROK 4/9: Strategy**

```
[4/9] 🎯 Creating Strategy...
```

- Przeczytaj `prompts/strategy.md`
- Użyj danych z Deep Research do lepszych hooks i angles
- Wygeneruj: angle, title, excerpt, hooks, outline, tags
- Zapisz do topic.strategy
- Zaktualizuj status: "strategy"

**KROK 5/9: Writing**

```
[5/9] ✍️ Writing article...
```

- Przeczytaj `prompts/writer.md`
- Użyj danych z Deep Research jako źródło faktów
- Napisz PEŁNY artykuł według outline
- Dodaj References section z prawdziwymi URL z Deep Research
- Zapisz draft do `/Users/sebastiansleczka/Code/code-with-seb-blog/content/blog/[slug].mdx`
- Zaktualizuj status: "writing"

**KROK 6/9: Editing**

```
[6/9] 📝 Editing...
```

- Przeczytaj `prompts/editor.md`
- Popraw gramatykę, flow, czytelność
- Nadpisz draft
- Zaktualizuj status: "editing"

**KROK 7/9: Validation**

```
[7/9] ✅ Validating...
```

- Przeczytaj `prompts/validator.md`
- Sprawdź jakość, znajdź issues
- Jeśli critical issues → napraw automatycznie
- Zaktualizuj status: "validation"

**KROK 8/9: SEO Check**

```
[8/9] 🔎 Final SEO check...
```

- Przeczytaj `prompts/seo-checker.md`
- Sprawdź SEO score
- Zastosuj poprawki frontmatter jeśli potrzeba
- Zaktualizuj status: "seo_check"

**KROK 9/9: Build Verification**

```
[9/9] 🏗️ Verifying build...
```

- Przeczytaj `prompts/build-verify.md`
- Uruchom `cd /Users/sebastiansleczka/Code/code-with-seb-blog && npm run build`
- Jeśli błąd → napraw i ponów build
- Sprawdź czy brak warnings
- Zaktualizuj status: "ready"

**ZAKOŃCZENIE:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ GOTOWE: [tytuł]

📄 Plik: content/blog/[slug].mdx
📊 Słów: 2,150 | Czas czytania: ~10 min
🎯 SEO Score: 87/100

💡 Następny krok: "publish" lub "pokaż artykuł"
```

---

### 4. PUBLISH

**Trigger:** "publish", "opublikuj", "publikuj [id]"

**Wykonaj automatycznie:**

```
🚀 Publikuję: [tytuł]
```

```bash
cd /Users/sebastiansleczka/Code/code-with-seb-blog
git checkout main
git pull origin main
git checkout -b article/[slug]
git add content/blog/[slug].mdx
git commit -m "feat(blog): add [tytuł]"
git push -u origin article/[slug]
```

```
✅ Opublikowano!

🔗 Branch: article/[slug]
📝 Utwórz PR: https://github.com/[repo]/compare/article/[slug]

Artykuł przeniesiony do archive/
```

---

### 5. LIST / STATUS

**Trigger:** "lista", "pokaż tematy", "status", "kolejka"

Wyświetl:

- Ostatni research z `topics/research/`
- Tematy w kolejce z `topics/queue/`
- Status każdego tematu

---

## Format plików

### topic.json

```json
{
  "id": "x7k9m2p",
  "createdAt": "2026-01-07T12:00:00Z",
  "updatedAt": "2026-01-07T12:00:00Z",
  "status": "queued",
  "niche": "frontend",
  "research": {
    "title": "...",
    "trendScore": 85,
    "sources": ["hackernews", "reddit"],
    "whyTrending": "...",
    "relatedTopics": ["react", "nextjs"]
  },
  "seo": null,
  "competitors": null,
  "deepResearch": null,
  "strategy": null,
  "content": null
}
```

### article.mdx

```mdx
---
title: 'Tytuł'
date: '2026-01-07'
category: 'Development'
tags: ['tag1', 'tag2']
draft: true
featured: false
author: 'Sebastian'
excerpt: 'Opis'
---

Treść artykułu...
```

---

## Zasady

1. **NIE PYTAJ** - wykonuj automatycznie
2. **RAPORTUJ POSTĘP** - pokazuj który krok wykonujesz
3. **ZAPISUJ NA BIEŻĄCO** - po każdym kroku aktualizuj JSON
4. **JĘZYK:** English (artykuły i tytuły po angielsku)
5. **DRAFT: true** - zawsze, użytkownik sam zmienia
6. **ID:** 8 znaków lowercase alphanumeric
7. **SLUG:** lowercase, hyphens, bez polskich znaków
