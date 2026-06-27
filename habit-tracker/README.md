# 🎯 Habit Tracker

A small, self-contained habit tracker. No build step, no dependencies — just open the file.

## Run it

Open `index.html` in any modern browser (double-click it, or drag it into a browser tab).

That's it. There's nothing to install.

## What it does

- **Add habits** — type a name and hit *Add* (or Enter).
- **Tap to track** — click a day cell to mark a habit done; click again to undo.
- **Streaks** — each habit shows its current 🔥 streak (consecutive days up to today).
- **Today's progress ring** — shows how many of today's habits are done.
- **Week / Month views** — toggle between a weekly grid and a month heatmap (calendar-style dots, one per day). Both are clickable.
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
