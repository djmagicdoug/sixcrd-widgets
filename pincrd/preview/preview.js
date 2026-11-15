/* PinCrd private sample pin preview */
(function () {
  "use strict";

  var script = document.currentScript;
  var BASE = script && script.src ? script.src.replace(/[^\/]*(\?.*)?$/, "") : "https://sixcrd-widgets.pages.dev/pincrd/preview/";
  var IMAGES = BASE.replace(/preview\/$/, "images/");
  var HOURS_JS = BASE.replace(/pincrd\/preview\/$/, "shared/open-close/status.js");
  var TZ = "America/Los_Angeles";

  var CSS = [
    ".pcv,.pcv *{box-sizing:border-box}",
    "body{margin:0;background:#F1F1F1}",
    ".pcv{max-width:520px;margin:0 auto;padding:0 0 32px;color:#333333;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif}",
    ".pcv-banner{background:#29547E;color:#FFFFFF;padding:14px 18px;font-size:13.5px;line-height:1.45}",
    ".pcv-banner strong{display:block;font-size:15px;margin-bottom:2px}",
    ".pcv-sheet{background:#FFFFFF;border-radius:0 0 14px 14px;overflow:hidden;box-shadow:0 6px 24px rgba(0,0,0,.08)}",
    ".pcv-hero{position:relative;height:230px;background:#F1F1F1}",
    ".pcv-hero img.pcv-photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}",
    ".pcv-emoji{position:absolute;inset:0;display:grid;place-items:center;font-size:56px}",
    ".pcv-logo{position:absolute;left:17px;bottom:-34px;z-index:4;width:72px;height:72px;border-radius:14px;object-fit:contain;background:#FFFFFF;border:3px solid #FFFFFF;box-shadow:0 4px 14px rgba(0,0,0,.18)}",
    ".pcv-body{padding:18px 17px 22px}",
    ".pcv-body.pcv-pad{padding-top:48px}",
    ".pcv-tags{display:flex;flex-wrap:wrap;gap:5px;margin:0 0 8px}",
    ".pcv-tag{font-size:10.5px;font-weight:700;line-height:1;padding:5px 8px;border-radius:20px;border:1px solid #29547E}",
    ".pcv-area{color:#29547E;background:transparent}",
    ".pcv-slot{color:#29547E;background:transparent;border-style:dashed}",
    ".pcv h1{font-size:23px;line-height:1.15;margin:4px 0 6px}",
    ".pcv h2{font-size:15.5px;margin:0 0 8px;color:#666666}",
    ".pcv-about{color:#666666;font-size:14px;line-height:1.5;margin:0}",
    ".pcv-guide{display:block;border:1.5px dashed #29547E;border-radius:10px;background:#F4F7FB;padding:10px 12px;color:#29547E}",
    ".pcv-guide b{display:block;font-size:13.5px;margin-bottom:3px}",
    ".pcv-guide span{display:block;font-size:12.5px;line-height:1.45;color:#3d5a78}",
    ".pcv h1 .pcv-guide{font-size:inherit}",
    ".pcv section{border-top:1px solid #DDDDDD;padding-top:14px;margin-top:16px}",
    ".pcv-eyebrow{font-size:11px;color:#29547E;font-weight:850;letter-spacing:.12em;text-transform:uppercase;margin:0 0 8px}",
    ".pcv-fact{margin-top:10px}",
    ".pcv-fact > strong{display:block;font-size:13.5px;margin-bottom:5px}",
    ".pcv-contact{display:block;padding:10px 0;color:#333333;text-decoration:none;border-bottom:1px solid #DDDDDD}",
    ".pcv-contact strong,.pcv-contact span{display:block}",
    ".pcv-contact strong{font-size:14px}",
    ".pcv-contact span{font-size:11.5px;color:#29547E;margin-top:2px}",
    ".pcv-hours{margin:0 0 6px}",
    ".pcv-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:18px}",
    ".pcv-btn{min-height:46px;display:flex;align-items:center;justify-content:center;border:1.5px dashed #29547E;border-radius:6px;font-size:12.5px;font-weight:800;color:#29547E;text-align:center;padding:6px 8px;line-height:1.25}",
    ".pcv-cta{margin:20px 16px 0;padding:16px;border-radius:12px;background:#FFFFFF;border:1px solid #DDDDDD;font-size:14px;line-height:1.5}",
    ".pcv-cta strong{display:block;font-size:15.5px;margin-bottom:4px}",
    ".pcv-cta a{display:inline-flex;align-items:center;justify-content:center;min-height:44px;margin-top:10px;padding:0 18px;border-radius:6px;background:#29547E;color:#FFFFFF;font-weight:800;text-decoration:none}",
    ".pcv-foot{text-align:center;font-size:11.5px;color:#666666;margin:18px 16px 0}",
    ".pcv-ended{max-width:420px;margin:60px auto;padding:24px;background:#FFFFFF;border-radius:12px;text-align:center;font-size:15px;line-height:1.5}",
    ".pcv a:focus-visible{outline:2px solid #29547E;outline-offset:2px}"
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

  function phoneText(p) {
    var d = String(p).replace(/\D/g, "");
    if (d.length === 11 && d[0] === "1") d = d.slice(1);
    return d.length === 10 ? "(" + d.slice(0, 3) + ") " + d.slice(3, 6) + "-" + d.slice(6) : p;
  }

  function addDays(ymd, n) {
    var d = new Date(ymd + "T12:00:00Z"); d.setUTCDate(d.getUTCDate() + n);
    return d.toISOString().slice(0, 10);
  }

  function expiryText(expires) {
    var today = todayLV();
    if (expires === today) return "This sample is available until midnight tonight.";
    if (expires === addDays(today, 1)) return "This sample is available until midnight tomorrow.";
    var d = new Date(expires + "T12:00:00Z");
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return "This sample is available until midnight " + days[d.getUTCDay()] + ", " + months[d.getUTCMonth()] + " " + d.getUTCDate() + ".";
  }

  function guide(title, example) {
    return '<span class="pcv-guide"><b>' + esc(title) + "</b><span>" + esc(example) + "</span></span>";
  }

  function render(root, b) {
    var contact = "";
    var contactEmail = b.contactEmail || "support@sixcrd.com";

    if (!b.expires && b.created) b.expires = addDays(b.created, 1);
    if (b.expires && todayLV() > b.expires) {
      root.innerHTML = '<div class="pcv-ended" role="status"><strong>This sample has ended.</strong><br>Want to see your pin on PinCrd? <a href="mailto:' + esc(contactEmail) + '">Reach out to Douglas</a>.</div>';
      return;
    }

    if (b.hours) {
      var attrs = "";
      ["sun", "mon", "tue", "wed", "thu", "fri", "sat"].forEach(function (k) {
        if (b.hours[k]) attrs += " data-" + k + '="' + esc(b.hours[k]) + '"';
      });
      contact += '<div class="pcv-hours"><div class="sixcrd-hours"' + attrs + ">Hours</div></div>";
      var s = document.createElement("script");
      s.src = HOURS_JS; s.defer = true;
      (document.head || document.documentElement).appendChild(s);
    }
    if (b.phone) {
      contact += '<a class="pcv-contact" href="tel:' + esc(String(b.phone).replace(/[^\d+]/g, "")) + '"><strong>' + esc(phoneText(b.phone)) + "</strong><span>Call business</span></a>";
    }
    if (b.address) {
      contact += '<a class="pcv-contact" href="https://www.google.com/maps/dir/?api=1&amp;destination=' + esc(encodeURIComponent(b.address)) + '" target="_blank" rel="noopener"><strong>' + esc(b.address) + "</strong><span>Get directions</span></a>";
    }

    var photo = b.image ? '<img class="pcv-photo" src="' + esc(IMAGES + b.image) + '" alt="" onerror="this.remove()">' : "";
    var logo = b.logo ? '<img class="pcv-logo" src="' + esc(IMAGES + b.logo) + '" alt="" onerror="this.remove()">' : "";

    root.className = "pcv";
    root.innerHTML =
      '<div class="pcv-banner" role="note"><strong>Sample pin for ' + esc(b.business) + "</strong>Not live. This is a private preview of how your pin could look on PinCrd. The dashed boxes show where your own offer, special, or announcement goes." + (b.expires ? " " + esc(expiryText(b.expires)) : "") + "</div>" +
      '<article class="pcv-sheet" aria-label="Sample pin for ' + esc(b.business) + '">' +
        '<div class="pcv-hero"><span class="pcv-emoji" aria-hidden="true">' + esc(b.emoji || "📌") + "</span>" + photo + logo + "</div>" +
        '<div class="pcv-body' + (b.logo ? " pcv-pad" : "") + '">' +
          '<div class="pcv-tags">' +
            (b.area ? '<span class="pcv-tag pcv-area">' + esc(b.area) + "</span>" : "") +
            '<span class="pcv-tag pcv-slot">Your tag</span><span class="pcv-tag pcv-slot">Your tag</span>' +
          "</div>" +
          "<h1>" + guide("Your headline goes here", b.headlineExample || "Example: Now serving Sunday brunch") + "</h1>" +
          "<h2>" + esc(b.business) + "</h2>" +
          (b.about ? '<p class="pcv-about">' + esc(b.about) + "</p>" : "") +
          "<section>" +
            '<p class="pcv-eyebrow">Details</p>' +
            guide("What's happening", b.detailsExample || "A sentence or two about your special, new item, or event, and when it runs.") +
            '<div class="pcv-fact"><strong>How to get it</strong>' + guide("Tell customers what to do", "Example: Just stop in, book online, or order ahead.") + "</div>" +
            '<div class="pcv-fact"><strong>Good to know</strong>' + guide("Any details or limits", "Example: Weekends only, while supplies last.") + "</div>" +
            '<div class="pcv-fact"><strong>Running through</strong>' + guide("Your end date", "Pins run 7 days, Thursday through Wednesday, or end sooner if you like.") + "</div>" +
          "</section>" +
          (contact ? '<section><p class="pcv-eyebrow">Contact</p>' + contact + "</section>" : "") +
          '<div class="pcv-actions"><span class="pcv-btn">Your button<br>(Book, Order, Menu)</span><span class="pcv-btn">Second button<br>(optional)</span></div>' +
        "</div>" +
      "</article>" +
      '<div class="pcv-cta"><strong>Want to see it with your real offer?</strong>Send your headline, what is happening, and how customers get it, and you will get this same sample back with your offer filled in. No commitment.' +
        '<br><a href="' + esc(b.formUrl || ("mailto:" + contactEmail + "?subject=" + encodeURIComponent("Sample pin details: " + b.business) + "&body=Hi Douglas,%0D%0A%0D%0AHere are my details for a sample pin:%0D%0A%0D%0AHeadline:%0D%0AWhat's happening:%0D%0AHow customers get it:%0D%0AGood to know:%0D%0AEnd date:%0D%0A%0D%0AThanks,")) + '"' + (b.formUrl ? ' target="_blank" rel="noopener"' : "") + '>Send my offer details</a></div>' +
      '<p class="pcv-foot">PinCrd is a product of SixCrd.</p>';
  }

  function start() {
    var root = document.getElementById("pincrd-preview");
    if (!root || !window.PINCRD_PREVIEW) return;
    var st = document.createElement("style");
    st.appendChild(document.createTextNode(CSS));
    (document.head || document.documentElement).appendChild(st);
    render(root, window.PINCRD_PREVIEW);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
