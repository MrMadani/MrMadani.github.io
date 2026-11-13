/* Automation Explorer: page behaviour. Content lives in explorer-data.js. */
(function () {
  const $ = (sel, el = document) => el.querySelector(sel);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const steps = ind => ind.stages.flatMap((list, s) => list.map(step => ({ ...step, stage: s })));
  const aiSteps = ind => steps(ind).filter(s => s.level !== 'human');
  const fmtMinutes = m => m >= 60 ? `${+(m / 60).toFixed(1)} hr${m === 60 ? '' : 's'}` : `${m} min`;

  const grid = $('#ind-grid');
  const search = $('#ind-search');
  const empty = $('#ind-empty');
  const work = $('#workspace');
  const dialog = $('#step-dialog');
  let current = null;   // selected industry
  let flat = [];        // its steps in flow order (for prev / next)

  /* ---------- Industry grid + search ---------- */
  grid.innerHTML = INDUSTRIES.map(ind => {
    const ai = aiSteps(ind).length, all = steps(ind).length;
    return `<button class="ind-card" data-id="${ind.id}" aria-pressed="false">
      <span class="ind-name">${esc(ind.name)}</span>
      <span class="ind-meta">${ai} of ${all} steps can use AI</span>
    </button>`;
  }).join('');

  const haystack = ind => [ind.name, ind.intro, ...ind.keywords].join(' ').toLowerCase();
  function filter() {
    const q = search.value.trim().toLowerCase();
    let shown = 0;
    grid.querySelectorAll('.ind-card').forEach(card => {
      const ind = INDUSTRIES.find(i => i.id === card.dataset.id);
      const hit = !q || q.split(/\s+/).every(word => haystack(ind).includes(word));
      card.hidden = !hit;
      if (hit) shown++;
    });
    empty.hidden = shown > 0;
  }
  search.addEventListener('input', filter);
  search.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const first = grid.querySelector('.ind-card:not([hidden])');
    select(first ? first.dataset.id : 'general', true);
  });
  $('#ind-empty-btn').addEventListener('click', () => select('general', true));
  grid.addEventListener('click', e => {
    const card = e.target.closest('.ind-card');
    if (card) select(card.dataset.id, true);
  });

  /* ---------- Workspace ---------- */
  function select(id, scroll) {
    const ind = INDUSTRIES.find(i => i.id === id);
    if (!ind) return;
    current = ind;
    flat = steps(ind);
    grid.querySelectorAll('.ind-card').forEach(c => c.setAttribute('aria-pressed', c.dataset.id === id));
    history.replaceState(null, '', '#' + id);
    render();
    work.hidden = false;
    if (scroll) work.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }

  function render() {
    const ind = current;
    const ai = aiSteps(ind);
    const quick = ai.filter(s => s.effort === 'quick');
    $('#ws-name').textContent = ind.name;
    $('#ws-intro').textContent = ind.intro;
    $('#ws-stats').innerHTML = `
      <div><strong>${ai.length}<small> / ${flat.length}</small></strong><span>steps can use AI</span></div>
      <div><strong>${quick.length}</strong><span>quick wins (set up in days)</span></div>
      <div><strong>${ai.filter(s => s.level === 'auto').length}</strong><span>run fully on their own</span></div>`;

    let n = 0;
    $('#flow').innerHTML = ind.stages.map((list, s) => `
      <section class="stage" aria-labelledby="stage-${s}">
        <header>
          <span class="stage-num">${s + 1}</span>
          <h3 id="stage-${s}">${esc(STAGES[s])}</h3>
          <span class="stage-count">${list.filter(x => x.level !== 'human').length}/${list.length} AI</span>
        </header>
        <ol>${list.map(step => `
          <li><button class="step lvl-${step.level}" data-n="${n++}">
            <span class="step-dot" aria-hidden="true"></span>
            <span class="step-name">${esc(step.name)}</span>
            <span class="step-lvl">${LEVELS[step.level].short}</span>
          </button></li>`).join('')}
        </ol>
      </section>`).join('');

    // Data layer
    $('#data-industry').textContent = ind.name.toLowerCase();
    $('#data-docs').innerHTML = ind.data.docs.map(d => `<li>${esc(d)}</li>`).join('');
    $('#data-questions').innerHTML = ind.data.questions.map(q => `<li>“${esc(q)}”</li>`).join('');
    setData(false);
  }

  $('#flow').addEventListener('click', e => {
    const b = e.target.closest('.step');
    if (b) openStep(+b.dataset.n);
  });
  $('#change-ind').addEventListener('click', () => {
    $('#finder').scrollIntoView({ behavior: 'smooth' });
    search.focus({ preventScroll: true });
  });

  /* ---------- Step breakdown dialog ---------- */
  function openStep(i) {
    const s = flat[i];
    const lvl = LEVELS[s.level];
    const body = s.level === 'human'
      ? `<p class="dlg-note">${esc(s.note)}</p>
         <p class="dlg-human">Some work should stay with people. We automate the admin around it so your team has more time for this.</p>`
      : `<div class="dlg-compare">
           <div class="dlg-today"><h4>Today</h4><p>${esc(s.today)}</p></div>
           <div class="dlg-ai"><h4>With AI</h4><p>${esc(s.ai)}</p></div>
         </div>
         <ol class="dlg-chain" aria-label="How it runs">
           <li><span>When</span>${esc(s.when)}</li>
           <li><span>AI does</span>${esc(s.ai.split('. ')[0].replace(/\.$/, ''))}</li>
           <li><span>You</span>${esc(s.you)}</li>
           <li><span>Result</span>${esc(s.result)}</li>
         </ol>
         <dl class="dlg-meta">
           <div><dt>Tools</dt><dd class="dlg-tools">${s.tools.map(t => `<span>${esc(t)}</span>`).join('')}</dd></div>
           <div><dt>Est. time saved</dt><dd class="dlg-saved">~${fmtMinutes(s.minutes)} <small>per ${esc(s.per)}</small></dd></div>
           <div><dt>Setup</dt><dd>${EFFORT[s.effort]}</dd></div>
         </dl>`;
    $('#dlg-content').innerHTML = `
      <p class="dlg-tag"><span class="lvl-pill lvl-${s.level}">${lvl.label}</span> Stage ${s.stage + 1} · ${esc(STAGES[s.stage])}</p>
      <h3 id="dlg-title">${esc(s.name)}</h3>
      ${body}`;
    $('#dlg-prev').disabled = i === 0;
    $('#dlg-next').disabled = i === flat.length - 1;
    $('#dlg-pos').textContent = `Step ${i + 1} of ${flat.length}`;
    dialog.dataset.n = i;
    document.querySelectorAll('#flow .step').forEach(b => b.classList.toggle('is-open', +b.dataset.n === i));
    if (!dialog.open) dialog.showModal();
  }
  $('#dlg-prev').addEventListener('click', () => openStep(+dialog.dataset.n - 1));
  $('#dlg-next').addEventListener('click', () => openStep(+dialog.dataset.n + 1));
  $('#dlg-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });   // click on backdrop
  dialog.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' && !$('#dlg-next').disabled) openStep(+dialog.dataset.n + 1);
    if (e.key === 'ArrowLeft' && !$('#dlg-prev').disabled) openStep(+dialog.dataset.n - 1);
  });
  dialog.addEventListener('close', () => {
    const b = document.querySelector(`#flow .step[data-n="${dialog.dataset.n}"]`);
    document.querySelectorAll('#flow .step').forEach(x => x.classList.remove('is-open'));
    if (b) b.focus();
  });

  /* ---------- Data layer toggle ---------- */
  const dataBtn = $('#data-toggle');
  function setData(open) {
    dataBtn.setAttribute('aria-expanded', open);
    $('#data-panel').hidden = !open;
  }
  dataBtn.addEventListener('click', () => setData(dataBtn.getAttribute('aria-expanded') !== 'true'));

  /* ---------- Open the industry in the link, e.g. /explorer/#dental ---------- */
  function fromHash() {
    const id = location.hash.slice(1);
    if (INDUSTRIES.some(i => i.id === id)) select(id, true);
  }
  window.addEventListener('hashchange', fromHash);
  fromHash();
})();
