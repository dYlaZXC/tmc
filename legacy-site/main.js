(function () {
  var cfg = window.TMC_SITE || {};
  var i18n = window.TMC_I18N || {};
  var LANGS = ["kk", "ru", "en"];
  var storageKey = "tmc24_lang";

  function t(lang, key) {
    var pack = i18n[lang] || i18n.ru || {};
    if (pack[key] != null) return pack[key];
    return (i18n.ru && i18n.ru[key]) || key;
  }

  function currentLang() {
    var saved = localStorage.getItem(storageKey);
    return LANGS.indexOf(saved) >= 0 ? saved : "ru";
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function applyStaticI18n(lang) {
    document.documentElement.lang = lang === "kk" ? "kk" : lang;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var val = t(lang, key);
      if (el.tagName === "META") el.setAttribute("content", val);
      else el.textContent = val;
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(lang, el.getAttribute("data-i18n-html"));
    });

    document.querySelectorAll("[data-i18n-content]").forEach(function (el) {
      el.setAttribute("content", t(lang, el.getAttribute("data-i18n-content")));
    });

    document.querySelectorAll("[data-i18n-title]").forEach(function (el) {
      el.setAttribute("title", t(lang, el.getAttribute("data-i18n-title")));
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", t(lang, el.getAttribute("data-i18n-aria")));
    });

    document.querySelectorAll(".languages .lang").forEach(function (btn) {
      var on = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });

    document.title = t(lang, "pageTitle");
  }

  function phones() {
    return (cfg.phones || []).slice();
  }

  function renderContacts() {
    var lang = currentLang();
    var list = phones();
    var callLabel = t(lang, "phoneCall");

    var root = document.querySelector("[data-phones]");
    if (root) {
      root.innerHTML = "";
      list.forEach(function (phone) {
        var a = document.createElement("a");
        a.className = "num";
        a.href = "tel:" + phone.tel;
        a.innerHTML =
          "<span><span class=\"num-label\">" +
          escapeHtml(phone.label) +
          "</span><strong>" +
          escapeHtml(phone.display) +
          "</strong></span><em>" +
          escapeHtml(callLabel) +
          "</em>";
        root.appendChild(a);
      });
    }

    var title = document.getElementById("contacts-title");
    var intro = document.querySelector("[data-contact-root] .alert > div > p");
    var box = document.querySelector("[data-alert-box]");
    if (box) box.classList.add("is-normal");
    if (title) title.textContent = t(lang, "contactsTitle");
    if (intro) intro.textContent = t(lang, "contactsIntro");

    var foot = document.querySelector("[data-foot-phones]");
    if (foot) {
      foot.innerHTML = "";
      list.forEach(function (p) {
        var row = document.createElement("p");
        row.className = "foot-numbers";
        var label = p.labelShort || p.label;
        var a = document.createElement("a");
        a.href = "tel:" + p.tel;
        a.textContent = label + ": " + p.display;
        row.appendChild(a);
        foot.appendChild(row);
      });
    }
  }

  function setLang(lang) {
    if (LANGS.indexOf(lang) < 0) lang = "ru";
    localStorage.setItem(storageKey, lang);
    applyStaticI18n(lang);
    renderContacts();
    setupSocial();
    syncScrollPad();
  }

  function wireSocial(el, url, soonKey) {
    if (!el) return;
    var lang = currentLang();
    if (url) {
      el.href = url;
      el.classList.remove("is-disabled");
      el.removeAttribute("aria-disabled");
      el.onclick = null;
    } else {
      el.href = "#";
      el.classList.add("is-disabled");
      el.setAttribute("aria-disabled", "true");
      el.onclick = function (e) {
        e.preventDefault();
        alert(t(lang, soonKey));
      };
    }
  }

  function setupSocial() {
    var social = cfg.social || {};
    wireSocial(document.getElementById("ig-link"), social.instagram, "igSoon");
    wireSocial(document.getElementById("wa-link"), social.whatsapp, "waSoon");
    wireSocial(document.getElementById("ig-link-foot"), social.instagram, "igSoon");
    wireSocial(document.getElementById("wa-link-foot"), social.whatsapp, "waSoon");
  }

  function setupLang() {
    document.querySelectorAll(".languages .lang").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.getAttribute("data-lang"));
      });
    });
  }

  function setupFaq() {
    document.querySelectorAll(".faq").forEach(function (item) {
      var btn = item.querySelector(".faq-q");
      if (!btn) return;
      btn.addEventListener("click", function () {
        var open = !item.classList.contains("open");
        document.querySelectorAll(".faq.open").forEach(function (other) {
          if (other !== item) {
            other.classList.remove("open");
            var ob = other.querySelector(".faq-q");
            if (ob) ob.setAttribute("aria-expanded", "false");
          }
        });
        item.classList.toggle("open", open);
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });
  }

  function scrollPadPx() {
    var raw = getComputedStyle(document.documentElement).getPropertyValue("--scroll-pad");
    var n = parseFloat(raw);
    return isFinite(n) ? n : 154;
  }

  function syncScrollPad() {
    var header = document.querySelector(".header");
    if (!header) return;
    var gap = 12;
    var h = Math.ceil(header.getBoundingClientRect().height) + gap;
    if (h < 60) return;
    document.documentElement.style.setProperty("--scroll-pad", h + "px");
  }

  function setupScrollPad() {
    syncScrollPad();
    window.addEventListener("resize", syncScrollPad);
    window.addEventListener("orientationchange", function () {
      setTimeout(syncScrollPad, 50);
    });
    if (typeof ResizeObserver !== "undefined") {
      var header = document.querySelector(".header");
      if (header) {
        var ro = new ResizeObserver(function () {
          syncScrollPad();
        });
        ro.observe(header);
      }
    }
  }

  function setupNavActive() {
    var links = document.querySelectorAll(".navlinks a");
    if (!links.length) return;
    var ids = ["about", "consultations", "work", "faq", "contacts"];
    function update() {
      var y = window.scrollY + scrollPadPx();
      var current = "top";
      ids.forEach(function (id) {
        var el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      });
      links.forEach(function (a) {
        var href = a.getAttribute("href") || "";
        var id = href.replace("#", "") || "top";
        a.classList.toggle("is-active", id === current || (current === "top" && href === "#top"));
      });
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function setupAnchorOffset() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = (a.getAttribute("href") || "").slice(1);
      if (!id) return;
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      syncScrollPad();
      var top = target.getBoundingClientRect().top + window.scrollY - scrollPadPx();
      var reduce =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
      if (history.replaceState) {
        history.replaceState(null, "", "#" + id);
      } else {
        location.hash = id;
      }
    });
  }

  function setupHeroCarousel() {
    var slides = document.querySelectorAll(".hero-slide");
    if (slides.length < 2) return;

    var reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    var i = 0;
    var intervalMs = 5500;
    setInterval(function () {
      slides[i].classList.remove("is-active");
      i = (i + 1) % slides.length;
      slides[i].classList.add("is-active");
    }, intervalMs);
  }

  setupFaq();
  setupLang();
  setupScrollPad();
  setupNavActive();
  setupAnchorOffset();
  setupHeroCarousel();
  setLang(currentLang());
  syncScrollPad();
})();
