# Contributing

Thank you for helping improve Educator AI Toolkit. You do not need to install anything: everything can be done on the GitHub website.

## Report a problem or suggest an idea

1. Open the [Issues tab](https://github.com/babatundeawo/educator-ai-toolkit/issues/new/choose).
2. Choose the template that fits and fill it in. Include the page address and, for display problems, your device and browser.

## Fix something yourself

1. Open the file on GitHub and select the pencil icon to edit it.
2. Describe your change and choose **Create a new branch for this commit and start a pull request**.
3. Open the pull request. Automated checks run and report the result on the pull request page.

## Guidelines

- Page copy lives in the `.html` files; colours, fonts and spacing live at the top of `assets/style.css`.
- Keep every link relative so the site works at any address.
- Do not add trackers or third-party scripts.
- Scheme of Work files live in `files/scheme/`. When adding or removing one, update `files/scheme/manifest.json` to match; the automated checks flag any mismatch.

## For developers

The site is static. To preview locally, serve the folder with any static file server (for example `python3 -m http.server`) and open `index.html` through it. `python3 scripts/check_site.py` runs the same checks as CI.
