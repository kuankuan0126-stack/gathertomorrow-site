/* Gather Tomorrow language selection.
   English pages live at the site root. Traditional Chinese pages live under /zh/.
   First visit: any browser language starting with "zh" gets Chinese; anything else gets English.
   The header control saves "zh" or "en" in localStorage under gt-lang, and that choice wins later.
   The same page (home or tools) and any hash or query are kept, so deep links still land in the right place.
   A one-step guard avoids bouncing back and forth if the destination disagrees. */
(function () {
  "use strict";

  var STORAGE_KEY = "gt-lang";
  var GUARD_KEY = "gt-lang-guard";

  function storageGet(store, key) {
    try {
      return store.getItem(key);
    } catch (err) {
      return null;
    }
  }

  function storageSet(store, key, value) {
    try {
      store.setItem(key, value);
    } catch (err) {}
  }

  function storageRemove(store, key) {
    try {
      store.removeItem(key);
    } catch (err) {}
  }

  function normKey(value) {
    var raw = String(value || "");
    var q = raw.indexOf("?");
    var path = q === -1 ? raw : raw.slice(0, q);
    var search = q === -1 ? "" : raw.slice(q);
    if (path.length > 1 && path.charAt(path.length - 1) === "/") path = path.slice(0, -1);
    if (!path) path = "/";
    return path + search;
  }

  function parsePath(pathname) {
    var parts = String(pathname || "/").split("/").filter(Boolean);
    if (parts.length && parts[parts.length - 1].toLowerCase() === "index.html") parts.pop();
    var page = "home";
    var slug = "";
    if (parts.length >= 2 && parts[parts.length - 2] === "notes") {
      slug = parts.pop();
      parts.pop();
      page = "note";
    }
    if (parts.length && parts[parts.length - 1] === "tools") {
      page = "tools";
      parts.pop();
    }
    var lang = "en";
    if (parts.length && parts[parts.length - 1] === "zh") {
      lang = "zh";
      parts.pop();
    }
    var root = "/" + parts.join("/");
    if (root.charAt(root.length - 1) !== "/") root += "/";
    return { lang: lang, page: page, root: root, slug: slug };
  }

  function buildPath(rootPath, lang, page, slug) {
    var url = rootPath || "/";
    if (url.charAt(url.length - 1) !== "/") url += "/";
    if (lang === "zh") url += "zh/";
    if (page === "tools") url += "tools/";
    if (page === "note" && slug) url += "notes/" + slug + "/";
    return url;
  }

  function preferredFromLanguages(languages) {
    var list = languages || [];
    for (var i = 0; i < list.length; i++) {
      var tag = String(list[i] || "").trim();
      if (!tag) continue;
      return /^zh([\-_]|$)/i.test(tag) ? "zh" : "en";
    }
    return "en";
  }

  function shouldRedirect(currentKey, destKey, guard) {
    if (destKey === currentKey) return false;
    if (guard != null && guard !== "" && normKey(guard) === currentKey) return false;
    return true;
  }

  function isBackForward() {
    try {
      var entries = performance.getEntriesByType("navigation");
      return !!(entries[0] && entries[0].type === "back_forward");
    } catch (err) {
      return false;
    }
  }

  var api = {
    STORAGE_KEY: STORAGE_KEY,
    normKey: normKey,
    parsePath: parsePath,
    buildPath: buildPath,
    preferredFromLanguages: preferredFromLanguages,
    shouldRedirect: shouldRedirect
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
    return;
  }

  function browserLanguages() {
    if (navigator.languages && navigator.languages.length) return navigator.languages;
    return [navigator.language || navigator.userLanguage || ""];
  }

  function preferredLang() {
    var saved = storageGet(localStorage, STORAGE_KEY);
    if (saved === "zh" || saved === "en") return saved;
    return preferredFromLanguages(browserLanguages());
  }

  document.addEventListener("click", function (event) {
    var node = event.target;
    while (node && node !== document) {
      if (node.getAttribute && node.getAttribute("data-set-lang")) {
        var chosen = node.getAttribute("data-set-lang");
        if (chosen === "zh" || chosen === "en") {
          storageSet(localStorage, STORAGE_KEY, chosen);
          storageRemove(sessionStorage, GUARD_KEY);
        }
        return;
      }
      node = node.parentNode;
    }
  }, true);

  var here = parsePath(location.pathname);
  var want = preferredLang();
  if (want !== here.lang && !isBackForward()) {
    var destPath = buildPath(here.root, want, here.page, here.slug);
    // File URLs (raw previews, /index.html) must stay on a real file.
    // Directory hosts (GitHub Pages, Firebase, a local server) keep /zh/ and /tools/.
    if (/\.html$/i.test(location.pathname)) destPath += "index.html";
    var currentKey = normKey(location.pathname + location.search);
    var destKey = normKey(destPath + location.search);
    var guard = storageGet(sessionStorage, GUARD_KEY);
    if (shouldRedirect(currentKey, destKey, guard)) {
      storageSet(sessionStorage, GUARD_KEY, destKey);
      location.replace(destPath + location.search + location.hash);
    }
  } else {
    storageRemove(sessionStorage, GUARD_KEY);
  }
})();
