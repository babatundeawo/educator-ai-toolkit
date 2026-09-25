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

  // ---- Highlight active nav link based on current page ----
  var current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a[href]").forEach(function (a) {
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
        if (window.EATToast) window.EATToast("Copied to clipboard");
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

// ---- Step-by-step wizard: one screen at a time, animated ----
(function () {
  "use strict";
  document.querySelectorAll("[data-stepper]").forEach(function (stepper) {
    var panels = stepper.querySelector(".stepper-panels") || stepper;
    var steps = Array.prototype.slice.call(panels.querySelectorAll(".step-card[data-step]"));
    var rail = stepper.querySelector("[data-stepper-rail]");
    var label = stepper.querySelector("[data-stepper-label]");
    if (!steps.length) return;

    var current = 0;
    var animating = false;
    var ANIM_MS = 220;

    // Build the numbered rail with connecting progress line
    var dots = [];
    if (rail) {
      steps.forEach(function (step, i) {
        if (i > 0) {
          var line = document.createElement("div");
          line.className = "rail-line";
          rail.appendChild(line);
        }
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

    // Ensure every step after the first has a Back control, and every step
    // has a `.step-next-row` to sit in (some final steps have neither).
    steps.forEach(function (step, i) {
      var row = step.querySelector(".step-next-row");
      if (i > 0) {
        if (!row) {
          row = document.createElement("div");
          row.className = "step-next-row";
          step.querySelector(".step-body").appendChild(row);
        }
        if (!row.querySelector("[data-back-step]")) {
          var back = document.createElement("button");
          back.type = "button";
          back.className = "btn btn-ghost btn-sm btn-back";
          back.setAttribute("data-back-step", "");
          back.textContent = "← Back";
          row.insertBefore(back, row.firstChild);
          back.addEventListener("click", function () { goTo(i - 1, "back"); });
        }
      }
      var nextBtn = step.querySelector("[data-next-step]");
      if (nextBtn) {
        nextBtn.addEventListener("click", function () { goTo(i + 1, "forward"); });
      }
    });

    function updateRail() {
      dots.forEach(function (d, i) {
        d.classList.toggle("is-current", i === current);
        d.classList.toggle("is-done", i < current);
      });
      var lines = rail ? rail.querySelectorAll(".rail-line") : [];
      lines.forEach(function (line, i) {
        line.style.setProperty("--fill", i < current ? "100%" : "0%");
      });
      if (label) {
        label.innerHTML = '<span class="dot"></span>Step ' + (current + 1) + " of " + steps.length;
      }
    }

    function goTo(index, direction) {
      if (index < 0 || index >= steps.length || index === current || animating) return;
      direction = direction || (index > current ? "forward" : "back");
      animating = true;
      var oldStep = steps[current];
      var newStep = steps[index];

      oldStep.classList.add(direction === "forward" ? "is-leaving-fwd" : "is-leaving-back");

      setTimeout(function () {
        oldStep.classList.remove("is-active", "is-leaving-fwd", "is-leaving-back");
        newStep.classList.add("is-active");
        if (direction === "back") newStep.classList.add("enter-back");
        current = index;
        updateRail();
        stepper.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(function () {
          newStep.classList.remove("enter-back");
          animating = false;
        }, 400);
      }, ANIM_MS);
    }

    stepper.classList.add("is-wizard");
    steps.forEach(function (s, i) { s.classList.toggle("is-active", i === 0); });
    updateRail();
  });
})();

// ---- Scroll reveal ----
(function () {
  "use strict";
  var targets = document.querySelectorAll(".section, .choice-card, .kpi, .card");
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

// ---- Scheme picker: pick a class + subject(s), download just those files ----
(function () {
  "use strict";
  var roots = document.querySelectorAll("[data-scheme-picker]");
  if (!roots.length) return;

  roots.forEach(function (root) {
    var manifestUrl = root.getAttribute("data-manifest") || "files/scheme/manifest.json";
    var baseUrl = root.getAttribute("data-base") || "files/scheme/";
    var tabsEl = root.querySelector("[data-picker-tabs]");
    var listEl = root.querySelector("[data-picker-list]");
    var barEl = root.querySelector("[data-picker-bar]");
    var countEl = root.querySelector("[data-picker-count]");
    var downloadBtn = root.querySelector("[data-picker-download]");
    var selectAllBtn = root.querySelector("[data-picker-select-all]");
    var clearBtn = root.querySelector("[data-picker-clear]");
    if (!tabsEl || !listEl) return;

    var manifest = null;
    var activeClass = null;
    var selected = {}; // filename -> true

    function fileLabel(f) { return f.split("/").pop(); }

    function updateBar() {
      var n = Object.keys(selected).length;
      if (countEl) countEl.textContent = n === 0 ? "No files selected" : (n === 1 ? "1 file selected" : n + " files selected");
      if (downloadBtn) downloadBtn.disabled = n === 0;
      if (barEl) barEl.style.display = n === 0 ? "none" : "flex";
    }

    function renderTabs() {
      tabsEl.innerHTML = "";
      manifest.classes.forEach(function (cls) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "class-tab" + (cls.code === activeClass ? " is-active" : "");
        btn.textContent = cls.code;
        btn.setAttribute("data-class-code", cls.code);
        btn.addEventListener("click", function () {
          activeClass = cls.code;
          renderTabs();
          renderList();
        });
        tabsEl.appendChild(btn);
      });
    }

    function renderList() {
      listEl.innerHTML = "";
      var cls = manifest.classes.filter(function (c) { return c.code === activeClass; })[0];
      if (!cls) return;
      cls.subjects.forEach(function (subj) {
        var row = document.createElement("div");
        row.className = "subject-row";

        var cb = document.createElement("input");
        cb.type = "checkbox";
        cb.checked = !!selected[subj.file];
        cb.setAttribute("aria-label", "Select " + subj.label + " for download");
        cb.addEventListener("change", function () {
          if (cb.checked) selected[subj.file] = true; else delete selected[subj.file];
          updateBar();
        });

        var meta = document.createElement("div");
        meta.className = "subject-meta";
        var name = document.createElement("div");
        name.className = "subject-name";
        name.textContent = subj.label;
        var sub = document.createElement("div");
        sub.className = "subject-sub" + (subj.full_year ? "" : " is-partial");
        sub.textContent = subj.full_year
          ? "All three terms · " + subj.size_kb + " KB"
          : (subj.terms.join(" & ") + " Term only, not in the source document · " + subj.size_kb + " KB");
        meta.appendChild(name);
        meta.appendChild(sub);

        var dl = document.createElement("a");
        dl.className = "btn btn-ghost btn-sm";
        dl.href = baseUrl + subj.file;
        dl.setAttribute("download", subj.file);
        dl.textContent = "Download";

        row.appendChild(cb);
        row.appendChild(meta);
        row.appendChild(dl);
        listEl.appendChild(row);
      });
    }

    if (selectAllBtn) {
      selectAllBtn.addEventListener("click", function () {
        var cls = manifest.classes.filter(function (c) { return c.code === activeClass; })[0];
        if (!cls) return;
        cls.subjects.forEach(function (s) { selected[s.file] = true; });
        renderList();
        updateBar();
      });
    }
    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        selected = {};
        renderList();
        updateBar();
      });
    }
    function triggerDownload(href, filename) {
      var a = document.createElement("a");
      a.href = href;
      a.setAttribute("download", filename);
      document.body.appendChild(a);
      a.click();
      a.remove();
    }

    function downloadSequentially(files) {
      // Fallback for when JSZip didn't load: stagger individual downloads.
      // Some browsers (notably Safari/iOS) block more than one of these,
      // so this only runs when bundling into a single zip isn't possible.
      files.forEach(function (f, i) {
        setTimeout(function () { triggerDownload(baseUrl + f, f); }, i * 400);
      });
    }

    if (downloadBtn) {
      downloadBtn.addEventListener("click", function () {
        var files = Object.keys(selected);
        if (!files.length) return;

        if (files.length === 1) {
          triggerDownload(baseUrl + files[0], files[0]);
          return;
        }

        if (typeof JSZip === "undefined") {
          downloadSequentially(files);
          return;
        }

        var originalLabel = downloadBtn.textContent;
        downloadBtn.disabled = true;
        downloadBtn.textContent = "Preparing zip…";

        var zip = new JSZip();
        Promise.all(
          files.map(function (f) {
            return fetch(baseUrl + f)
              .then(function (r) {
                if (!r.ok) throw new Error("Could not fetch " + f);
                return r.text();
              })
              .then(function (text) { zip.file(f, text); });
          })
        )
          .then(function () { return zip.generateAsync({ type: "blob" }); })
          .then(function (blob) {
            var url = URL.createObjectURL(blob);
            triggerDownload(url, (activeClass || "scheme") + "-selected-files.zip");
            setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
          })
          .catch(function () {
            // Network or fetch hiccup: fall back to individual downloads
            // rather than leaving the teacher with nothing.
            downloadSequentially(files);
          })
          .finally(function () {
            downloadBtn.disabled = false;
            downloadBtn.textContent = originalLabel;
          });
      });
    }

    fetch(manifestUrl)
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(function (data) {
        manifest = data;
        activeClass = manifest.classes[0] ? manifest.classes[0].code : null;
        renderTabs();
        renderList();
        updateBar();
      })
      .catch(function () {
        // The most common cause: this page was opened directly as a local
        // file (file://) instead of through a web server, so the browser
        // blocks the manifest fetch. Give a message that actually points
        // at the fix instead of just "try refreshing", which won't help.
        var msg = location.protocol === "file:"
          ? "The scheme list can't load when this page is opened directly as a file. Please visit the live site instead (or run it through a local web server)."
          : "Could not load the scheme list right now. Try refreshing the page.";
        listEl.innerHTML = '<p class="subject-sub">' + msg + "</p>";
      });
  });
})();

// ---- Toast notifications (small, unobtrusive confirmations) ----
(function () {
  "use strict";
  var stack = document.querySelector(".toast-stack");
  if (!stack) {
    stack = document.createElement("div");
    stack.className = "toast-stack";
    stack.setAttribute("aria-live", "polite");
    document.body.appendChild(stack);
  }
  window.EATToast = function (message) {
    var el = document.createElement("div");
    el.className = "toast";
    el.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><polyline points="20 6 9 17 4 12"/></svg><span></span>';
    el.querySelector("span").textContent = message;
    stack.appendChild(el);
    requestAnimationFrame(function () {
      el.classList.add("is-visible");
    });
    setTimeout(function () {
      el.classList.remove("is-visible");
      setTimeout(function () {
        el.remove();
      }, 300);
    }, 2600);
  };
})();

// ---- Mobile nav menu (hamburger toggle + off-canvas panel) ----
(function () {
  "use strict";
  var toggle = document.querySelector("[data-menu-toggle]");
  var nav = document.querySelector(".nav-links");
  if (!toggle || !nav) return;

  var scrim = document.querySelector(".nav-scrim");
  if (!scrim) {
    scrim = document.createElement("div");
    scrim.className = "nav-scrim";
    document.body.appendChild(scrim);
  }

  function closeMenu() {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }
  function openMenu() {
    nav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
  }

  toggle.addEventListener("click", function () {
    var isOpen = nav.classList.contains("is-open");
    if (isOpen) closeMenu();
    else openMenu();
  });
  scrim.addEventListener("click", closeMenu);
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeMenu);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 760) closeMenu();
  });
})();

// ---- Spotlight hover: cursor-tracking glow on cards/panels ----
(function () {
  "use strict";
  if (window.matchMedia && window.matchMedia("(hover: none)").matches) return;
  var selector = ".choice-card, .card, .file-card, .link-card";
  document.addEventListener(
    "pointermove",
    function (e) {
      var el = e.target.closest ? e.target.closest(selector) : null;
      if (!el) return;
      var rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", e.clientX - rect.left + "px");
      el.style.setProperty("--my", e.clientY - rect.top + "px");
    },
    { passive: true }
  );
})();
