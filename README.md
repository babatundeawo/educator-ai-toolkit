# Educator AI Toolkit, Website

**Live:** https://babatundeawo.github.io/educator-ai-toolkit/

A free, mobile-first reference site for Nigerian educators, covering two Claude AI setups:

1. **Exam, Marking Guide & Revision File Generator** (`exam-generator.html`)
2. **Weekly Lesson Note Generator** (`lesson-note-generator.html`)

Plus `index.html` (a welcome screen that asks "What do you want to generate?"
and sends the visitor straight into one of the two tools above),
`resources.html` (links + e-note sources) and `faq.html`.

This is a plain static site, no build step, no framework, no dependencies beyond
Google Fonts (loaded via CDN in `assets/style.css`). It works as-is on GitHub Pages.

## How this version is organised

The old version opened on a busy marketing-style home page and kept account
setup on a separate `getting-started.html` page, which left first-time visitors
unsure where to start. This version instead:

- Opens on a single question: **"What do you want to generate?"**, with two
  large choice cards and nothing else competing for attention.
- Each tool page is now fully self-contained: Step 1 of both `exam-generator.html`
  and `lesson-note-generator.html` is "Download Claude and sign up," so a visitor
  never has to leave the page they landed on to get started. There is no
  separate Getting Started page any more.
- `resources.html` and `faq.html` stay as their own pages, linked from the top
  nav and from the welcome screen, for people who want to browse before
  committing to a tool.

## What's in this version

- Light and dark mode, remembered per visitor, with no flash on page load.
- A site-wide search (press Ctrl+K or `/`, or tap the search icon) that jumps
  straight to any page or step.
- A scroll progress bar, a back-to-top button, and a skip-to-content link for
  keyboard and screen-reader users.
- A step-by-step accordion on each tool page, with a "Step X of 6" progress
  readout and a "next step" button that opens the following step and scrolls
  to it.
- No em dashes or en dashes anywhere in the copy.

## Hosting it on GitHub Pages

1. Create a new GitHub repository (public repos get free Pages hosting), or
   reuse the existing `educator-ai-toolkit` repo.
2. Upload every file in this folder to the **root** of that repository, keeping the
   `assets/` folder structure intact:
   ```
   your-repo/
     index.html
     exam-generator.html
     lesson-note-generator.html
     resources.html
     faq.html
     assets/
       style.css
       script.js
       favicon.svg
   ```
3. In the repository, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to `Deploy from a branch`.
5. Set **Branch** to `main` (or your default branch) and folder to `/ (root)`, then **Save**.
6. GitHub will publish the site at `https://<your-username>.github.io/<repo-name>/`
   within a minute or two, refresh the Pages settings page to see the live link.

No further configuration is needed. Every internal link in the site is a relative
path (e.g. `href="faq.html"`), so it works whether it's hosted at the root of a
custom domain or inside a `/repo-name/` subpath.

## Editing content later

- All page copy lives directly in each `.html` file, search for the text you want
  to change and edit it in place.
- Shared design tokens (colors, fonts, spacing) live in `assets/style.css` under
  the `:root { ... }` (light mode) and `[data-theme="dark"]` (dark mode) blocks
  at the top.
- The theme toggle, copy-to-clipboard buttons, step-by-step accordion, and
  search palette are all handled by `assets/script.js`, no changes needed unless
  you add new pages or new steps.
- To add a new page, duplicate an existing `.html` file (it already carries the
  top nav, the theme toggle, the search palette, and the back-to-top button),
  update its `<title>`, `<meta name="description">` and `og:*` tags, and add a
  matching `<a href="...">` entry to the `.nav-links` block on **every** page
  (there's no shared template, this is a plain multi-page static site).
- To make a new page or step searchable, add an entry for it to the
  `SITE_INDEX` array near the top of `assets/script.js`.
- To add a step to a tool page, copy an existing `<details class="step-card">`
  block, update its `<span class="step-num">` number, and renumber the ones
  after it (also update the `Step X of 6` count wherever it's mentioned in copy).

## Credit

Built by Babatunde Awoyemi (https://github.com/babatundeawo) for Techbase
Consultant Services (https://github.com/orgs/techbaseng).
