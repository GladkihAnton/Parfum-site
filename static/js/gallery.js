gallery = {
    url: '/gallery_update_content',
    showMoreCards: null,
    filterForm: null,
    quantityCards: 11,
    pending: false,

    init: function () {
        console.log('gallery');
        this.filterForm = $('#gallery_filter_form');
        this.showMoreCards = $('.gallery_download_new_cards');
        console.log(this.filterForm);
        console.log(this.showMoreCards);
        $('.gallery_toggle_block_for_filter').on('click', function () {
            $(this).next().toggle('slow');
        });

        this.showMoreCards.on('click', this.downloadCards.bind(this, this.quantityCards, false));
        this.filterForm.on('submit', this.downloadCards.bind(this, 0, true));
    },

    downloadCards: function (quantity = 0, shouldRemove, e) {
        e.preventDefault();
        let formData = this.filterForm.serializeArray();
        formData.push({'name': 'quantity', 'value': quantity});
        $.ajax({
            url: this.url,
            type: 'GET',
            data: formData,
            beforeSend: function () {
                this.pending = true;
            }.bind(this),
            success: function (data) {
                let cardsWrapper = $('#gallery_card_block .row');
                if (shouldRemove) {
                    cardsWrapper.empty();
                }
                this.addCardsToHtml(data, cardsWrapper);
                this.quantityCards += 11;
                this.pending = false;
            }.bind(this),
            error: function(){
                console.log('ajax error');
            }
        });
    },

    addCardsToHtml: function (data, wrapper) {
        $.each(data, function (k, v) {
            let cardWrapper = $('<div>', {
                class: 'col-12 col-md-4 col-lg-3 col-xl-3 pb-1 gallery_place_for_card'
            });
            let cardBody = $('<div>', {
                class: 'card-body text-center p-0 m-0'
            });
            let cardImg = $('<div>', {
                class: 'card-img-top'
            });
            let img = $('<img>', {
                class: 'gallery_card_img',
                src: v['image']
            });
            let name = $('<h1>', {
                class: 'card-title',
                text: v['name']
            });
            let cost = $('<h2>', {
                class: 'card-text',
                text: v['cost'] + ' рублей'
            });
            let button = $('<a>', {
                class: 'gallery_card_button',
                type: 'button',
                href: '/' + v['id'],
                text: 'ПОДРОБНЕЕ'
            });
            cardImg.append(img);
            cardBody.append(name).append(cost).append(button);
            cardWrapper.append(cardImg).append(cardBody);
            wrapper.append(cardWrapper);
        });
    }
}
$(function () {
    gallery.init();
});
// if ($('#gallery').length > 0) {
//
//     const append_new_cards_to_html = function (data, place_for_card) {
//         $.each(data, function (k, v) {
//             place_for_card.append(
//                 "<div class=\"col-12 col-md-4 col-lg-3 col-xl-3 pb-1 gallery_place_for_card\">" +
//                     "<div class=\"card text-center gallery_card_body pb-1\">" +
//                         "<div class=\"card-img-top\">" +
//                             "<img class=\"gallery_card_img\" src=" + v['image'] + ">"+
//                         "</div>" +
//                         "<div class=\"card-body text-center p-0 m-0\">"+
//                             "<div class=\"card-title m-0\"><h1>" + v['name'] + "</h1></div>" +
//                             "<div class=\"card-text m-0\"><h2>" + v['cost'] + " рублей</h2></div>" +
//                         "</div>" +
//                         "<div class=\"card-body text-center\">" +
//                             "<a type=\"button\" href=\"/" + v['id'] + "\" class=\"gallery_card_button\">ПОДРОБНЕЕ</a>" +
//                         "</div>"+
//                     "</div>"+
//                 "</div>"
//             )
//         });
//     }
//     $(function () {
//         //quantity cards on the page
//         var quantity = 12;
//         //var for ajax progress
//         var inProgress = false;
// const toggle_filters_menu = $('.gallery_toggle_block_for_filter');
//     toggle_filters_menu.on('click', function () {
//         $('.gallery_block_for_filter').toggle('normal');
//     });
//         $('.gallery_download_new_cards').on('click', function () {
//             let form = $(this).attr('data-form');
//             let form_data = $(form).serializeArray();
//                 form_data.push({"name": "quantity", "value": quantity});
//                 $.ajax({
//                     url: "/gallery_update_content",
//                     type: 'GET',
//                     data: form_data,
//                     beforeSend: function () {
//                         inProgress = true;
//                     },
//                     success: function (data) {
//                         let place_for_card = $('#gallery_card_block .row');
//                         append_new_cards_to_html(data, place_for_card);
//                         quantity += 12;
//                         inProgress = false;
//                     },
//                     error: function(){
//                         console.log('ajax error');
//                     }
//                 });
//         });
//         $('.gallery_drop_filter_menu').click(function () {
//             $(this).toggleClass('gallery_drop_filter_menu_up_down');
//             $(this).next().toggle('normal');
//         });
//         $('#gallery_filter_form').on('submit', function (e) {
//             e.preventDefault();
//             const form_data = $(this).serializeArray();
//             $.ajax({
//                 url: $(this).attr('action'),
//                 type: 'GET',
//                 data: form_data,
//                 success: function (data) {
//                     console.log(data);
//                     quantity = 12;
//                     $('.gallery_place_for_card').remove();
//                     let place_for_card = $('#gallery_card_block .row');
//                     append_new_cards_to_html(data, place_for_card);
//                 },
//                 error: function () {
//                     console.log('error');
//                 }
//             })
//         })
//     });
// }