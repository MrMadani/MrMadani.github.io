/* =====================================================================
   Automation Explorer
   ---------------------------------------------------------------------
   1. CALENDLY_URL: paste your Calendly scheduling link here. It's the
      https://calendly.com/... address inside the embed code Calendly gives
      you. While it's empty, the booking buttons open an email instead.
   2. INDUSTRIES: one entry per tab. Each step is either
        { name: 'Order' }                      → manual step (not highlighted)
        { name: '...', auto: { what, tools, saved } } → automatable step
      Add, remove or reorder steps and tabs freely; the page rebuilds itself.
   ===================================================================== */

const CALENDLY_URL = ''; // e.g. 'https://calendly.com/your-name/automation-audit'
const FALLBACK_EMAIL = 'shahinmadani2024@gmail.com';

const INDUSTRIES = {
  'E-commerce': {
    intro: 'From first visit to repeat purchase: keep carts, orders and customers moving without manual follow-up.',
    steps: [
      { name: 'Lead / visitor' },
      { name: 'Abandoned cart emails', auto: {
        what: 'Detects abandoned checkouts and sends a timed 2–3 email sequence with the exact items left behind.',
        tools: ['Shopify', 'Klaviyo', 'AI copy'],
        saved: '3–5 hrs / week' } },
      { name: 'Order' },
      { name: 'Order confirmation + inventory sync', auto: {
        what: 'Sends a branded confirmation and updates stock across your store, marketplaces and spreadsheet in real time.',
        tools: ['Shopify', 'Amazon', 'Google Sheets'],
        saved: '4–6 hrs / week' } },
      { name: 'Shipping label + tracking email', auto: {
        what: 'Creates the shipping label as soon as an order is paid and emails the customer tracking automatically.',
        tools: ['ShipStation', 'Shopify', 'Gmail'],
        saved: '5–8 hrs / week' } },
      { name: 'Review request', auto: {
        what: 'Asks for a review a few days after delivery and routes unhappy replies to a person before they go public.',
        tools: ['Klaviyo', 'Judge.me', 'AI sentiment'],
        saved: '1–2 hrs / week' } },
      { name: 'Reorder / upsell campaign', auto: {
        what: 'Predicts when each customer is due to reorder and sends personalised product suggestions.',
        tools: ['Klaviyo', 'Shopify', 'AI recommendations'],
        saved: '2–4 hrs / week' } }
    ]
  },

  'Textile': {
    intro: 'Quotes, factory orders, quality checks and payment follow-up, connected end to end.',
    steps: [
      { name: 'Inquiry' },
      { name: 'AI quote draft from price sheet', auto: {
        what: 'Reads the inquiry (fabric, GSM, quantity, trims) and drafts a quote from your price sheet for review.',
        tools: ['Gmail / Outlook', 'Google Sheets', 'AI extraction'],
        saved: '20–30 min / quote' } },
      { name: 'Sample approval' },
      { name: 'Production order to factory', auto: {
        what: 'Turns the approved sample and order details into a production order and sends it to the right factory.',
        tools: ['ERP', 'Google Sheets', 'Email / WhatsApp'],
        saved: '1–2 hrs / order' } },
      { name: 'Production' },
      { name: 'QC checklist + photo log', auto: {
        what: 'Gives inspectors a mobile checklist; photos and results are logged per order and failures alert the team.',
        tools: ['Google Forms / AppSheet', 'Google Drive', 'Slack'],
        saved: '2–3 hrs / week' } },
      { name: 'Shipping docs + tracking', auto: {
        what: 'Generates packing list, commercial invoice and shipping docs, then shares tracking with the buyer.',
        tools: ['ERP', 'Google Docs', 'Carrier tracking'],
        saved: '1–2 hrs / shipment' } },
      { name: 'Invoice + payment reminders', auto: {
        what: 'Issues the invoice on shipment and sends polite reminders until payment is received.',
        tools: ['QuickBooks / Xero', 'Gmail'],
        saved: '2–4 hrs / week' } }
    ]
  },

  'Manufacturing': {
    intro: 'From RFQ to paid invoice, with the ERP kept up to date and customers kept informed.',
    steps: [
      { name: 'RFQ' },
      { name: 'Quote generation', auto: {
        what: 'Pulls specs and quantities from the RFQ and builds a quote from your cost and margin rules.',
        tools: ['Gmail / Outlook', 'Excel / Sheets', 'AI extraction'],
        saved: '30–60 min / quote' } },
      { name: 'PO received' },
      { name: 'PO email parsed into ERP', auto: {
        what: 'Reads the PO PDF from the inbox and enters every line item into the ERP, flagging mismatches for review.',
        tools: ['Outlook', 'Business Central / NetSuite', 'AI document parsing'],
        saved: '10–15 min / PO' } },
      { name: 'Material / inventory check', auto: {
        what: 'Checks the bill of materials against stock and raises purchase requests for anything short.',
        tools: ['ERP', 'Supplier portals'],
        saved: '3–5 hrs / week' } },
      { name: 'Production' },
      { name: 'Status updates to client', auto: {
        what: 'Sends milestone updates (scheduled, in production, shipped) to the client as the job moves.',
        tools: ['ERP', 'Gmail / Outlook'],
        saved: '3–6 hrs / week' } },
      { name: 'Invoice + follow-up', auto: {
        what: 'Invoices on shipment, reconciles against the PO and follows up on overdue payments.',
        tools: ['QuickBooks / NetSuite', 'Email'],
        saved: '2–4 hrs / week' } }
    ]
  },

  'Promotional Products': {
    intro: 'Built from daily experience in promo: faster quotes, mockups and proofs for distributors and suppliers.',
    steps: [
      { name: 'Distributor inquiry' },
      { name: 'Product suggestion from catalog', auto: {
        what: 'Matches the request (budget, quantity, in-hands date, theme) to the best-fit items in your catalog.',
        tools: ['Product catalog', 'AI search', 'Gmail'],
        saved: '15–30 min / inquiry' } },
      { name: 'Virtual mockup generation', auto: {
        what: 'Places the customer logo on the product and returns a virtual sample ready to send.',
        tools: ['Supplier mockup tools', 'AI image', 'Google Drive'],
        saved: '10–20 min / mockup' } },
      { name: 'Quote with decoration / setup charges', auto: {
        what: 'Calculates unit price, decoration, setup and run charges by method and quantity break.',
        tools: ['Price sheets', 'Syncore / CRM', 'AI extraction'],
        saved: '15–25 min / quote' } },
      { name: 'Order' },
      { name: 'Proof approval reminders', auto: {
        what: 'Chases unapproved proofs on a schedule and moves the job forward the moment it is approved.',
        tools: ['Order system', 'Gmail', 'Slack'],
        saved: '2–4 hrs / week' } },
      { name: 'Tracking emails', auto: {
        what: 'Emails tracking numbers and order status to distributors as soon as orders ship.',
        tools: ['Google Sheets', 'Apps Script', 'Carrier tracking'],
        saved: '3–5 hrs / week' } },
      { name: 'Reorder reminders', auto: {
        what: 'Spots repeat programs and events coming up and prompts distributors to reorder in time.',
        tools: ['CRM', 'Order history', 'Email'],
        saved: '1–3 hrs / week' } }
    ]
  },

  'Professional Services': {
    intro: 'Let the admin run itself so your team can spend its hours on client work.',
    steps: [
      { name: 'Lead form' },
      { name: 'Lead scoring + auto-reply', auto: {
        what: 'Scores each lead on fit and urgency, replies instantly and routes hot leads to the right person.',
        tools: ['Website form', 'HubSpot', 'AI scoring'],
        saved: '2–4 hrs / week' } },
      { name: 'Calendly booking', auto: {
        what: 'Sends qualified leads a booking link, then handles confirmations, reminders and reschedules.',
        tools: ['Calendly', 'Google Calendar', 'Zoom'],
        saved: '1–2 hrs / week' } },
      { name: 'Consultation' },
      { name: 'Proposal draft', auto: {
        what: 'Turns call notes into a first-draft proposal using your templates, scope and pricing.',
        tools: ['Meeting notes', 'Google Docs', 'AI drafting'],
        saved: '1–2 hrs / proposal' } },
      { name: 'Contract + e-signature', auto: {
        what: 'Fills the contract from the accepted proposal and sends it for e-signature with reminders.',
        tools: ['DocuSign / PandaDoc', 'CRM'],
        saved: '30–45 min / client' } },
      { name: 'Onboarding emails', auto: {
        what: 'Sends a welcome sequence, collects documents and sets up the client folder and project.',
        tools: ['Gmail', 'Google Drive', 'Asana / ClickUp'],
        saved: '1–2 hrs / client' } },
      { name: 'Invoicing + monthly report', auto: {
        what: 'Bills on schedule and sends each client a monthly summary of work done and results.',
        tools: ['QuickBooks / Stripe', 'Google Sheets', 'AI summaries'],
        saved: '3–5 hrs / month' } }
    ]
  }
};

