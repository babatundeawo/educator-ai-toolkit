#!/usr/bin/env python3
"""Quality checks run by GitHub Actions on every push. Exits non-zero only
for real problems (broken internal links, missing metadata, inline scripts
that the Content Security Policy would block)."""
import json, pathlib, re, sys
from html.parser import HTMLParser

ROOT = pathlib.Path(__file__).resolve().parent.parent
PAGES = sorted(p for p in ROOT.glob("*.html"))
problems, warnings = [], []

class Scan(HTMLParser):
    def __init__(self):
        super().__init__(); self.refs = []; self.ids = set(); self.inline = 0
        self.in_title = False; self.title = ""; self.meta = {}; self.canon = False; self.h1 = 0
        self.imgs_no_alt = 0; self._script_attrs = None
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a: self.ids.add(a["id"])
        for k in ("href", "src"):
            if k in a: self.refs.append(a[k])
        if tag == "title": self.in_title = True
        if tag == "meta" and a.get("name") == "description": self.meta["description"] = a.get("content", "")
        if tag == "link" and a.get("rel") == "canonical": self.canon = True
        if tag == "h1": self.h1 += 1
        if tag == "img" and "alt" not in a: self.imgs_no_alt += 1
        if tag == "script": self._script_attrs = a
        if "onclick" in a or "onload" in a: self.inline += 1
    def handle_data(self, d):
        if self.in_title: self.title += d
        if self._script_attrs is not None and not self._script_attrs.get("src") and self._script_attrs.get("type") != "text/plain" and d.strip():
            self.inline += 1
    def handle_endtag(self, tag):
        if tag == "title": self.in_title = False
        if tag == "script": self._script_attrs = None

for page in PAGES:
    s = Scan(); s.feed(page.read_text(encoding="utf-8"))
    n = page.name
    if n != "404.html":
        if not s.title.strip(): problems.append(f"{n}: missing <title>")
        if len(s.meta.get("description", "")) < 50: problems.append(f"{n}: meta description missing or too short")
        if not s.canon: problems.append(f"{n}: missing canonical link")
    if s.h1 != 1: problems.append(f"{n}: expected exactly one <h1>, found {s.h1}")
    if s.inline: problems.append(f"{n}: inline script or event handler (blocked by the Content Security Policy)")
    if s.imgs_no_alt: problems.append(f"{n}: image without alt text")
    for ref in s.refs:
        if re.match(r"^(https?:|mailto:|tel:|data:|#|/educator-ai-toolkit/)", ref) or not ref: continue
        target = ref.split("#")[0].split("?")[0]
        if target and not (ROOT / target).exists(): problems.append(f"{n}: broken link or file -> {ref}")

manifest = json.loads((ROOT / "files/scheme/manifest.json").read_text(encoding="utf-8"))
listed = set()
for c in manifest["classes"]:
    for sub in c["subjects"]:
        listed.add(sub["file"])
        if not (ROOT / "files/scheme" / sub["file"]).exists(): problems.append(f"manifest lists a missing file: {sub['file']}")
on_disk = {p.name for p in (ROOT / "files/scheme").glob("*.md") if p.name != "README.md"}
for extra in sorted(on_disk - listed): warnings.append(f"scheme file not in manifest (invisible in the picker): {extra}")

for w in warnings: print("WARNING:", w)
for p in problems: print("ERROR:", p)
print(f"Checked {len(PAGES)} pages and {len(listed)} scheme files: {len(problems)} errors, {len(warnings)} warnings.")
sys.exit(1 if problems else 0)
