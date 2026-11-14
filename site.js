/* Annet Planet - shared scripts (no dependencies).
   Language and page type come from <body data-lang="eng|cat" data-page="comic|archive|other">. */
(function () {
    "use strict";

    // Force https on the production domain
    if (location.hostname === "annetplanet.com" && location.protocol !== "https:") {
        location.protocol = "https:";
    }

    var body = document.body;
    var lang = body.dataset.lang || "eng";
    var page = body.dataset.page || "other";
    var other = lang === "eng" ? "cat" : "eng";

    // Paths that differ between languages
    var SLUG = {eng: {artist: "artist", archive: "archive"}, cat: {artist: "artista", archive: "arxiu"}};

    var total = 0, current = 0;

    function webp(n) { return "/comics_web/" + lang + "/" + n + ".webp"; }
    function thumb(n) { return "/comics_web/" + lang + "/t" + n + ".webp"; }
    function comicUrl(l, n) { return "/" + l + "/cmc/comic" + n + "/"; }

    function loadTotal() {
        return fetch("/num_last_" + lang + ".txt", {cache: "no-cache"})
            .then(function (r) { return r.text(); })
            .then(function (t) { total = parseInt(t, 10) || 1; });
    }

    // ---------- language switch ----------
    function updateLangLink() {
        var a = document.getElementById("lang-switch");
        if (!a) return;
        var path = location.pathname.replace("/" + lang + "/", "/" + other + "/");
        path = path.replace("/" + SLUG[lang].artist, "/" + SLUG[other].artist)
                   .replace("/" + SLUG[lang].archive, "/" + SLUG[other].archive);
        a.href = path;
    }

    // ---------- comic viewer ----------
    function readIdFromUrl() {
        var m = location.pathname.match(/comic(\d+)/i);
        return m ? parseInt(m[1], 10) : total;
    }

    function preload(n) {
        if (n >= 1 && n <= total) { new Image().src = webp(n); }
    }

    function show(n, push) {
        current = Math.min(Math.max(n, 1), total);
        var img = document.getElementById("displayComic");
        img.src = webp(current);
        img.alt = "Comic " + current;
        document.getElementById("first").disabled = document.getElementById("prev").disabled = current === 1;
        document.getElementById("last").disabled = document.getElementById("next").disabled = current === total;
        document.title = "Annet Planet - Comic " + current;
        var url = comicUrl(lang, current);
        if (push && location.pathname !== url) history.pushState({n: current}, "", url);
        updateLangLink();
        preload(current + 1);
        preload(current - 1);
    }

    function initComic() {
        var $ = function (id) { return document.getElementById(id); };
        $("first").onclick = function () { show(1, true); };
        $("prev").onclick = function () { show(current - 1, true); };
        $("next").onclick = $("displayComic").onclick = function () { show(current + 1, true); };
        $("last").onclick = function () { show(total, true); };
        $("rand").onclick = function () {
            var r;
            do { r = Math.floor(Math.random() * total) + 1; } while (r === current && total > 1);
            show(r, true);
        };
        document.addEventListener("keydown", function (e) {
            if (e.altKey || e.ctrlKey || e.metaKey) return;
            if (e.key === "ArrowLeft") show(current - 1, true);
            if (e.key === "ArrowRight") show(current + 1, true);
        });
        window.addEventListener("popstate", function () { show(readIdFromUrl(), false); });
        show(readIdFromUrl(), false);
    }

    // ---------- archive ----------
    function initArchive() {
        var row = document.getElementById("row-archive");
        var frag = document.createDocumentFragment();
        for (var n = total; n > 0; n--) {
            var a = document.createElement("a");
            a.href = comicUrl(lang, n);
            var img = new Image();
            img.src = thumb(n);
            img.loading = "lazy";
            img.decoding = "async";
            img.width = 480;
            img.height = 480;
            img.alt = "Comic " + n;
            a.appendChild(img);
            frag.appendChild(a);
        }
        row.appendChild(frag);
    }

    if (page === "comic" || page === "archive") {
        loadTotal().then(page === "comic" ? initComic : initArchive);
    }
    updateLangLink();
})();
