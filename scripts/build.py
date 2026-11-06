#!/usr/bin/env python3
"""Assembles the publishable site into _site/. Run by GitHub Actions.

  build.py assemble   copy the site, stamp the service worker with the build version
  build.py finalize   drop manifest screenshots that were not generated

Nothing here needs to be run by hand."""
import json, os, pathlib, re, shutil, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "_site"

def assemble():
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir()
    for page in ROOT.glob("*.html"):
        shutil.copy2(page, OUT / page.name)
    for folder in ("assets", "files"):
        shutil.copytree(ROOT / folder, OUT / folder, dirs_exist_ok=True)
    for name in ("manifest.webmanifest", "robots.txt", "sitemap.xml", "sw.js"):
        shutil.copy2(ROOT / name, OUT / name)
    (OUT / ".nojekyll").write_text("")
    version = (os.environ.get("GITHUB_SHA") or "local")[:10]
    sw = (OUT / "sw.js").read_text()
    if "__BUILD_VERSION__" not in sw:
        sys.exit("ERROR: sw.js has lost its __BUILD_VERSION__ marker.")
    (OUT / "sw.js").write_text(sw.replace("__BUILD_VERSION__", version))
    print(f"Assembled _site (build {version}) with {sum(1 for _ in OUT.rglob('*') if _.is_file())} files.")

def finalize():
    manifest_path = OUT / "manifest.webmanifest"
    manifest = json.loads(manifest_path.read_text())
    kept = [s for s in manifest.get("screenshots", []) if (OUT / s["src"]).exists()]
    if len(kept) != len(manifest.get("screenshots", [])):
        print("NOTE: some manifest screenshots were not generated and were removed from the published manifest.")
    if kept:
        manifest["screenshots"] = kept
    else:
        manifest.pop("screenshots", None)
    manifest_path.write_text(json.dumps(manifest, indent=2))
    fonts = OUT / "assets" / "fonts"
    missing = [n for n in ("inter.woff2", "bricolage-grotesque.woff2", "jetbrains-mono.woff2") if not (fonts / n).exists()]
    if missing:
        print("WARNING: these fonts were not downloaded, so the site uses system fonts instead:", ", ".join(missing))

if __name__ == "__main__":
    {"assemble": assemble, "finalize": finalize}.get(sys.argv[1] if len(sys.argv) > 1 else "", lambda: sys.exit(__doc__))()
