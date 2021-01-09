navbar = {
    init: function () {
        $('input#navbar_toggler').on('click', function () {
            $('body').toggleClass('disable_scroll');
        });
    }
}

$(function () {
    navbar.init();
});