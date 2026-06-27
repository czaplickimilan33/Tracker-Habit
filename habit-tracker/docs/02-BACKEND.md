# 2. Backend krok po kroku (konta + synchronizacja)

Obecnie dane żyją tylko w przeglądarce (`localStorage`). Żeby użytkownik miał **konto** i **synchronizację między urządzeniami**, potrzebny jest backend. Najprościej i najtaniej: **Supabase** (darmowy plan, baza PostgreSQL + logowanie + API, bez pisania serwera).

## Dlaczego Supabase
- Gotowe logowanie (e-mail/hasło, Google, magic link).
- Baza PostgreSQL z bezpieczeństwem na poziomie wiersza (RLS) — każdy widzi tylko swoje dane.
- Darmowy plan w zupełności wystarczy na start.
- Działa z czystym JS po stronie przeglądarki — pasuje do tej apki.

## ⚡ Szybki start — synchronizacja jest już wbudowana w apkę

Aplikacja (`app.html`) ma **gotową, opcjonalną synchronizację**. Włączasz ją w 3 krokach:

1. Załóż projekt Supabase, skopiuj **Project URL** i **anon key**.
2. W **SQL Editor** uruchom (model „jeden dokument na użytkownika" — najprostszy):

   ```sql
   create table habit_states (
     user_id uuid primary key references auth.users (id) on delete cascade,
     data jsonb not null default '{}'::jsonb,
     updated_at timestamptz default now()
   );
   alter table habit_states enable row level security;
   create policy "own state - all" on habit_states
     for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
   ```

3. Wpisz `supabaseUrl` i `supabaseAnonKey` w pliku **`config.js`**.

Gotowe — w apce pojawi się przycisk **Zaloguj** (logowanie magic-linkiem), a nawyki będą się synchronizować między urządzeniami. Dopóki `config.js` jest pusty, apka działa w 100% lokalnie.

> Włącz w Supabase **Auth → Email** (magic link). W **URL Configuration** dodaj adres swojej apki (np. `https://twoja-domena/app`) do *Redirect URLs*.

---

Poniżej pełniejszy wariant (osobne wiersze per nawyk), jeśli kiedyś będziesz chciał zaawansowane zapytania/statystyki po stronie bazy.

## Krok 1 — Projekt Supabase
1. Załóż konto na <https://supabase.com> → **New project**.
2. Zapisz **Project URL** i **anon public key** (Settings → API).

## Krok 2 — Tabela na nawyki
W zakładce **SQL Editor** wklej i uruchom:

```sql
create table habits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  color text not null default '#6c8cff',
  position int not null default 0,
  log jsonb not null default '{}'::jsonb,
  created_at timestamptz default now()
);

-- Bezpieczeństwo: każdy użytkownik widzi i zmienia tylko swoje wiersze
alter table habits enable row level security;

create policy "own habits - select" on habits for select using (auth.uid() = user_id);
create policy "own habits - insert" on habits for insert with check (auth.uid() = user_id);
create policy "own habits - update" on habits for update using (auth.uid() = user_id);
create policy "own habits - delete" on habits for delete using (auth.uid() = user_id);
```

## Krok 3 — Logowanie w aplikacji
Dodaj klienta Supabase (przez CDN, bez builda):

```html
<script type="module">
  import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
  const supabase = createClient("TWÓJ_PROJECT_URL", "TWÓJ_ANON_KEY");

  // rejestracja / logowanie magic-linkiem
  async function signIn(email) {
    await supabase.auth.signInWithOtp({ email });
    alert("Sprawdź skrzynkę — wysłaliśmy link do logowania.");
  }

  // kto jest zalogowany
  const { data: { user } } = await supabase.auth.getUser();
</script>
```

## Krok 4 — Zapis i odczyt nawyków
Zamień zapis do `localStorage` na wywołania Supabase:

```js
// wczytaj nawyki zalogowanego użytkownika
async function loadHabits() {
  const { data } = await supabase.from("habits").select("*").order("position");
  return data ?? [];
}

// zapisz pojedynczy nawyk (upsert = wstaw lub zaktualizuj)
async function saveHabit(h) {
  await supabase.from("habits").upsert(h);
}

// usuń
async function deleteHabit(id) {
  await supabase.from("habits").delete().eq("id", id);
}
```

> **Strategia migracji:** zostaw `localStorage` jako tryb „gość". Po zalogowaniu jednorazowo przenieś lokalne nawyki do Supabase (upsert), potem korzystaj już z bazy. Dzięki temu nikt nie traci danych.

## Krok 5 — Synchronizacja na żywo (opcjonalnie)
Supabase Realtime potrafi wypychać zmiany na inne urządzenia:

```js
supabase.channel("habits")
  .on("postgres_changes", { event: "*", schema: "public", table: "habits" }, render)
  .subscribe();
```

## Bezpieczeństwo — must-have
- Klucz **anon** jest publiczny i to jest OK — chroni go RLS (krok 2). **Nigdy** nie wstawiaj do frontu klucza `service_role`.
- Trzymaj sekrety w **zmiennych środowiskowych Vercela** (Project → Settings → Environment Variables), nie w repo.

## Co dalej
Gdy masz konta + zapis w bazie, możesz wprowadzić plan płatny (np. więcej niż 5 nawyków tylko dla premium). Przejdź do `03-PLATNOSCI.md`.
