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

**KROK 1/12: SEO Analysis**

```
[1/10] 🔍 SEO Analysis...
```

- Przeczytaj `prompts/seo.md`
- Wygeneruj: primaryKeyword, secondaryKeywords, suggestedTitle, suggestedSlug
- Zapisz do topic.seo
- Zaktualizuj status: "seo_analysis"

**KROK 2/12: Competitor Analysis**

```
[2/10] 🕵️ Competitor Analysis...
```

- Użyj web_search: `[primaryKeyword] tutorial`, `[primaryKeyword] guide`
- Przeczytaj `prompts/competitor.md`
- Wygeneruj: gaps, strengths, averageWordCount
- Zapisz do topic.competitors
- Zaktualizuj status: "competitor_analysis"

**KROK 3/12: Deep Research**

```
[3/10] 📚 Deep Research...
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

**KROK 4/12: Strategy**

```
[4/10] 🎯 Creating Strategy...
```

- Przeczytaj `prompts/strategy.md`
- Użyj danych z Deep Research do lepszych hooks i angles
- Wygeneruj: angle, title, excerpt, hooks, outline, tags
- Zapisz do topic.strategy
- Zaktualizuj status: "strategy"

**KROK 5/12: Writing**

```
[5/10] ✍️ Writing article...
```

- Przeczytaj `prompts/writer.md`
- Użyj danych z Deep Research jako źródło faktów
- Napisz PEŁNY artykuł według outline
- Dodaj References section z prawdziwymi URL z Deep Research
- Zapisz draft do `/Users/sebastiansleczka/Code/code-with-seb-blog/content/blog/[slug].mdx`
- Zaktualizuj status: "writing"

**KROK 6/12: Editing**

```
[6/10] 📝 Editing...
```

- Przeczytaj `prompts/editor.md`
- Popraw gramatykę, flow, czytelność
- Nadpisz draft
- Zaktualizuj status: "editing"

**KROK 7/12: Validation**

```
[7/10] ✅ Validating...
```

- Przeczytaj `prompts/validator.md`
- Sprawdź jakość, znajdź issues
- Jeśli critical issues → napraw automatycznie
- Zaktualizuj status: "validation"

**KROK 8/12: SEO Check**

```
[8/10] 🔎 Final SEO check...
```

- Przeczytaj `prompts/seo-checker.md`
- Sprawdź SEO score
- Zastosuj poprawki frontmatter jeśli potrzeba
- Zaktualizuj status: "seo_check"

**KROK 9/12: Internal Linking**

```
[9/10] 🔗 Internal linking...
```

- Przeczytaj `prompts/internal-linking.md`
- Załaduj listę wszystkich opublikowanych artykułów z `content/blog/` (slug, title, tags, category, excerpt)
- Pomiń artykuły z `draft: true`
- **Linki DO nowego artykułu:** Znajdź 3-7 miejsc w nowym artykule gdzie naturalnie pasują linki do istniejących postów
- **Linki Z istniejących artykułów:** Znajdź 2-5 istniejących artykułów gdzie temat nowego posta jest wspomniany i wstaw backlinki
- Format linków: `[anchor text](/blog/slug)`
- Linki muszą być inline w treści, NIE jako osobna sekcja
- Nadpisz nowy artykuł i zmodyfikowane istniejące artykuły
- Wyświetl podsumowanie: ile linków dodano, do/z których artykułów
- Zaktualizuj status: "internal_linking"

**KROK 10/12: Update Sitemap & llms.txt**

```
[10/12] 📡 Updating sitemap & llms.txt...
```

- **Sitemap** (`src/app/sitemap.ts`): jest dynamiczny — auto-generuje się przy buildzie z `content/blog/`, pomija drafty. Nie wymaga ręcznej edycji. Weryfikuj tylko że nowy artykuł pojawi się po zmianie `draft: false`.
- **llms.txt** (`public/llms.txt`): jest statyczny — wymaga ręcznej aktualizacji:
  1. Przeczytaj `public/llms.txt`
  2. Dodaj nowy wpis w sekcji `## Published content` w odpowiednim miejscu (zachowaj kolejność tematyczną jak istniejące wpisy)
  3. Format wpisu:
     ```
     ### [Tytuł artykułu]
     Topic: [główny temat, drugi temat]
     Summary: [1-2 zdania podsumowania z excerpt/strategy]
     URL: https://codewithseb.com/blog/[slug]
     ```
  4. Jeśli artykuł dodaje nowe tematy, zaktualizuj sekcję `## Key topics and expertise`
  5. Nadpisz `public/llms.txt`
- Zaktualizuj status: "sitemap_llms"

**KROK 11/12: Build Verification**

```
[11/12] 🏗️ Verifying build...
```

- Przeczytaj `prompts/build-verify.md`
- Uruchom `cd /Users/sebastiansleczka/Code/code-with-seb-blog && npm run build`
- Jeśli błąd → napraw i ponów build
- Sprawdź czy brak warnings
- Zaktualizuj status: "ready"

**KROK 12/12: Publish to Main**

```
[12/12] 🚀 Publishing to main...
```

- Ustaw `draft: false` w frontmatter artykułu (jeśli jeszcze nie zmieniony)
- Wykonaj:
  ```bash
  cd /Users/sebastiansleczka/Code/code-with-seb-blog
  git add content/blog/[slug].mdx
  git add content/blog/  # existing articles modified by internal linking
  git add public/llms.txt
  git add prompts/ topics/ CLAUDE.md  # jeśli zmienione
  git commit -m "feat(blog): add [tytuł]"
  git push origin main
  ```
- Zaktualizuj status: "published"

**ZAKOŃCZENIE:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ OPUBLIKOWANO: [tytuł]

📄 Plik: content/blog/[slug].mdx
📊 Słów: 2,150 | Czas czytania: ~10 min
🎯 SEO Score: 87/100
🌐 Live: https://codewithseb.com/blog/[slug]
```

---

### 4. PUBLISH (ręczny)

**Trigger:** "publish", "opublikuj", "publikuj [id]"

Jeśli artykuł ma `draft: true` i trzeba go opublikować ręcznie:

```
🚀 Publikuję: [tytuł]
```

```bash
cd /Users/sebastiansleczka/Code/code-with-seb-blog
git checkout main
git pull origin main
# zmień draft: true → draft: false
git add content/blog/[slug].mdx
git add content/blog/  # existing articles modified by internal linking
git add public/llms.txt
git commit -m "feat(blog): publish [tytuł]"
git push origin main
```

```
✅ Opublikowano na main!

🌐 Live: https://codewithseb.com/blog/[slug]
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
draft: false
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
5. **DRAFT: false** - publikuj od razu, commit i push na main
6. **ID:** 8 znaków lowercase alphanumeric
7. **SLUG:** lowercase, hyphens, bez polskich znaków
8. **GIT:** zawsze commituj i pushuj bezpośrednio na `main` (bez feature branchy)
