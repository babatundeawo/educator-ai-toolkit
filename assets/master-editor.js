/* Master Instructions editor: fills the school details into the instructions text live. */
(function () {
  "use strict";
  var rawEl = document.getElementById('master-raw');
  var preview = document.getElementById('master-preview');
  if (!rawEl || !preview) return;
  var raw = rawEl.textContent;

  var inputs = {
    name: document.getElementById('f-school-name'),
    addr: document.getElementById('f-school-address'),
    state: document.getElementById('f-state'),
    loc: document.getElementById('f-location')
  };

  function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // Each of the 4 long placeholders (e.g. "**{SCHOOL_NAME: [Insert ...]}**")
  // always sits alone on its own line. We process the text ONE LINE AT A
  // TIME, so a match can never span past its own line and swallow the
  // content below it, however the description text inside is worded.
  var LINE_KEYS = { SCHOOL_NAME: "name", SCHOOL_ADDRESS: "addr", STATE: "state", LOCATION_CONTEXT: "loc" };
  var PLACEHOLDER_LINE_RE = /^\*\*\{(SCHOOL_NAME|SCHOOL_ADDRESS|STATE|LOCATION_CONTEXT):/;

  function processPlaceholderLine(line) {
    var m = line.match(PLACEHOLDER_LINE_RE);
    if (!m) return null;
    var closeIdx = line.lastIndexOf("}**");
    if (closeIdx === -1) return null;
    var key = LINE_KEYS[m[1]];
    var val = inputs[key].value.trim();
    if (val) return "**{" + m[1] + ": [" + escapeHtml(val) + "]}**";
    return '<mark class="placeholder-mark">' + escapeHtml(line) + "</mark>";
  }

  // The short in-body references, e.g. "**{SCHOOL_NAME}**", are exact
  // literal strings (no lazy spans), so a plain split/join is bulletproof.
  function substituteShortTokens(escapedLine) {
    var nameVal = inputs.name.value.trim();
    var addrVal = inputs.addr.value.trim();
    escapedLine = escapedLine.split("{SCHOOL_NAME}").join(
      nameVal ? escapeHtml(nameVal) : '<mark class="placeholder-mark">{SCHOOL_NAME}</mark>'
    );
    escapedLine = escapedLine.split("{SCHOOL_ADDRESS}").join(
      addrVal ? escapeHtml(addrVal) : '<mark class="placeholder-mark">{SCHOOL_ADDRESS}</mark>'
    );
    return escapedLine;
  }

  function render() {
    var html = raw
      .split("\n")
      .map(function (line) {
        var placeholderResult = processPlaceholderLine(line);
        if (placeholderResult !== null) return placeholderResult;
        return substituteShortTokens(escapeHtml(line));
      })
      .join("\n");
    preview.innerHTML = html;
  }

  Object.keys(inputs).forEach(function (k) {
    inputs[k].addEventListener("input", render);
  });
  render();
})();
