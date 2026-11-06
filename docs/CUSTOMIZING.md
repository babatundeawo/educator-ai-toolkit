# Customizing guide

For the site owner. Edit files in File Explorer (or the pencil icon on github.com), then commit. See [DEPLOYMENT.md](DEPLOYMENT.md).

## Colours

Open `assets/style.css`. The first block, `:root { ... }`, holds every colour as a named value.

- `--emerald-*` is the brand green. Change `--emerald-600` to recolour buttons and links.
- `--gold-*` is the highlighter accent.
- Dark mode colours are in the `[data-theme="dark"]` block just below.

Keep text and background colours far apart in brightness so everything stays readable. If you change the main green, also change `theme_color` in `manifest.webmanifest` and the two `theme-color` lines in each page.

## Text

Page text is in each `.html` file. Press **Ctrl + F** to find the words and edit them in place.

- Page title and search description: the `<title>` and `<meta name="description">` lines near the top.
- Navigation links: the `<nav class="nav-links">` block. It repeats on every page, so change all of them.
- Search results (Ctrl K): the `SITE_INDEX` list in `assets/script.js`.
- The home page conversation animation: the four blocks inside `<div class="ask-demo">` in `index.html`.

## The Master Instructions

The text teachers copy lives in `setup.html`, inside the block that starts `<script type="text/plain" id="master-raw">`. Keep the four lines that begin with `**{SCHOOL_NAME:`, `**{SCHOOL_ADDRESS:`, `**{STATE:` and `**{LOCATION_CONTEXT:`, because the live editor looks for them.

## Logo, icons and the social image

Replace a file with another of the same name and size:

- `assets/logo-mark.svg` and `assets/favicon.svg`: the logo shown in the header and browser tab.
- `assets/icon-192.png`, `assets/icon-512.png`: the app icons.
- `assets/icon-maskable-512.png`: the Android adaptive icon. Keep the artwork inside the centre 60 percent so it is never cropped.
- `assets/apple-touch-icon.png` (180 by 180): the iPhone home screen icon.
- `assets/favicon.ico`: the older browser tab icon.
- `assets/og-image.png` (1200 by 630): the picture shown when a link is shared.

`scripts/make_icons.py` draws the current set from code, for developers who want to regenerate them.

## Fonts

Fonts are free and self-hosted. The build downloads them (Bricolage Grotesque for headings, Inter for text, JetBrains Mono for code) from the Fontsource packages on npm into `assets/fonts`, so nothing is requested from Google. To change one, edit `scripts/fetch_fonts.sh` (the three `fetch` lines), the `@font-face` block at the top of `assets/style.css`, and the font names in `--font-display`, `--font-body` and `--font-mono`. Only use fonts that are free for commercial use.

## Scheme of Work files

Files live in `files/scheme/`. When you add, rename or remove one, also edit `files/scheme/manifest.json` so the picker matches. The automatic check fails with a clear message if they disagree.

## App behaviour

- `manifest.webmanifest`: the app name, colours, shortcuts and icons.
- `sw.js`: what is saved for offline use. Add a new page to the `PAGES` list so it works offline.
- `assets/pwa.js`: the install prompt, iOS instructions, update bar and offline notice.

## Changing the site address

If the repository name or domain changes, replace `https://babatundeawo.github.io/educator-ai-toolkit/` in: every page's `canonical` and `og:` lines, `sitemap.xml`, `robots.txt` and `README.md`; and replace `/educator-ai-toolkit/` in `404.html`. Everything else uses relative paths and follows automatically.
