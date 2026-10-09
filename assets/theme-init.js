/* Runs before first paint: applies the saved (or system) theme and flags
   JavaScript as available so CSS can enable animations safely. */
(function () {
  var root = document.documentElement;
  root.classList.add("js");
  var theme = null;
  try { theme = localStorage.getItem("eat-theme"); } catch (e) {}
  if (theme !== "dark" && theme !== "light") {
    theme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  root.setAttribute("data-theme", theme);
})();
