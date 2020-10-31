gallery = {
    url: '/gallery_update_content',
    showMoreCards: null,
    filterForm: null,
    quantityCards: 12,
    pending: false,

    init: function () {
        this.filterForm = $('#gallery_filter_form');
        this.showMoreCards = $('.gallery_download_new_cards');
        $('.gallery_toggle_block_for_filter').on('click', function () {
            $(this).next().toggle('slow');
        });

        this.showMoreCards.on('click', this.downloadCards.bind(this, false));
        this.filterForm.on('submit', this.downloadCards.bind(this, true));
    },

    downloadCards: function (shouldRemove, e) {
        e.preventDefault();
        let formData = this.filterForm.serializeArray();
        if (shouldRemove) {
            this.quantityCards = 0;
        }
        formData.push({'name': 'quantity', 'value': this.quantityCards});
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
                this.quantityCards += 12;
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
    $('#upload_csv').on('submit', function (e) {
        e.preventDefault();
        var form = new FormData($('#upload_csv').get(0));
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
});