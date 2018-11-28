function graph() {
    baseUrl = "https://widgets.cryptocompare.com/";
    var scripts = document.getElementsByTagName("script");
    var embedder = scripts[scripts.length - 1];
    var cccTheme = { "General": { "showExport": true } };
    (function() {
        var appName = encodeURIComponent(window.location.hostname);
        if (appName == "") {
            appName = "local";
        }
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        var theUrl = baseUrl + `serve/v3/coin/chart?fsym=XRP&tsyms=USD,EUR,CNY,GBP`;
        s.src = theUrl + (theUrl.indexOf("?") >= 0 ? "&" : "?") + "app=" + appName;
        embedder.parentNode.appendChild(s);
    })();
}


graph();