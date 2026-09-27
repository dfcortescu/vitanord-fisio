/* ==========================================================================
   VitaNord: application runtime
   Loaded on every page. Depends on: i18n.js, content.js, icons.js
   No build step, no framework, no external requests.
   ========================================================================== */
(function () {
  'use strict';

  var C   = window.VN_CONTENT;
  var T   = window.VN_I18N;
  var LANGS = window.VN_LANGS;
  var DAYS  = ['sun','mon','tue','wed','thu','fri','sat'];
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------ storage --
     Wrapped so the site still works where storage is blocked or full. */
  var mem = {};
  var store = {
    get: function (k) { try { var v = localStorage.getItem(k); return v === null ? (k in mem ? mem[k] : null) : v; } catch (e) { return k in mem ? mem[k] : null; } },
    set: function (k, v) { mem[k] = v; try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ------------------------------------------------------------ consent -- */
  var CONSENT_KEY = 'vn.consent.v1';
  var consent = (function () {
    try { return JSON.parse(store.get(CONSENT_KEY)) || null; } catch (e) { return null; }
  })();
  function saveConsent(o) {
    consent = { essential: true, analytics: !!o.analytics, maps: !!o.maps, ts: Date.now() };
    store.set(CONSENT_KEY, JSON.stringify(consent));
    document.dispatchEvent(new CustomEvent('vn:consent', { detail: consent }));
  }
  window.VN = window.VN || {};
  window.VN.consent = function () { return consent; };
  window.VN.openCookieSettings = function () { showCookieBanner(true); };

  /* --------------------------------------------------------------- i18n -- */
  var LANG_KEY = 'vn.lang';
  var codes = LANGS.map(function (l) { return l.code; });

  function detectLang() {
    var saved = store.get(LANG_KEY);
    if (saved && codes.indexOf(saved) > -1) return saved;
    var q = new URLSearchParams(location.search).get('lang');
    if (q && codes.indexOf(q) > -1) return q;
    var navLangs = navigator.languages || [navigator.language || ''];
    for (var i = 0; i < navLangs.length; i++) {
      var base = String(navLangs[i]).toLowerCase().split('-')[0];
      if (base === 'nb' || base === 'nn') base = 'no';
      if (codes.indexOf(base) > -1) return base;
    }
    return window.VN_DEFAULT_LANG;
  }

  var lang = detectLang();
  window.VN.lang = function () { return lang; };

  function t(key) {
    var d = T[lang] || T[window.VN_DEFAULT_LANG];
    if (d && d[key] != null) return d[key];
    var f = T[window.VN_DEFAULT_LANG];
    return (f && f[key] != null) ? f[key] : key;
  }
  window.VN.t = t;

  /* Resolve "collection.id.field" from content.js in the current language. */
  function contentAt(path) {
    var p = String(path).split('.');
    var coll = C[p[0]];
    if (!coll) return '';
    if (p[0] === 'clinic') return C.clinic[p[1]] || '';
    var id = p[1], field = p[2];
    var item = null;
    for (var i = 0; i < coll.length; i++) {
      if (coll[i].slug === id || coll[i].id === id) { item = coll[i]; break; }
    }
    if (!item) return '';
    var loc = item[lang] || item[window.VN_DEFAULT_LANG] || {};
    return (loc[field] != null) ? loc[field] : (item[field] != null ? item[field] : '');
  }
  window.VN.content = contentAt;

  /* Localised block of a content item, with fallback. */
  function L(item) { return item[lang] || item[window.VN_DEFAULT_LANG] || {}; }

  function applyI18n(root) {
    root = root || document;
    root.querySelectorAll('[data-i18n]').forEach(function (el) {
      var v = t(el.getAttribute('data-i18n'));
      if (el.dataset.i18nHtml !== undefined) el.innerHTML = v; else el.textContent = v;
    });
    root.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      // format: "aria-label:nav.menu|title:cta.book"
      el.getAttribute('data-i18n-attr').split('|').forEach(function (pair) {
        var bits = pair.split(':');
        if (bits.length === 2) el.setAttribute(bits[0].trim(), t(bits[1].trim()));
      });
    });
    root.querySelectorAll('[data-c]').forEach(function (el) {
      el.textContent = contentAt(el.getAttribute('data-c'));
    });
    root.querySelectorAll('[data-c-html]').forEach(function (el) {
      el.innerHTML = esc(contentAt(el.getAttribute('data-c-html'))).replace(/\n/g, '<br>');
    });
    root.querySelectorAll('[data-c-list]').forEach(function (el) {
      var arr = contentAt(el.getAttribute('data-c-list'));
      if (!Array.isArray(arr)) return;
      el.innerHTML = arr.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('');
    });
    document.dispatchEvent(new CustomEvent('vn:lang', { detail: { lang: lang } }));
  }

  function setLang(code, persist) {
    if (codes.indexOf(code) < 0) return;
    lang = code;
    if (persist !== false) store.set(LANG_KEY, code);
    var meta = LANGS.filter(function (l) { return l.code === code; })[0];
    document.documentElement.lang = meta ? meta.htmlLang : code;
    renderAll();
    applyI18n();
    applyLangBlocks();
    syncLangUI();
    updateDynamicMeta();
  }
  window.VN.setLang = setLang;

  /* Long-form legal pages ship all languages in the HTML; show one. */
  function applyLangBlocks() {
    var blocks = document.querySelectorAll('[data-lang-block]');
    if (!blocks.length) return;
    var found = false;
    blocks.forEach(function (el) {
      var on = el.getAttribute('data-lang-block') === lang;
      el.hidden = !on;
      if (on) found = true;
    });
    if (!found) blocks.forEach(function (el) {
      el.hidden = el.getAttribute('data-lang-block') !== window.VN_DEFAULT_LANG;
    });
  }

  function syncLangUI() {
    var meta = LANGS.filter(function (l) { return l.code === lang; })[0] || LANGS[0];
    document.querySelectorAll('[data-lang-current]').forEach(function (el) { el.textContent = meta.short; });
    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.setAttribute('aria-current', b.getAttribute('data-set-lang') === lang ? 'true' : 'false');
    });
  }

  /* Keep <title>/description honest when the visitor switches language on
     an already-loaded page (the served HTML is the English/default version). */
  function updateDynamicMeta() {
    var el = document.querySelector('[data-page-title]');
    if (el) document.title = el.getAttribute('data-page-title-' + lang) || document.title;
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  window.VN.esc = esc;

  /* ------------------------------------------------------ dynamic lists -- */
  function pub(list) { return list.filter(function (x) { return x.published !== false; }); }

  function renderServices(host) {
    var limit = parseInt(host.getAttribute('data-limit') || '0', 10);
    var items = pub(C.services);
    if (limit) items = items.slice(0, limit);
    host.innerHTML = items.map(function (s) {
      return '<a class="card" href="' + rel('treatments/' + s.slug + '.html') + '">' +
        '<span class="card-icon">' + window.vnIcon(s.icon) + '</span>' +
        '<h3 data-c="services.' + s.slug + '.title">' + esc(L(s).title) + '</h3>' +
        '<p data-c="services.' + s.slug + '.text">' + esc(L(s).text) + '</p>' +
        '<span class="link-arrow"><span data-i18n="cta.learnMore">' + esc(t('cta.learnMore')) + '</span>' + window.vnIcon('arrow') + '</span>' +
        '</a>';
    }).join('');
  }

  function renderTreatments(host) {
    var items = pub(C.treatments);
    host.innerHTML = items.map(function (x) {
      return '<a class="card t-card" href="' + rel('treatments/' + x.slug + '.html') + '">' +
        '<span class="card-icon">' + window.vnIcon(x.icon) + '</span>' +
        '<span><h3 data-c="treatments.' + x.slug + '.title">' + esc(L(x).title) + '</h3>' +
        '<p data-c="treatments.' + x.slug + '.summary">' + esc(L(x).summary) + '</p>' +
        '<span class="t-meta"><span class="badge badge-line">' + window.vnIcon('clock') + ' ' + x.duration + ' <span data-i18n="treatment.minutes">' + esc(t('treatment.minutes')) + '</span></span></span>' +
        '<span class="link-arrow" style="margin-top:16px"><span data-i18n="cta.learnMore">' + esc(t('cta.learnMore')) + '</span>' + window.vnIcon('arrow') + '</span></span>' +
        '</a>';
    }).join('');
  }

  function initials(name) {
    return name.split(/\s+/).map(function (w) { return w.charAt(0); }).join('').slice(0, 2).toUpperCase();
  }

  function renderTeam(host) {
    host.innerHTML = pub(C.team).map(function (p) {
      var photo = p.photo
        ? '<img src="' + rel('assets/img/' + p.photo) + '" alt="' + esc(p.name) + '" loading="lazy" width="480" height="600">'
        : '<span class="initials" aria-hidden="true">' + esc(initials(p.name)) + '</span><span class="pending" data-i18n="about.photoPending">' + esc(t('about.photoPending')) + '</span>';
      /* A credential is either a plain string or {en:…, es:…} per language. */
      var pick = function (v) {
        if (v && typeof v === 'object') return v[lang] || v[window.VN_DEFAULT_LANG] || '';
        return v || '';
      };
      var chip = function (v) {
        var txt = pick(v);
        if (!txt) return '';
        return '<span class="chip' + (/^\[/.test(txt) ? ' chip-todo' : '') + '">' + esc(txt) + '</span>';
      };
      var creds = (p.credentials || []).map(chip).join('');
      var regs = chip(p.registration);
      var langs = (p.languages || []).map(function (c) {
        var todo = /^\[/.test(c);
        var label = (!todo && c.length === 2) ? t('lang.' + c) : c;
        if (label === 'lang.' + c) label = c.toUpperCase();
        return '<span class="chip' + (todo ? ' chip-todo' : '') + '">' + esc(label) + '</span>';
      }).join('');
      return '<article class="card team-card">' +
        '<span class="team-photo">' + photo + '</span>' +
        '<h3>' + esc(p.name) + '</h3>' +
        '<p class="team-role" data-c="team.' + p.id + '.role">' + esc(L(p).role) + '</p>' +
        '<p data-c="team.' + p.id + '.bio">' + esc(L(p).bio) + '</p>' +
        '<p class="small muted" style="margin:18px 0 4px" data-i18n="about.team.credentials">' + esc(t('about.team.credentials')) + '</p>' +
        '<div class="team-tags">' + creds + regs + '</div>' +
        '<p class="small muted" style="margin:6px 0 4px" data-i18n="about.team.languages">' + esc(t('about.team.languages')) + '</p>' +
        '<div class="team-tags">' + langs + '</div>' +
        '<a class="btn btn-outline btn-sm" href="' + rel('booking.html') + '?therapist=' + p.id + '">' +
        '<span><span data-i18n="about.team.bookWith">' + esc(t('about.team.bookWith')) + '</span> ' + esc(p.name.split(' ')[0]) + '</span></a>' +
        '</article>';
    }).join('');
  }

  function renderPrices(host) {
    host.innerHTML = C.prices.map(function (p) {
      return '<article class="card price-card' + (p.featured ? ' is-featured' : '') + '">' +
        '<span class="badge-slot">' +
          (p.featured ? '<span class="badge" data-i18n="prices.popular">' + esc(t('prices.popular')) + '</span>' : '') +
        '</span>' +
        '<h3 data-c="prices.' + p.id + '.title">' + esc(L(p).title) + '</h3>' +
        '<p class="amount">' + esc(p.price) + (p.duration ? '<small>/ ' + p.duration + ' <span data-i18n="prices.duration">' + esc(t('prices.duration')) + '</span></small>' : '') + '</p>' +
        '<p data-c="prices.' + p.id + '.note">' + esc(L(p).note) + '</p>' +
        '<a class="btn btn-primary btn-sm btn-block" href="' + rel('booking.html') + '"><span data-i18n="prices.book">' + esc(t('prices.book')) + '</span>' + window.vnIcon('arrow', 'arrow') + '</a>' +
        '</article>';
    }).join('');
  }

  function renderTreatmentLinks(host) {
    var exclude = host.getAttribute('data-exclude');
    var items = pub(C.treatments).filter(function (x) { return x.slug !== exclude; });
    var limit = parseInt(host.getAttribute('data-limit') || '0', 10);
    if (limit) items = items.slice(0, limit);
    host.innerHTML = items.map(function (x) {
      return '<li><a href="' + rel('treatments/' + x.slug + '.html') + '" data-c="treatments.' + x.slug + '.title">' + esc(L(x).title) + '</a></li>';
    }).join('');
  }

  function renderRelated(host) {
    var exclude = host.getAttribute('data-exclude');
    var items = pub(C.treatments).filter(function (x) { return x.slug !== exclude; }).slice(0, 3);
    host.innerHTML = items.map(function (x) {
      return '<a class="card" href="' + rel('treatments/' + x.slug + '.html') + '">' +
        '<span class="card-icon">' + window.vnIcon(x.icon) + '</span>' +
        '<h3 data-c="treatments.' + x.slug + '.title">' + esc(L(x).title) + '</h3>' +
        '<p data-c="treatments.' + x.slug + '.summary">' + esc(L(x).summary) + '</p>' +
        '</a>';
    }).join('');
  }

  /* Root-relative path helper: pages inside /treatments/ need "../" */
  function rel(p) { return (document.documentElement.getAttribute('data-root') || '') + p; }
  window.VN.rel = rel;

  function renderAll() {
    var map = {
      services: renderServices, treatments: renderTreatments, team: renderTeam,
      prices: renderPrices, 'treatment-links': renderTreatmentLinks, related: renderRelated,
      hours: renderHours, contact: renderContactBlocks
    };
    document.querySelectorAll('[data-render]').forEach(function (host) {
      var fn = map[host.getAttribute('data-render')];
      if (fn) fn(host);
    });
    revealScan();
  }

  /* ------------------------------------------------------- opening hours -- */
  function renderHours(host) {
    var todayIdx = new Date().getDay();
    host.innerHTML = '<table class="hours-table"><tbody>' + C.clinic.hours.map(function (h) {
      var isToday = DAYS[todayIdx] === h.day;
      var val = h.open ? h.open + ' - ' + h.close
                       : t(h.byAppointment ? 'hours.byAppointment' : 'hours.closed');
      return '<tr class="' + (isToday ? 'is-today' : '') + '"><td>' + esc(t('hours.' + h.day)) + '</td><td>' + esc(val) + '</td></tr>';
    }).join('') + '</tbody></table>';
    if (C.clinic.hours.some(function (h) { return h.byAppointment; })) {
      host.innerHTML += '<p class="small muted" style="margin-top:10px">' + esc(t('hours.weekendNote')) + '</p>';
    }
  }

  function isOpenNow() {
    var now = new Date();
    var row = C.clinic.hours.filter(function (h) { return h.day === DAYS[now.getDay()]; })[0];
    if (!row || !row.open) return false;
    var mins = now.getHours() * 60 + now.getMinutes();
    function toMin(s) { var b = s.split(':'); return (+b[0]) * 60 + (+b[1]); }
    return mins >= toMin(row.open) && mins < toMin(row.close);
  }

  /* "English and Spanish spoken" built from clinic.spokenLanguages, so the
     promise on the homepage can never drift from who actually works here. */
  function renderLanguages() {
    var codes = C.clinic.spokenLanguages || [];
    var names = codes.map(function (c) { return t('lang.' + c); });
    var joined = names.length < 2 ? (names[0] || '')
               : names.slice(0, -1).join(', ') + ' ' + t('lang.and') + ' ' + names[names.length - 1];
    document.querySelectorAll('[data-langs]').forEach(function (el) {
      el.textContent = t('hero.point2tpl').replace('{langs}', joined);
    });
    document.querySelectorAll('[data-lang-count]').forEach(function (el) {
      el.textContent = codes.length;
    });
  }

  function renderTeamStat() {
    var n = pub(C.team).length;
    document.querySelectorAll('[data-team-count]').forEach(function (el) { el.textContent = n; });
    document.querySelectorAll('[data-team-label]').forEach(function (el) {
      el.textContent = t(n === 1 ? 'stats.3one' : 'stats.3');
    });
  }

  function renderOpenPills() {
    document.querySelectorAll('[data-open-pill]').forEach(function (el) {
      var open = isOpenNow();
      el.className = 'open-pill ' + (open ? 'open' : 'closed');
      el.innerHTML = '<i></i>' + esc(t(open ? 'hours.openNow' : 'hours.closedNow'));
    });
  }

  /* ---------------------------------------------------- contact details -- */
  function renderContactBlocks(host) {
    var cl = C.clinic;
    var addr = cl.street + ', ' + cl.postalCode + ' ' + cl.city + ', ' + cl.region + ', ' + cl.country;
    var rows = [
      { ic: 'pin',   k: 'contact.address', v: '<address>' + esc(cl.street) + '<br>' + esc(cl.postalCode + ' ' + cl.city) + ', ' + esc(cl.region) + '<br>' + esc(cl.country) + '</address>' },
      { ic: 'mail',  k: 'contact.emailLabel', v: '<p><a href="mailto:' + esc(cl.email) + '">' + esc(cl.email) + '</a></p>' },
      { ic: 'phone', k: 'contact.phoneLabel', v: '<p><a href="tel:' + esc(cl.phoneHref) + '">' + esc(cl.phone) + '</a></p>' }
    ];
    host.innerHTML = rows.map(function (r) {
      return '<div class="info-block"><span class="i-ic">' + window.vnIcon(r.ic) + '</span>' +
        '<div><h4 data-i18n="' + r.k + '">' + esc(t(r.k)) + '</h4>' + r.v + '</div></div>';
    }).join('');
    host.setAttribute('data-address', addr);
  }

  function fillClinicData() {
    var cl = C.clinic;
    var q = encodeURIComponent(cl.street + ', ' + cl.postalCode + ' ' + cl.city + ', ' + cl.region + ', ' + cl.country);
    document.querySelectorAll('[data-clinic]').forEach(function (el) {
      var key = el.getAttribute('data-clinic');
      var val = key === 'address'
        ? cl.street + ', ' + cl.postalCode + ' ' + cl.city + ', ' + cl.region + ', ' + cl.country
        : cl[key];
      if (val != null) el.textContent = val;
    });
    document.querySelectorAll('[data-href-mail]').forEach(function (a) { a.href = 'mailto:' + cl.email; });
    document.querySelectorAll('[data-href-tel]').forEach(function (a) { a.href = 'tel:' + cl.phoneHref; });
    document.querySelectorAll('[data-href-directions]').forEach(function (a) {
      a.href = 'https://www.google.com/maps/dir/?api=1&destination=' + q;
    });
    document.querySelectorAll('[data-href-maps]').forEach(function (a) { a.href = cl.mapsShortLink; });
    document.querySelectorAll('[data-whatsapp]').forEach(function (a) {
      if (cl.whatsappEnabled && cl.whatsapp) { a.href = 'https://wa.me/' + cl.whatsapp; a.hidden = false; }
      else { a.hidden = true; }
    });
    document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* ---------------------------------------------------------- reveals ---- */
  var io = null;
  function revealScan() {
    if (reduced) {
      document.querySelectorAll('[data-reveal],[data-stagger]').forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    if (!io) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var el = e.target;
          var delay = parseFloat(el.getAttribute('data-delay') || '0');
          if (el.hasAttribute('data-stagger')) {
            var step = parseFloat(el.getAttribute('data-stagger')) || 90;
            Array.prototype.forEach.call(el.children, function (c, i) {
              c.style.transitionDelay = (delay + i * step) + 'ms';
            });
          } else if (delay) { el.style.transitionDelay = delay + 'ms'; }
          el.classList.add('is-in');
          io.unobserve(el);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    }
    document.querySelectorAll('[data-reveal]:not(.is-in),[data-stagger]:not(.is-in)').forEach(function (el) { io.observe(el); });
  }

  /* --------------------------------------------------------- parallax ---- */
  function initParallax() {
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
    if (!els.length || reduced || window.innerWidth < 780) return;
    var ticking = false;
    function frame() {
      var y = window.pageYOffset;
      els.forEach(function (el) {
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.12;
        var rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;
        el.style.transform = 'translate3d(0,' + (-(y - (el.offsetTop || 0)) * speed).toFixed(2) + 'px,0)';
      });
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(frame); }
    }, { passive: true });
    frame();
  }

  /* -------------------------------------------------------------- nav ---- */
  function initNav() {
    var nav = document.querySelector('.nav');
    var burger = document.querySelector('.burger');
    var panel = document.querySelector('.mobile-panel');

    if (nav) {
      var onScroll = function () { nav.classList.toggle('is-stuck', window.pageYOffset > 24); };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
    if (burger && panel) {
      burger.addEventListener('click', function () {
        var open = document.body.classList.toggle('menu-open');
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
        panel.setAttribute('aria-hidden', open ? 'false' : 'true');
      });
      panel.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          document.body.classList.remove('menu-open');
          burger.setAttribute('aria-expanded', 'false');
        });
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      document.body.classList.remove('menu-open');
      if (burger) burger.setAttribute('aria-expanded', 'false');
      document.querySelectorAll('.lang[data-open="true"]').forEach(function (l) { l.setAttribute('data-open', 'false'); });
    });

    // language dropdown
    document.querySelectorAll('.lang').forEach(function (wrap) {
      var btn = wrap.querySelector('.lang-toggle');
      if (!btn) return;
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = wrap.getAttribute('data-open') === 'true';
        wrap.setAttribute('data-open', open ? 'false' : 'true');
        btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      });
    });
    document.addEventListener('click', function () {
      document.querySelectorAll('.lang[data-open="true"]').forEach(function (l) {
        l.setAttribute('data-open', 'false');
        var b = l.querySelector('.lang-toggle'); if (b) b.setAttribute('aria-expanded', 'false');
      });
    });
    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.addEventListener('click', function () {
        setLang(b.getAttribute('data-set-lang'));
        document.body.classList.remove('menu-open');
      });
    });

    // floating book button on mobile
    var fab = document.querySelector('.fab');
    if (fab) {
      document.body.classList.add('has-fab');
      var toggleFab = function () { fab.classList.toggle('is-visible', window.pageYOffset > 520); };
      window.addEventListener('scroll', toggleFab, { passive: true });
      toggleFab();
    }
  }

  /* --------------------------------------------- smooth page transitions -- */
  function initTransitions() {
    if (reduced) return;
    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a') : null;
      if (!a || !a.getAttribute('href')) return;
      var href = a.getAttribute('href');
      if (a.target === '_blank' || a.hasAttribute('download')) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      if (href.charAt(0) === '#' || /^(mailto:|tel:|javascript:)/i.test(href)) return;
      var url;
      try { url = new URL(a.href, location.href); } catch (err) { return; }
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname && url.hash) return;
      e.preventDefault();
      document.body.classList.add('is-leaving');
      setTimeout(function () { location.href = url.href; }, 235);
    });
    window.addEventListener('pageshow', function () { document.body.classList.remove('is-leaving'); });
  }

  /* ------------------------------------------------------- accordions ---- */
  function initAccordions() {
    document.querySelectorAll('.acc-btn').forEach(function (btn) {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (!panel) return;
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', open ? 'false' : 'true');
        panel.style.height = open ? '0px' : panel.firstElementChild.offsetHeight + 'px';
      });
    });
  }

  /* -------------------------------------------------------------- map ---- */
  function initMap() {
    document.querySelectorAll('[data-map]').forEach(function (frame) {
      var cl = C.clinic;
      var q = encodeURIComponent(cl.name + ', ' + cl.street + ', ' + cl.postalCode + ' ' + cl.city + ', ' + cl.country);
      var src = 'https://www.google.com/maps?q=' + q + '&z=16&hl=' + lang + '&output=embed';
      function load() {
        if (frame.querySelector('iframe')) return;
        var box = frame.querySelector('.map-consent');
        if (box) box.remove();
        var f = document.createElement('iframe');
        f.src = src; f.loading = 'lazy'; f.title = t('map.title');
        f.referrerPolicy = 'no-referrer-when-downgrade';
        f.setAttribute('allowfullscreen', '');
        frame.appendChild(f);
      }
      if (consent && consent.maps) { load(); return; }
      var btn = frame.querySelector('[data-map-accept]');
      if (btn) btn.addEventListener('click', function () {
        saveConsent({ analytics: consent ? consent.analytics : false, maps: true });
        load();
      });
      document.addEventListener('vn:consent', function () { if (consent && consent.maps) load(); });
    });
  }

  /* ---------------------------------------------------- cookie banner ---- */
  function showCookieBanner(expanded) {
    var el = document.querySelector('.cookie');
    if (!el) return;
    el.hidden = false;
    if (expanded) el.classList.add('is-expanded');
    requestAnimationFrame(function () { el.classList.add('is-visible'); });
  }
  function hideCookieBanner() {
    var el = document.querySelector('.cookie');
    if (!el) return;
    el.classList.remove('is-visible');
    setTimeout(function () { el.hidden = true; el.classList.remove('is-expanded'); }, 500);
  }
  function initCookies() {
    var el = document.querySelector('.cookie');
    if (!el) return;
    var cbA = el.querySelector('#ck-analytics');
    var cbM = el.querySelector('#ck-maps');
    if (consent) { if (cbA) cbA.checked = !!consent.analytics; if (cbM) cbM.checked = !!consent.maps; }
    el.querySelectorAll('[data-cookie]').forEach(function (b) {
      b.addEventListener('click', function () {
        var act = b.getAttribute('data-cookie');
        if (act === 'accept') saveConsent({ analytics: true, maps: true });
        else if (act === 'reject') saveConsent({ analytics: false, maps: false });
        else if (act === 'settings') { el.classList.toggle('is-expanded'); return; }
        else if (act === 'save') saveConsent({ analytics: cbA && cbA.checked, maps: cbM && cbM.checked });
        hideCookieBanner();
      });
    });
    document.querySelectorAll('[data-open-cookies]').forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); showCookieBanner(true); });
    });
    if (!consent) setTimeout(function () { showCookieBanner(false); }, 900);
  }

  /* ------------------------------------------------------- contact form -- */
  function initContactForm() {
    var form = document.querySelector('[data-contact-form]');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.querySelector('.honey') && form.querySelector('.honey').value) return; // bot
      var ok = true;
      form.querySelectorAll('[required]').forEach(function (f) {
        var bad = !f.value.trim() || (f.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(f.value));
        f.closest('.field').classList.toggle('has-error', bad);
        if (bad) ok = false;
      });
      var box = form.querySelector('[data-form-msg]');
      if (!ok) return;
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      var old = btn.textContent;
      btn.textContent = t('contact.form.sending');
      /* ------------------------------------------------------------------
         CONNECT YOUR BACKEND HERE.
         Replace this timeout with a fetch() to your form endpoint, e.g.
         Formspree, Netlify Forms, EmailJS or your own /api/contact.
         ------------------------------------------------------------------ */
      setTimeout(function () {
        btn.disabled = false; btn.textContent = old;
        box.className = 'alert alert-ok';
        box.textContent = t('contact.form.sent');
        box.hidden = false;
        form.reset();
        box.scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' });
      }, 750);
    });
    form.querySelectorAll('input,textarea').forEach(function (f) {
      f.addEventListener('input', function () { f.closest('.field').classList.remove('has-error'); });
    });
  }

  /* ------------------------------------------------------------- boot ---- */
  function boot() {
    var meta = LANGS.filter(function (l) { return l.code === lang; })[0];
    document.documentElement.lang = meta ? meta.htmlLang : lang;
    fillClinicData();
    renderAll();
    applyI18n();
    applyLangBlocks();
    syncLangUI();
    renderOpenPills();
    renderTeamStat();
    renderLanguages();
    initNav();
    initAccordions();
    initMap();
    initCookies();
    initContactForm();
    initParallax();
    initTransitions();
    document.addEventListener('vn:lang', function () { renderOpenPills(); renderTeamStat(); renderLanguages(); fillClinicData(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
