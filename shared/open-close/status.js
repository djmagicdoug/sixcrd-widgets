/* SixCrd open/closed status with weekly hours dropdown */
(function () {
  "use strict";

  if (window.__sixcrdStatusLoaded) return;
  window.__sixcrdStatusLoaded = true;

  var SELECTOR = ".sixcrd-hours";
  var SOON_MINUTES = 60;
  var KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  var NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var ORDER = [1, 2, 3, 4, 5, 6, 0];
  var COLORS = { open: "#1a7f37", soon: "#b86e00", closed: "#9b1c1c" };
  var uid = 0;

  var CSS =
    ".sixcrd-hours,.sixcrd-hours *{box-sizing:border-box !important;}" +
    ".sixcrd-hours{display:block !important;width:100% !important;margin:0 !important;padding:0 !important;" +
    "background:#f8f4e9 !important;border:1px solid #e8dfca !important;border-radius:10px !important;overflow:hidden !important;" +
    "font-family:system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif !important;color:#2b2a26 !important;" +
    "text-align:left !important;line-height:1.3 !important;}" +
    ".sixcrd-hours .sxh-bar{display:flex !important;align-items:center !important;gap:10px !important;width:100% !important;" +
    "margin:0 !important;padding:12px 14px !important;background:transparent !important;border:0 !important;" +
    "font:inherit !important;color:inherit !important;cursor:pointer !important;text-align:left !important;" +
    "-webkit-appearance:none !important;appearance:none !important;}" +
    ".sixcrd-hours .sxh-bar:focus-visible{outline:2px solid #b3995b !important;outline-offset:-3px !important;}" +
    ".sixcrd-hours .sxh-dot{flex:0 0 10px !important;width:10px !important;height:10px !important;border-radius:50% !important;}" +
    ".sixcrd-hours .sxh-text{flex:1 1 auto !important;display:flex !important;flex-direction:column !important;min-width:0 !important;}" +
    ".sixcrd-hours .sxh-label{font-size:15px !important;font-weight:700 !important;}" +
    ".sixcrd-hours .sxh-detail{font-size:13px !important;color:#6b685f !important;margin-top:2px !important;}" +
    ".sixcrd-hours .sxh-chev{flex:0 0 18px !important;width:18px !important;height:18px !important;color:#6b685f !important;" +
    "transition:transform .2s ease !important;}" +
    ".sixcrd-hours.sxh-open .sxh-chev{transform:rotate(180deg) !important;}" +
    ".sixcrd-hours .sxh-week{list-style:none !important;margin:0 !important;padding:4px 14px 12px !important;" +
    "border-top:1px solid #e8dfca !important;}" +
    ".sixcrd-hours .sxh-week[hidden]{display:none !important;}" +
    ".sixcrd-hours .sxh-row{display:flex !important;justify-content:space-between !important;gap:12px !important;" +
    "margin:0 !important;padding:6px 0 !important;font-size:14px !important;color:#2b2a26 !important;}" +
    ".sixcrd-hours .sxh-row.sxh-today{font-weight:700 !important;}" +
    ".sixcrd-hours .sxh-row.sxh-today .sxh-day{color:#8a6f2e !important;}" +
    ".sixcrd-hours .sxh-times{text-align:right !important;}" +
    ".sixcrd-hours .sxh-closed{color:#9b1c1c !important;}";

  function injectCSS() {
    if (document.getElementById("sixcrd-hours-css")) return;
    var style = document.createElement("style");
    style.id = "sixcrd-hours-css";
    style.appendChild(document.createTextNode(CSS));
    (document.head || document.documentElement).appendChild(style);
  }

  function toMinutes(s) {
    var p = String(s).trim().split(":");
    var h = parseInt(p[0], 10), m = parseInt(p[1] || "0", 10);
    if (!isFinite(h) || !isFinite(m)) return NaN;
    return h * 60 + m;
  }

  function pretty(mins) {
    var h = Math.floor(mins / 60) % 24, m = mins % 60;
    var ap = h >= 12 ? "PM" : "AM", hh = h % 12 || 12;
    return m === 0 ? hh + " " + ap : hh + ":" + (m < 10 ? "0" : "") + m + " " + ap;
  }

  function parseDay(value) {
    if (!value) return [];
    var v = String(value).trim().toLowerCase();
    if (v === "" || v === "closed") return [];
    if (v === "24h" || v === "24 hours" || v === "open 24 hours") return [{ open: 0, close: 1440, allDay: true }];
    return v.split(",").map(function (r) {
      var p = r.split("-");
      var o = toMinutes(p[0]), c = toMinutes(p[1]);
      return { open: o, close: c };
    }).filter(function (s) {
      return isFinite(s.open) && isFinite(s.close) && s.open !== s.close;
    });
  }

  function readConfig(el) {
    var hours = [];
    for (var i = 0; i < 7; i++) hours.push(parseDay(el.getAttribute("data-" + KEYS[i])));
    return {
      tz: el.getAttribute("data-tz") || "America/Los_Angeles",
      hours: hours
    };
  }

  function zonedNow(tz) {
    var parts;
    try {
      parts = new Intl.DateTimeFormat("en-US", {
        timeZone: tz, weekday: "short", hour: "numeric", minute: "numeric", hour12: false
      }).formatToParts(new Date());
    } catch (e) {
      parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Los_Angeles", weekday: "short", hour: "numeric", minute: "numeric", hour12: false
      }).formatToParts(new Date());
    }
    var p = {};
    parts.forEach(function (x) { if (x.type !== "literal") p[x.type] = x.value; });
    var day = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[p.weekday];
    return { day: day, minutes: (parseInt(p.hour, 10) % 24) * 60 + parseInt(p.minute, 10) };
  }

  function overnight(s) { return s.close <= s.open && !s.allDay; }

  function nextOpening(cfg, now) {
    for (var d = 0; d <= 7; d++) {
      var day = (now.day + d) % 7, slots = cfg.hours[day];
      for (var i = 0; i < slots.length; i++) {
        if (d > 0 || slots[i].open > now.minutes) {
          var when = d === 0 ? "today" : d === 1 ? "tomorrow" : NAMES[day];
          return "Opens " + when + " at " + pretty(slots[i].open);
        }
      }
    }
    return "Hours not listed";
  }

  function running(remaining, closeAt, allDay) {
    if (allDay) return { state: "open", label: "Open now", detail: "Open 24 hours" };
    var soon = remaining <= SOON_MINUTES;
    return {
      state: soon ? "soon" : "open",
      label: soon ? "Closes soon" : "Open now",
      detail: "Closes at " + pretty(closeAt)
    };
  }

  function status(cfg) {
    var now = zonedNow(cfg.tz);
    var prev = cfg.hours[(now.day + 6) % 7];
    for (var i = 0; i < prev.length; i++) {
      if (overnight(prev[i]) && now.minutes < prev[i].close) {
        return running(prev[i].close - now.minutes, prev[i].close);
      }
    }
    var today = cfg.hours[now.day];
    for (var j = 0; j < today.length; j++) {
      var s = today[j];
      if (s.allDay) return running(0, 0, true);
      if (overnight(s) && now.minutes >= s.open) return running(1440 - now.minutes + s.close, s.close);
      if (!overnight(s) && now.minutes >= s.open && now.minutes < s.close) return running(s.close - now.minutes, s.close);
    }
    return { state: "closed", label: "Closed", detail: nextOpening(cfg, now), day: now.day };
  }

  function dayText(slots) {
    if (!slots.length) return "Closed";
    if (slots[0].allDay) return "Open 24 hours";
    return slots.map(function (s) {
      return pretty(s.open) + " to " + (s.close === 1440 ? "12 AM" : pretty(s.close));
    }).join(", ");
  }

  function build(el) {
    var id = "sxh-week-" + (++uid);
    el.setAttribute("data-sxh-built", "1");
    el.innerHTML =
      '<button type="button" class="sxh-bar" aria-expanded="false" aria-controls="' + id + '">' +
        '<span class="sxh-dot" aria-hidden="true"></span>' +
        '<span class="sxh-text" aria-live="polite">' +
          '<span class="sxh-label"></span>' +
          '<span class="sxh-detail"></span>' +
        '</span>' +
        '<svg class="sxh-chev" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>' +
      '</button>' +
      '<ul class="sxh-week" id="' + id + '" hidden aria-label="Weekly hours"></ul>';

    var bar = el.querySelector(".sxh-bar");
    var week = el.querySelector(".sxh-week");
    bar.addEventListener("click", function () {
      var opening = week.hidden;
      week.hidden = !opening;
      bar.setAttribute("aria-expanded", opening ? "true" : "false");
      el.classList.toggle("sxh-open", opening);
    });
  }

  function paint(el) {
    var cfg;
    try {
      cfg = readConfig(el);
      if (!el.getAttribute("data-sxh-built")) build(el);
      var s = status(cfg);
      var nowDay = zonedNow(cfg.tz).day;
      var key = s.state + "|" + s.label + "|" + s.detail + "|" + nowDay;
      if (el.__sxhLast === key) return;
      el.__sxhLast = key;

      var color = COLORS[s.state];
      el.querySelector(".sxh-dot").style.setProperty("background", color, "important");
      var label = el.querySelector(".sxh-label");
      label.textContent = s.label;
      label.style.setProperty("color", color, "important");
      el.querySelector(".sxh-detail").textContent = s.detail;

      var rows = "";
      for (var i = 0; i < ORDER.length; i++) {
        var d = ORDER[i], slots = cfg.hours[d], txt = dayText(slots);
        rows +=
          '<li class="sxh-row' + (d === nowDay ? " sxh-today" : "") + '">' +
            '<span class="sxh-day">' + NAMES[d] + (d === nowDay ? '<span class="sxh-sr" style="position:absolute !important;width:1px !important;height:1px !important;overflow:hidden !important;clip:rect(0 0 0 0) !important;"> (today)</span>' : "") + '</span>' +
            '<span class="sxh-times' + (slots.length ? "" : " sxh-closed") + '">' + txt + '</span>' +
          '</li>';
      }
      el.querySelector(".sxh-week").innerHTML = rows;
    } catch (e) {
      if (window.console) console.warn("SixCrd hours:", e);
    }
  }

  function boot() {
    injectCSS();
    var nodes = document.querySelectorAll(SELECTOR);
    for (var i = 0; i < nodes.length; i++) paint(nodes[i]);
  }

  var queued = false;
  function queue() {
    if (queued) return;
    queued = true;
    setTimeout(function () { queued = false; boot(); }, 80);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  boot();

  if (window.MutationObserver) {
    try {
      new MutationObserver(function (muts) {
        for (var i = 0; i < muts.length; i++) {
          var added = muts[i].addedNodes;
          for (var j = 0; j < added.length; j++) {
            var n = added[j];
            if (n.nodeType === 1 && (n.matches && n.matches(SELECTOR) || n.querySelector && n.querySelector(SELECTOR))) {
              queue();
              return;
            }
          }
        }
      }).observe(document.documentElement, { childList: true, subtree: true });
    } catch (e) {}
  }

  window.addEventListener("load", boot);
  window.addEventListener("pageshow", boot);
  document.addEventListener("visibilitychange", function () { if (!document.hidden) boot(); });
  setInterval(boot, 30000);
})();
