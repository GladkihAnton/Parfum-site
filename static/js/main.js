main = {
    domain: window.location.hostname,

    init: function () {
        this.include('/static/js/search.js');
        this.include('/static/js/navbar.js');

        if (window.location.pathname === '/gallery') {
            this.include('/static/js/gallery.js');
        } else if (window.location.pathname === '/') {
            this.include('/static/js/home.js');
        } else {
            this.include('/static/js/product.js');
        }
    },

    include: function (path) {
        var script = document.createElement('script');
        script.src = '//' + window.location.hostname + path;
        document.getElementsByTagName('head')[0].appendChild(script);
    }
}
$(function () {
    main.init();
});