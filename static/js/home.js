home = {
    mailSendingUrl: '/send_question_mail',

    modalWrapper: null,
    modalForm: null,

    init: function() {

        console.log('init');
        this.modalWrapper = $('#mail_modal');
        this.modalForm = $('form', this.modalWrapper);

        this.modalWrapper.on('hide.bs.modal', this.clearModal.bind(this));

        this.modalForm.on('submit', this.sendMail.bind(this)) ;
    },

    sendMail: function(e) {
        e.preventDefault();
        let formData = this.modalForm.serializeArray();

        $('.spinner-border', this.modalForm).addClass('home_question_sending');
        console.log(formData);
        $.ajax({
            url: this.mailSendingUrl,
            type: 'POST',
            data: formData,
            success: function (data) {
                this.modalWrapper.modal('hide');
            }.bind(this),
            error: function(){
                console.log('ajax error');
            }
        });
    },

    clearModal: function() {
        $('.spinner-border', this.modalForm).removeClass('home_question_sending');
        this.modalForm.closest('form').find("input[type='email'], textarea").val("");
    }
}
$(function () {
    home.init();
});

// var KEY_FOR_IMG_SLIDER = true;
// var KEY_FOR_CARD_SLIDER = true;
// var KEY_FOR_COPY = true;
//
// $('#upload_csv').on('submit', function (e) {
//     e.preventDefault();
//     var form = new FormData($(this).get(0));
//     $.ajax({
//         url: $(this).attr('action'),
//         type: 'POST',
//         data: form,
//         cache: false,
//         processData: false,
//         contentType: false,
//         success: function () {
//             console.log('ypa');
//         },
//         error: function () {
//             console.log('bad');
//         }
//     })
// });
// //filter and checkboxs in gallery

// if ($('#product').length > 0) {
//     let product_image_in_block = $('.product_image_in_block');
//     product_image_in_block.first().addClass('product_current_image').next().css('opacity', 0.8);
//     $('.product_slide_image_right').on('click', function () {
//         var current_image = $('.product_current_image');
//         var next_image = current_image.next().next().next().length > 0 ?
//             current_image.next().next() : $('.product_image_in_block').first();
//         current_image.animate({opacity: 0}, 1000).removeClass('product_current_image')
//             .next().animate({opacity: 0.3}, 1000);
//         next_image.animate({opacity: 1}, 1000).addClass('product_current_image')
//             .next().animate({opacity: 0.8}, 1000);
//     });
//     $('.product_slide_image_left').on('click', function () {
//         var current_image = $('.product_current_image');
//         var prev_image = current_image.prev().prev().prev().length > 0 ?
//             current_image.prev().prev() : $('.product_image_in_block').last();
//         current_image.animate({opacity: 0}, 1000).removeClass('product_current_image')
//             .next().animate({opacity: 0.3}, 1000);
//         prev_image.animate({opacity: 1}, 1000).addClass('product_current_image')
//             .next().animate({opacity: 0.8}, 1000);
//     });
//
// }