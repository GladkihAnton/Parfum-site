main = {
    init: function() {
        if (window.location.pathname === '/gallery') {
            this.include('static/js/gallery.js');
        } else {
            this.include('static/js/home.js');
        }
    },

    include: function (url) {
        var script = document.createElement('script');
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    }
}
$(function () {
    main.init();
});