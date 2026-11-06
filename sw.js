/* Educator AI Toolkit service worker.
   __BUILD_VERSION__ is replaced with the commit hash by scripts/build.py, so every
   deployment gets a new cache and the update toast appears for returning visitors.
   Strategy: pages network-first (always fresh online, cached or offline.html when not),
   site assets cache-first (versioned with the build), downloads stale-while-revalidate. */
const VERSION = "__BUILD_VERSION__";
const CORE = "eat-core-" + VERSION;
const RUNTIME = "eat-runtime-v1";

const PAGES = ["./", "index.html", "setup.html", "lesson-note-generator.html", "exam-generator.html", "resources.html", "faq.html", "offline.html"];
const ASSETS = [
  "assets/style.css", "assets/script.js", "assets/pwa.js", "assets/theme-init.js", "assets/master-editor.js",
  "assets/logo-mark.svg", "assets/favicon.svg", "assets/icon-192.png", "assets/icon-512.png",
  "assets/fonts/bricolage-grotesque.woff2", "assets/fonts/inter.woff2", "assets/fonts/jetbrains-mono.woff2",
  "files/scheme/manifest.json",
  "files/Lesson_Note_Generator_Reference.md", "files/Exam_Marking_Revision_Generator_Reference.md",
  "manifest.webmanifest"
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CORE);
    // Pages and the offline fallback must succeed; optional files (fonts) may be missing.
    await cache.addAll(PAGES.map((p) => new Request(p, { cache: "reload" })));
    await Promise.allSettled(ASSETS.map((a) => cache.add(new Request(a, { cache: "reload" }))));
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keep = [CORE, RUNTIME];
    const names = await caches.keys();
    await Promise.all(names.filter((n) => n.startsWith("eat-") && !keep.includes(n)).map((n) => caches.delete(n)));
    await self.clients.claim();
  })());
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  if (req.mode === "navigate") { event.respondWith(pageStrategy(req)); return; }

  if (url.origin === self.location.origin) {
    const path = url.pathname;
    if (path.includes("/files/")) { event.respondWith(staleWhileRevalidate(req)); return; }
    if (path.includes("/assets/") || path.endsWith("manifest.webmanifest")) { event.respondWith(cacheFirst(req)); return; }
    return;
  }
  if (url.hostname === "cdnjs.cloudflare.com") event.respondWith(cacheFirst(req, RUNTIME));
});

async function pageStrategy(req) {
  try {
    const fresh = await fetch(req);
    if (fresh && fresh.ok) {
      const cache = await caches.open(CORE);
      cache.put(req, fresh.clone());
    }
    return fresh;
  } catch (err) {
    const cached = await caches.match(req, { ignoreSearch: true });
    if (cached) return cached;
    return (await caches.match("offline.html")) || Response.error();
  }
}

async function cacheFirst(req, name) {
  const hit = await caches.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res && (res.ok || res.type === "opaque")) {
    const cache = await caches.open(name || CORE);
    cache.put(req, res.clone());
  }
  return res;
}

async function staleWhileRevalidate(req) {
  const cache = await caches.open(RUNTIME);
  const hit = await cache.match(req);
  const network = fetch(req).then((res) => {
    if (res && res.ok) cache.put(req, res.clone());
    return res;
  }).catch(() => null);
  return hit || (await network) || Response.error();
}
