# 3. Płatności krok po kroku

Cel: pobierać opłaty (jednorazowo lub abonament) i odblokowywać funkcje premium.

## Który operator wybrać?

| Operator | Zalety | Wady | Dla kogo |
|---|---|---|---|
| **Lemon Squeezy** | Działa jako **Merchant of Record** — sam rozlicza VAT/podatki w UE i na świecie, wystawia faktury. Najmniej formalności. | Wyższa prowizja (~5% + opłaty). | **Rekomendacja na start w PL/UE.** |
| **Paddle** | Też Merchant of Record (VAT z głowy), dobre do SaaS. | Wymaga akceptacji konta. | SaaS subskrypcyjny. |
| **Stripe** | Najniższe prowizje, pełna kontrola. | **Sam musisz rozliczać VAT OSS** i wystawiać faktury — więcej księgowości. | Gdy masz już księgowość/firmę. |

> Dla jednoosobowej działalności w Polsce **Lemon Squeezy lub Paddle** oszczędzają mnóstwo problemów z VAT, bo to oni są sprzedawcą wobec klienta.

## Wariant A — Lemon Squeezy (najszybszy)

### Krok 1 — Produkt
1. Załóż konto na <https://lemonsqueezy.com>, uzupełnij dane firmy/wypłat.
2. **Products → New Product** → ustaw cenę (jednorazowa lub subskrypcja, np. 19 zł/mc).
3. Skopiuj link **Buy** lub **Checkout overlay**.

### Krok 2 — Przycisk kupna
```html
<a href="https://twojsklep.lemonsqueezy.com/checkout/buy/UUID-PRODUKTU?embed=1"
   class="lemonsqueezy-button">Kup Premium</a>
<script src="https://app.lemonsqueezy.com/js/lemon.js" defer></script>
```

### Krok 3 — Odblokowanie premium (webhook)
Po płatności Lemon Squeezy wysyła **webhook** na Twój endpoint. Najprościej: **Supabase Edge Function** albo **Vercel Serverless Function** (`/api/webhook`):

```js
// api/webhook.js (Vercel) — pseudo-logika
export default async function handler(req, res) {
  const event = req.body;                 // zweryfikuj podpis (X-Signature)!
  if (event.meta.event_name === "order_created") {
    const email = event.data.attributes.user_email;
    // ustaw w bazie: users.is_premium = true dla tego e-maila
  }
  res.status(200).end();
}
```

### Krok 4 — Sprawdzanie statusu w apce
W bazie trzymaj flagę `is_premium` (lub datę końca subskrypcji). Front po zalogowaniu czyta tę flagę i odblokowuje funkcje:

```js
if (user.is_premium) { /* pokaż funkcje premium */ }
```

## Wariant B — Stripe (większa kontrola)
1. Konto na <https://stripe.com> → **Products** → cena (Price).
2. Użyj **Stripe Checkout** (gotowa strona płatności) — przekierowanie z przyciskiem.
3. Obsłuż webhook `checkout.session.completed` na endpoincie serwerowym → ustaw `is_premium`.
4. **Pamiętaj o VAT OSS** — przy Stripe rozliczasz podatek sam (lub przez Stripe Tax za dopłatą).

## Bezpieczeństwo płatności — zasady
- **Nigdy** nie ufaj frontowi w kwestii „czy zapłacono". Status premium ustawiaj **tylko** przez zweryfikowany webhook po stronie serwera.
- **Weryfikuj podpis** webhooka (sekret w zmiennych środowiskowych).
- Klucze tajne (secret/API keys) trzymaj w **Environment Variables**, nie w repo.
- Testuj na trybie **sandbox/test** przed włączeniem prawdziwych płatności.

## Pomysły na model premium dla tej apki
- Limit darmowy: do 5 nawyków; premium = bez limitu.
- Premium: synchronizacja w chmurze, statystyki, eksport PDF, motywy.
- Jednorazowo „odblokuj na zawsze" (lifetime) — prościej niż subskrypcja na start.
