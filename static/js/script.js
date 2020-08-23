var KEY_FOR_IMG_SLIDER = true;
var KEY_FOR_CARD_SLIDER = true;
var KEY_FOR_COPY = true;

$('#upload_csv').on('submit', function (e) {
    e.preventDefault();
    var form = new FormData($(this).get(0));
    $.ajax({
        url: $(this).attr('action'),
        type: 'POST',
        data: form,
        cache: false,
        processData: false,
        contentType: false,
        success: function () {
            console.log('ypa');
        },
        error: function () {
            console.log('bad');
        }
    })
});
//filter and checkboxs in gallery
if ($('#gallery').length > 0) {
    const toggle_filters_menu = $('.gallery_toggle_block_for_filter');
    toggle_filters_menu.on('click', function () {
        $('.gallery_block_for_filter').toggle('normal');
    });
    const append_new_cards_to_html = function (data, place_for_card) {
        $.each(data, function (k, v) {
            place_for_card.append(
                "<div class=\"col-12 col-md-4 col-lg-3 col-xl-3 pb-1 gallery_place_for_card\">" +
                    "<div class=\"card text-center gallery_card_body pb-1\">" +
                        "<div class=\"card-img-top\">" +
                            "<img class=\"gallery_card_img\" src=" + v['image'] + ">"+
                        "</div>" +
                        "<div class=\"card-body text-center p-0 m-0\">"+
                            "<div class=\"card-title m-0\"><h1>" + v['name'] + "</h1></div>" +
                            "<div class=\"card-text m-0\"><h2>" + v['cost'] + " рублей</h2></div>" +
                        "</div>" +
                        "<div class=\"card-body text-center\">" +
                            "<a type=\"button\" href=\"/" + v['id'] + "\" class=\"gallery_card_button\">ПОДРОБНЕЕ</a>" +
                        "</div>"+
                    "</div>"+
                "</div>"
            )
        });
    }
    $(function () {
        //quantity cards on the page
        var quantity = 12;
        //var for ajax progress
        var inProgress = false;
        $('.gallery_upload_new_cards').on('click', function () {
            let form = $(this).attr('data-form');
            let form_data = $(form).serializeArray();
                form_data.push({"name": "quantity", "value": quantity});
                $.ajax({
                    url: "/gallery_update_content",
                    type: 'GET',
                    data: form_data,
                    beforeSend: function () {
                        inProgress = true;
                    },
                    success: function (data) {
                        let place_for_card = $('#gallery_card_block .row');
                        append_new_cards_to_html(data, place_for_card);
                        quantity += 12;
                        inProgress = false;
                    },
                    error: function(){
                        console.log('ajax error');
                    }
                })
        });
        $('.gallery_drop_filter_menu').click(function () {
            $(this).toggleClass('gallery_drop_filter_menu_up_down');
            $(this).next().toggle('normal');
        });
        $('#gallery_filter_form').on('submit', function (e) {
            e.preventDefault();
            const form_data = $(this).serializeArray();
            $.ajax({
                url: $(this).attr('action'),
                type: 'GET',
                data: form_data,
                success: function (data) {
                    console.log(data);
                    quantity = 12;
                    $('.gallery_place_for_card').remove();
                    let place_for_card = $('#gallery_card_block .row');
                    append_new_cards_to_html(data, place_for_card);
                },
                error: function () {
                    console.log('error');
                }
            })
        })
    });
}
if ($('#product').length > 0) {
    let product_image_in_block = $('.product_image_in_block');
    product_image_in_block.first().addClass('product_current_image').next().css('opacity', 0.8);
    $('.product_slide_image_right').on('click', function () {
        var current_image = $('.product_current_image');
        var next_image = current_image.next().next().next().length > 0 ?
            current_image.next().next() : $('.product_image_in_block').first();
        current_image.animate({opacity: 0}, 1000).removeClass('product_current_image')
            .next().animate({opacity: 0.3}, 1000);
        next_image.animate({opacity: 1}, 1000).addClass('product_current_image')
            .next().animate({opacity: 0.8}, 1000);
    });
    $('.product_slide_image_left').on('click', function () {
        var current_image = $('.product_current_image');
        var prev_image = current_image.prev().prev().prev().length > 0 ?
            current_image.prev().prev() : $('.product_image_in_block').last();
        current_image.animate({opacity: 0}, 1000).removeClass('product_current_image')
            .next().animate({opacity: 0.3}, 1000);
        prev_image.animate({opacity: 1}, 1000).addClass('product_current_image')
            .next().animate({opacity: 0.8}, 1000);
    });

}