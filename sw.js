const CACHE = "equicare-v34";
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
