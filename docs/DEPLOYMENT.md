# Deployment guide

For the site owner. You never type a command. Everything is a click in the GitHub website, GitHub Desktop or Windows File Explorer.

## How publishing works

Every time a change reaches the `main` branch, GitHub Actions automatically checks the site, downloads the fonts, builds it and publishes it to GitHub Pages. It takes one to three minutes. There is no publish button.

Words used here: a **repository** is the project folder on GitHub; a **commit** is a saved set of changes; a **branch** is a safe copy to work on; a **pull request** is a request to merge that copy into the live site.

## A. One-time: GitHub website

1. Sign in at github.com and open your repository `educator-ai-toolkit`. It must be **Public** (GitHub Pages on the Free plan needs this).
2. Open **Settings**, then **Pages** in the left menu.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**. You should see a short note saying the site is built by a workflow. If you do not see "GitHub Actions" in the list, refresh the page.

## B. GitHub Desktop: send the update safely

Use a branch so the live site is never at risk.

1. Open **GitHub Desktop**. Under **Current repository** choose `educator-ai-toolkit`. If it is not listed: **File**, **Clone repository**, choose the **GitHub.com** tab, select it, then **Clone**.
2. Select **Fetch origin**, then **Pull origin** if it appears, so your folder is current.
3. Select **Current branch**, then **New branch**. Name it `rebuild/premium-app`, keep **Create branch** based on `main`, and select **Create branch**.
4. Show hidden folders in Windows: open **File Explorer**, select **View**, then **Show**, then tick **Hidden items**. You need this to see the `.github` folder.
5. In GitHub Desktop select **Repository**, then **Show in Explorer**. Your repository folder opens.
6. Extract the ZIP: right-click the ZIP, choose **Extract All**, and when asked for the destination, select **Browse** and pick the repository folder you just opened. Remove any extra folder name from the end of the path so the files land directly in the repository folder (you should see `index.html` right next to `README.md`). Select **Extract**.
7. If Windows asks about existing files, choose **Replace the files in the destination**.
8. Go back to GitHub Desktop. The left panel lists the changed files. You should see `index.html`, `sw.js`, `assets/pwa.js`, `.github/workflows/deploy.yml` and many more. If `.github` files are missing from the list, step 4 was skipped; repeat it and extract again.
9. At the bottom left, in the **Summary** box, type exactly:

   ```
   Rebuild as an installable app with a new look
   ```
10. Select **Commit to rebuild/premium-app**.
11. Select **Publish branch**.
12. Select **Create pull request** (or **Branch**, then **Create pull request**). Your browser opens on GitHub. Select **Create pull request** again.

You should see a page for the pull request with checks running under **Check pull request**.

## C. GitHub website: check, merge, publish

1. On the pull request page, wait for **Check pull request** to show a green tick. A red cross means a problem; select **Details** and read "Reading an error" below.
2. Optional preview: GitHub Pages cannot preview a branch. To inspect the build before it goes live, select **Details**, then **Summary**, scroll to **Artifacts** and download **site-preview**. Unzip it and double-click `index.html` to look around. (The app features such as install and offline only work on the real https address, not from your computer.) If you skip the preview, merging is safe because you can roll back.
3. Select **Merge pull request**, then **Confirm merge**.
4. Select the **Actions** tab. A run called **Deploy site** starts. A yellow circle means it is running. Wait for the green tick.
5. Select the run, then the **Publish** box. The live address appears there. It is `https://babatundeawo.github.io/educator-ai-toolkit/`.

## D. Install the app and test on a phone

**Android (Chrome)**

1. Open the live address in Chrome.
2. Wait a few seconds, or use the footer link **Install app**. Select **Install**. Chrome may also show **Install app** in the three-dot menu.
3. You should see the green book icon appear on your home screen. Open it: it opens full screen without the browser bar.

**iPhone or iPad (Safari)**

1. Open the live address in Safari.
2. Tap the **Share** button, scroll down, tap **Add to Home Screen**, then **Add**. The footer link **Install app** shows these steps with pictures.

**Test offline**

