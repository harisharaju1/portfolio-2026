// Light by default; dark only when the visitor picks it. Loaded in <head>
// (not deferred) so a saved choice applies before first paint, with no flash.
(function () {
  var KEY = 'theme';
  var root = document.documentElement;

  function saved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function save(theme) {
    try { localStorage.setItem(KEY, theme); } catch (e) { /* private mode: still toggles, just not remembered */ }
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    var button = document.querySelector('.theme-toggle');
    if (!button) return;
    var dark = theme === 'dark';
    button.setAttribute('aria-pressed', String(dark));
    button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    button.title = dark ? 'Light mode' : 'Dark mode';
  }

  apply(saved() === 'dark' ? 'dark' : 'light');

  document.addEventListener('DOMContentLoaded', function () {
    var button = document.querySelector('.theme-toggle');
    if (!button) return;
    apply(root.getAttribute('data-theme'));
    button.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(next);
      save(next);
    });
  });
})();
