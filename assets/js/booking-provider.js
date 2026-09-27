/* ==========================================================================
   VitaNord: booking backend adapter
   --------------------------------------------------------------------------
   The booking *interface* (booking.js) never talks to a calendar directly.
   It only calls the five methods below. Swap the provider and the whole
   booking system changes backend without touching a line of the UI.

   TO GO LIVE
   ----------
   1. Pick a provider below (or write your own object with the same methods).
   2. Set  VN_BOOKING_CONFIG.provider  to its name.
   3. Fill in the matching config block.

   THE INTERFACE  (all methods return a Promise)
   ---------------------------------------------------------------
   getServices()                    → [{ id, title, duration }]
   getTherapists(serviceId)         → [{ id, name, role, photo }]
   getDays({serviceId, therapistId, from, days})
                                    → [{ date:'YYYY-MM-DD', available:Boolean }]
   getSlots({serviceId, therapistId, date})
                                    → ['09:00','09:45', …]
   createBooking(payload)           → { ok:true, reference:'VN-XXXX' }
        payload = { serviceId, therapistId, date, time, name, phone,
                    email, message, lang }
   ========================================================================== */

window.VN_BOOKING_CONFIG = {

  /* 'mock' | 'restApi' | 'calendly' | 'googleCalendar' | 'outlook' */
  provider: 'mock',

  /* Your own backend (recommended: it keeps patient data under your control
     and lets the server talk to Google/Outlook with a private key). */
  restApi: {
    baseUrl: 'https://api.vitanord.net',   // EDIT ME
    // GET  {baseUrl}/availability?service=&therapist=&from=&days=
    // GET  {baseUrl}/slots?service=&therapist=&date=
    // POST {baseUrl}/bookings
    apiKey: ''                                   // optional, sent as X-Api-Key
  },

  /* Calendly, simplest to launch with. Create one event type per treatment
     and paste the scheduling URLs here. The 5-step UI collects the choice,
     then hands over to Calendly for the final date/time + details. */
  calendly: {
    baseUrl: 'https://calendly.com/vitanordfisio',   // EDIT ME
    eventTypes: {                                     // treatment slug → event slug
      'physiotherapy': 'physiotherapy',
      'rehabilitation': 'rehabilitation'
    }
  },

  /* Google Calendar / Microsoft Outlook.
     Never put a private key or a client secret in this file, it is public.
     Point these at your own small server endpoint that holds the credentials. */
  googleCalendar: { proxyUrl: 'https://api.vitanord.net/google' },  // EDIT ME
  outlook:        { proxyUrl: 'https://api.vitanord.net/outlook' }, // EDIT ME

  /* Slot generation used by the mock provider (and a sensible default for
     your own backend to mirror). */
  slotMinutes: 45,
  leadTimeHours: 12,      // earliest bookable appointment from now
  horizonDays: 28         // how far ahead the date picker goes
};