1. Open a few pages while connected.
2. Turn on airplane mode and open the app again. Pages you opened still work, and an "offline" notice appears at the top. A page you never opened shows the friendly offline page.

**See an update arrive**

After a later change is published, open the app while connected. A bar says **A new version is ready**. Tap **Refresh**.

## E. Verification checklist

- The home page loads and the hero conversation animates once.
- Light and dark switch with the moon button, and stay after a refresh.
- **Setup** shows five steps and the Master Instructions editor works.
- A Scheme of Work file downloads from the picker.
- Press `Ctrl K` (or `/`) and search works.
- The browser address bar or menu offers to install the app.
- Airplane mode: a visited page still opens.
- A wrong address (for example `/nothing`) shows the custom not-found page.

## F. Troubleshooting

1. **Blank page or no styling.** The Pages source is not set to GitHub Actions, or the site was opened from a wrong address. Repeat section A and open the address from the Publish box.
2. **The Actions run is a red cross.** Open the run, select the red step and read the last lines. Lines starting `ERROR:` name the file and the problem. Fix that file and commit again.
3. **`.github` folder missing after extracting.** Hidden items were off. Turn them on (section B step 4) and extract again over the folder.
4. **Pages option "GitHub Actions" is missing.** The repository is Private. On the Free plan make it Public: **Settings**, scroll to **Danger Zone**, **Change visibility**.
5. **Old version still showing.** Close the app fully and open it again while online, then tap **Refresh** on the update bar. In Chrome you can also open the three-dot menu, **Settings**, **Privacy**, **Clear browsing data**, tick **Cached images and files** only.
6. **No install button.** The site must be opened over https in Chrome or Edge, and the app must not already be installed. On iPhone, only Add to Home Screen works.
7. **Fonts look plain.** The font download step could not reach the internet. Open the run, find **Download the fonts**, and read the warning. Select **Re-run all jobs** at the top right of the run. The site works either way.
8. **A link or image 404s after you moved a file.** Run the checks again; the `ERROR:` line names the page and the missing file.
9. **No screenshots in the install prompt.** They are created during the build. If that step was skipped, Chrome simply shows the smaller install dialog. It is cosmetic.
10. **Download of several scheme files fails offline.** Bundling several files into one ZIP needs a small library fetched online the first time. Download files one by one, or connect first.

## G. Updating content later (under five steps)

1. Open GitHub Desktop and select **Fetch origin**.
2. Select **Repository**, **Show in Explorer**, and edit or replace the file (for example `faq.html`).
3. Back in GitHub Desktop, type a short summary and select **Commit to main**.
4. Select **Push origin**.
5. Open the **Actions** tab and wait for the green tick.

Small edits are also possible on github.com: open the file, select the pencil icon, change it, then **Commit changes**.

## Reading an error

Select the red run, then the red step. The last lines explain the problem. The checks print lines starting `ERROR:`, for example `faq.html: broken link or file -> resources2.html`. The **Quality report** can show warnings (a slow page, a link that did not answer). These never stop publishing.

## Rolling back

1. Open the repository **Pull requests** tab, then **Closed**.
2. Open the merged pull request you want to undo.
3. Select **Revert** near the bottom, then **Create pull request**, then **Merge pull request**.

The site republishes in one to three minutes with the earlier version. Visitors who installed the app get the older version through the normal update bar.

## Security switches (recommended)

1. **Settings**, then **Advanced Security** (or **Code security**).
2. Turn on **Dependabot alerts**, **Dependabot security updates**, **Secret scanning** and **Push protection**.
3. CodeQL scanning already runs from the included workflow.

GitHub Pages cannot send custom security headers. The site uses a Content Security Policy and referrer policy through `<meta>` tags instead. Some protections (such as clickjacking headers) are not possible on this host.

## Optional: custom domain

1. Buy a domain from a registrar.
2. In **Settings**, **Pages**, enter it under **Custom domain** and select **Save**.
3. At the registrar add the DNS records GitHub lists on that page (see GitHub's guide "Managing a custom domain for your GitHub Pages site").
4. Tick **Enforce HTTPS** when it becomes available.
5. Follow "Changing the site address" in [CUSTOMIZING.md](CUSTOMIZING.md).
