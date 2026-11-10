const CACHE = "equicare-v39";
const SHELL = ["index.html", "admin.html", "support.js", "ar.js", "eqdb.js", "manifest.json",
  "assets/equicare-crest.png", "assets/equicare-wordmark.png", "assets/gsc-mark.png",
  "icon-180.png", "icon-192.png", "icon-512.png"];
const VENDOR = /unpkg\.com|cdn\.jsdelivr\.net|fonts\.googleapis\.com|fonts\.gstatic\.com/;

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE)
    .then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => {}))))
    .then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  if (!sameOrigin && !VENDOR.test(url.href)) return;
  // Videos stream straight from the network, never cached, so they cost
  // nothing until someone presses play.
  if (/\.(mp4|webm|mov)$/i.test(url.pathname)) return;
  if (sameOrigin && url.pathname.startsWith("/api/")) return;

  // Pages: always try the network first so a redeploy lands immediately and a
  // navigation can never be served a stale or wrong document. Cache is the
  // offline fallback only.
  const isPage = req.mode === "navigate" || (sameOrigin && url.pathname.endsWith(".html"));
  if (isPage) {
    e.respondWith(fetch(req).then(res => {
      if (res && res.ok) caches.open(CACHE).then(c => c.put(req, res.clone())).catch(() => {});
      return res;
    }).catch(() => caches.match(req).then(hit => hit || caches.match("index.html"))));
    return;
  }

  // Everything else (React, fonts, images): cache first, refresh behind the
  // scenes. This is what makes start-up instant.
  e.respondWith(caches.open(CACHE).then(cache => cache.match(req).then(hit => {
    const net = fetch(req).then(res => {
      if (res && res.ok) cache.put(req, res.clone()).catch(() => {});
      return res;
    }).catch(() => hit);
    return hit || net;
  })));
});

// Lesson reminders, sent by api/push.js. Every push must show a notification.
self.addEventListener("push", e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (x) { d = { body: e.data ? e.data.text() : "" }; }
  e.waitUntil(self.registration.showNotification(d.title || "Equicare", {
    body: d.body || "", icon: "icon-192.png", badge: "icon-192.png",
    tag: d.tag || "equicare", renotify: true, data: { url: d.url || "./index.html" }
  }));
});

// Tapping the reminder opens the rider app, or brings it to the front.
self.addEventListener("notificationclick", e => {
  e.notification.close();
  const url = new URL((e.notification.data && e.notification.data.url) || "./index.html", self.registration.scope).href;
  e.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then(ws => {
    for (const w of ws) if (w.url.startsWith(self.registration.scope) && !/admin/.test(w.url) && "focus" in w) return w.focus();
    return clients.openWindow(url);
  }));
});
