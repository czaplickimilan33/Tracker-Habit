# 5. PWA i przypomnienia (jak to działa)

Aplikacja jest teraz **PWA** — można ją zainstalować, działa offline, a przypomnienia
potrafią odpalić się także przy zamkniętej karcie (w przeglądarkach, które to wspierają).

## Co doszło
- `manifest.webmanifest` — nazwa, ikony, kolory → instalacja „Dodaj do ekranu głównego".
- `sw.js` — Service Worker: cache offline (app shell) + obsługa kliknięcia w powiadomienie.
- `assets/icon-192.png`, `assets/icon-512.png` — ikony aplikacji.

## Jak działają przypomnienia

Apka używa dwóch mechanizmów, wybierając lepszy automatycznie:

1. **Notification Triggers API** (Chrome / Edge, także na Androidzie) — apka planuje
   powiadomienia na 14 dni do przodu przez Service Workera. Odpalą się **nawet gdy
   karta lub przeglądarka są zamknięte**. Po ponownym otwarciu apki kolejka jest
   uzupełniana o następne dni.
2. **Fallback — licznik w karcie** (Safari, Firefox i inne) — powiadomienie pojawia się
   o ustawionej godzinie, **dopóki karta apki jest otwarta**.

Użytkownik ustawia godzinę przyciskiem 🔔. Apka prosi wtedy o zgodę na powiadomienia.

## Ograniczenie i pełne rozwiązanie (Push API)

Notification Triggers nie są wspierane wszędzie (np. Safari/iOS). Żeby mieć
**gwarantowane** przypomnienia na każdej platformie przy zamkniętej apce, potrzebny jest
klasyczny **Web Push**:

1. Wygeneruj parę kluczy **VAPID**.
2. Na froncie: `registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey })`
   i zapisz subskrypcję w bazie (np. Supabase, tabela `push_subscriptions`).
3. Backend (np. **Supabase Edge Function** uruchamiana przez cron / `pg_cron`) o zadanej
   porze wysyła powiadomienie push do subskrypcji (biblioteka `web-push`).
4. Service Worker odbiera zdarzenie `push` i pokazuje powiadomienie.

To naturalna funkcja **Premium** (wymaga konta + backendu — patrz `02-BACKEND.md`).

## Ważne przy wdrożeniu (Vercel)
- PWA i Service Worker wymagają **HTTPS** — na Vercelu masz to automatycznie.
- Service Worker cache'uje pliki (`CACHE = "habit-tracker-v1"` w `sw.js`).
  **Po każdej zmianie plików podbij numer wersji** (np. `-v2`), żeby użytkownicy
  dostali świeżą wersję zamiast starej z cache.
