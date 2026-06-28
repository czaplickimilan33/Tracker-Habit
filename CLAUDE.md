# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A self-contained **habit tracker** web app. No build step, no dependencies, no
package manager — the app is plain HTML + inline CSS + vanilla JavaScript. It
runs fully offline from `localStorage` by default, and can optionally sync to
the cloud via Supabase. The actual project lives in the `habit-tracker/`
subdirectory.

## Running & developing

There is **nothing to install or build**. To work on the app:

- Open `habit-tracker/app.html` directly in a browser (double-click or drag
  into a tab) to run the tracker.
- Open `habit-tracker/index.html` for the marketing landing page.
- For features that need a real origin (service worker, PWA install,
  Notification Triggers, Supabase auth redirects), serve the folder over HTTP
  instead of `file://`, e.g.:

  ```bash
  cd habit-tracker && python3 -m http.server 8000
  # then open http://localhost:8000/app.html
  ```

There are no tests, linters, or CI configured. Verify changes by opening the
app in a browser and exercising the affected feature.

## Project layout (`habit-tracker/`)

- `app.html` — the tracker app itself; **all app logic lives here** as one IIFE
  (`(function(){ ... })()`) with inline CSS. This is the main file to edit.
- `index.html` — marketing landing page (the product site).
- `pricing.html` — Free vs Premium pricing page.
- `privacy.html`, `terms.html` — Polish legal-page templates.
- `config.js` — optional config: Supabase URL + anon key, and `freeHabitLimit`.
  Empty Supabase fields = 100% local mode (login button hidden, no limits).
- `manifest.webmanifest` + `sw.js` — PWA install + offline support.
- `vercel.json` — static-hosting config (clean URLs) for Vercel deploy.
- `assets/` — icons and the landing-page screenshot.
- `docs/` — step-by-step guides in Polish (deploy, backend, payments, legal, PWA).

## Architecture notes

- **State & persistence.** App state is a single object persisted to
  `localStorage`. Keys: `habitTracker.v1` (habits + logs), `habitTracker.theme`
  (light/dark), plus a reminder key. `load()` reads + `normalize()`s it; `save()`
  writes it and then calls `pushCloud()`. Every mutating action (`addHabit`,
  `toggle`, `renameHabit`, `setColor`, `reorder`, …) ends with `save()` then
  `render()`.
- **Rendering.** `render()` dispatches to `renderWeek()`, `renderMonth()`, or
  `renderStats()` depending on the active view. UI is rebuilt from state rather
  than mutated in place. User-supplied text must go through `escapeHtml()`.
- **Cloud sync (optional).** When `config.js` has Supabase keys, `initCloud()`
  wires up auth; `pushCloud()` / `pullCloud()` sync state. With empty keys the
  whole cloud path is dormant and the app stays purely local.
- **Reminders / PWA.** Daily reminders use the Notification Triggers API
  (`scheduleTriggers`) with an in-tab timer fallback. `sw.js` backs offline use.
- **Conventions.** Vanilla JS only — no frameworks or build tooling. Weeks start
  on Monday. Keep new logic inside the existing IIFE in `app.html` and follow the
  surrounding small-function style; match existing inline CSS rather than adding
  external stylesheets.
