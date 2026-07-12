# Educator AI Toolkit — Website

A free, mobile-first reference site for Nigerian educators, covering two Claude AI setups:

1. **Exam, Marking Guide & Revision File Generator** (`exam-generator.html`)
2. **Weekly Lesson Note Generator** (`lesson-note-generator.html`)

Plus `index.html` (home), `getting-started.html` (Claude account + Project setup),
`resources.html` (links + e-note sources) and `faq.html`.

This is a plain static site — no build step, no framework, no dependencies beyond
Google Fonts (loaded via CDN in `assets/style.css`). It works as-is on GitHub Pages.

## Hosting it on GitHub Pages

1. Create a new GitHub repository (public repos get free Pages hosting).
2. Upload every file in this folder to the **root** of that repository, keeping the
   `assets/` folder structure intact:
   ```
   your-repo/
     index.html
     getting-started.html
     exam-generator.html
     lesson-note-generator.html
     resources.html
     faq.html
     assets/
       style.css
       script.js
   ```
3. In the repository, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to `Deploy from a branch`.
5. Set **Branch** to `main` (or your default branch) and folder to `/ (root)`, then **Save**.
6. GitHub will publish the site at `https://<your-username>.github.io/<repo-name>/`
   within a minute or two — refresh the Pages settings page to see the live link.

No further configuration is needed. Every internal link in the site is a relative
path (e.g. `href="faq.html"`), so it works whether it's hosted at the root of a
custom domain or inside a `/repo-name/` subpath.

## Editing content later

- All page copy lives directly in each `.html` file — search for the text you want
  to change and edit it in place.
- Shared design tokens (colors, fonts, spacing) live in `assets/style.css` under
  the `:root { ... }` block at the top.
- The mobile menu, copy-to-clipboard buttons, and active-link highlighting are all
  handled by `assets/script.js` — no changes needed unless you add new pages
  (in which case, copy the `<aside class="sidebar">` block from any existing page).
- To add a new page, duplicate an existing `.html` file, update its `<title>`,
  and add a matching `<li><a href="...">` entry to the sidebar nav on **every**
  page (there's no shared template — this is a plain multi-page static site).
