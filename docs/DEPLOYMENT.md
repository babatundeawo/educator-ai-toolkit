# Deployment guide

For the site owner. Everything here is done in your web browser, on github.com. You never need to type a command.

## How publishing works

Every time a change is saved to the `main` branch, GitHub automatically checks the site and publishes it. This takes about one to two minutes. You do not press a "publish" button.

## One-time: moving to the new repository

You are replacing the old repository with this new one. Follow these steps in order so the live site is never empty for more than a minute or two.

**Step 1: Create the new repository under a temporary name**

1. On github.com, select the **+** at the top right, then **New repository**.
2. Name it `educator-ai-toolkit-new`. Choose **Public**. Leave everything else unticked. Select **Create repository**.

You should see an empty repository page with a box titled "Quick setup".

**Step 2: Upload the files in three batches**

GitHub's website accepts at most 100 files per upload, so the download is split into three folders: `batch-1`, `batch-2`, `batch-3`.

1. Unzip the download on your computer.
2. In your new repository, select **Add file**, then **Upload files**.
3. Open the folder `batch-1`, select **everything inside it** (not the folder itself) and drag it onto the GitHub page. Wait until every file shows, then select **Commit changes**.
4. Repeat for `batch-2`, then `batch-3`.

Note for Mac: the folder `.github` is hidden in Finder. Press **Command + Shift + .** (full stop) to show hidden files. On Windows it shows normally.

After the third batch, open the **Code** tab. You should see these items at the top level: `.github`, `assets`, `docs`, `files`, `scripts`, and the `.html` files. Open `.github/workflows` and confirm it contains `deploy.yml` and `codeql.yml`.

**Step 3: Switch on GitHub Pages**

1. In the repository, select **Settings**, then **Pages** in the left menu.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.

**Step 4: Check the first publish**

1. Select the **Actions** tab. Open the newest run called **Deploy site**.
2. Wait for a green tick. If it shows a red cross, see "Reading an error" below.
3. Open `https://babatundeawo.github.io/educator-ai-toolkit-new/` and look around. The social image and the 404 page point at the final address, so they only fully work after Step 5.

**Step 5: Swap the old for the new**

Keep your old repository as a backup rather than deleting it. It holds your full change history, which cannot be recovered once deleted.

1. Open the **old** repository, then **Settings**, **General**. Under **Repository name**, change it to `educator-ai-toolkit-old` and select **Rename**.
2. In the same page, scroll to **Danger Zone** and select **Archive this repository**. Confirm. It becomes read-only. Then go to **Settings**, **Pages** and make sure the old repository's site is unpublished, so it does not compete.
3. Open the **new** repository, then **Settings**, **General**, and rename it to `educator-ai-toolkit`.
4. Select the **Actions** tab, open **Deploy site** in the left list, choose **Run workflow**, then **Run workflow** again. Wait for the green tick.

Your site is now live at `https://babatundeawo.github.io/educator-ai-toolkit/`, the same address as before, so existing links keep working. If you choose a different repository name, the address changes and old links will stop working (GitHub Pages cannot redirect them).

## Updating content

1. Open the file on github.com (for example `faq.html`).
2. Select the pencil icon (**Edit this file**).
3. Make your change, then select **Commit changes**, keep **Commit directly to the main branch**, and confirm.
4. Check the **Actions** tab for a green tick.

To replace a download (for example a reference file), open its folder, choose **Add file**, **Upload files**, and upload a file with exactly the same name.

## Checking that a publish worked

Open the **Actions** tab. The newest run at the top shows:

- A **green tick**: the site is live.
- A **yellow circle**: still running, wait a minute.
- A **red cross**: something failed and the previous version stays live. Nothing is broken for visitors.

## Reading an error

Select the red run, then the red step. The last lines of its log explain the problem. The checks print lines starting with `ERROR:` that name the file and the issue, for example `faq.html: broken link or file -> resources2.html`. Fix that file and commit again.

The **Quality report** step can show warnings (slow page, a link that did not respond). These never stop publishing.

## Rolling back to a previous version

1. Open the **Code** tab and select the **commits** link (the clock icon with a number).
2. Find the last good change and select its `<>` button to see the files as they were.
3. To restore it, open the commit you want to undo, select the **...** menu, then **Revert**, and create the pull request. Select **Merge pull request**.

This publishes automatically. If you ever lose the new repository entirely, your old archived repository still holds the previous design.

## Optional: custom domain

1. Buy a domain from a registrar of your choice.
2. In **Settings**, **Pages**, enter it under **Custom domain** and select **Save**.
3. At your registrar, add the DNS records that GitHub lists on that page. See GitHub's guide "Managing a custom domain for your GitHub Pages site".
4. Tick **Enforce HTTPS** once it becomes available.
5. Follow "Changing the site address" in [CUSTOMIZING.md](CUSTOMIZING.md), because page addresses are written into the site.

## Recommended: switch on GitHub's security scanning

1. **Settings**, **Code security** (or **Advanced Security**).
2. Turn on **Dependabot alerts**, **Dependabot security updates** and **Secret scanning**.
3. Under **Code scanning**, CodeQL is already set up by the included workflow.