/* ---------------------------------------------------------------------
   Rendering. You shouldn't need to edit below this line.
   --------------------------------------------------------------------- */
(function () {
  const root = document.getElementById('explorer');
  if (!root) return;
  const tabsEl = root.querySelector('.ex-tabs');
  const introEl = root.querySelector('.ex-intro');
  const flowEl = root.querySelector('.ex-flow');
  const cardEl = root.querySelector('.ex-card');
  const statEl = root.querySelector('.ex-stat');
  const names = Object.keys(INDUSTRIES);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  tabsEl.innerHTML = names.map((n, i) =>
    `<button role="tab" id="ex-tab-${slug(n)}" aria-controls="ex-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${esc(n)}</button>`
  ).join('');

  function showIndustry(name) {
    const ind = INDUSTRIES[name];
    tabsEl.querySelectorAll('[role=tab]').forEach(t => {
      const on = t.textContent === name;
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
    });
    root.querySelector('#ex-panel').setAttribute('aria-labelledby', 'ex-tab-' + slug(name));
    introEl.textContent = ind.intro || '';
    const autoCount = ind.steps.filter(s => s.auto).length;
    statEl.innerHTML = `<strong>${autoCount}</strong> of ${ind.steps.length} steps can be automated`;
    flowEl.innerHTML = ind.steps.map((s, i) => {
      const arrow = i < ind.steps.length - 1 ? '<li class="ex-arrow" aria-hidden="true"></li>' : '';
      const node = s.auto
        ? `<li><button class="ex-step auto" data-i="${i}" aria-pressed="false"><span class="ex-badge">AI</span>${esc(s.name)}</button></li>`
        : `<li><div class="ex-step manual">${esc(s.name)}</div></li>`;
      return node + arrow;
    }).join('');
    closeCard();
  }

  function openCard(name, i, btn) {
    const s = INDUSTRIES[name].steps[i];
    flowEl.querySelectorAll('.ex-step.auto').forEach(b => b.setAttribute('aria-pressed', b === btn));
    cardEl.innerHTML = `
      <button class="ex-close" aria-label="Close">×</button>
      <p class="ex-card-tag">Step ${i + 1} · Automated</p>
      <h3>${esc(s.name)}</h3>
      <dl>
        <div><dt>What's automated</dt><dd>${esc(s.auto.what)}</dd></div>
        <div><dt>Tools used</dt><dd class="ex-tools">${s.auto.tools.map(t => `<span>${esc(t)}</span>`).join('')}</dd></div>
        <div><dt>Est. time saved</dt><dd class="ex-saved">${esc(s.auto.saved)}</dd></div>
      </dl>`;
    cardEl.hidden = false;
    cardEl.querySelector('.ex-close').addEventListener('click', () => { closeCard(); btn.focus(); });
    if (window.matchMedia('(max-width: 760px)').matches) cardEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  function closeCard() {
    cardEl.hidden = true;
    cardEl.innerHTML = '';
    flowEl.querySelectorAll('.ex-step.auto').forEach(b => b.setAttribute('aria-pressed', 'false'));
  }

  const current = () => tabsEl.querySelector('[aria-selected=true]').textContent;

  tabsEl.addEventListener('click', e => {
    const t = e.target.closest('[role=tab]');
    if (t) showIndustry(t.textContent);
  });
  tabsEl.addEventListener('keydown', e => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const i = names.indexOf(current());
    const next = names[(i + (e.key === 'ArrowRight' ? 1 : names.length - 1)) % names.length];
    showIndustry(next);
    tabsEl.querySelector('[aria-selected=true]').focus();
  });
  flowEl.addEventListener('click', e => {
    const b = e.target.closest('.ex-step.auto');
    if (!b) return;
    if (b.getAttribute('aria-pressed') === 'true') closeCard();
    else openCard(current(), +b.dataset.i, b);
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !cardEl.hidden) closeCard(); });

  showIndustry(names[0]);
})();

/* ---------------------------------------------------------------------
   Booking buttons (class "js-book"): Calendly popup, or email fallback.
   --------------------------------------------------------------------- */
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
