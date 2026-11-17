/**
 * ⚡ ANONYTE HEADWAY SOLVER — Instant Console Loader
 * Paste this directly into Chrome DevTools Console (F12 -> Console) on Oxford Headway.
 * 
 * Replace 'https://YOUR-SUBDOMAIN/anonyte-solver.min.js' with your hosted URL.
 */

// 🚀 METHOD A: Script Tag Injector (Recommended: Zero CORS issues, always works)
(function () {
  const url = 'https://YOUR-SUBDOMAIN/anonyte-solver.min.js';
  const existing = document.getElementById('anonyte-loader-script');
  if (existing) existing.remove();
  const s = document.createElement('script');
  s.id = 'anonyte-loader-script';
  s.src = url + (url.includes('?') ? '&' : '?') + 't=' + Date.now();
  s.onload = () => console.log('%c[Anonyte] Loaded successfully from subdomain!', 'color:#10b981; font-weight:bold;');
  s.onerror = () => console.error('[Anonyte] Failed to load script. Check URL and connectivity.');
  document.head.appendChild(s);
})();

// 🌐 METHOD B: "curl"-style Fetch One-Liner (Requires CORS Access-Control-Allow-Origin: *)
// fetch('https://YOUR-SUBDOMAIN/anonyte-solver.min.js').then(r=>r.text()).then(eval);
