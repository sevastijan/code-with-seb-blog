# Research Pipeline — API Options & Consensus Stage (PARKED)

**Date:** 2026-07-24
**Status:** 🅿️ Parked — decyzja odłożona, notatki zapisane na branchu `research-pipeline-api-options`
**Kontekst:** Rozmowa o rozbudowie etapu researchu w pipeline (`CLAUDE.md`) o (a) evidence naukowe w stylu Consensus.app oraz (b) API do wykrywania najbardziej "hot" tematów z większą precyzją.

---

## 1. Pierwotny pomysł — etap "Consensus"

Chcieliśmy dorzucić do researchu etap oparty o [Consensus.app](https://consensus.app/) (AI search po papierach naukowych).

**Ustalenie techniczne:** Consensus.app nie ma publicznego API. Zamiast scrapować przez przeglądarkę wybraliśmy **Semantic Scholar Graph API** (ten sam korpus papierów, darmowe, bez logowania i limitów przeglądarkowych → pipeline zostaje w pełni automatyczny).

### Proponowana struktura (niezrealizowana)
- **Nowy plik `prompts/consensus.md`** z instrukcją odpytywania Semantic Scholar
  - Endpoint: `GET https://api.semanticscholar.org/graph/v1/paper/search?query=...&fields=title,abstract,year,citationCount,authors,url,openAccessPdf&limit=10`
  - Filtrowanie: sortuj po `citationCount`, preferuj recent (3–5 lat) + high-citation klasyki, odrzucaj papiery bez abstraktu
  - Ekstrakcja dla 3–5 najlepszych papierów: `claim`, `evidence`, `citation`, `url`
  - Wyjście → `topic.academicEvidence` w topic.json
- **Dwa punkty w pipeline:**
  - **RESEARCH** (szukanie tematów) — lekki wariant: podbić `trendScore` tam, gdzie istnieje realny research
  - **WRITE ARTICLE** — nowy krok między "Deep Research" a "Strategy": `[3.5/12] 🔬 Academic Evidence`. Zasila Writera i sekcję References prawdziwymi cytowaniami.
- **Fallback:** Semantic Scholar bywa rate-limited (HTTP 429). Po 2 nieudanych próbach → log ostrzeżenia, pipeline leci dalej (evidence to nice-to-have, nie blocker).

### Otwarte pytania (niezdecydowane)
1. Numeracja: przenumerować na 13 kroków vs pod-krok "3.5"?
2. Zachować markę "Consensus" w nazwie etapu mimo że pod spodem Semantic Scholar? (propozycja: "Academic Evidence (Consensus-style)")

---

## 2. Rozszerzenie — API do "najbardziej hot" tematów

Semantic Scholar daje precyzję (evidence), ale słabo łapie "co jest hot teraz". Do wykrywania gorących tematów dev potrzeba innych sygnałów.

### Darmowe / bez klucza (core stack)

**Hotness / trend detection:**
| API | Auth | Dlaczego | Endpoint |
|---|---|---|---|
| HN Algolia Search | brak | Najlepszy sygnał dla dev, sort po punktach/dacie | `hn.algolia.com/api/v1/search?tags=story&query=...` |
| GitHub Search | token (free) | Rosnące repo = rosnący temat (`stars:>200 created:>...`) | `api.github.com/search/repositories?q=...&sort=stars` |
| Dev.to (Forem) | brak | Top artykuły 7/30 dni | `dev.to/api/articles?top=7` |
| npm registry | brak | Downloads-trend paczek | `api.npmjs.org/downloads/range/last-month/<pkg>` |
| Reddit | OAuth (free) | r/programming, r/webdev top/rising | `oauth.reddit.com/r/<sub>/top` |

**SEO / popyt:**
| Źródło | Auth | Uwaga |
|---|---|---|
| Google Trends (pytrends) | brak (nieoficjalne) | Walidacja wzrostu w wyszukiwarce |
| Google Autocomplete | brak | `suggestqueries.google.com/complete/search?q=...` → frazy long-tail |

**Precyzja / evidence:**
| API | Auth | Dlaczego |
|---|---|---|
| arXiv | brak | **Najlepsze dla AI/ML** — najświeższe papiery, często przed Semantic Scholar. `export.arxiv.org/api/query?search_query=...` |
| Semantic Scholar | brak | Cytowania + abstrakty |
| Crossref | brak | Metadane DOI, weryfikacja cytowań |

**Rekomendowany darmowy core:** HN Algolia + Dev.to + GitHub Search (trójkąt: dyskusja/czytelnictwo/kod) + Google Autocomplete (SEO long-tail) + arXiv + Semantic Scholar (evidence).

### Płatne API (rozważane)

| API | Koszt / minimum | Co daje | Werdykt |
|---|---|---|---|
| **DataForSEO** | **min. depozyt ~$50**, potem ułamki centa/zapytanie | Keyword volume+difficulty, SERP, People Also Ask, Google Trends (realne liczby) | Najwyższa dźwignia, ale **nie mieści się w budżecie testowym $5**. Upgrade "na później". |
| **Keywords Everywhere** | **$5 = 100 000 kredytów** (1 kredyt/słowo), ważne rok | Keyword volume/CPC/competition, ma API | ✅ Idealny pod "doładuj $5 na testy" dla danych keyword. |
| **Exa** | darmowe kredyty na start (~$10), potem pay-as-you-go (~$5/1000) | AI-native neural search + "find similar" | ✅ Świetny do topic discovery, zero minimum. |
| **Perplexity Sonar** | ~$1/1000 zapytań, bez dużego minimum | Web-grounded synteza z cytowaniami | ✅ Gotowe podsumowania landscape z źródłami. |
| **Tavily** | **darmowy tier 1000 zapytań/mies.** | Search API pod agentów AI | ✅ Darmowe do testów. |
| **Brave Search API** | darmowy tier ~2000 zapytań/mies. | Niezależny indeks, news/freshness | Tania alternatywa search. |
| **Exploding Topics** | subskrypcja ~$39–249/mies. | Kuratorowane trendy "zanim wybuchną" | Nice-to-have, nie priorytet. |
| Ahrefs / SEMrush API | efektywnie $500+/mies., enterprise | Najlepsze keyword/backlink data | Przerost formy dla bloga — pomijamy. |

---

## 3. Stan decyzji

- **Kierunek preferowany (przed zaparkowaniem):** Keywords Everywhere ($5) na keyword data + Exa/Tavily (darmowe) na AI-search + arXiv/Semantic Scholar (darmowe) na evidence.
- **Zablokowane na:** wybór konkretnego płatnego API / gotowość doładowania budżetu.
- **Następny krok gdy wrócimy:** wybrać stack z sekcji 2, potem dokończyć spec etapu "Consensus/Academic Evidence" (sekcja 1) i przejść do writing-plans.

Nic nie zostało zaimplementowane. To wyłącznie notatki z brainstormingu.
