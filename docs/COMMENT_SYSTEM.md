# System Komentarzy

## 📋 Przegląd

System komentarzy zintegrowany z blogiem, oferujący:
- ✅ Weryfikację anty-botową (Cloudflare Turnstile)
- ✅ Moderację komentarzy
- ✅ Przechowywanie w Redis (Upstash)
- ✅ Avatary Gravatar
- ✅ Design pasujący do bloga
- ✅ Dark mode

## 🏗️ Architektura

### Backend (Redis)
```
comments:{slug}        → Lista ID komentarzy dla danego posta
comment:{id}           → Szczegóły pojedynczego komentarza
comments:pending       → Komentarze czekające na moderację
comments:spam          → Oznaczone jako spam
```

### API Endpoints

#### 1. `/api/comments/[slug]`
**GET** - Pobierz wszystkie zatwierdzone komentarze dla posta
```bash
curl https://yourblog.com/api/comments/blog/your-post-slug
```

**POST** - Dodaj nowy komentarz (wymaga Turnstile token)
```bash
curl -X POST https://yourblog.com/api/comments/blog/your-post-slug \
  -H "Content-Type: application/json" \
  -d '{
    "author": "Jan Kowalski",
    "email": "jan@example.com",
    "content": "Świetny artykuł!",
    "turnstileToken": "..."
  }'
```

#### 2. `/api/comments/moderate`
**GET** - Pobierz komentarze oczekujące na moderację (wymaga autoryzacji)
```bash
curl https://yourblog.com/api/comments/moderate \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

**POST** - Moderuj komentarz (zatwierdź/spam/usuń)
```bash
curl -X POST https://yourblog.com/api/comments/moderate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "commentId": "1234567890-abc123",
    "action": "approve"
  }'
```

## 🚀 Konfiguracja

### 1. Cloudflare Turnstile

1. Utwórz konto na [Cloudflare](https://dash.cloudflare.com/)
2. Przejdź do **Turnstile** w dashboardzie
3. Utwórz nowy site:
   - **Domain**: twoja domena (np. `example.com`)
   - **Widget Mode**: Managed (zalecane)
4. Skopiuj klucze:
   - **Site Key** → `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
   - **Secret Key** → `TURNSTILE_SECRET_KEY`

### 2. Upstash Redis

1. Utwórz konto na [Upstash](https://upstash.com/)
2. Utwórz nową bazę Redis:
   - **Name**: blog-comments (dowolna nazwa)
   - **Region**: wybierz najbliższy region
   - **Type**: Free (lub wyższy)
3. Skopiuj credentials:
   - **UPSTASH_REDIS_REST_URL**
   - **UPSTASH_REDIS_REST_TOKEN**

### 3. Admin Token

Wygeneruj bezpieczny token dla moderacji:

```bash
openssl rand -base64 32
```

Lub użyj online: https://generate-random.org/api-token-generator

### 4. Zmienne Środowiskowe

Dodaj do pliku `.env.local`:

```bash
# Upstash Redis
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token_here

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAA...
TURNSTILE_SECRET_KEY=0x4AAAAAAA...

# Admin Token
ADMIN_TOKEN=your_secure_random_token_here
```

## 💻 Użycie

### Integracja z postem

System komentarzy jest automatycznie dodawany do każdego posta w `PostLayout`:

```tsx
import CommentSection from '@/components/CommentSection'

// W komponencie posta:
<CommentSection slug={slug} />
```

### Panel Moderacji

Dostęp do panelu moderacji:
```
https://yourblog.com/admin/comments
```

1. Wprowadź `ADMIN_TOKEN` (zostanie zapisany w localStorage)
2. Zatwierdź, oznacz jako spam lub usuń komentarze
3. Odśwież listę przyciskiem "Refresh"

## 🎨 Komponenty

### `<CommentSection />`
Główny komponent wyświetlający listę komentarzy i formularz.

**Props:**
- `slug: string` - Slug posta

### `<CommentForm />`
Formularz dodawania komentarza z weryfikacją Turnstile.

**Props:**
- `slug: string` - Slug posta
- `onCommentSubmitted: () => void` - Callback po dodaniu komentarza

### `<CommentItem />`
Pojedynczy komentarz z avatarem Gravatar.

**Props:**
- `comment: Comment` - Obiekt komentarza

### `<Turnstile />`
Komponent Cloudflare Turnstile (anti-bot).

**Props:**
- `siteKey: string` - Klucz publiczny Turnstile
- `onVerify: (token: string) => void` - Callback z tokenem
- `onError?: () => void` - Callback błędu
- `onExpire?: () => void` - Callback wygaśnięcia
- `theme?: 'light' | 'dark' | 'auto'` - Motyw
- `size?: 'normal' | 'compact'` - Rozmiar

## 📊 Typy

### `Comment`
```typescript
interface Comment {
  id: string              // Unikalny ID
  slug: string            // Slug posta
  author: string          // Imię autora
  email: string           // Email (niepubliczny)
  content: string         // Treść komentarza
  timestamp: number       // Unix timestamp
  status: 'approved' | 'pending' | 'spam'
  parentId?: string       // ID rodzica (dla odpowiedzi)
  ip?: string             // IP użytkownika
  userAgent?: string      // User agent
}
```

## 🔒 Bezpieczeństwo

### Anti-bot Protection
- **Cloudflare Turnstile** weryfikuje każdy komentarz
- Token jest sprawdzany po stronie serwera
- Nieudana weryfikacja = odrzucenie komentarza

### Moderacja
- Wszystkie komentarze zaczynają jako `pending`
- Wymagane zatwierdzenie przez admina
- Admin token zabezpiecza API moderacji

### Walidacja
- Email: format regex
- Autor: max 100 znaków
- Treść: 3-5000 znaków
- XSS protection: treść jest renderowana jako `whitespace-pre-wrap` (bez HTML)

### Rate Limiting
Rozważ dodanie rate limiting (np. Upstash Ratelimit):

```bash
npm install @upstash/ratelimit
```

```typescript
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'), // 5 komentarzy/godz.
})

// W API route:
const { success } = await ratelimit.limit(ip)
if (!success) {
  return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
}
```

## 🎨 Customizacja

### Zmiana kolorów
System używa Tailwind primary colors (Sky). Zmień w `tailwind.config.js`:

```js
colors: {
  primary: colors.blue, // zmień na inny kolor
}
```

### Własny avatar provider
Zamień `getGravatarUrl` w `lib/comments.ts`:

```typescript
export function getAvatarUrl(email: string, size: number = 80): string {
  // Twoja implementacja (np. UI Avatars, DiceBear, etc.)
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(email)}&size=${size}`
}
```

### Dodanie odpowiedzi (nested comments)
Komentarze mają pole `parentId`. Aby włączyć odpowiedzi:

1. Dodaj przycisk "Odpowiedz" w `CommentItem`
2. Przekaż `parentId` do `CommentForm`
3. Renderuj zagnieżdżone komentarze rekurencyjnie

## 🧪 Testowanie

### Testowanie lokalnie

1. Użyj Turnstile w trybie testowym:
   - Site Key: `1x00000000000000000000AA` (zawsze przechodzi)
   - Secret Key: `1x0000000000000000000000000000000AA`

2. Dodaj komentarz testowy:
```bash
curl -X POST http://localhost:3000/api/comments/test-post \
  -H "Content-Type: application/json" \
  -d '{
    "author": "Test User",
    "email": "test@example.com",
    "content": "Test comment",
    "turnstileToken": "test-token"
  }'
