#!/usr/bin/env bash
# Downloads the three open-licence fonts from the npm registry (Fontsource packages)
# into assets/fonts of the assembled site. Latin subset only, WOFF2 only.
# If a download fails the site falls back to system fonts; the build does not fail.
set -u
DEST="${1:-_site/assets/fonts}"
mkdir -p "$DEST"
TMP="$(mktemp -d)"

fetch() {  # package, pattern, output name
  local pkg="$1" pattern="$2" out="$3"
  if ( cd "$TMP" && npm pack "$pkg" --silent >/dev/null 2>&1 ); then
    local tgz; tgz="$(ls "$TMP"/*.tgz | head -n1)"
    mkdir -p "$TMP/x" && tar -xzf "$tgz" -C "$TMP/x"
    local f; f="$(find "$TMP/x" -type f -name "$pattern" | head -n1)"
    if [ -n "$f" ]; then cp "$f" "$DEST/$out"; echo "OK: $out from $pkg"; else echo "WARNING: $pattern not found in $pkg"; fi
  else
    echo "WARNING: could not download $pkg"
  fi
  rm -rf "$TMP"/* 2>/dev/null
}

fetch "@fontsource-variable/inter" "inter-latin-wght-normal.woff2" "inter.woff2"
fetch "@fontsource-variable/bricolage-grotesque" "bricolage-grotesque-latin-wght-normal.woff2" "bricolage-grotesque.woff2"
fetch "@fontsource/jetbrains-mono" "jetbrains-mono-latin-400-normal.woff2" "jetbrains-mono.woff2"
exit 0
