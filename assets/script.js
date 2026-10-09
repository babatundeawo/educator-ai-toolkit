/* ==========================================================================
   Educator AI Toolkit: shared behaviour
   Every feature degrades gracefully: without JavaScript the pages remain
   fully readable (steps show in a single scroll, FAQ uses <details>).
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var root = document.documentElement;

  /* ---- Toasts ---- */
  var toastStack = document.createElement("div");
  toastStack.className = "toast-stack";
  toastStack.setAttribute("role", "status");
  toastStack.setAttribute("aria-live", "polite");
  document.body.appendChild(toastStack);

  function toast(message, isError) {
    var el = document.createElement("div");
    el.className = "toast" + (isError ? " is-error" : "");
    el.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg><span></span>';
    el.querySelector("span").textContent = message;
    toastStack.appendChild(el);
    requestAnimationFrame(function () { el.classList.add("is-visible"); });
    setTimeout(function () {
      el.classList.remove("is-visible");
      setTimeout(function () { el.remove(); }, 300);
    }, 2800);
  }
  window.EATToast = toast;

  /* ---- Theme toggle ---- */
  (function () {
    var buttons = document.querySelectorAll("[data-theme-toggle]");
    function current() { return root.getAttribute("data-theme") === "dark" ? "dark" : "light"; }
    function sync() {
      var dark = current() === "dark";
      buttons.forEach(function (b) {
        b.setAttribute("aria-pressed", dark ? "true" : "false");
        b.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
      });
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", dark ? "#0a120e" : "#fafbf9");
    }
    sync();
    buttons.forEach(function (b) {
      b.addEventListener("click", function () {
        var next = current() === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        try { localStorage.setItem("eat-theme", next); } catch (e) {}
        sync();
      });
    });
  })();

  /* ---- Scroll: progress bar, nav state, back-to-top (one rAF-throttled handler) ---- */
  (function () {
    var bar = document.querySelector("[data-scroll-progress]");
    var nav = document.querySelector(".topnav");
    var top = document.querySelector("[data-back-to-top]");
    var ticking = false;
    function update() {
      var y = window.pageYOffset || root.scrollTop;
      var h = root.scrollHeight - root.clientHeight;
      if (bar) bar.style.transform = "scaleX(" + (h > 0 ? Math.min(y / h, 1) : 0) + ")";
      if (nav) nav.classList.toggle("is-scrolled", y > 12);
      if (top) top.classList.toggle("is-visible", y > 600);
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener("resize", update);
    update();
    if (top) top.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  })();

  /* ---- Active nav link, footer year ---- */
  (function () {
    var current = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a[href]").forEach(function (a) {
      if (a.getAttribute("href").split("/").pop() === current) {
        a.classList.add("active");
        a.setAttribute("aria-current", "page");
      }
    });
    document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  })();

  /* ---- Mobile menu ---- */
  (function () {
    var toggle = document.querySelector("[data-menu-toggle]");
    var nav = document.querySelector(".nav-links");
    if (!toggle || !nav) return;
    var scrim = document.createElement("div");
    scrim.className = "nav-scrim";
    document.body.appendChild(scrim);
    var mq = window.matchMedia("(max-width: 860px)");

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.classList.toggle("menu-open", open);
    }
    // Hide the off-canvas links from assistive tech while closed on small screens
    function syncHidden() {
      if (mq.matches && !nav.classList.contains("is-open")) nav.setAttribute("inert", "");
      else nav.removeAttribute("inert");
    }
    toggle.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"));
      syncHidden();
    });
    scrim.addEventListener("click", function () { setOpen(false); syncHidden(); });
    nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setOpen(false); syncHidden(); }); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); syncHidden(); toggle.focus(); }
    });
    if (mq.addEventListener) mq.addEventListener("change", function () { setOpen(false); syncHidden(); });
    syncHidden();
  })();

  /* ---- Copy to clipboard ---- */
  (function () {
    function fallbackCopy(text) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta);
      return ok;
    }
    document.querySelectorAll("[data-copy-btn]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = document.getElementById(btn.getAttribute("data-copy-btn"));
        if (!target) return;
        var text = target.innerText;
        function done(ok) {
          if (!ok) { toast("Copy failed. Select the text and copy it manually.", true); return; }
          var original = btn.innerHTML;
          btn.classList.add("copied");
          btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Copied';
          toast("Copied to clipboard");
          setTimeout(function () { btn.classList.remove("copied"); btn.innerHTML = original; }, 2200);
        }
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(fallbackCopy(text)); });
        } else {
          done(fallbackCopy(text));
        }
      });
    });
  })();

  /* ---- Command palette / site search ---- */
  (function () {
    var SITE_INDEX = [
    { title: "Home", sub: "One Project, two kinds of documents", href: "index.html", group: "Overview" },
    { title: "Set up your Project", sub: "Sign up, create one Project, fill in the Master Instructions, upload files", href: "setup.html", group: "Overview" },
    { title: "Fill in & copy the Master Instructions", sub: "Interactive editor for school name, address, state, and location", href: "setup.html", group: "Setup" },
    { title: "Download the Scheme of Work and reference files", sub: "Pick your class and subject, download just those scheme files, plus the two reference files", href: "setup.html", group: "Setup" },
    { title: "Exam and Revision Generator", sub: "Turns your Scheme of Work into an exam, marking guide, or revision file", href: "exam-generator.html", group: "The Tools" },
    { title: "Exam composition rules", sub: "Section A, Section B, and the Third Term blend ratio", href: "exam-generator.html", group: "Exam and Revision Generator" },
    { title: "Revision file rules", sub: "Summary notes plus answered practice questions", href: "exam-generator.html", group: "Exam and Revision Generator" },
    { title: "Lesson Note Generator", sub: "Turns your Scheme of Work into a weekly lesson note booklet", href: "lesson-note-generator.html", group: "The Tools" },
    { title: "Non-teaching weeks and mismatches", sub: "How midterm breaks and e-note mismatches are handled", href: "lesson-note-generator.html", group: "Lesson Note Generator" },
    { title: "Date computation rule", sub: "How week numbers map to real calendar dates", href: "lesson-note-generator.html", group: "Lesson Note Generator" },
    { title: "Resources and Links", sub: "Project files, official Claude links, e-note downloads, community support", href: "resources.html", group: "Help" },
    { title: "Download e-notes by class", sub: "Primary 1 through SS3 Telegram channels", href: "resources.html", group: "Resources and Links" },
    { title: "Download the Scheme of Work by subject", sub: "Pick a class, tick your subjects, download just those files", href: "resources.html", group: "Resources and Links" },
    { title: "FAQ", sub: "Frequently asked questions about setup and both request types", href: "faq.html", group: "Help" }
  ];

    var overlay = document.querySelector("[data-cmdk-overlay]");
    var input = document.querySelector("[data-cmdk-input]");
    var results = document.querySelector("[data-cmdk-results]");
    var triggers = document.querySelectorAll("[data-cmdk-open]");
    if (!overlay || !input || !results) return;

    var box = overlay.querySelector(".cmdk-box");
    var lastFocus = null;
    var items = [];
    var active = 0;

    function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

    function render(list) {
      items = list;
      active = 0;
      if (!list.length) {
        results.innerHTML = '<p class="cmdk-empty">No matches. Try a different word, like "exam" or "calendar".</p>';
        return;
      }
      var last = null, html = "";
      list.forEach(function (it, i) {
        if (it.group !== last) { html += '<p class="cmdk-group-label">' + esc(it.group) + "</p>"; last = it.group; }
        html += '<a class="cmdk-item' + (i === 0 ? " is-active" : "") + '" href="' + esc(it.href) + '"><span class="cmdk-item-title">' + esc(it.title) + '</span><span class="cmdk-item-sub">' + esc(it.sub) + "</span></a>";
      });
      results.innerHTML = html;
    }
    function filter(q) {
      q = q.trim().toLowerCase();
      if (!q) return SITE_INDEX;
      return SITE_INDEX.filter(function (it) {
        return (it.title + " " + it.sub + " " + it.group).toLowerCase().indexOf(q) !== -1;
      });
    }
    function setActive(i) {
      var links = results.querySelectorAll(".cmdk-item");
      if (!links.length) return;
      active = (i + links.length) % links.length;
      links.forEach(function (l, n) { l.classList.toggle("is-active", n === active); });
      links[active].scrollIntoView({ block: "nearest" });
    }
    function open() {
      lastFocus = document.activeElement;
      overlay.hidden = false;
      requestAnimationFrame(function () { overlay.classList.add("is-open"); });
      input.value = "";
      render(SITE_INDEX);
      document.body.style.overflow = "hidden";
      setTimeout(function () { input.focus(); }, 30);
    }
    function close() {
      overlay.classList.remove("is-open");
      document.body.style.overflow = "";
      setTimeout(function () { overlay.hidden = true; }, 180);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    triggers.forEach(function (b) { b.addEventListener("click", open); });
    overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });
    input.addEventListener("input", function () { render(filter(input.value)); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); setActive(active + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setActive(active - 1); }
      else if (e.key === "Enter") {
        e.preventDefault();
        var a = results.querySelector(".cmdk-item.is-active");
        if (a) window.location.href = a.getAttribute("href");
      }
    });
    // Keep keyboard focus inside the dialog while it is open
    box.addEventListener("keydown", function (e) {
      if (e.key !== "Tab") return;
      var focusable = box.querySelectorAll("input, a[href]");
      var first = focusable[0], lastEl = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
      else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
    });
    document.addEventListener("keydown", function (e) {
      var isMac = /mac/i.test(navigator.platform);
      if ((isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        overlay.hidden ? open() : close();
      } else if (e.key === "Escape" && !overlay.hidden) {
        close();
      } else if (e.key === "/" && overlay.hidden && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) {
        e.preventDefault();
        open();
      }
    });
  })();

  /* ---- Step wizard: one step at a time ---- */
  (function () {
    document.querySelectorAll("[data-stepper]").forEach(function (stepper) {
      var steps = Array.prototype.slice.call(stepper.querySelectorAll(".step-card[data-step]"));
      var rail = stepper.querySelector("[data-stepper-rail]");
      var label = stepper.querySelector("[data-stepper-label]");
      if (!steps.length) return;
      var current = 0, busy = false, dots = [];

      if (rail) {
        steps.forEach(function (s, i) {
          if (i > 0) { var line = document.createElement("div"); line.className = "rail-line"; rail.appendChild(line); }
          var dot = document.createElement("button");
          dot.type = "button";
          dot.className = "rail-dot";
          dot.textContent = String(i + 1);
          dot.setAttribute("aria-label", "Go to step " + (i + 1) + " of " + steps.length);
          dot.addEventListener("click", function () { goTo(i); });
          rail.appendChild(dot);
          dots.push(dot);
        });
      }
      steps.forEach(function (step, i) {
        var row = step.querySelector(".step-next-row");
        if (i > 0) {
          if (!row) { row = document.createElement("div"); row.className = "step-next-row"; step.querySelector(".step-body").appendChild(row); }
          if (!row.querySelector("[data-back-step]")) {
            var back = document.createElement("button");
            back.type = "button";
            back.className = "btn btn-ghost btn-sm btn-back";
            back.setAttribute("data-back-step", "");
            back.textContent = "\u2190 Back";
            row.insertBefore(back, row.firstChild);
            back.addEventListener("click", function () { goTo(i - 1, "back"); });
          }
        }
        var next = step.querySelector("[data-next-step]");
        if (next) next.addEventListener("click", function () { goTo(i + 1, "forward"); });
      });

      function paint() {
        dots.forEach(function (d, i) {
          d.classList.toggle("is-current", i === current);
          d.classList.toggle("is-done", i < current);
          if (i === current) d.setAttribute("aria-current", "step"); else d.removeAttribute("aria-current");
        });
        if (rail) rail.querySelectorAll(".rail-line").forEach(function (l, i) { l.style.setProperty("--fill", i < current ? "100%" : "0%"); });
        if (label) label.innerHTML = '<span class="dot"></span>Step ' + (current + 1) + " of " + steps.length;
      }
      function goTo(index, dir) {
        if (index < 0 || index >= steps.length || index === current || busy) return;
        dir = dir || (index > current ? "forward" : "back");
        busy = true;
        var from = steps[current], to = steps[index];
        var wait = reduceMotion ? 0 : 220;
        from.classList.add(dir === "forward" ? "is-leaving-fwd" : "is-leaving-back");
        setTimeout(function () {
          from.classList.remove("is-active", "is-leaving-fwd", "is-leaving-back");
          to.classList.add("is-active");
          if (dir === "back") to.classList.add("enter-back");
          current = index;
          paint();
          stepper.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
          var h = to.querySelector("h3");
          if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
          setTimeout(function () { to.classList.remove("enter-back"); busy = false; }, reduceMotion ? 0 : 400);
        }, wait);
      }
      stepper.classList.add("is-wizard");
      steps.forEach(function (s, i) { s.classList.toggle("is-active", i === 0); });
      paint();
    });
  })();

  /* ---- Scroll reveal with stagger ---- */
  (function () {
    var targets = document.querySelectorAll(".section, .bento-card, .doc-card, .kpi, .cta-band, .hero > *, .card, .file-card, .link-card, .accordion");
    if (reduceMotion || !("IntersectionObserver" in window) || !targets.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.06, rootMargin: "0px 0px -6% 0px" });
    targets.forEach(function (el) {
      var sibs = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      el.style.setProperty("--i", Math.min(sibs, 6));
      el.classList.add("reveal");
      // Anything already on screen reveals on the first frame
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) requestAnimationFrame(function () { el.classList.add("is-visible"); });
      else io.observe(el);
    });
  })();

  /* ---- Cursor-aware spotlight and magnetic primary buttons (fine pointers only) ---- */
  (function () {
    if (!canHover) return;
    var sel = ".card, .link-card, .file-card, .bento-card, .doc-card";
    document.addEventListener("pointermove", function (e) {
      var el = e.target.closest && e.target.closest(sel);
      if (!el) return;
      var r = el.getBoundingClientRect();
      el.style.setProperty("--mx", e.clientX - r.left + "px");
      el.style.setProperty("--my", e.clientY - r.top + "px");
    }, { passive: true });

    if (reduceMotion) return;
    document.querySelectorAll(".hero-actions .btn").forEach(function (b) {
      b.classList.add("btn-magnetic");
      b.addEventListener("pointermove", function (e) {
        var r = b.getBoundingClientRect();
        b.style.transform = "translate(" + ((e.clientX - r.left - r.width / 2) * 0.14) + "px," + ((e.clientY - r.top - r.height / 2) * 0.22) + "px)";
      });
      b.addEventListener("pointerleave", function () { b.style.transform = ""; });
    });
  })();

  /* ---- Scheme picker ---- */
  (function () {
    var roots = document.querySelectorAll("[data-scheme-picker]");
    if (!roots.length) return;

    var JSZIP_URL = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
    var zipPromise = null;
    // JSZip is only fetched when someone downloads several files at once
    function loadJSZip() {
      if (window.JSZip) return Promise.resolve(window.JSZip);
      if (!zipPromise) {
        zipPromise = new Promise(function (resolve, reject) {
          var s = document.createElement("script");
          s.src = JSZIP_URL;
          s.onload = function () { window.JSZip ? resolve(window.JSZip) : reject(new Error("JSZip missing")); };
          s.onerror = function () { zipPromise = null; reject(new Error("JSZip blocked")); };
          document.head.appendChild(s);
        });
      }
      return zipPromise;
    }
    function triggerDownload(href, name) {
      var a = document.createElement("a");
      a.href = href;
      a.setAttribute("download", name);
      document.body.appendChild(a);
      a.click();
      a.remove();
    }

    roots.forEach(function (rootEl) {
      var manifestUrl = rootEl.getAttribute("data-manifest") || "files/scheme/manifest.json";
      var base = rootEl.getAttribute("data-base") || "files/scheme/";
      var tabsEl = rootEl.querySelector("[data-picker-tabs]");
      var listEl = rootEl.querySelector("[data-picker-list]");
      var barEl = rootEl.querySelector("[data-picker-bar]");
      var countEl = rootEl.querySelector("[data-picker-count]");
      var dlBtn = rootEl.querySelector("[data-picker-download]");
      var allBtn = rootEl.querySelector("[data-picker-select-all]");
      var clearBtn = rootEl.querySelector("[data-picker-clear]");
      if (!tabsEl || !listEl) return;

      var manifest = null, activeClass = null, selected = {};

      function currentClass() {
        return manifest.classes.filter(function (c) { return c.code === activeClass; })[0];
      }
      function updateBar() {
        var n = Object.keys(selected).length;
        if (countEl) countEl.textContent = n === 0 ? "No files selected" : n === 1 ? "1 file selected" : n + " files selected";
        if (dlBtn) dlBtn.disabled = n === 0;
        if (barEl) barEl.style.display = n === 0 ? "none" : "flex";
      }
      function showSkeleton() {
        listEl.setAttribute("aria-busy", "true");
        listEl.innerHTML = '<div class="skeleton-row"></div><div class="skeleton-row"></div><div class="skeleton-row"></div>';
      }
      function renderTabs() {
        tabsEl.innerHTML = "";
        tabsEl.setAttribute("role", "group");
        tabsEl.setAttribute("aria-label", "Choose a class");
        manifest.classes.forEach(function (cls) {
          var b = document.createElement("button");
          b.type = "button";
          b.className = "class-tab" + (cls.code === activeClass ? " is-active" : "");
          b.textContent = cls.code;
          b.setAttribute("aria-pressed", cls.code === activeClass ? "true" : "false");
          b.addEventListener("click", function () { activeClass = cls.code; renderTabs(); renderList(); });
          tabsEl.appendChild(b);
        });
      }
      function renderList() {
        listEl.removeAttribute("aria-busy");
        listEl.innerHTML = "";
        var cls = currentClass();
        if (!cls) return;
        cls.subjects.forEach(function (s) {
          var row = document.createElement("div");
          row.className = "subject-row";
          var cb = document.createElement("input");
          cb.type = "checkbox";
          cb.checked = !!selected[s.file];
          cb.setAttribute("aria-label", "Select " + s.label + " for download");
          cb.addEventListener("change", function () {
            if (cb.checked) selected[s.file] = true; else delete selected[s.file];
            updateBar();
          });
          var meta = document.createElement("div");
          meta.className = "subject-meta";
          var name = document.createElement("div");
          name.className = "subject-name";
          name.textContent = s.label;
          var sub = document.createElement("div");
          sub.className = "subject-sub" + (s.full_year ? "" : " is-partial");
          sub.textContent = s.full_year
            ? "All three terms \u00b7 " + s.size_kb + " KB"
            : s.terms.join(" & ") + " Term only, not in the source document \u00b7 " + s.size_kb + " KB";
          meta.appendChild(name);
          meta.appendChild(sub);
          var dl = document.createElement("a");
          dl.className = "btn btn-ghost btn-sm";
          dl.href = base + s.file;
          dl.setAttribute("download", s.file);
          dl.textContent = "Download";
          dl.setAttribute("aria-label", "Download " + s.label);
          row.appendChild(cb);
          row.appendChild(meta);
          row.appendChild(dl);
          listEl.appendChild(row);
        });
      }

      if (allBtn) allBtn.addEventListener("click", function () {
        var cls = currentClass();
        if (!cls) return;
        cls.subjects.forEach(function (s) { selected[s.file] = true; });
        renderList(); updateBar();
      });
      if (clearBtn) clearBtn.addEventListener("click", function () { selected = {}; renderList(); updateBar(); });

      function downloadStaggered(files) {
        files.forEach(function (f, i) { setTimeout(function () { triggerDownload(base + f, f); }, i * 400); });
      }
      if (dlBtn) dlBtn.addEventListener("click", function () {
        var files = Object.keys(selected);
        if (!files.length) return;
        if (files.length === 1) { triggerDownload(base + files[0], files[0]); return; }
        var label = dlBtn.textContent;
        dlBtn.disabled = true;
        dlBtn.textContent = "Preparing zip\u2026";
        loadJSZip().then(function (JSZip) {
          var zip = new JSZip();
          return Promise.all(files.map(function (f) {
            return fetch(base + f).then(function (r) {
              if (!r.ok) throw new Error("fetch " + f);
              return r.text();
            }).then(function (t) { zip.file(f, t); });
          })).then(function () { return zip.generateAsync({ type: "blob" }); });
        }).then(function (blob) {
          var url = URL.createObjectURL(blob);
          triggerDownload(url, (activeClass || "scheme") + "-selected-files.zip");
          setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
          toast("Zip downloaded");
        }).catch(function () {
          toast("Could not build a zip, downloading files one by one", true);
          downloadStaggered(files);
        }).then(function () {
          dlBtn.textContent = label;
          dlBtn.disabled = false;
        });
      });

      function showError() {
        listEl.removeAttribute("aria-busy");
        var msg = location.protocol === "file:"
          ? "The list cannot load when this page is opened as a file on your computer. Please open the live website instead."
          : "The subject list could not load. Check your connection and try again.";
        listEl.innerHTML = '<div class="picker-error" role="alert"><p style="margin:0">' + msg + '</p><button type="button" class="btn btn-ghost btn-sm">Try again</button></div>';
        listEl.querySelector("button").addEventListener("click", load);
      }
      function load() {
        showSkeleton();
        fetch(manifestUrl).then(function (r) {
          if (!r.ok) throw new Error("HTTP " + r.status);
          return r.json();
        }).then(function (data) {
          manifest = data;
          activeClass = manifest.classes[0] ? manifest.classes[0].code : null;
          renderTabs(); renderList(); updateBar();
        }).catch(showError);
      }
      load();
    });
  })();
})();