```

### Debugging Redis

Sprawdź dane w Redis przez [Upstash Console](https://console.upstash.com/):
- **Data Browser** → przeglądaj klucze
- **CLI** → wykonaj komendy Redis

```bash
# Przykładowe komendy:
LRANGE comments:blog/test-post 0 -1  # Lista komentarzy
GET comment:1234567890-abc123         # Szczegóły komentarza
LRANGE comments:pending 0 -1          # Pending komentarze
```

## 🚨 Troubleshooting

### Komentarze się nie wyświetlają
1. Sprawdź status komentarza w Redis (może być `pending`)
2. Zatwierdź komentarz w panelu moderacji
3. Sprawdź console błędy w przeglądarce

### Turnstile nie działa
1. Sprawdź czy domena w Turnstile odpowiada obecnej domenie
2. Sprawdź network tab - czy skrypt się ładuje?
3. Użyj testowych kluczy dla development

### "Unauthorized" w moderacji
1. Sprawdź czy `ADMIN_TOKEN` jest ustawiony w `.env.local`
2. Sprawdź czy token w localStorage = token w env
3. Wyczyść localStorage i zaloguj się ponownie

### Redis connection error
1. Sprawdź czy zmienne `UPSTASH_REDIS_REST_URL` i `UPSTASH_REDIS_REST_TOKEN` są prawidłowe
2. Sprawdź czy database jest aktywna w Upstash Console
3. Restart dev server po zmianie env variables

## 📝 TODO / Przyszłe Funkcje

- [ ] Nested replies (odpowiedzi na komentarze)
- [ ] Edycja komentarzy (w czasie np. 5 min)
- [ ] Powiadomienia email dla nowych komentarzy
- [ ] Rate limiting per IP
- [ ] Markdown support w komentarzach
- [ ] Sortowanie (najnowsze/najstarsze/najpopularniejsze)
- [ ] Reakcje (like/unlike)
- [ ] Raportowanie przez użytkowników
- [ ] Eksport komentarzy do JSON/CSV
- [ ] Analytics (liczba komentarzy per post)

## 📚 Dokumentacja Zewnętrzna

- [Cloudflare Turnstile Docs](https://developers.cloudflare.com/turnstile/)
- [Upstash Redis Docs](https://docs.upstash.com/redis)
- [Gravatar API](https://docs.gravatar.com/api/)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

## 📄 Licencja

System komentarzy jest częścią bloga i dziedziczy jego licencję.
