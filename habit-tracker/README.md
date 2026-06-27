# 🎯 Habit Tracker

A small, self-contained habit tracker. No build step, no dependencies — just open the file.

## Files

- `index.html` — marketing landing page (the product site).
- `pricing.html` — Free vs Premium pricing page (monthly/yearly toggle).
- `app.html` — the habit tracker app itself.
- `config.js` — optional Supabase keys + free-plan limit. Empty = 100% local mode.
- `assets/screenshot.png` — auto-generated app screenshot used on the landing page.
- `vercel.json` — static-hosting config (clean URLs) for Vercel.
- `privacy.html`, `terms.html` — Polish legal-page templates (fill in the `[ ]` fields).
- `docs/` — step-by-step guides (PL): deploy on Vercel, backend, payments, legal requirements.

## Cloud sync (optional)

The app works fully offline by default. To enable accounts + sync across devices,
fill in `config.js` with your Supabase URL and anon key (see `docs/02-BACKEND.md`).
Until then the "Zaloguj" button stays hidden and everything stays in `localStorage`.

## Run it

Open `app.html` in any modern browser (double-click it, or drag it into a browser tab),
or open `index.html` to see the landing page first. Nothing to install.

## Going live / selling it

See the guides in `docs/`:
1. `01-DEPLOY-VERCEL.md` — publish as a free site on Vercel.
2. `02-BACKEND.md` — add accounts + sync (Supabase).
3. `03-PLATNOSCI.md` — set up payments (Lemon Squeezy / Paddle / Stripe).
4. `04-WYMOGI-PRAWNE.md` — Polish/EU legal checklist (GDPR, consumer law, VAT).

## What it does

- **Add habits** — type a name and hit *Add* (or Enter).
- **Tap to track** — click a day cell to mark a habit done; click again to undo.
- **Rename inline** — click a habit's name to edit it (Enter to save, Esc to cancel).
- **Recolor** — click a habit's colored dot to pick from a palette.
- **Streaks + records** — each habit shows its current 🔥 streak and its all-time best.
- **Today's progress ring** — shows how many of today's habits are done.
- **Week / Month / Stats views** — toggle between a weekly grid, a month heatmap (calendar-style dots, one per day, with an overall month %), and a **Stats dashboard**.
- **Stats dashboard** — total check-ins, active habits, longest streak, 30-day average, a 30-day completion chart, and a per-habit table (total / current streak / record / 30-day rate).
- **Daily reminder** — 🔔 button sets a daily browser notification reminding you of unfinished habits. Uses the Notification Triggers API (fires even with the tab closed on Chrome/Edge) and falls back to an in-tab timer elsewhere.
- **Installable PWA** — `manifest.webmanifest` + `sw.js` make the app installable and offline-capable. See `docs/05-PWA-PRZYPOMNIENIA.md`.
- **Period navigation** — use ‹ › to look back at previous weeks or months (you can't mark future days).
- **Week chart** — bars show your completion percentage for each day of the visible week.
- **Drag to reorder** — grab the ⠿ handle and drag a habit up or down (week view).
- **Light / dark theme** — toggle with the 🌙 / ☀️ button; your choice is remembered.
- **Export / import** — back up all your data to a JSON file and restore it later (links in the footer).
- **Auto-save** — everything is stored in your browser's `localStorage`, so it persists across reloads.

## Notes

- Weeks start on Monday.
- Data lives only in your browser (key: `habitTracker.v1`; theme in `habitTracker.theme`). Clearing site data resets it — use **Export** first if you want a backup.
- Importing **replaces** your current habits and history (you'll be asked to confirm).
- Single file (`index.html`) with inline CSS + vanilla JS — easy to read and hack on.
