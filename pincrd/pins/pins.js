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
    ".pcp [hidden],.pcp-dialog [hidden]{display:none !important}",
    ".pcp{max-width:560px;margin:0 auto;padding:16px 14px 28px;color:#333333;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;text-align:left}",
    ".pcp h1{font-size:24px;margin:0 0 4px;color:#333333}",
    ".pcp .pcp-intro{font-size:13.5px;line-height:1.45;color:#666666;margin:0 0 14px}",
    ".pcp .pcp-search{width:100%;min-height:44px;border:1px solid #DDDDDD;border-radius:8px;background:#F1F1F1;padding:10px 12px;font-size:15px;color:#333333}",
    ".pcp .pcp-search:focus{outline:2px solid #29547E;outline-offset:1px}",
    ".pcp .pcp-row{display:flex;gap:7px;margin:10px 0 0;overflow-x:auto;padding-bottom:2px;-webkit-overflow-scrolling:touch;scrollbar-width:none}",
    ".pcp .pcp-row::-webkit-scrollbar{display:none}",
    ".pcp .pcp-chip{flex:0 0 auto;border:1px solid #DDDDDD;background:#FFFFFF;color:#333333;border-radius:20px;padding:8px 13px;font-weight:700;font-size:12px;cursor:pointer;font-family:inherit}",
    ".pcp .pcp-chip[aria-pressed=true]{background:#29547E;color:#FFFFFF;border-color:#29547E}",
    ".pcp .pcp-row.pcp-sub .pcp-chip{font-weight:600;font-size:11.5px;padding:6px 11px}",
    ".pcp .pcp-row.pcp-sub .pcp-chip[aria-pressed=true]{background:#333333;border-color:#333333}",
    ".pcp .pcp-chip:focus-visible,.pcp .pcp-card:focus-visible,.pcp-dialog button:focus-visible,.pcp-dialog a:focus-visible{outline:2px solid #29547E;outline-offset:2px}",
    ".pcp .pcp-count{font-size:12px;color:#666666;margin:12px 0 10px}",
    ".pcp .pcp-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}",
    "@media(max-width:350px){.pcp .pcp-grid{grid-template-columns:1fr}}",
    ".pcp .pcp-card{display:flex;flex-direction:column;padding:0;overflow:hidden;text-align:left;border:1px solid #DDDDDD;border-radius:10px;background:#FFFFFF;color:inherit;cursor:pointer;font-family:inherit;width:100%}",
    ".pcp-media{position:relative;display:block;width:100%;aspect-ratio:4/3;background:#F1F1F1;overflow:hidden}",
    ".pcp-media img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:2}",
    ".pcp-emoji{position:absolute;inset:0;display:grid;place-items:center;font-size:38px;z-index:1}",
    ".pcp .pcp-body{display:block;padding:10px 11px 12px}",
    ".pcp-tags{display:flex;flex-wrap:wrap;gap:4px;margin:0 0 7px}",
    ".pcp-tag{display:inline-block;font-size:10px;font-weight:700;line-height:1;padding:4px 7px;border-radius:20px;background:#29547E;color:#FFFFFF;border:1px solid #29547E}",
    ".pcp-tag.pcp-area{background:transparent;color:#29547E;border-color:#29547E}",
    ".pcp .pcp-offer{display:block;font-size:15px;line-height:1.22;font-weight:850;color:#333333}",
    ".pcp .pcp-biz{display:block;font-size:12.5px;margin-top:5px;color:#666666;font-weight:600}",
    ".pcp .pcp-teaser{display:block;font-size:12px;margin-top:3px;color:#666666}",
    ".pcp .pcp-ends{display:block;font-size:11px;margin-top:7px;color:#666666}",
    ".pcp .pcp-view{display:block;font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:#29547E;font-weight:800;margin-top:9px}",
    ".pcp .pcp-empty{padding:28px 0;text-align:center;color:#666666;font-size:13.5px}",
    ".pcp .pcp-by{text-align:center;font-size:11px;color:#999999;margin:22px 0 0}",
    ".pcp-dialog{width:min(540px,calc(100% - 20px));max-height:calc(100vh - 140px);max-height:calc(100dvh - 140px);overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;padding:0;border:0;border-radius:12px;box-shadow:0 16px 45px rgba(0,0,0,.25);color:#333333;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif}",
    ".pcp-dialog::backdrop{background:rgba(30,32,33,.55)}",
    ".pcp-dialog .pcp-close{position:absolute;right:10px;top:10px;z-index:5;width:40px;height:40px;border:0;border-radius:50%;background:rgba(255,255,255,.95);font-size:26px;line-height:1;cursor:pointer;color:#333333}",
    ".pcp-dialog .pcp-media{aspect-ratio:auto;height:220px}",
    ".pcp-dialog .pcp-emoji{font-size:56px}",
    ".pcp-dialog .pcp-content{padding:16px 17px 20px}",
    ".pcp-dialog h2{font-size:23px;line-height:1.15;margin:4px 0 6px}",
    ".pcp-dialog h3{font-size:15.5px;margin:0 0 8px;color:#666666}",
    ".pcp-dialog .pcp-about{color:#666666;font-size:14px;line-height:1.5;margin:0}",
    ".pcp-dialog section{border-top:1px solid #DDDDDD;padding-top:14px;margin-top:16px}",
    ".pcp-dialog .pcp-eyebrow{font-size:11px;color:#29547E;font-weight:850;letter-spacing:.12em;text-transform:uppercase;margin:0 0 8px}",
    ".pcp-dialog section p{font-size:14px;line-height:1.5;margin:0}",
    ".pcp-dialog .pcp-fact{margin-top:12px}",
    ".pcp-dialog .pcp-fact strong,.pcp-dialog .pcp-fact span{display:block;font-size:13.5px}",
    ".pcp-dialog .pcp-fact span{color:#666666;margin-top:2px;line-height:1.45}",
    ".pcp-dialog .pcp-contact{display:block;padding:10px 0;color:#333333;text-decoration:none;border-bottom:1px solid #DDDDDD}",
    ".pcp-dialog .pcp-contact strong,.pcp-dialog .pcp-contact span{display:block}",
    ".pcp-dialog .pcp-contact strong{font-size:14px}",
    ".pcp-dialog .pcp-contact span{font-size:11.5px;color:#29547E;margin-top:2px}",
    ".pcp-dialog .pcp-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:18px}",
    ".pcp-dialog .pcp-actions.pcp-one{grid-template-columns:1fr}",
    ".pcp-dialog .pcp-btn{min-height:46px;display:flex;align-items:center;justify-content:center;border:1px solid #29547E;border-radius:6px;font-size:13px;font-weight:800;text-decoration:none;text-align:center;padding:6px 10px}",
    ".pcp-dialog .pcp-primary{background:#29547E;color:#FFFFFF}",
    ".pcp-dialog .pcp-secondary{background:#FFFFFF;color:#29547E}",
    ".pcp-dialog .pcp-hero{position:relative}",
    ".pcp-dialog .pcp-logo{position:absolute;left:17px;bottom:-34px;z-index:4;width:72px;height:72px;border-radius:14px;object-fit:contain;background:#FFFFFF;border:3px solid #FFFFFF;box-shadow:0 4px 14px rgba(0,0,0,.18)}",
    ".pcp-dialog .pcp-content.pcp-logo-pad{padding-top:46px}",
    ".pcp-dialog .pcp-socials{display:flex;gap:8px;margin:12px 0 0}",
    ".pcp-dialog .pcp-social{display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:50%;border:1px solid #DDDDDD;color:#29547E;text-decoration:none}",
    ".pcp-dialog .pcp-hours{margin:0 0 6px}",
    ".pcp-dialog .pcp-share{display:flex;align-items:center;justify-content:center;gap:7px;width:100%;min-height:42px;margin-top:10px;border:0;background:transparent;color:#29547E;font:inherit;font-size:13px;font-weight:800;cursor:pointer}",
    ".pcp-dialog .pcp-shared{font-size:12px;color:#666666;text-align:center;margin:2px 0 0;word-break:break-all}",
    ".pcp-dialog .pcp-note{font-size:11px;color:#666666;line-height:1.4;margin:16px 0 0;padding-bottom:calc(8px + env(safe-area-inset-bottom))}"
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

    var SOCIAL = {
      instagram: { name: "Instagram", path: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>' },
      facebook: { name: "Facebook", path: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8a0 0 0 0 1 0 0z"/>' },
      tiktok: { name: "TikTok", path: '<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.5 2.5 2.5 4.5 5 4.5"/>' },
      youtube: { name: "YouTube", path: '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor"/>' },
      x: { name: "X", path: '<path d="M4 4l16 16M20 4L4 20"/>' }
    };
    var SHARE_ICON = '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="M7 8l5-5 5 5"/><path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/></svg>';
    var hoursLoaded = false;

    function slug(s) { return String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

    function pinButtons(p) {
      var list = [];
      (p.buttons || []).forEach(function (b) { if (b && b.url) list.push(b); });
      if (!list.length) {
        if (p.action && p.action.url) list.push(p.action);
        if (p.website) list.push({ label: "Website", url: p.website });
      }
      return list.slice(0, 2);
    }

    function hoursBlock(p) {
      if (!p.hours) return "";
      var attrs = "";
      ["sun", "mon", "tue", "wed", "thu", "fri", "sat"].forEach(function (k) {
        if (p.hours[k]) attrs += " data-" + k + '="' + esc(p.hours[k]) + '"';
      });
      if (!hoursLoaded) {
        hoursLoaded = true;
        var s = document.createElement("script");
        s.src = BASE.replace(/pincrd\/pins\/$/, "shared/open-close/status.js");
        s.defer = true;
        (document.head || document.documentElement).appendChild(s);
      }
      return '<div class="pcp-hours"><div class="sixcrd-hours"' + attrs + ">Hours</div></div>";
    }

    function socialBlock(p) {
      if (!p.social) return "";
      var out = "";
      Object.keys(SOCIAL).forEach(function (k) {
        if (!p.social[k]) return;
        out += '<a class="pcp-social" href="' + esc(p.social[k]) + '" target="_blank" rel="noopener" aria-label="' + esc(p.business + " on " + SOCIAL[k].name) + '">' +
          '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + SOCIAL[k].path + "</svg></a>";
      });
      return out ? '<div class="pcp-socials">' + out + "</div>" : "";
    }

    function shareLink(p) {
      return BASE + "#pin=" + encodeURIComponent(p.id);
    }

    function openPin(i, card) {
      var p = pins[i];
      var contact = "";
      if (p.phone) {
        contact += '<a class="pcp-contact" href="tel:' + esc(String(p.phone).replace(/[^\d+]/g, "")) + '"><strong>' + esc(phoneText(p.phone)) + "</strong><span>Call business</span></a>";
      }
      if (p.address) {
        contact += '<a class="pcp-contact" href="https://www.google.com/maps/dir/?api=1&amp;destination=' + esc(encodeURIComponent(p.address)) + '" target="_blank" rel="noopener"><strong>' + esc(p.address) + "</strong><span>Get directions</span></a>";
      }
      var list = pinButtons(p);
      var buttons = list.map(function (b, n) {
        return '<a class="pcp-btn ' + (n === 0 ? "pcp-primary" : "pcp-secondary") + '" href="' + esc(tracked(b.url, p, slug(b.label) || ("button-" + (n + 1)))) + '" target="_blank" rel="noopener">' + esc(b.label || "Learn More") + "</a>";
      }).join("");
      var logo = p.logo ? '<img class="pcp-logo" src="' + esc(IMAGES + p.logo) + '" alt="" onerror="this.remove()">' : "";
      var hero = '<div class="pcp-hero' + (p.logo ? " pcp-has-logo" : "") + '">' + media(p) + logo + "</div>";

      dialog.innerHTML =
        '<button type="button" class="pcp-close" aria-label="Close"><span aria-hidden="true">×</span></button>' +
        hero +
        '<div class="pcp-content' + (p.logo ? " pcp-logo-pad" : "") + '">' +
          tagsHTML(p) +
          '<h2 id="pcp-dialog-title">' + esc(p.offer) + "</h2>" +
          "<h3>" + esc(p.business) + "</h3>" +
          (p.about ? '<p class="pcp-about">' + esc(p.about) + "</p>" : "") +
          socialBlock(p) +
          "<section>" +
            '<p class="pcp-eyebrow">Details</p>' +
            (p.details ? "<p>" + esc(p.details) + "</p>" : "") +
            (p.howTo ? '<div class="pcp-fact"><strong>How to get it</strong><span>' + esc(p.howTo) + "</span></div>" : "") +
            (p.finePrint ? '<div class="pcp-fact"><strong>Good to know</strong><span>' + esc(p.finePrint) + "</span></div>" : "") +
            (p.end ? '<div class="pcp-fact"><strong>Running through</strong><span>' + esc(endsText(p.end).replace("Ends ", "")) + "</span></div>" : "") +
          "</section>" +
          (contact || p.hours ? '<section><p class="pcp-eyebrow">Contact</p>' + hoursBlock(p) + contact + "</section>" : "") +
          (list.length ? '<div class="pcp-actions' + (list.length === 1 ? " pcp-one" : "") + '">' + buttons + "</div>" : "") +
          '<button type="button" class="pcp-share">' + SHARE_ICON + "<span>Share this pin</span></button>" +
          '<p class="pcp-shared" aria-live="polite"></p>' +
          '<p class="pcp-note">Details and availability are managed by the participating business.</p>' +
        "</div>";

      dialog.querySelector(".pcp-share").addEventListener("click", function () {
        var url = shareLink(p), note = dialog.querySelector(".pcp-shared");
        var data = { title: p.offer + " at " + p.business, text: p.offer + " at " + p.business + " on PinCrd", url: url };
        if (navigator.share) {
          navigator.share(data).catch(function () {});
        } else if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(function () { note.textContent = "Link copied"; }, function () { note.textContent = url; });
        } else {
          note.textContent = url;
        }
      });

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

    var m = /#pin=([^&]+)/.exec(window.location.hash || "");
    if (m) {
      var want = decodeURIComponent(m[1]);
      for (var k = 0; k < pins.length; k++) {
        if (pins[k].id === want) { openPin(k, cards[k]); break; }
      }
    }

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
      root.innerHTML = '<p style="text-align:center;color:#666666;font-size:14px;padding:24px 0">Pins could not load. Pull down to refresh.</p>';
    };
    (document.head || document.documentElement).appendChild(s);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
