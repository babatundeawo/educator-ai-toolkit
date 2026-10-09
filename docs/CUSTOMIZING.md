# Customizing guide

For the site owner. Edit files on github.com using the pencil icon, then commit. See [DEPLOYMENT.md](DEPLOYMENT.md).

## Colours

Open `assets/style.css`. The first block, `:root { ... }`, holds every colour as a named value.

- `--emerald-*` is the brand green. Change `--emerald-600` to recolour buttons and links.
- `--gold-*` is the highlighter accent.
- Dark mode colours are in the `[data-theme="dark"]` block just below.

Keep text and background colours far apart in brightness so everything stays readable.

## Text

Page text is in each `.html` file. Select the pencil icon, press **Ctrl + F** to find the words, and edit them in place.

- Page title and search-result description: the `<title>` and `<meta name="description">` lines near the top of the file.
- Navigation links: the `<nav class="nav-links">` block. It repeats on every page, so change all of them.
- Search results (Ctrl K): the `SITE_INDEX` list at the top of the search section in `assets/script.js`.

## The Master Instructions

The text teachers copy lives in `setup.html`, inside the block that starts `<script type="text/plain" id="master-raw">`. Edit the text there. Keep the four lines that begin with `**{SCHOOL_NAME:`, `**{SCHOOL_ADDRESS:`, `**{STATE:` and `**{LOCATION_CONTEXT:`, because the live editor looks for them.

## Images and icons

Replace a file with another of the **same name and size** (upload it in the same folder to overwrite):

- `assets/og-image.png`: the preview image shown when a link is shared (1200 by 630 pixels).
- `assets/favicon.svg`, `assets/favicon.ico`, `assets/apple-touch-icon.png`, `assets/icon-192.png`, `assets/icon-512.png`, `assets/icon-maskable-512.png`.

## Fonts

Fonts load from Google Fonts. To change one, edit the `<link rel="stylesheet" href="https://fonts.googleapis.com/...">` line in every page's `<head>`, then update `--font-display`, `--font-body` or `--font-mono` in `assets/style.css`. Only use fonts that are free for commercial use.

## Scheme of Work files

Files live in `files/scheme/`. When you add, rename or remove one, also edit `files/scheme/manifest.json` so the picker matches. The automatic check fails with a clear message if they disagree.

## Changing the site address

If the repository name or domain changes, replace `https://babatundeawo.github.io/educator-ai-toolkit/` with the new address in: every page's `canonical` and `og:` lines, `sitemap.xml`, `robots.txt`, `README.md`, and replace `/educator-ai-toolkit/` in `404.html`.
