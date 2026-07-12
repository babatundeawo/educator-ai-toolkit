// ============================================================
// EDUCATOR AI TOOLKIT — SHARED SCRIPT
// ============================================================

(function () {
  "use strict";

  // ---- Mobile sidebar drawer ----
  var hamburger = document.querySelector("[data-hamburger]");
  var sidebar = document.querySelector("[data-sidebar]");
  var scrim = document.querySelector("[data-scrim]");
  var closeBtn = document.querySelector("[data-sidebar-close]");

  function openSidebar() {
    if (!sidebar) return;
    sidebar.classList.add("is-open");
    scrim.classList.add("is-open");
    hamburger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeSidebar() {
    if (!sidebar) return;
    sidebar.classList.remove("is-open");
    scrim.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  if (hamburger) {
    hamburger.addEventListener("click", function () {
      var isOpen = sidebar.classList.contains("is-open");
      isOpen ? closeSidebar() : openSidebar();
    });
  }
  if (scrim) scrim.addEventListener("click", closeSidebar);
  if (closeBtn) closeBtn.addEventListener("click", closeSidebar);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeSidebar();
  });
  // Close drawer automatically if a nav link is tapped (mobile)
  document.querySelectorAll(".nav-list a").forEach(function (a) {
    a.addEventListener("click", closeSidebar);
  });

  // ---- Highlight active nav link based on current page ----
  var current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-list a[href]").forEach(function (a) {
    var href = a.getAttribute("href").split("/").pop();
    if (href === current) a.classList.add("active");
  });

  // ---- Copy-to-clipboard for instruction blocks ----
  document.querySelectorAll("[data-copy-btn]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var targetId = btn.getAttribute("data-copy-btn");
      var target = document.getElementById(targetId);
      if (!target) return;
      var text = target.innerText;

      function markCopied() {
        var original = btn.innerHTML;
        btn.classList.add("copied");
        btn.innerHTML =
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
        setTimeout(function () {
          btn.classList.remove("copied");
          btn.innerHTML = original;
        }, 2200);
      }

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(markCopied).catch(function () {
          fallbackCopy(text, markCopied);
        });
      } else {
        fallbackCopy(text, markCopied);
      }
    });
  });

  function fallbackCopy(text, done) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand("copy");
    } catch (e) {}
    document.body.removeChild(ta);
    done();
  }

  // ---- Footer year ----
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();

// ---- Scroll reveal ----
(function () {
  "use strict";
  var targets = document.querySelectorAll(".section, .tool-card, .kpi, .card");
  if (!("IntersectionObserver" in window) || !targets.length) return;
  targets.forEach(function (el) { el.classList.add("reveal"); });
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );
  targets.forEach(function (el) { io.observe(el); });
})();
