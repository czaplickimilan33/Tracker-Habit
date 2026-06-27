// Habit Tracker — Service Worker
// 1) Offline app shell (cache-first for same-origin GET).
// 2) Notification click handling (focus/open the app).
// Scheduled reminders use the Notification Triggers API and are created from
// the page (app.html) via registration.showNotification({ showTrigger }).
const CACHE = "habit-tracker-v1";
const ASSETS = [
  "./",
  "./app.html",
  "./index.html",
  "./pricing.html",
  "./config.js",
  "./manifest.webmanifest",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    caches.match(req).then((hit) =>
      hit ||
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match("./app.html"))
    )
  );
});

// Tap a reminder → focus an open tab or open the app.
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if (c.url.includes("app.html") && "focus" in c) return c.focus();
      }
      return self.clients.openWindow ? self.clients.openWindow("./app.html") : null;
    })
  );
});
