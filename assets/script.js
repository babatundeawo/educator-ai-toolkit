// ============================================================
// EDUCATOR AI TOOLKIT: SHARED SCRIPT
// ============================================================

// ---- Theme toggle (light / dark, remembered in localStorage) ----
(function () {
  "use strict";
  var STORAGE_KEY = "eat-theme";
  var root = document.documentElement;
  var toggleButtons = document.querySelectorAll("[data-theme-toggle]");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    toggleButtons.forEach(function (btn) {
      btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      btn.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      );
    });
  }

  function currentTheme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  // Theme is already set pre-paint by the inline snippet in <head>; this
  // just wires up the buttons and keeps the aria state in sync.
  applyTheme(currentTheme());

  toggleButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (e) {}
    });
  });
})();

// ---- Scroll progress bar ----
(function () {
  "use strict";
  var bar = document.querySelector("[data-scroll-progress]");
  if (!bar) return;
  function update() {
    var doc = document.documentElement;
    var scrollTop = doc.scrollTop || document.body.scrollTop;
    var height = doc.scrollHeight - doc.clientHeight;
    var pct = height > 0 ? (scrollTop / height) * 100 : 0;
    bar.style.width = pct + "%";
  }
  document.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
})();

// ---- Back to top button ----
(function () {
  "use strict";
  var btn = document.querySelector("[data-back-to-top]");
  if (!btn) return;
  function update() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    btn.classList.toggle("is-visible", scrollTop > 480);
  }
  document.addEventListener("scroll", update, { passive: true });
  update();
  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

// ---- Command palette / site search ----
(function () {
  "use strict";

  var SITE_INDEX = [
    { title: "Home", sub: "Overview of the toolkit", href: "index.html", group: "Overview" },
    { title: "For supervisors and administrators", sub: "Why this strengthens documentation standards", href: "index.html#about", group: "Overview" },
    { title: "Getting Started", sub: "Install Claude and create your first Project", href: "getting-started.html", group: "Overview" },
    { title: "Download Claude and sign up", sub: "Browser, iPhone, Android, or desktop", href: "getting-started.html", group: "Getting Started" },
    { title: "Create a Project", sub: "One per tool, holds every subject and class", href: "getting-started.html", group: "Getting Started" },
    { title: "Exam and Revision Generator", sub: "Turns e-notes into an exam, marking guide, or revision file", href: "exam-generator.html", group: "The Tools" },
    { title: "Exam composition rules", sub: "Section A, Section B, and the Third Term blend ratio", href: "exam-generator.html", group: "Exam and Revision Generator" },
    { title: "Revision file rules", sub: "Summary notes plus answered practice questions", href: "exam-generator.html", group: "Exam and Revision Generator" },
    { title: "Lesson Note Generator", sub: "Turns e-notes or topic lists into a weekly lesson note booklet", href: "lesson-note-generator.html", group: "The Tools" },
    { title: "Mode A and Mode B", sub: "Full e-notes versus topic lists only", href: "lesson-note-generator.html", group: "Lesson Note Generator" },
    { title: "Date computation rule", sub: "How week numbers map to real calendar dates", href: "lesson-note-generator.html", group: "Lesson Note Generator" },
    { title: "Resources and Links", sub: "Official Claude links, e-note downloads, community support", href: "resources.html", group: "Help" },
    { title: "Download e-notes by class", sub: "Primary 1 through SS3 Telegram channels", href: "resources.html", group: "Resources and Links" },
    { title: "FAQ", sub: "Frequently asked questions about both tools", href: "faq.html", group: "Help" }
  ];

  var overlay = document.querySelector("[data-cmdk-overlay]");
  var input = document.querySelector("[data-cmdk-input]");
  var results = document.querySelector("[data-cmdk-results]");
  var openTriggers = document.querySelectorAll("[data-cmdk-open]");
  if (!overlay || !input || !results) return;

  var activeIndex = 0;
  var currentItems = [];

  function render(items) {
    currentItems = items;
    activeIndex = 0;
    if (!items.length) {
      results.innerHTML = '<p class="cmdk-empty">No matches. Try a different word, like "exam" or "calendar."</p>';
      return;
    }
    var lastGroup = null;
    var html = "";
    items.forEach(function (item, i) {
      if (item.group !== lastGroup) {
        html += '<p class="cmdk-group-label">' + item.group + "</p>";
        lastGroup = item.group;
      }
      html +=
        '<a class="cmdk-item' + (i === 0 ? " is-active" : "") + '" href="' + item.href + '" data-idx="' + i + '">' +
        '<span class="cmdk-item-title">' + item.title + "</span>" +
        '<span class="cmdk-item-sub">' + item.sub + "</span></a>";
    });
    results.innerHTML = html;
  }

  function filterItems(query) {
    var q = query.trim().toLowerCase();
    if (!q) return SITE_INDEX;
    return SITE_INDEX.filter(function (item) {
      return (
        item.title.toLowerCase().indexOf(q) !== -1 ||
        item.sub.toLowerCase().indexOf(q) !== -1 ||
        item.group.toLowerCase().indexOf(q) !== -1
      );
    });
  }

  function setActive(idx) {
    var links = results.querySelectorAll(".cmdk-item");
    if (!links.length) return;
    activeIndex = (idx + links.length) % links.length;
    links.forEach(function (l, i) {
      l.classList.toggle("is-active", i === activeIndex);
    });
    links[activeIndex].scrollIntoView({ block: "nearest" });
  }

  function openPalette() {
    overlay.hidden = false;
    requestAnimationFrame(function () {
      overlay.classList.add("is-open");
    });
    input.value = "";
    render(SITE_INDEX);
    document.body.style.overflow = "hidden";
    setTimeout(function () {
      input.focus();
    }, 30);
  }

  function closePalette() {
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
    setTimeout(function () {
      overlay.hidden = true;
    }, 180);
  }

  openTriggers.forEach(function (btn) {
    btn.addEventListener("click", openPalette);
  });
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closePalette();
  });

  input.addEventListener("input", function () {
    render(filterItems(input.value));
  });

  input.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive(activeIndex + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive(activeIndex - 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      var active = results.querySelector(".cmdk-item.is-active");
      if (active) window.location.href = active.getAttribute("href");
    } else if (e.key === "Escape") {
      closePalette();
    }
  });

  document.addEventListener("keydown", function (e) {
    var isMac = navigator.platform.toUpperCase().indexOf("MAC") !== -1;
    var modifier = isMac ? e.metaKey : e.ctrlKey;
    if (modifier && e.key.toLowerCase() === "k") {
      e.preventDefault();
      overlay.hidden ? openPalette() : closePalette();
    } else if (e.key === "Escape" && !overlay.hidden) {
      closePalette();
    } else if (e.key === "/" && overlay.hidden && document.activeElement.tagName !== "INPUT") {
      e.preventDefault();
      openPalette();
    }
  });
})();

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

// ---- Step-by-step reveal wizard ----
(function () {
  "use strict";
  document.querySelectorAll("[data-stepper]").forEach(function (stepper) {
    var steps = Array.prototype.slice.call(stepper.querySelectorAll("details.step-card"));
    var progress = stepper.querySelector("[data-stepper-progress]");

    function currentIndex() {
      var openIdx = 0;
      steps.forEach(function (s, i) { if (s.open) openIdx = i; });
      return openIdx;
    }
    function updateProgress() {
      if (!progress) return;
      progress.innerHTML =
        '<span class="dot"></span>Step ' + (currentIndex() + 1) + " of " + steps.length;
    }

    steps.forEach(function (step, i) {
      step.addEventListener("toggle", updateProgress);
      var nextBtn = step.querySelector("[data-next-step]");
      if (nextBtn && steps[i + 1]) {
        nextBtn.addEventListener("click", function () {
          steps[i + 1].open = true;
          updateProgress();
          setTimeout(function () {
            steps[i + 1].scrollIntoView({ behavior: "smooth", block: "start" });
          }, 60);
        });
      }
    });
    updateProgress();
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