(function () {
  'use strict';

  var CFG = window.VN_BOOKING_CONFIG;
  var C = window.VN_CONTENT;

  function iso(d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function toMin(s) { var b = s.split(':'); return (+b[0]) * 60 + (+b[1]); }
  function toHHMM(m) { return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'); }
  function lang() { return (window.VN && window.VN.lang) ? window.VN.lang() : 'en'; }
  function loc(item) { return item[lang()] || item.en || {}; }
  function delay(ms, val) { return new Promise(function (r) { setTimeout(function () { r(val); }, ms); }); }

  /* Stable pseudo-random number from a string, keeps the demo calendar
     identical on every reload instead of flickering. */
  function hash(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return ((h >>> 0) % 1000) / 1000;
  }

  var DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  function hoursFor(date) {
    var row = C.clinic.hours.filter(function (h) { return h.day === DAYS[date.getDay()]; })[0];
    return (row && row.open) ? row : null;
  }

  /* ---------------------------------------------------------- providers -- */
  var Providers = {};

  /* ============================== MOCK ==================================
     Generates believable availability from the clinic's opening hours.
     Nothing leaves the browser. Perfect for launch previews and design work. */
  Providers.mock = {
    id: 'mock',
    isDemo: true,

    getServices: function () {
      return delay(120, C.treatments.filter(function (t) { return t.published !== false; })
        .map(function (t) { return { id: t.slug, title: loc(t).title, duration: t.duration, icon: t.icon }; }));
    },

    getTherapists: function () {
      var team = C.team.filter(function (p) { return p.published !== false; });
      return delay(120, team.map(function (p) {
        return { id: p.id, name: p.name, role: loc(p).role, photo: p.photo };
      }));
    },

    getDays: function (o) {
      var out = [], start = new Date(); start.setHours(0, 0, 0, 0);
      for (var i = 0; i < (o.days || CFG.horizonDays); i++) {
        var d = new Date(start.getTime() + i * 86400000);
        var open = !!hoursFor(d);
        var seed = hash(iso(d) + (o.therapistId || 'any'));
        out.push({ date: iso(d), available: open && seed > 0.12 });
      }
      return delay(180, out);
    },

    getSlots: function (o) {
      var d = new Date(o.date + 'T00:00:00');
      var row = hoursFor(d);
      if (!row) return delay(220, []);
      var step = CFG.slotMinutes;
      var earliest = Date.now() + CFG.leadTimeHours * 3600000;
      var slots = [];
      for (var m = toMin(row.open); m + step <= toMin(row.close); m += step) {
        var hhmm = toHHMM(m);
        var when = new Date(o.date + 'T' + hhmm + ':00');
        if (when.getTime() < earliest) continue;
        // ~40% of slots are "already booked", stable per day/therapist
        if (hash(o.date + hhmm + (o.therapistId || 'any')) < 0.4) continue;
        slots.push(hhmm);
      }
      return delay(320, slots);
    },

    createBooking: function (payload) {
      var ref = 'VN-' + String(Date.now()).slice(-6);
      try { console.info('[VitaNord booking – demo] no request was sent:', payload); } catch (e) {}
      return delay(700, { ok: true, reference: ref, demo: true });
    }
  };

  /* ============================ REST API ================================
     Your own endpoint. Recommended for a real clinic: GDPR-friendly,
     provider-independent, and it can write to Google/Outlook server-side. */
  Providers.restApi = {
    id: 'restApi',
    isDemo: false,
    _fetch: function (path, opts) {
      opts = opts || {};
      opts.headers = Object.assign({ 'Content-Type': 'application/json' },
        CFG.restApi.apiKey ? { 'X-Api-Key': CFG.restApi.apiKey } : {}, opts.headers || {});
      return fetch(CFG.restApi.baseUrl + path, opts).then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      });
    },
    getServices: function () { return Providers.mock.getServices(); },
    getTherapists: function () { return Providers.mock.getTherapists(); },
    getDays: function (o) {
      return this._fetch('/availability?service=' + encodeURIComponent(o.serviceId) +
        '&therapist=' + encodeURIComponent(o.therapistId || '') +
        '&days=' + (o.days || CFG.horizonDays));
    },
    getSlots: function (o) {
      return this._fetch('/slots?service=' + encodeURIComponent(o.serviceId) +
        '&therapist=' + encodeURIComponent(o.therapistId || '') +
        '&date=' + encodeURIComponent(o.date));
    },
    createBooking: function (payload) {
      return this._fetch('/bookings', { method: 'POST', body: JSON.stringify(payload) });
    }
  };

  /* ====================== GOOGLE CALENDAR / OUTLOOK =====================
     Identical shape, both talk to a small server of yours that holds the
     OAuth credentials and calls the calendar API (freebusy → events.insert).
     Client-side keys are never safe, hence the proxy. */
  function calendarProxy(name, url) {
    return {
      id: name, isDemo: false,
      getServices: function () { return Providers.mock.getServices(); },
      getTherapists: function () { return Providers.mock.getTherapists(); },
      getDays: function (o) {
        return fetch(url + '/availability?' + new URLSearchParams(o)).then(function (r) { return r.json(); });
      },
      getSlots: function (o) {
        return fetch(url + '/slots?' + new URLSearchParams(o)).then(function (r) { return r.json(); });
      },
      createBooking: function (payload) {
        return fetch(url + '/bookings', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
        }).then(function (r) { return r.json(); });
      }
    };
  }
  Providers.googleCalendar = calendarProxy('googleCalendar', CFG.googleCalendar.proxyUrl);
  Providers.outlook        = calendarProxy('outlook',        CFG.outlook.proxyUrl);

  /* ============================== CALENDLY ==============================
     Steps 1–2 stay on your site (nicer branding, treatment + therapist
     choice), then Calendly takes over for date/time and details. */
  Providers.calendly = {
    id: 'calendly',
    isDemo: false,
    handoff: true,                       // booking.js switches to hand-off mode
    getServices: function () { return Providers.mock.getServices(); },
    getTherapists: function () { return Providers.mock.getTherapists(); },
    getDays: function () { return Promise.resolve([]); },
    getSlots: function () { return Promise.resolve([]); },
    schedulingUrl: function (o) {
      var evt = CFG.calendly.eventTypes[o.serviceId] || o.serviceId;
      var who = o.therapistId && o.therapistId !== 'any' ? '/' + o.therapistId : '';
      return CFG.calendly.baseUrl + who + '/' + evt +
        '?hide_gdpr_banner=1&primary_color=0CA9B8' +
        (o.name ? '&name=' + encodeURIComponent(o.name) : '') +
        (o.email ? '&email=' + encodeURIComponent(o.email) : '');
    },
    createBooking: function (payload) {
      window.open(this.schedulingUrl(payload), '_blank', 'noopener');
      return Promise.resolve({ ok: true, reference: '-', handoff: true });
    }
  };

  /* --------------------------------------------------------- selection -- */
  var chosen = Providers[CFG.provider] || Providers.mock;
  if (!Providers[CFG.provider]) {
    try { console.warn('[VitaNord] Unknown booking provider "' + CFG.provider + '", using the demo provider.'); } catch (e) {}
  }
  window.VN_BOOKING = chosen;
  window.VN_BOOKING_PROVIDERS = Providers;
})();
