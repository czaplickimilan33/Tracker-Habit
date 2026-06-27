# 1. Publikacja na Vercel (darmowa apka)

Aplikacja to strona statyczna (HTML + JS), więc na Vercelu hostuje się ją za darmo i bez konfiguracji builda.

## Krok po kroku

1. **Załóż konto** na <https://vercel.com> i zaloguj się przez GitHub.
2. Kliknij **Add New… → Project**.
3. Wybierz repozytorium **`Tracker-Habit`** (Vercel poprosi o autoryzację dostępu do GitHuba).
4. W ustawieniach importu ustaw:
   - **Root Directory** → `habit-tracker`  ← to ważne, bo apka jest w podfolderze.
   - **Framework Preset** → `Other` (Vercel sam wykryje stronę statyczną).
   - **Build Command** → zostaw puste.
   - **Output Directory** → zostaw puste (serwuje pliki z root directory).
5. Kliknij **Deploy**. Po ~20 s dostaniesz adres typu `https://tracker-habit-xxx.vercel.app`.

Plik `vercel.json` (już w repo) włącza „czyste URL-e", więc:
- strona główna (landing) → `/`
- aplikacja → `/app`
- prywatność / regulamin → `/privacy`, `/terms`

## Automatyczny deploy

Po podłączeniu repo każdy `git push` na gałąź `main` automatycznie publikuje nową wersję. Pushe na inne gałęzie tworzą podgląd (preview URL) — wygodne do testów.

> Żeby wdrożyć obecną pracę produkcyjnie, scal gałąź `claude/project-setup-ideas-6px8yg` do `main` (przez Pull Request) — wtedy Vercel zbuduje wersję produkcyjną.

## Własna domena

1. Kup domenę (np. OVH, home.pl, Cloudflare ~50–80 zł/rok).
2. W Vercel: **Project → Settings → Domains → Add**, wpisz domenę.
3. Ustaw u rejestratora rekordy DNS wg instrukcji Vercel (zwykle rekord `A` lub `CNAME`).
4. HTTPS (certyfikat) Vercel włącza automatycznie.

## Szybki sprawdzian po deployu
- `/` pokazuje landing ze zrzutem ekranu.
- Przycisk „Otwórz aplikację" prowadzi do działającej apki.
- Odśwież apkę po dodaniu nawyku — dane mają zostać (localStorage).
