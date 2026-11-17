/* Artemida Group: site.js
   Analityka: wpisz identyfikatory, a baner zgody włączy się sam.
   GA_ID np. "G-XXXXXXXXXX", PIXEL_ID np. "123456789012345". Puste = narzędzie wyłączone. */
const GA_ID = '';
const PIXEL_ID = '';

(() => {
  const L = JSON.parse(document.getElementById('l10n').textContent);
  const KEY = 'artemida_consent';
  const store = {
    get() {
      try {
        const c = JSON.parse(localStorage.getItem(KEY));
        // zgoda ważna 12 miesięcy (zgodnie z polityką cookies), potem pytamy ponownie
        if (!c || c.version !== 1 || Date.now() - Date.parse(c.date) > 365 * 864e5) return null;
        return c;
      } catch { return null; }
    },
    set(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch {} }
  };

  /* Nagłówek: znika przy przewijaniu w dół, wraca przy przewijaniu w górę */
  const top = document.querySelector('.top');
  const root = document.documentElement;
  let lastY = window.scrollY, ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    top.classList.toggle('is-solid', y > 24);
    if (!root.classList.contains('menu-open')) {
      if (y > lastY + 6 && y > 200) top.classList.add('is-hidden');
      else if (y < lastY - 6 || y <= 200) top.classList.remove('is-hidden');
    }
    lastY = y; ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  top.addEventListener('focusin', () => top.classList.remove('is-hidden'));
  onScroll();

  /* Podmenu usług: Escape zamyka i wraca do przycisku */
  document.querySelectorAll('.nav__item--sub').forEach(li => {
    li.addEventListener('keydown', e => {
      if (e.key === 'Escape') { li.classList.add('is-closed'); li.querySelector('.nav__link').focus(); }
    });
    li.addEventListener('mouseleave', () => li.classList.remove('is-closed'));
    li.addEventListener('focusout', e => { if (!li.contains(e.relatedTarget)) li.classList.remove('is-closed'); });
  });

  /* Menu mobilne */
  const burger = document.querySelector('.burger'), mnav = document.getElementById('mnav');
  if (burger && mnav) {
    const label = burger.querySelector('.sr-only');
    const outside = [document.getElementById('main'), document.querySelector('.foot')];
    const setOpen = (open, refocus) => {
      mnav.classList.toggle('is-open', open);
      root.classList.toggle('menu-open', open);
      burger.setAttribute('aria-expanded', String(open));
      label.textContent = open ? L.close : L.menu;
      outside.forEach(el => { if (el) el.inert = open; });
      if (open) {
        top.classList.remove('is-hidden');
        setTimeout(() => { const a = mnav.querySelector('a'); if (a) a.focus({ preventScroll: true }); }, 280);
      } else if (refocus) burger.focus();
    };
    burger.addEventListener('click', () => setOpen(!mnav.classList.contains('is-open'), true));
    mnav.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && mnav.classList.contains('is-open')) setOpen(false, true); });
    matchMedia('(min-width: 981px)').addEventListener('change', m => { if (m.matches) setOpen(false); });
  }

  /* Zgoda na cookies */
  let gaOn = false, pxOn = false;
  const load = src => { const s = document.createElement('script'); s.async = true; s.src = src; document.head.appendChild(s); };
  function apply(c) {
    if (!c) return;
    if (GA_ID && c.analytics && !gaOn) {
      gaOn = true;
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { dataLayer.push(arguments); };
      gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' });
      gtag('consent', 'update', { analytics_storage: 'granted' });
      gtag('js', new Date());
      gtag('config', GA_ID, { anonymize_ip: true });
      load('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID));
    }
    if (PIXEL_ID && c.marketing && !pxOn) {
      pxOn = true;
      const f = function () { f.callMethod ? f.callMethod.apply(f, arguments) : f.queue.push(arguments); };
      f.queue = []; f.loaded = true; f.version = '2.0'; f.push = f;
      window.fbq = window._fbq = f;
      load('https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', PIXEL_ID); fbq('track', 'PageView');
    }
  }
  function wipe() {
    const hosts = ['', location.hostname, '.' + location.hostname.replace(/^www\./, '')];
    document.cookie.split(';').forEach(c => {
      const n = c.split('=')[0].trim();
      if (/^(_ga|_gid|_gat|_fbp|_fbc)/.test(n)) hosts.forEach(h => { document.cookie = `${n}=; Max-Age=0; path=/${h ? '; domain=' + h : ''}`; });
    });
  }

  const box = document.getElementById('consent');
  if (box) {
    const tools = !!(GA_ID || PIXEL_ID);
    const ca = document.getElementById('c-analytics'), cm = document.getElementById('c-marketing');
    box.querySelector('[data-row="analytics"]').hidden = !GA_ID;
    box.querySelector('[data-row="marketing"]').hidden = !PIXEL_ID;
    box.querySelector('.consent__text').hidden = !tools;
    box.querySelector('.consent__none').hidden = tools;
    box.querySelectorAll('[data-tools]').forEach(el => { el.hidden = !tools; });
    const open = () => {
      const c = store.get();
      ca.checked = !!(c && c.analytics); cm.checked = !!(c && c.marketing);
      box.hidden = false;
      box.querySelector('button').focus({ preventScroll: true });
    };
    const save = (a, m) => {
      const prev = store.get();
      store.set({ version: 1, analytics: !!a, marketing: !!m, date: new Date().toISOString() });
      box.hidden = true;
      if ((prev && prev.analytics && !a) || (prev && prev.marketing && !m)) { wipe(); location.reload(); return; }
      apply(store.get());
    };
    box.addEventListener('click', e => {
      const act = e.target.closest('[data-act]');
      if (!act) return;
      const a = act.dataset.act;
      if (a === 'all') save(!!GA_ID, !!PIXEL_ID);
      else if (a === 'none') save(false, false);
      else if (a === 'save') save(ca.checked, cm.checked);
      else box.hidden = true;
    });
    document.querySelectorAll('[data-consent-open]').forEach(b => b.addEventListener('click', open));
    const c = store.get();
    if (c) apply(c); else if (tools) box.hidden = false;
  }

  /* Formularz */
  const form = document.getElementById('form');
  if (form) {
    const status = document.getElementById('form-status');
    const hf = document.getElementById('handle-field'), hl = document.getElementById('f-handle-label'), hi = document.getElementById('f-handle');
    form.addEventListener('change', e => {
      if (e.target.name !== 'channel') return;
      const v = e.target.value;
      hf.hidden = v === 'E-mail';
      hi.required = v !== 'E-mail';
      hl.textContent = v === 'Telegram' ? L.handleTg : v === 'Viber' ? L.handleVb : L.handleWa;
      hi.placeholder = v === 'Telegram' ? '@' : '+48';
    });
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const d = new FormData(form);
      if (d.get('company')) return;
      const bad = [...form.querySelectorAll('[required]')].find(el => !el.checkValidity());
      if (bad) {
        status.dataset.state = 'error';
        const label = form.querySelector(`label[for="${bad.id}"]`).textContent;
        status.textContent = bad.type === 'email' && bad.value ? L.badEmail : L.missing.replace('{f}', label);
        bad.focus();
        return;
      }
      const send = form.querySelector('[type=submit]');
      send.disabled = true; status.dataset.state = ''; status.textContent = L.sending;
      try {
        const r = await fetch('/api/applications', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'agency', name: d.get('name'), email: d.get('email'), website: d.get('website'),
            service: d.get('service'), messenger: d.get('channel'), handle: d.get('handle') || '',
            message: d.get('message'), language: document.documentElement.lang, pageUrl: location.href
          })
        });
        if (!r.ok) throw new Error();
        form.reset(); hf.hidden = true;
        status.textContent = L.sent;
        const c = store.get();
        if (c && c.analytics && window.gtag) gtag('event', 'generate_lead');
        if (c && c.marketing && window.fbq) fbq('track', 'Lead');
      } catch {
        status.dataset.state = 'error';
        status.textContent = L.failed;
      } finally { send.disabled = false; }
    });
  }

  /* Księżyc nad Katowicami: faza na dziś */
  const lit = document.getElementById('moon-lit'), txt = document.getElementById('moon-text');
  if (lit && txt) {
    const SYN = 29.530588853, ref = Date.UTC(2000, 0, 6, 18, 14);
    const age = (((Date.now() - ref) / 864e5) % SYN + SYN) % SYN;
    const k = (1 - Math.cos(2 * Math.PI * age / SYN)) / 2;
    const wax = age < SYN / 2;
    const edges = [1.85, 5.54, 9.23, 12.92, 16.61, 20.3, 23.99, 27.68, 99];
    const name = L.phases[edges.findIndex(x => age < x) % 8];
    const r = 11, c = 12, rx = r * Math.abs(1 - 2 * k);
    lit.setAttribute('d', `M${c} ${c - r} A${r} ${r} 0 0 ${wax ? 1 : 0} ${c} ${c + r} A${rx} ${r} 0 0 ${(k < .5) === wax ? 0 : 1} ${c} ${c - r}Z`);
    const pct = Math.round(k * 100);
    txt.textContent = L.moon.replace('{name}', name).replace('{pct}', pct) + (pct > 96 && L.full ? ' ' + L.full : '');
  }
})();
