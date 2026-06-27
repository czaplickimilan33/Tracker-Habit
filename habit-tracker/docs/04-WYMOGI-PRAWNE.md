# 4. Wymogi prawne (Polska / UE)

> To podsumowanie praktyczne, **nie porada prawna**. Przed sprzedażą skonsultuj się z prawnikiem lub księgową — szczególnie przy płatnościach.

## A. Gdy apka jest DARMOWA (tylko localStorage)
Najprostszy przypadek. Potrzebujesz w zasadzie:
- **Polityki prywatności** — masz szablon: `privacy.html`. Bo nawet localStorage i ewentualna analityka to dane.
- Jeśli **nie** używasz cookies/analityki/reklam → baner cookie nie jest wymagany (apka domyślnie ich nie używa).
- Jeśli dodasz Google Analytics, reklamy, piksel itp. → **wymagany baner zgody na cookies** (RODO + ePrivacy).

## B. Gdy zbierasz dane (konta, e-mail, backend)
- **Polityka prywatności** musi opisywać: kto jest administratorem, jakie dane, w jakim celu, komu powierzane (Supabase, Vercel, operator płatności), prawa użytkownika, czas przechowywania.
- **Umowy powierzenia (DPA)** z dostawcami — Supabase, Vercel i operatorzy płatności udostępniają gotowe DPA do zaakceptowania w panelu.
- **Podstawa prawna** przetwarzania (zwykle: wykonanie umowy + zgoda na marketing).
- Zapewnij **realizację praw**: usunięcie konta, eksport danych (masz już eksport w apce).

## C. Gdy SPRZEDAJESZ (płatności)
1. **Forma działalności.** W Polsce regularna sprzedaż = działalność gospodarcza. Na start możliwa „działalność nierejestrowa" (jeśli przychód mieści się w limicie) — sprawdź aktualny próg. Przy większej skali: JDG (jednoosobowa działalność).
2. **Regulamin** (Terms) — masz szablon `terms.html`. Obowiązkowy przy sprzedaży konsumentom.
3. **Prawo odstąpienia 14 dni** (konsument w UE). Przy treściach cyfrowych dostępnych natychmiast musisz pobrać **wyraźną zgodę** na rozpoczęcie świadczenia przed upływem 14 dni i poinformować o utracie prawa odstąpienia — inaczej klient może żądać zwrotu.
4. **VAT.**
   - Jeśli używasz **Lemon Squeezy / Paddle** → oni są „Merchant of Record" i rozliczają VAT za Ciebie. Najmniej formalności.
   - Jeśli używasz **Stripe** → VAT rozliczasz sam (procedura **VAT OSS** dla sprzedaży cyfrowej do konsumentów w UE). Tu potrzebna księgowa.
5. **Faktury / paragony** — przy MoR (Lemon/Paddle) wystawia operator. Przy Stripe — Ty.
6. **Obowiązki informacyjne** — cena brutto, dane sprzedawcy, sposób reklamacji, kontakt.

## D. Checklista przed startem sprzedaży
- [ ] Uzupełniona **polityka prywatności** (`privacy.html`) — pola `[ ]` wypełnione.
- [ ] Uzupełniony **regulamin** (`terms.html`).
- [ ] Wybrany operator płatności i ustalone, kto rozlicza VAT.
- [ ] Zaakceptowane **DPA** u dostawców (Supabase, Vercel, płatności).
- [ ] Mechanizm zgody na rozpoczęcie świadczenia treści cyfrowej (checkbox w checkoucie).
- [ ] Sekrety w zmiennych środowiskowych, nie w repo.
- [ ] (Jeśli analityka/reklamy) baner zgody na cookies.
- [ ] Konsultacja z prawnikiem/księgową.

## Linki
- UODO (ochrona danych): <https://uodo.gov.pl>
- Prawa konsumenta / odstąpienie: <https://prawakonsumenta.uokik.gov.pl>
- VAT OSS: <https://www.podatki.gov.pl> (szukaj „OSS")
