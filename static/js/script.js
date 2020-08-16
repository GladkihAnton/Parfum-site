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


//navbar
// function myFunction() {
//     if (KEY_FOR_COPY) {
//         KEY_FOR_COPY = false;
//         var ta = document.getElementById('mail'); 	//производим его выделение
//         var range = document.createRange();
//         range.selectNode(ta);
//         window.getSelection().addRange(range);
//         var copyBlock = $('.copyBlock')
//         //пытаемся скопировать текст в буфер обмена
//         try {
//             document.execCommand('copy');
//             copyBlock.css({opacity: 1});
//         } catch (err) {
//             console.log('Can`t copy, boss');
//         }
//         //очистим выделение текста, чтобы пользователь "не парился"
//         window.getSelection().removeAllRanges();
//         copyBlock.animate({opacity: 0}, 1000);
//         setTimeout(function () {
//             KEY_FOR_COPY = true
//         }, 1100);
//     }
// };
// var navbar = document.getElementById("fixed_nav");
// var height_of_nav = navbar.offsetTop;
// window.onscroll = function () {
//     fixing_function()
// };

// function fixing_function() {
//     if (window.pageYOffset >= height_of_nav - 7) {
//         navbar.classList.add("fix");
//     } else {
//         navbar.classList.remove("fix");
//     }
// }

