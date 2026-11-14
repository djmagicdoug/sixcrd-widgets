/* PinCrd Pins board */
(function () {
  "use strict";

  if (window.__pincrdPinsLoaded) return;
  window.__pincrdPinsLoaded = true;

  var TZ = "America/Los_Angeles";
  var CATEGORIES = [
    { key: "all", label: "All" },
    { key: "eat", label: "Eat & Drink" },
    { key: "retail", label: "Retail" },
    { key: "services", label: "Services" }
  ];
  var AREAS = ["Southwest", "Henderson Green Valley", "Downtown"];
  var DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  var script = document.currentScript;
  var BASE = script && script.src ? script.src.replace(/[^\/]*(\?.*)?$/, "") : "https://sixcrd-widgets.pages.dev/pincrd/pins/";
  var IMAGES = BASE.replace(/pins\/$/, "images/");

  var CSS = [
    ".pcp,.pcp *{box-sizing:border-box}",
    ".pcp{max-width:560px;margin:0 auto;padding:16px 14px 28px;color:#303536;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;text-align:left}",
    ".pcp h1{font-size:24px;margin:0 0 4px;color:#303536}",
    ".pcp .pcp-intro{font-size:13.5px;line-height:1.45;color:#5e6466;margin:0 0 14px}",
    ".pcp .pcp-search{width:100%;min-height:44px;border:1px solid #dedfdd;border-radius:8px;background:#f6f5f3;padding:10px 12px;font-size:15px;color:#303536}",
    ".pcp .pcp-search:focus{outline:2px solid #AA8962;outline-offset:1px}",
    ".pcp .pcp-row{display:flex;gap:7px;margin:10px 0 0;overflow-x:auto;padding-bottom:2px;-webkit-overflow-scrolling:touch;scrollbar-width:none}",
    ".pcp .pcp-row::-webkit-scrollbar{display:none}",
    ".pcp .pcp-chip{flex:0 0 auto;border:1px solid #dedfdd;background:#fff;color:#303536;border-radius:20px;padding:8px 13px;font-weight:700;font-size:12px;cursor:pointer;font-family:inherit}",
    ".pcp .pcp-chip[aria-pressed=true]{background:#AA8962;color:#fff;border-color:#AA8962}",
    ".pcp .pcp-row.pcp-sub .pcp-chip{font-weight:600;font-size:11.5px;padding:6px 11px}",
    ".pcp .pcp-row.pcp-sub .pcp-chip[aria-pressed=true]{background:#303536;border-color:#303536}",
    ".pcp .pcp-chip:focus-visible,.pcp .pcp-card:focus-visible,.pcp-dialog button:focus-visible,.pcp-dialog a:focus-visible{outline:2px solid #AA8962;outline-offset:2px}",
    ".pcp .pcp-count{font-size:12px;color:#686e70;margin:12px 0 10px}",
    ".pcp .pcp-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}",
    "@media(max-width:350px){.pcp .pcp-grid{grid-template-columns:1fr}}",
    ".pcp .pcp-card{display:flex;flex-direction:column;padding:0;overflow:hidden;text-align:left;border:1px solid #dedfdd;border-radius:10px;background:#fff;color:inherit;cursor:pointer;font-family:inherit;width:100%}",
    ".pcp-media{position:relative;display:block;width:100%;aspect-ratio:4/3;background:#f1eee9;overflow:hidden}",
    ".pcp-media img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:2}",
    ".pcp-emoji{position:absolute;inset:0;display:grid;place-items:center;font-size:38px;z-index:1}",
    ".pcp .pcp-body{display:block;padding:10px 11px 12px}",
    ".pcp-tags{display:flex;flex-wrap:wrap;gap:4px;margin:0 0 7px}",
    ".pcp-tag{display:inline-block;font-size:10px;font-weight:700;line-height:1;padding:4px 7px;border-radius:20px;background:#AA8962;color:#fff;border:1px solid #AA8962}",
    ".pcp-tag.pcp-area{background:transparent;color:#7d6343;border-color:#AA8962}",
    ".pcp .pcp-offer{display:block;font-size:15px;line-height:1.22;font-weight:850;color:#303536}",
    ".pcp .pcp-biz{display:block;font-size:12.5px;margin-top:5px;color:#4b5153;font-weight:600}",
    ".pcp .pcp-teaser{display:block;font-size:12px;margin-top:3px;color:#686e70}",
    ".pcp .pcp-ends{display:block;font-size:11px;margin-top:7px;color:#686e70}",
    ".pcp .pcp-view{display:block;font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:#8a6d4b;font-weight:800;margin-top:9px}",
    ".pcp .pcp-empty{padding:28px 0;text-align:center;color:#686e70;font-size:13.5px}",
    ".pcp .pcp-by{text-align:center;font-size:11px;color:#8a8f90;margin:22px 0 0}",
    ".pcp-dialog{width:min(540px,calc(100% - 20px));max-height:92vh;padding:0;border:0;border-radius:12px;box-shadow:0 16px 45px rgba(0,0,0,.25);color:#303536;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif}",
    ".pcp-dialog::backdrop{background:rgba(30,32,33,.55)}",
    ".pcp-dialog .pcp-close{position:absolute;right:10px;top:10px;z-index:5;width:40px;height:40px;border:0;border-radius:50%;background:rgba(255,255,255,.95);font-size:26px;line-height:1;cursor:pointer;color:#303536}",
    ".pcp-dialog .pcp-media{aspect-ratio:auto;height:220px}",
    ".pcp-dialog .pcp-emoji{font-size:56px}",
    ".pcp-dialog .pcp-content{padding:16px 17px 20px}",
    ".pcp-dialog h2{font-size:23px;line-height:1.15;margin:4px 0 6px}",
    ".pcp-dialog h3{font-size:15.5px;margin:0 0 8px;color:#4b5153}",
    ".pcp-dialog .pcp-about{color:#5e6466;font-size:14px;line-height:1.5;margin:0}",
    ".pcp-dialog section{border-top:1px solid #dedfdd;padding-top:14px;margin-top:16px}",
    ".pcp-dialog .pcp-eyebrow{font-size:11px;color:#8a6d4b;font-weight:850;letter-spacing:.12em;text-transform:uppercase;margin:0 0 8px}",
    ".pcp-dialog section p{font-size:14px;line-height:1.5;margin:0}",
    ".pcp-dialog .pcp-fact{margin-top:12px}",
    ".pcp-dialog .pcp-fact strong,.pcp-dialog .pcp-fact span{display:block;font-size:13.5px}",
    ".pcp-dialog .pcp-fact span{color:#5e6466;margin-top:2px;line-height:1.45}",
    ".pcp-dialog .pcp-contact{display:block;padding:10px 0;color:#303536;text-decoration:none;border-bottom:1px solid #eee}",
    ".pcp-dialog .pcp-contact strong,.pcp-dialog .pcp-contact span{display:block}",
    ".pcp-dialog .pcp-contact strong{font-size:14px}",
    ".pcp-dialog .pcp-contact span{font-size:11.5px;color:#8a6d4b;margin-top:2px}",
    ".pcp-dialog .pcp-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:18px}",
    ".pcp-dialog .pcp-actions.pcp-one{grid-template-columns:1fr}",
    ".pcp-dialog .pcp-btn{min-height:46px;display:flex;align-items:center;justify-content:center;border:1px solid #AA8962;border-radius:6px;font-size:13px;font-weight:800;text-decoration:none;text-align:center;padding:6px 10px}",
    ".pcp-dialog .pcp-primary{background:#AA8962;color:#fff}",
    ".pcp-dialog .pcp-secondary{background:#fff;color:#7d6343}",
    ".pcp-dialog .pcp-note{font-size:11px;color:#6f7475;line-height:1.4;margin:16px 0 0}"
  ].join("");

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function todayLV() {
    var p = {};
    new Intl.DateTimeFormat("en-US", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" })
      .formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    return p.year + "-" + p.month + "-" + p.day;
  }

  function isLive(pin, today) {
    if (pin.start && today < pin.start) return false;
    if (pin.end && today > pin.end) return false;
    return true;
  }

  function endsText(end) {
    if (!end) return "";
    var d = new Date(end + "T12:00:00Z");
    return "Ends " + DAYS[d.getUTCDay()] + ", " + MONTHS[d.getUTCMonth()] + " " + d.getUTCDate();
  }

  function tracked(url, pin, content) {
    if (!url) return "";
    var hash = "", i = url.indexOf("#");
    if (i > -1) { hash = url.slice(i); url = url.slice(0, i); }
    return url + (url.indexOf("?") > -1 ? "&" : "?") +
      "utm_source=pincrd&utm_medium=pin&utm_campaign=" + encodeURIComponent(pin.id) +
      "&utm_content=" + content + hash;
  }

  function phoneText(p) {
    var d = String(p).replace(/\D/g, "");
    if (d.length === 11 && d[0] === "1") d = d.slice(1);
    return d.length === 10 ? "(" + d.slice(0, 3) + ") " + d.slice(3, 6) + "-" + d.slice(6) : p;
  }

  function media(pin) {
    var img = pin.image
      ? '<img src="' + esc(IMAGES + pin.image) + '" alt="" loading="lazy" onerror="this.remove()">'
      : "";
    return '<span class="pcp-media"><span class="pcp-emoji" aria-hidden="true">' + esc(pin.emoji || "📌") + "</span>" + img + "</span>";
  }

  function tagsHTML(pin) {
    var out = pin.area ? '<span class="pcp-tag pcp-area">' + esc(pin.area) + "</span>" : "";
    (pin.tags || []).forEach(function (t) { out += '<span class="pcp-tag">' + esc(t) + "</span>"; });
    return out ? '<span class="pcp-tags">' + out + "</span>" : "";
  }

  function haystack(pin) {
    return [pin.business, pin.offer, pin.teaser, pin.about, pin.details, pin.howTo, pin.finePrint,
      pin.sub, pin.area, (pin.tags || []).join(" "), pin.address,
      { eat: "eat drink food restaurant", retail: "retail shop store shopping", services: "services service" }[pin.category] || ""
    ].join(" ").toLowerCase();
  }

  function mount(root, all) {
    var today = todayLV();
    var pins = all.filter(function (p) { return isLive(p, today); });
    pins.sort(function (a, b) { return (b.start || "").localeCompare(a.start || ""); });

    var state = { cat: "all", sub: "", area: "", q: "" };

    root.className = "pcp";
    root.innerHTML =
      "<h1>Pins</h1>" +
      '<p class="pcp-intro">Specials, promotions, news, and offers from local businesses. New pins every Thursday. Tap a pin for details.</p>' +
      '<input class="pcp-search" type="search" placeholder="Search pins: pizza, haircut, candles…" aria-label="Search pins">' +
      '<div class="pcp-row pcp-cats" role="group" aria-label="Category"></div>' +
      '<div class="pcp-row pcp-sub" role="group" aria-label="Type" hidden></div>' +
      '<div class="pcp-row pcp-areas" role="group" aria-label="Area"></div>' +
      '<p class="pcp-count" aria-live="polite"></p>' +
      '<div class="pcp-grid"></div>' +
      '<p class="pcp-empty" hidden>No pins match right now. Try another search or check back Thursday.</p>' +
      '<p class="pcp-by">PinCrd, presented by SixCrd</p>';

    var search = root.querySelector(".pcp-search");
    var catRow = root.querySelector(".pcp-cats");
    var subRow = root.querySelector(".pcp-sub");
    var areaRow = root.querySelector(".pcp-areas");
    var count = root.querySelector(".pcp-count");
    var grid = root.querySelector(".pcp-grid");
    var empty = root.querySelector(".pcp-empty");

    function chip(label, value, pressed) {
      return '<button type="button" class="pcp-chip" data-v="' + esc(value) + '" aria-pressed="' + (pressed ? "true" : "false") + '">' + esc(label) + "</button>";
    }

    function drawCats() {
      catRow.innerHTML = CATEGORIES.map(function (c) { return chip(c.label, c.key, state.cat === c.key); }).join("");
    }

    function drawSubs() {
      if (state.cat === "all") { subRow.hidden = true; subRow.innerHTML = ""; return; }
      var seen = {}, subs = [];
      pins.forEach(function (p) {
        if (p.category === state.cat && p.sub && !seen[p.sub]) { seen[p.sub] = 1; subs.push(p.sub); }
      });
      subs.sort();
      if (subs.length < 2) { subRow.hidden = true; subRow.innerHTML = ""; return; }
      subRow.hidden = false;
      subRow.innerHTML = chip("All types", "", !state.sub) + subs.map(function (s) { return chip(s, s, state.sub === s); }).join("");
    }

    function drawAreas() {
      areaRow.innerHTML = chip("All areas", "", !state.area) + AREAS.map(function (a) { return chip(a, a, state.area === a); }).join("");
    }

    grid.innerHTML = pins.map(function (p, i) {
      return '<button type="button" class="pcp-card" data-i="' + i + '" aria-haspopup="dialog">' +
        media(p) +
        '<span class="pcp-body">' +
          tagsHTML(p) +
          '<span class="pcp-offer">' + esc(p.offer) + "</span>" +
          '<span class="pcp-biz">' + esc(p.business) + "</span>" +
          (p.teaser ? '<span class="pcp-teaser">' + esc(p.teaser) + "</span>" : "") +
          (p.end ? '<span class="pcp-ends">' + esc(endsText(p.end)) + "</span>" : "") +
          '<span class="pcp-view" aria-hidden="true">View pin</span>' +
        "</span></button>";
    }).join("");
    var cards = [].slice.call(grid.querySelectorAll(".pcp-card"));
    var hay = pins.map(haystack);

    function update() {
      var q = state.q.toLowerCase().trim(), words = q ? q.split(/\s+/) : [], n = 0;
      cards.forEach(function (c, i) {
        var p = pins[i];
        var show = (state.cat === "all" || p.category === state.cat) &&
          (!state.sub || p.sub === state.sub) &&
          (!state.area || p.area === state.area) &&
          words.every(function (w) { return hay[i].indexOf(w) > -1; });
        c.hidden = !show;
        if (show) n++;
      });
      count.textContent = n + (n === 1 ? " pin" : " pins");
      empty.hidden = n > 0;
    }

    catRow.addEventListener("click", function (e) {
      var b = e.target.closest(".pcp-chip"); if (!b) return;
      state.cat = b.getAttribute("data-v"); state.sub = "";
      drawCats(); drawSubs(); update();
    });
    subRow.addEventListener("click", function (e) {
      var b = e.target.closest(".pcp-chip"); if (!b) return;
      state.sub = b.getAttribute("data-v"); drawSubs(); update();
    });
    areaRow.addEventListener("click", function (e) {
      var b = e.target.closest(".pcp-chip"); if (!b) return;
      state.area = b.getAttribute("data-v"); drawAreas(); update();
    });
    search.addEventListener("input", function () { state.q = search.value || ""; update(); });

    var dialog = document.createElement("dialog");
    dialog.className = "pcp-dialog";
    dialog.setAttribute("aria-labelledby", "pcp-dialog-title");
    document.body.appendChild(dialog);
    var opener = null;

    function closeDialog() {
      if (dialog.close) dialog.close(); else dialog.removeAttribute("open");
    }
    dialog.addEventListener("close", function () {
      document.documentElement.style.overflow = "";
      if (opener) opener.focus();
    });
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog || e.target.closest(".pcp-close")) closeDialog();
    });

    function openPin(i, card) {
      var p = pins[i];
      var contact = "";
      if (p.phone) {
        contact += '<a class="pcp-contact" href="tel:' + esc(String(p.phone).replace(/[^\d+]/g, "")) + '"><strong>' + esc(phoneText(p.phone)) + "</strong><span>Call business</span></a>";
      }
      if (p.address) {
        contact += '<a class="pcp-contact" href="https://www.google.com/maps/dir/?api=1&amp;destination=' + esc(encodeURIComponent(p.address)) + '" target="_blank" rel="noopener"><strong>' + esc(p.address) + "</strong><span>Get directions</span></a>";
      }
      var buttons = "";
      if (p.action && p.action.url) {
        buttons += '<a class="pcp-btn pcp-primary" href="' + esc(tracked(p.action.url, p, "deal")) + '" target="_blank" rel="noopener">' + esc(p.action.label || "Get the Deal") + "</a>";
      }
      if (p.website) {
        buttons += '<a class="pcp-btn ' + (buttons ? "pcp-secondary" : "pcp-primary") + '" href="' + esc(tracked(p.website, p, "website")) + '" target="_blank" rel="noopener">Website</a>';
      }
      var count = (p.action && p.action.url ? 1 : 0) + (p.website ? 1 : 0);

      dialog.innerHTML =
        '<button type="button" class="pcp-close" aria-label="Close"><span aria-hidden="true">×</span></button>' +
        media(p) +
        '<div class="pcp-content">' +
          tagsHTML(p) +
          '<h2 id="pcp-dialog-title">' + esc(p.offer) + "</h2>" +
          "<h3>" + esc(p.business) + "</h3>" +
          (p.about ? '<p class="pcp-about">' + esc(p.about) + "</p>" : "") +
          "<section>" +
            '<p class="pcp-eyebrow">Details</p>' +
            (p.details ? "<p>" + esc(p.details) + "</p>" : "") +
            (p.howTo ? '<div class="pcp-fact"><strong>How to get it</strong><span>' + esc(p.howTo) + "</span></div>" : "") +
            (p.finePrint ? '<div class="pcp-fact"><strong>Good to know</strong><span>' + esc(p.finePrint) + "</span></div>" : "") +
            (p.end ? '<div class="pcp-fact"><strong>Valid through</strong><span>' + esc(endsText(p.end).replace("Ends ", "")) + "</span></div>" : "") +
          "</section>" +
          (contact ? '<section><p class="pcp-eyebrow">Contact</p>' + contact + "</section>" : "") +
          (count ? '<div class="pcp-actions' + (count === 1 ? " pcp-one" : "") + '">' + buttons + "</div>" : "") +
          '<p class="pcp-note">Offer terms and fulfillment are managed by the participating business.</p>' +
        "</div>";

      opener = card;
      document.documentElement.style.overflow = "hidden";
      if (dialog.showModal) dialog.showModal(); else dialog.setAttribute("open", "");
      var closeBtn = dialog.querySelector(".pcp-close");
      if (closeBtn) closeBtn.focus();
      dialog.scrollTop = 0;
    }

    grid.addEventListener("click", function (e) {
      var c = e.target.closest(".pcp-card"); if (!c) return;
      openPin(parseInt(c.getAttribute("data-i"), 10), c);
    });

    drawCats(); drawSubs(); drawAreas(); update();
  }

  function start() {
    var root = document.getElementById("pincrd-pins");
    if (!root || root.getAttribute("data-built")) return;
    root.setAttribute("data-built", "1");
    if (!document.getElementById("pcp-css")) {
      var st = document.createElement("style");
      st.id = "pcp-css";
      st.appendChild(document.createTextNode(CSS));
      (document.head || document.documentElement).appendChild(st);
    }
    function go() { mount(root, window.PINCRD_PINS || []); }
    if (window.PINCRD_PINS) return go();
    var s = document.createElement("script");
    s.src = BASE + "pins-data.js?t=" + Math.floor(Date.now() / 300000);
    s.onload = go;
    s.onerror = function () {
      root.innerHTML = '<p style="text-align:center;color:#686e70;font-size:14px;padding:24px 0">Pins could not load. Pull down to refresh.</p>';
    };
    (document.head || document.documentElement).appendChild(s);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
