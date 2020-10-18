product = {
    imageWrapper: null,
    selectedImage: null,
    selectedIcon: null,

    init: function () {
        this.imageWrapper = $('.product_block_for_images');
        this.selectedImage = $('.product_selected_image', this.imageWrapper);
        this.selectedIcon = $('.product_selected_icon');

        $('.product_slide_image_left').click(this.slideImage.bind(this, false));
        $('.product_slide_image_right').click(this.slideImage.bind(this, true));

        $('.product_clickable_image').click(this.selectImage.bind(this));
    },

    slideImage: function (toRight) {
        this.selectedImage.removeClass('product_selected_image');
        this.selectedIcon.removeClass('product_selected_icon');

        this.selectedImage = toRight ? this.getNextElem(this.selectedImage) : this.getPrevElem(this.selectedImage);
        this.selectedIcon = toRight ? this.getNextElem(this.selectedIcon) : this.getPrevElem(this.selectedIcon);

        this.selectedImage.addClass('product_selected_image');
        this.selectedIcon.addClass('product_selected_icon');
    },

    getNextElem: function (elem) {
        return elem.next('li').length > 0 ? elem.next() : elem.siblings('li').first();
    },

    getPrevElem: function (elem) {
        return elem.prev('li').length > 0 ? elem.prev() : elem.siblings('li').last();
    },

    selectImage: function (e) {
        this.selectedIcon.removeClass('product_selected_icon');
        this.selectedImage.removeClass('product_selected_image');

        this.selectedIcon = $(e.currentTarget).parent();
        this.selectedImage = $(this.imageWrapper.children('li').get(this.selectedIcon.index()));

        this.selectedIcon.addClass('product_selected_icon');
        this.selectedImage.addClass('product_selected_image');
    }
};

$(function () {
    product.init();
});