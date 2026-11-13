/* =====================================================================
   Booking buttons (any link with class "js-book", on every page)
   ---------------------------------------------------------------------
   CALENDLY_URL: paste your Calendly scheduling link here. It's the
   https://calendly.com/... address inside the embed code Calendly gives
   you. While it's empty, booking buttons open an email to you instead.
   ===================================================================== */

const CALENDLY_URL = ''; // e.g. 'https://calendly.com/your-name/automation-audit'
const FALLBACK_EMAIL = 'shahinmadani2024@gmail.com';

(function () {
  let loading = null;
  function loadCalendly() {
    if (window.Calendly) return Promise.resolve();
    if (loading) return loading;
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://assets.calendly.com/assets/external/widget.css';
    document.head.appendChild(css);
    loading = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://assets.calendly.com/assets/external/widget.js';
      s.async = true;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
    return loading;
  }
  const mailto = 'mailto:' + FALLBACK_EMAIL + '?subject=' + encodeURIComponent('Free automation audit');
  document.querySelectorAll('.js-book').forEach(btn => {
    if (!CALENDLY_URL) { btn.href = mailto; return; }
    btn.href = CALENDLY_URL;
    btn.addEventListener('click', e => {
      e.preventDefault();
      loadCalendly()
        .then(() => window.Calendly.initPopupWidget({ url: CALENDLY_URL }))
        .catch(() => { window.location.href = CALENDLY_URL; });
    });
  });
})();