$(function () {
    $('.fixed_nav_low_width').click(function () {
        $('.fixed_nav_low_width').toggleClass('fixed_nav_low_width_up_down');
        $('.item_in_fixed_nav').toggle('normal');
    });
});
//end_navbar
if ($('#main').length > 0) {
//slider
    function slider() {
        setInterval(slideNext, 5000);
    };

    function slideNext(e) {
        if (KEY_FOR_IMG_SLIDER) {
            KEY_FOR_IMG_SLIDER = false;
            var image = $('div.slider ul.p-0 li img.showImage');
            var nextImage = (e != undefined ? $('div.slider ul.p-0 li img').eq(e) : (image.parent().next().length ? image.parent().next().children('img') : $('div.slider ul.p-0 li:first img')));
            var block = $('div.showBlock');
            var nextBlock = (e != undefined ? $('div ul.sliderBlockList li div').eq(e) : (block.parent().next().length ? block.parent().next().children() : $('div ul.sliderBlockList li:first div')));
            nextImage.css('left', '80vw')
                .animate({left: '-=80vw'}, 1500);
            image.animate({left: '-=80vw'}, 1500)
                .css('left', '80vw')
                .removeClass("showImage");
            nextImage.addClass("showImage");
            nextBlock.addClass('showBlock');
            block.removeClass('showBlock');
            setTimeout(function () {
                KEY_FOR_IMG_SLIDER = true
            }, 1500);
        }
        ;
    };

    function slidePrev(e) {
        if (KEY_FOR_IMG_SLIDER) {
            KEY_FOR_IMG_SLIDER = false;
            var image = $('div.slider ul.p-0 li img.showImage');
            var prevImage = (e != undefined ? $('div.slider ul.p-0 li img').eq(e) : (image.parent().prev().length ? image.parent().prev().children('img') : $('div.slider ul.p-0 li:last img')));
            var block = $('div.showBlock');
            var prevBlock = (e != undefined ? $('div ul.sliderBlockList li div').eq(e) : (block.parent().prev().length ? block.parent().prev().children() : $('div ul.sliderBlockList li:last div')));

            prevImage.css('left', '-80vw')
                .animate({left: '+=80vw'}, 1500);
            image.animate({left: '+=80vw'}, 1500)
                .css('left', '80vw')
                .removeClass("showImage");
            prevImage.addClass("showImage");
            prevBlock.addClass('showBlock');
            block.removeClass('showBlock');
            setTimeout(function () {
                KEY_FOR_IMG_SLIDER = true
            }, 1500);
        }
        ;
    };
    $('.leftButton').on('click', function () {
        slidePrev();
    });
    $('.rightButton').on('click', function () {
        slideNext();
    });
    $('.sliderBlock').on('click', function () {
        var number = $(this).parent().index();
        var current = $('.showBlock').parent().index();
        if (current > number)
            slidePrev(number);
        else if (current < number)
            slideNext(number);

    });
    $(function () {
        setTimeout(slider, 3000);
    });
//Конец слайдера
// Слайдер для фоток товара
    var quantity_of_vintage_cards = $('.slider_vintage_card li').length;
    var nmb_of_current_vintage_card = 1;

    function slide_vintage_card_prev(width, quantity) {
        if (KEY_FOR_CARD_SLIDER) {
            KEY_FOR_CARD_SLIDER = false;
            $(".slider_vintage_card").animate({left: '+=' + width}, 1000);
            nmb_of_current_vintage_card -= quantity;
            setTimeout(function () {
                KEY_FOR_CARD_SLIDER = true;
            }, 1000);
        }
    }

    function slide_vintage_card_next(width, quantity) {
        if (KEY_FOR_CARD_SLIDER) {
            KEY_FOR_CARD_SLIDER = false
            $(".slider_vintage_card").animate({left: '-=' + width}, 1000);
            nmb_of_current_vintage_card += quantity;
            setTimeout(function () {
                KEY_FOR_CARD_SLIDER = true
            }, 1000);
        }
    }

    $(function () {
        // setInterval(slideCard, 1500);
        // slideCard();
    });
    $('.left_vintage_slide').on('click', function (e) {
        const w = $('.row_vintage_card').css('width');
        const quantity_of_cards_on_page = parseInt(parseInt(w) / 300);
        console.log(quantity_of_cards_on_page);
        if (nmb_of_current_vintage_card > 1) {
            slide_vintage_card_prev(w, quantity_of_cards_on_page);
        }
    });
    $('.right_vintage_slide').on('click', function (e) {
        const w = $('.row_vintage_card').css('width');
        const quantity_of_cards_on_page = parseInt(parseInt(w) / 300);
        console.log(nmb_of_current_vintage_card, quantity_of_vintage_cards, quantity_of_cards_on_page);
        if (nmb_of_current_vintage_card <= quantity_of_vintage_cards - quantity_of_cards_on_page) {
            slide_vintage_card_next(w, quantity_of_cards_on_page);
        }
    });
    var quantity_of_catalog_cards = $('.slider_vintage_card li').length;
    var nmb_of_current_vintage_card = 1;

    function slide_vintage_card_prev(width, quantity) {
        if (KEY_FOR_CARD_SLIDER) {
            KEY_FOR_CARD_SLIDER = false;
            $(".slider_vintage_card").animate({left: '+=' + width}, 1000);
            nmb_of_current_vintage_card -= quantity;
            setTimeout(function () {
                KEY_FOR_CARD_SLIDER = true;
            }, 1000);
        }
    }

    function slide_vintage_card_next(width, quantity) {
        if (KEY_FOR_CARD_SLIDER) {
            KEY_FOR_CARD_SLIDER = false
            $(".slider_vintage_card").animate({left: '-=' + width}, 1000);
            nmb_of_current_vintage_card += quantity;
            setTimeout(function () {
                KEY_FOR_CARD_SLIDER = true
            }, 1000);
        }
    }

    $(function () {
        // setInterval(slideCard, 1500);
        // slideCard();
    });
    $('.left_vintage_slide').on('click', function (e) {
        const w = $('.row_vintage_card').css('width');
        const quantity_of_cards_on_page = parseInt(parseInt(w) / 300);
        console.log(quantity_of_cards_on_page);
        if (nmb_of_current_vintage_card > 1) {
            slide_vintage_card_prev(w, quantity_of_cards_on_page);
        }
    });
    $('.right_vintage_slide').on('click', function (e) {
        const w = $('.row_vintage_card').css('width');
        const quantity_of_cards_on_page = parseInt(parseInt(w) / 300);
        console.log(nmb_of_current_vintage_card, quantity_of_vintage_cards, quantity_of_cards_on_page);
        if (nmb_of_current_vintage_card <= quantity_of_vintage_cards - quantity_of_cards_on_page) {
            slide_vintage_card_next(w, quantity_of_cards_on_page);
        }
    });
}
//filter and checkboxs in gallery
if ($('#gallery').length > 0) {
    const toggle_filters_menu = $('.gallery_toggle_block_for_filter');
    toggle_filters_menu.on('click', function () {
        $('.gallery_block_for_filter').toggle('normal');
    });
    const append_new_cards_to_html = function (data, place_for_card) {
        $.each(data, function (k, v) {
            place_for_card.append(
                "<div class=\"col-12 col-md-4 col-lg-4 col-xl-3 p-0 m-0 galleryCard\">" +
                    "<a href=\"/" + v['id'] + "\">" +
                        "<div class=\"card text-center cardforproduct m-auto\">" +
                            "<div class=\"card-img-top\">" +
                                "<img class=\"img-card\" src=" + v['image'] + ">" +
                            "</div>" +
                            "<div class=\"card-body\">" +
                                "<div class=\"card-title\"><h1>" + v['name'] + "</h1></div>" +
                                "<div class=\"card-text\"><h2>" + v['cost'] + " р.</h2></div>" +
                            "</div" +
                        "</div>" +
                    "</a>" +
                "</div>"
            )
        });
    }
    $(function () {
        //quantity cards on the page
        var quantity = 12;
        //var for ajax progress
        var inProgress = false;
        $(window).scroll(function () {
            if ($(window).scrollTop() + $(window).height() >= $(document).height() - 200 && !inProgress) {
                let form_data = $('#gallery_filter_form').serializeArray();
                form_data.push({"name": "quantity", "value": quantity});
                $.ajax({
                    url: "/gallery_update_content",
                    type: 'GET',
                    data: form_data,
                    beforeSend: function () {
                        inProgress = true;
                    },
                    success: function (data) {
                        const place_for_card = $('.gallery_place_for_cards');
                        append_new_cards_to_html(data, place_for_card);
                        quantity += 12;
                        inProgress = false;
                    }
                })
            }
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
                    quantity = 12;
                    $('.galleryCard').remove();
                    const place_for_card = $('.gallery_place_for_cards');
                    append_new_cards_to_html(data, place_for_card);
                },
                error: function () {
                    console.log('error');
                }
            })
        })
    });
}
if ($('#page_for_product').length > 0) {
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