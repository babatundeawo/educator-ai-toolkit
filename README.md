# Educator AI Toolkit, Website

**Live:** https://babatundeawo.github.io/educator-ai-toolkit/

A free, mobile-first reference site for Nigerian educators, covering one unified
Claude Project that generates two kinds of documents:

1. Weekly **Lesson Notes**
2. **Exam, Marking Guide & Revision Files**

## Pages

- `index.html`, welcome screen: one path to setup, plus two "how to ask" cards.
- `setup.html`, the one-time Project setup: sign up, create a Project, an
  **interactive editor** that fills in the Master Instructions live as you type
  your school's details, and download buttons for the required knowledge files.
- `exam-generator.html`, how to ask for an exam/marking guide/revision file,
  plus the full rules reference.
- `lesson-note-generator.html`, how to ask for a lesson note, plus the full
  rules reference.
- `resources.html`, Project file downloads, official Claude links, e-note
  sources by class, and community links.
- `faq.html`.

This is a plain static site, no build step, no framework, no dependencies beyond
Google Fonts (loaded via CDN in `assets/style.css`). It works as-is on GitHub Pages.

## How this version is organised

The site now mirrors a single unified Claude Project rather than two separate
ones. Setup (signing up, creating the Project, pasting the Master Instructions,
uploading the Scheme of Work and reference files) happens **once**, on
`setup.html`. The two tool pages no longer repeat any setup steps, they only
cover how to phrase a request and what you get back, since the same Project
handles both based on whether your request includes a Week number (Lesson
Note) or just a Term (Exam/Revision).

### The Master Instructions editor

`setup.html` embeds the exact text of `Master_Project_Instructions.md` inside a
hidden `<script type="text/plain" id="master-raw">` block. Four inputs (school
name, school address, state, location context) drive a small inline script at
the bottom of the page that live-substitutes those values into a preview
(`#master-preview`), highlighting anything not yet filled in gold. The existing
generic copy-button handler in `assets/script.js` (`data-copy-btn`) copies
whatever the preview currently shows. If you ever need to update the master
instructions text itself, edit the content of that `<script type="text/plain">`
block directly, the substitution logic doesn't need to change.

### Downloadable knowledge files

`files/` holds the three files a Project needs uploaded as knowledge:
`COMPLETE_NERDC_SCHEME_OF_WORK.pdf`, `Lesson_Note_Generator_Reference.md`, and
`Exam_Marking_Revision_Generator_Reference.md`. They're linked with a plain
`download` attribute from both `setup.html` (inline with the step that needs
them) and `resources.html` (for re-downloading later). Swap a file by
replacing it in `files/` with the same filename, no HTML changes needed unless
the filename itself changes (update the `href` and the visible file name in
both pages if so).

## What's in this version

- Light and dark mode, remembered per visitor, with no flash on page load.
- A site-wide search (press Ctrl+K or `/`, or tap the search icon) that jumps
  straight to any page or step.
- A scroll progress bar, a back-to-top button, and a skip-to-content link for
  keyboard and screen-reader users.
- A step-by-step accordion on each tool page, with a "Step X of N" progress
  readout and a "next step" button that opens the following step and scrolls
  to it.
- No em dashes or en dashes anywhere in the copy.

## Hosting it on GitHub Pages

1. Create a new GitHub repository (public repos get free Pages hosting), or
   reuse the existing `educator-ai-toolkit` repo.
2. Upload every file in this folder to the **root** of that repository, keeping
   the `assets/` and `files/` folder structure intact:
   ```
   your-repo/
     index.html
     setup.html
     exam-generator.html
     lesson-note-generator.html
     resources.html
     faq.html
     assets/
       style.css
       script.js
       favicon.svg
     files/
       COMPLETE_NERDC_SCHEME_OF_WORK.pdf
       Lesson_Note_Generator_Reference.md
       Exam_Marking_Revision_Generator_Reference.md
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
  after it (also update the `Step X of N` count wherever it's mentioned in copy).

## Credit

Built by Babatunde Awoyemi (https://github.com/babatundeawo) for Techbase
Consultant Services (https://github.com/orgs/techbaseng).
