/* ==========================================================================
   VitaNord: booking interface (frontend only)
   Talks exclusively to window.VN_BOOKING (see booking-provider.js).
   Swap the provider there; nothing in this file needs to change.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.querySelector('[data-booking]');
  if (!root) return;

  var P = window.VN_BOOKING;
  var t = window.VN.t, esc = window.VN.esc, icon = window.vnIcon;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var LOCALES = { en: 'en-GB', no: 'nb-NO', es: 'es-ES' };
  function locale() { return LOCALES[window.VN.lang()] || 'en-GB'; }

  var state = {
    step: 1, maxStep: 5,
    serviceId: null, serviceTitle: '', duration: null,
    therapistId: 'any', therapistName: '',
    date: null, time: null,
    services: [], therapists: [], days: [], slots: []
  };

  var els = {
    progress: root.querySelector('[data-progress]'),
    steps: Array.prototype.slice.call(root.querySelectorAll('.bk-step')),
    optService: root.querySelector('[data-opts="service"]'),
    optTherapist: root.querySelector('[data-opts="therapist"]'),
    dateStrip: root.querySelector('[data-date-strip]'),
    times: root.querySelector('[data-times]'),
    summary: root.querySelector('[data-summary]'),
    nav: root.querySelector('.bk-nav'),
    prev: root.querySelector('[data-bk-prev]'),
    next: root.querySelector('[data-bk-next]'),
    form: root.querySelector('[data-bk-form]'),
    result: root.querySelector('[data-bk-result]')
  };

  /* ------------------------------------------------------------- helpers -- */
  function fmtDate(isoStr, opts) {
    try { return new Intl.DateTimeFormat(locale(), opts || { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date(isoStr + 'T12:00:00')); }
    catch (e) { return isoStr; }
  }
  function show(n) {
    state.step = n;
    els.steps.forEach(function (s) { s.classList.toggle('is-active', +s.getAttribute('data-step') === n); });
    buildProgress();
    updateNav();
    if (!reduced && root.getBoundingClientRect().top < 0) {
      root.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    var h = root.querySelector('.bk-step.is-active h3');
    if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
  }
  var STEP_LABELS = { 1: 'booking.step1', 2: 'booking.step2', 3: 'booking.step3',
                      4: 'booking.step4', 5: 'booking.step5' };

  /* Patients don't pick a therapist — the clinic assigns whoever is
     available, so the "who would you like to see" step is always
     dropped from the flow and from the progress bar. */
  function visibleSteps() { return [1, 3, 4, 5]; }

  function assignAnyTherapist() {
    state.therapistId = 'any';
    state.therapistName = t('booking.anyTherapist');
  }

  function buildProgress() {
    if (!els.progress) return;
    els.progress.innerHTML = visibleSteps().map(function (n) {
      var cls = n < state.step ? 'is-done' : (n === state.step ? 'is-active' : '');
      return '<div class="progress-step ' + cls + '"><span class="bar"></span><span class="lbl">' + esc(t(STEP_LABELS[n])) + '</span></div>';
    }).join('');
  }
  function updateNav() {
    if (!els.nav) return;
    var last = state.step >= 6;
    els.nav.hidden = last;
    els.prev.hidden = state.step <= 1;
    els.next.hidden = state.step >= 5;
    els.next.disabled = !canAdvance();
  }
  function canAdvance() {
    if (state.step === 1) return !!state.serviceId;
    if (state.step === 2) return !!state.therapistId;
    if (state.step === 3) return !!(state.date && state.time);
    return true;
  }

  /* --------------------------------------------------------- step 1: svc -- */
  function loadServices() {
    return P.getServices().then(function (list) {
      state.services = list;
      els.optService.innerHTML = list.map(function (s) {
        return '<button type="button" class="opt" data-service="' + esc(s.id) + '" data-duration="' + s.duration + '" aria-pressed="false">' +
          '<span class="o-ic">' + icon(s.icon || 'hands') + '</span>' +
          '<span><strong>' + esc(s.title) + '</strong><span>' + s.duration + ' ' + esc(t('treatment.minutes')) + '</span></span></button>';
      }).join('');
      els.optService.querySelectorAll('[data-service]').forEach(function (b) {
        b.addEventListener('click', function () {
          select(els.optService, b);
          state.serviceId = b.getAttribute('data-service');
          state.duration = +b.getAttribute('data-duration');
          state.serviceTitle = b.querySelector('strong').textContent;
          state.date = null; state.time = null;
          updateNav();
        });
      });
    });
  }

  /* ----------------------------------------------------- step 2: person -- */
  function loadTherapists() {
    return P.getTherapists(state.serviceId).then(function (list) {
      state.therapists = list;
      var any = '<button type="button" class="opt is-selected" data-therapist="any" aria-pressed="true">' +
        '<span class="o-ic">' + icon('users') + '</span>' +
        '<span><strong>' + esc(t('booking.anyTherapist')) + '</strong><span>' + esc(t('booking.anyTherapistNote')) + '</span></span></button>';
      els.optTherapist.innerHTML = any + list.map(function (p) {
        var av = p.photo
          ? '<span class="avatar"><img src="' + window.VN.rel('assets/img/' + p.photo) + '" alt=""></span>'
          : '<span class="avatar">' + esc(p.name.split(/\s+/).map(function (w) { return w[0]; }).join('').slice(0, 2).toUpperCase()) + '</span>';
        return '<button type="button" class="opt" data-therapist="' + esc(p.id) + '" aria-pressed="false">' + av +
          '<span><strong>' + esc(p.name) + '</strong><span>' + esc(p.role) + '</span></span></button>';
      }).join('');
      state.therapistName = t('booking.anyTherapist');
      els.optTherapist.querySelectorAll('[data-therapist]').forEach(function (b) {
        b.addEventListener('click', function () {
          select(els.optTherapist, b);
          state.therapistId = b.getAttribute('data-therapist');
          state.therapistName = b.querySelector('strong').textContent;
          state.date = null; state.time = null;
          updateNav();
        });
      });
    });
  }

  function select(scope, btn) {
    scope.querySelectorAll('.opt').forEach(function (o) { o.setAttribute('aria-pressed', 'false'); o.classList.remove('is-selected'); });
    btn.setAttribute('aria-pressed', 'true'); btn.classList.add('is-selected');
  }

  /* ------------------------------------------------- step 3: date & time -- */
  function loadDays() {
    els.dateStrip.innerHTML = new Array(7).join('x').split('x').map(function () {
      return '<span class="day skeleton" style="height:86px;border:0"></span>';
    }).join('');
    return P.getDays({ serviceId: state.serviceId, therapistId: state.therapistId, days: window.VN_BOOKING_CONFIG.horizonDays })
      .then(function (days) {
        state.days = days;
        els.dateStrip.innerHTML = days.map(function (d) {
          var dt = new Date(d.date + 'T12:00:00');
          return '<button type="button" class="day" data-date="' + d.date + '" aria-pressed="false"' + (d.available ? '' : ' disabled') + '>' +
            '<span class="dow">' + esc(fmtDate(d.date, { weekday: 'short' })) + '</span>' +
            '<span class="num">' + dt.getDate() + '</span>' +
            '<span class="mon">' + esc(fmtDate(d.date, { month: 'short' })) + '</span>' +
            '<span class="dotmark"></span></button>';
        }).join('');
        els.dateStrip.querySelectorAll('[data-date]').forEach(function (b) {
          b.addEventListener('click', function () {
            els.dateStrip.querySelectorAll('.day').forEach(function (d) { d.setAttribute('aria-pressed', 'false'); });
            b.setAttribute('aria-pressed', 'true');
            state.date = b.getAttribute('data-date');
            state.time = null;
            loadSlots();
            updateNav();
          });
        });
        var first = els.dateStrip.querySelector('[data-date]:not([disabled])');
        if (first) first.click();
      });
  }

  function loadSlots() {
    els.times.innerHTML = '<div class="time-grid">' + new Array(9).join('x').split('x')
      .map(function () { return '<span class="skeleton"></span>'; }).join('') + '</div>';
    P.getSlots({ serviceId: state.serviceId, therapistId: state.therapistId, date: state.date }).then(function (slots) {
      state.slots = slots;
      if (!slots.length) {
        els.times.innerHTML = '<p class="muted">' + esc(t('booking.noSlots')) + '</p>';
        return;
      }
      var am = slots.filter(function (s) { return +s.split(':')[0] < 13; });
      var pm = slots.filter(function (s) { return +s.split(':')[0] >= 13; });
      function group(title, arr) {
        if (!arr.length) return '';
        return '<div class="time-group"><h4>' + esc(t(title)) + '</h4><div class="time-grid">' +
          arr.map(function (s) { return '<button type="button" class="slot" data-time="' + s + '" aria-pressed="false">' + s + '</button>'; }).join('') +
          '</div></div>';
      }
      els.times.innerHTML = group('booking.morning', am) + group('booking.afternoon', pm);
      els.times.querySelectorAll('[data-time]').forEach(function (b) {
        b.addEventListener('click', function () {
          els.times.querySelectorAll('.slot').forEach(function (s) { s.setAttribute('aria-pressed', 'false'); });
          b.setAttribute('aria-pressed', 'true');
          state.time = b.getAttribute('data-time');
          updateNav();
        });
      });
    }).catch(function () {
      els.times.innerHTML = '<p class="muted">' + esc(t('booking.noSlots')) + '</p>';
    });
  }

  /* ------------------------------------------------------- step 5: recap -- */
  function buildSummary() {
    var f = formValues();
    var rows = [
      [t('booking.step1'), state.serviceTitle, 1],
      [t('booking.step2'), state.therapistName, soloTherapist() ? 0 : 2],
      [t('booking.step3'), fmtDate(state.date) + ' · ' + state.time, 3],
      [t('booking.name'), f.name, 4],
      [t('booking.phone'), f.phone, 4],
      [t('booking.email'), f.email, 4]
    ];
    if (f.message) rows.push([t('booking.message'), f.message, 4]);
    els.summary.innerHTML = rows.map(function (r) {
      return '<div class="summary-row"><span class="k">' + esc(r[0]) + '</span>' +
        '<span class="v">' + esc(r[1]) +
        (r[2] ? ' <button type="button" data-goto="' + r[2] + '">' + esc(t('booking.change')) + '</button>' : '') +
        '</span></div>';
    }).join('');
    els.summary.querySelectorAll('[data-goto]').forEach(function (b) {
      b.addEventListener('click', function () { show(+b.getAttribute('data-goto')); });
    });
  }

  /* --------------------------------------------------------- validation -- */
  function formValues() {
    var g = function (n) { var el = els.form.querySelector('[name="' + n + '"]'); return el ? el.value.trim() : ''; };
    return { name: g('name'), phone: g('phone'), email: g('email'), message: g('message') };
  }
  function validateForm() {
    var ok = true;
    els.form.querySelectorAll('[required]').forEach(function (f) {
      var v = (f.type === 'checkbox') ? f.checked : f.value.trim();
      var bad = !v;
      if (!bad && f.type === 'email') bad = !/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(f.value);
      if (!bad && f.name === 'phone') bad = f.value.replace(/[^\d]/g, '').length < 6;
      var field = f.closest('.field') || f.closest('.check');
      if (field) field.classList.toggle('has-error', bad);
      if (bad && ok) { try { f.focus(); } catch (e) {} }
      if (bad) ok = false;
    });
    return ok;
  }

  /* ------------------------------------------------------------- submit -- */
  function submit() {
    var btn = root.querySelector('[data-bk-confirm]');
    var old = btn.textContent;
    btn.disabled = true; btn.textContent = t('booking.submitting');
    var f = formValues();
    var payload = {
      serviceId: state.serviceId, serviceTitle: state.serviceTitle, duration: state.duration,
      therapistId: state.therapistId, therapistName: state.therapistName,
      date: state.date, time: state.time,
      name: f.name, phone: f.phone, email: f.email, message: f.message,
      lang: window.VN.lang()
    };
    P.createBooking(payload).then(function (res) {
      if (!res || res.ok === false) throw new Error('rejected');
      renderResult(true, res, payload);
    }).catch(function () {
      renderResult(false);
    }).then(function () {
      btn.disabled = false; btn.textContent = old;
    });
  }

  function icsHref(p) {
    function stamp(d) { return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'; }
    var start = new Date(p.date + 'T' + p.time + ':00');
    var end = new Date(start.getTime() + (p.duration || 45) * 60000);
    var cl = window.VN_CONTENT.clinic;
    var lines = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//VitaNord//Booking//EN', 'BEGIN:VEVENT',
      'UID:' + Date.now() + '@vitanord.net',
      'DTSTAMP:' + stamp(new Date()), 'DTSTART:' + stamp(start), 'DTEND:' + stamp(end),
      'SUMMARY:' + p.serviceTitle + ', ' + cl.shortName,
      'LOCATION:' + cl.street + '\\, ' + cl.postalCode + ' ' + cl.city,
      'DESCRIPTION:' + (p.therapistName || '') + ' · ' + cl.email,
      'END:VEVENT', 'END:VCALENDAR'
    ];
    return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(lines.join('\r\n'));
  }

  function renderResult(ok, res, payload) {
    els.result.className = 'bk-step is-active result' + (ok ? '' : ' is-error');
    els.steps.forEach(function (s) { if (s !== els.result) s.classList.remove('is-active'); });
    state.step = 6; updateNav(); buildProgress();
    if (ok) {
      els.result.innerHTML =
        '<div class="r-ic">' + icon('checkCircle') + '</div>' +
        '<h3>' + esc(t('booking.success.title')) + '</h3>' +
        '<p class="lead" style="max-width:46ch;margin-inline:auto">' + esc(t('booking.success.text')) + '</p>' +
        (res.reference && res.reference !== '-'
          ? '<p class="small muted" style="margin-top:22px;margin-bottom:0">' + esc(t('booking.success.ref')) + '</p><p class="ref-code">' + esc(res.reference) + '</p>'
          : '<div style="height:20px"></div>') +
        '<div class="summary" style="max-width:440px;margin:0 auto 26px;text-align:left">' +
          '<div class="summary-row"><span class="k">' + esc(t('booking.step1')) + '</span><span class="v">' + esc(payload.serviceTitle) + '</span></div>' +
          '<div class="summary-row"><span class="k">' + esc(t('booking.step2')) + '</span><span class="v">' + esc(payload.therapistName) + '</span></div>' +
          '<div class="summary-row"><span class="k">' + esc(t('booking.step3')) + '</span><span class="v">' + esc(fmtDate(payload.date)) + ' · ' + esc(payload.time) + '</span></div>' +
        '</div>' +
        '<div class="row" style="justify-content:center">' +
          '<a class="btn btn-outline btn-sm" href="' + icsHref(payload) + '" download="vitanord-appointment.ics">' + icon('calendar') + esc(t('booking.addCalendar')) + '</a>' +
          '<button type="button" class="btn btn-outline btn-sm" data-bk-restart>' + esc(t('booking.success.again')) + '</button>' +
        '</div>';
    } else {
      els.result.innerHTML =
        '<div class="r-ic">' + icon('alert') + '</div>' +
        '<h3>' + esc(t('booking.error.title')) + '</h3>' +
        '<p class="lead" style="max-width:44ch;margin-inline:auto">' + esc(t('booking.error.text')) + '</p>' +
        '<div class="row" style="justify-content:center;margin-top:24px">' +
          '<a class="btn btn-primary btn-sm" href="mailto:' + esc(window.VN_CONTENT.clinic.email) + '">' + icon('mail') + esc(t('cta.email')) + '</a>' +
          '<button type="button" class="btn btn-outline btn-sm" data-bk-restart>' + esc(t('booking.prev')) + '</button>' +
        '</div>';
    }
    var again = els.result.querySelector('[data-bk-restart]');
    if (again) again.addEventListener('click', function () {
      els.result.classList.remove('is-active');
      els.form.reset();
      state.date = null; state.time = null;
      show(1);
    });
    els.result.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
  }

  /* --------------------------------------------------------------- wire -- */
  els.next.addEventListener('click', function () {
    if (!canAdvance()) return;
    if (state.step === 1) {
      loadTherapists().then(function () {
        assignAnyTherapist();
        loadDays();
        show(3);
      });
      return;
    }
    if (state.step === 2) { loadDays(); show(3); return; }
    if (state.step === 3) { show(4); return; }
    if (state.step === 4) { if (!validateForm()) return; buildSummary(); show(5); return; }
  });
  els.prev.addEventListener('click', function () {
    var vs = visibleSteps();
    var i = vs.indexOf(state.step);
    show(i > 0 ? vs[i - 1] : vs[0]);
  });
  root.querySelector('[data-bk-confirm]').addEventListener('click', function () { submit(); });
  els.form.addEventListener('submit', function (e) { e.preventDefault(); els.next.click(); });
  els.form.querySelectorAll('input,textarea').forEach(function (f) {
    f.addEventListener('input', function () {
      var w = f.closest('.field') || f.closest('.check');
      if (w) w.classList.remove('has-error');
    });
  });

  /* Re-render the wizard when the visitor switches language mid-booking.
     This also fires once on first page load (app.js dispatches it right
     after setting the initial language), which can land after a deep-link
     preselection in the init block below has already clicked an option —
     re-applying the current selection here keeps that choice visible
     instead of it silently reverting to "none selected". */
  document.addEventListener('vn:lang', function () {
    buildProgress();
    if (state.step === 1) {
      loadServices().then(function () {
        if (!state.serviceId) return;
        var sb = els.optService.querySelector('[data-service="' + CSS.escape(state.serviceId) + '"]');
        if (sb) select(els.optService, sb);
      });
    }
    if (state.step === 2) {
      loadTherapists().then(function () {
        if (!state.therapistId) return;
        var tb = els.optTherapist.querySelector('[data-therapist="' + CSS.escape(state.therapistId) + '"]');
        if (tb) select(els.optTherapist, tb);
      });
    }
    if (state.step === 3 && state.date) loadSlots();
    if (state.step === 5) buildSummary();
  });

  /* --------------------------------------------------------------- init -- */
  buildProgress();
  Promise.all([loadServices(), loadTherapists()]).then(function () {
    buildProgress();
    var q = new URLSearchParams(location.search);
    var pre = q.get('treatment') || q.get('service');

    if (pre) {
      var sb = els.optService.querySelector('[data-service="' + CSS.escape(pre) + '"]');
      if (sb) sb.click();
    }

    if (state.serviceId) {
      assignAnyTherapist(); loadDays(); show(3);
    } else {
      updateNav();
    }
  });
})();
