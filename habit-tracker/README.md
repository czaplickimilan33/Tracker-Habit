# 🎯 Habit Tracker

A small, self-contained habit tracker. No build step, no dependencies — just open the file.

## Run it

Open `index.html` in any modern browser (double-click it, or drag it into a browser tab).

That's it. There's nothing to install.

## What it does

- **Add habits** — type a name and hit *Add* (or Enter).
- **Tap to track** — click a day cell to mark a habit done; click again to undo.
- **Streaks** — each habit shows its current 🔥 streak (counts consecutive days up to today).
- **Today's progress ring** — shows how many of today's habits are done.
- **Week navigation** — use ‹ › to look back at previous weeks (you can't mark future days).
- **Week chart** — bars show your completion percentage for each day of the visible week.
- **Auto-save** — everything is stored in your browser's `localStorage`, so it persists across reloads.

## Notes

- Weeks start on Monday.
- Data lives only in your browser (key: `habitTracker.v1`). Clearing site data resets it.
- Single file (`index.html`) with inline CSS + vanilla JS — easy to read and hack on.
