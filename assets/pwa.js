/* Educator AI Toolkit: app behaviour (service worker, update toast, install prompt,
   iOS install guide, offline indicator). No dependencies. */
(function () {
  "use strict";

  var script = document.currentScript;
  var base = script && script.src ? new URL("../", script.src) : new URL("./", location.href);
  var root = document.documentElement;
  var standalone = (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) || window.navigator.standalone === true;
  if (standalone) root.classList.add("is-standalone");

  function store(key, value) {
    try { if (value === undefined) return localStorage.getItem(key); localStorage.setItem(key, value); } catch (e) {}
    return null;
  }
  function el(tag, cls, html) { var n = document.createElement(tag); if (cls) n.className = cls; if (html) n.innerHTML = html; return n; }

  /* ---------- Service worker and update flow ---------- */
  var updateBar = null;
  function showUpdate(worker) {
    if (updateBar) return;
    updateBar = el("div", "app-bar update-bar");
    updateBar.setAttribute("role", "status");
    updateBar.innerHTML = '<span>A new version is ready.</span>';
    var go = el("button", "btn btn-primary btn-sm"); go.type = "button"; go.textContent = "Refresh";
    var later = el("button", "btn btn-ghost btn-sm"); later.type = "button"; later.textContent = "Later";
    go.addEventListener("click", function () { go.disabled = true; go.textContent = "Updating"; worker.postMessage("SKIP_WAITING"); });
    later.addEventListener("click", function () { updateBar.remove(); updateBar = null; });
    updateBar.appendChild(go); updateBar.appendChild(later);
    document.body.appendChild(updateBar);
  }

  if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
    var refreshing = false;
    navigator.serviceWorker.addEventListener("controllerchange", function () {
      if (refreshing) return; refreshing = true; location.reload();
    });
    window.addEventListener("load", function () {
      navigator.serviceWorker.register(new URL("sw.js", base).href, { scope: base.pathname }).then(function (reg) {
        if (reg.waiting && navigator.serviceWorker.controller) showUpdate(reg.waiting);
        reg.addEventListener("updatefound", function () {
          var w = reg.installing; if (!w) return;
          w.addEventListener("statechange", function () {
            if (w.state === "installed" && navigator.serviceWorker.controller) showUpdate(w);
          });
        });
        document.addEventListener("visibilitychange", function () { if (!document.hidden) reg.update().catch(function () {}); });
      }).catch(function () {});
    });
  }

  /* ---------- Offline indicator ---------- */
  var chip = null;
  function setOffline(off) {
    if (off && !chip) {
      chip = el("div", "app-bar offline-chip", "<span>You are offline. Pages you have opened before still work.</span>");
      chip.setAttribute("role", "status");
      document.body.appendChild(chip);
    } else if (!off && chip) {
      chip.remove(); chip = null;
      if (window.EATToast) window.EATToast("Back online");
    }
  }
  window.addEventListener("offline", function () { setOffline(true); });
  window.addEventListener("online", function () { setOffline(false); });
  if (navigator.onLine === false) setOffline(true);

  /* ---------- Install ---------- */
  var ua = navigator.userAgent || "";
  var isIOS = /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  var deferred = null;
  var installButtons = document.querySelectorAll("[data-install]");

  function reveal() {
    if (standalone) return;
    installButtons.forEach(function (b) { b.hidden = false; });
  }

  var visits = parseInt(store("eat-visits") || "0", 10) + 1;
  store("eat-visits", String(visits));

  function dismissedRecently() {
    var t = parseInt(store("eat-install-dismissed") || "0", 10);
    return t && Date.now() - t < 21 * 24 * 3600 * 1000;
  }

  /* Accessible modal used for the iOS guide */
  var lastFocus = null;
  function openGuide() {
    lastFocus = document.activeElement;
    var overlay = el("div", "app-modal");
    overlay.innerHTML =
      '<div class="app-modal-box" role="dialog" aria-modal="true" aria-labelledby="ios-title">' +
      '<h2 id="ios-title">Add to your Home Screen</h2>' +
      '<p>On iPhone and iPad this takes three taps.</p>' +
      '<ol class="ios-steps">' +
      '<li><span class="ios-ill" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V3M8 7l4-4 4 4"/><path d="M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1"/></svg></span><span>Tap the <strong>Share</strong> button at the bottom (or top) of Safari.</span></li>' +
      '<li><span class="ios-ill" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M12 8v8M8 12h8"/></svg></span><span>Scroll down and tap <strong>Add to Home Screen</strong>.</span></li>' +
      '<li><span class="ios-ill" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg></span><span>Tap <strong>Add</strong>. The icon appears with your other apps.</span></li>' +
      '</ol>' +
      '<p class="app-modal-note">Using Chrome on iPhone? The Share button is at the top right.</p>' +
      '<button type="button" class="btn btn-primary" data-close>Got it</button></div>';
    document.body.appendChild(overlay);
    var box = overlay.querySelector(".app-modal-box");
    var close = overlay.querySelector("[data-close]");
    function shut() { document.removeEventListener("keydown", onKey, true); overlay.remove(); if (lastFocus && lastFocus.focus) lastFocus.focus(); }
    function onKey(e) {
      if (e.key === "Escape") { e.preventDefault(); shut(); }
      if (e.key === "Tab") { e.preventDefault(); close.focus(); }
    }
    document.addEventListener("keydown", onKey, true);
    overlay.addEventListener("click", function (e) { if (e.target === overlay) shut(); });
    close.addEventListener("click", shut);
    close.focus();
  }

  function promptInstall() {
    if (deferred) {
      var p = deferred; deferred = null;
      p.prompt();
      p.userChoice.then(function () { hideCard(); installButtons.forEach(function (b) { b.hidden = true; }); });
    } else if (isIOS) {
      hideCard(); openGuide();
    }
  }

  var card = null;
  function hideCard() { if (card) { card.remove(); card = null; } }
  function showCard() {
    if (card || standalone || dismissedRecently() || (!deferred && !isIOS)) return;
    card = el("div", "app-bar install-card");
    card.setAttribute("role", "region");
    card.setAttribute("aria-label", "Install the app");
    card.innerHTML = '<img src="' + new URL("assets/logo-mark.svg", base).href + '" alt="" width="40" height="40">' +
      '<span class="install-copy"><strong>Install Educator AI</strong><small>Open it like an app, even with weak data.</small></span>';
    var yes = el("button", "btn btn-primary btn-sm"); yes.type = "button"; yes.textContent = isIOS && !deferred ? "Show me how" : "Install";
    var no = el("button", "btn btn-ghost btn-sm"); no.type = "button"; no.textContent = "Not now";
    yes.addEventListener("click", promptInstall);
    no.addEventListener("click", function () { store("eat-install-dismissed", String(Date.now())); hideCard(); });
    card.appendChild(yes); card.appendChild(no);
    document.body.appendChild(card);
  }

  function scheduleCard() {
    if (standalone || dismissedRecently()) return;
    var wait = visits >= 2 ? 6000 : 30000;
    setTimeout(showCard, wait);
  }

  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault(); deferred = e; reveal(); scheduleCard();
  });
  window.addEventListener("appinstalled", function () {
    deferred = null; hideCard(); installButtons.forEach(function (b) { b.hidden = true; });
    if (window.EATToast) window.EATToast("Installed. Find it on your home screen.");
  });
  installButtons.forEach(function (b) { b.addEventListener("click", promptInstall); });
  if (isIOS && !standalone) { reveal(); scheduleCard(); }
})();
