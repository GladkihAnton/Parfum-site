gallery = {
    url: '/gallery_update_content',
    showMoreCards: null,
    filterForm: null,
    quantityCards: 12,
    pending: false,
    makers: {},

    init: function () {
        this.filterForm = $('#gallery_filter_form');
        this.showMoreCards = $('.gallery_download_new_cards');
        $('.gallery_toggle_block_for_filter').on('click', function () {
            $(this).next().toggle('normal');
        });

        this.showMoreCards.on('click', this.downloadCards.bind(this, false));
        this.filterForm.on('submit', this.downloadCards.bind(this, true));

        $('.gallery_close').on('click', function (){
            $('.gallery_mobile_block_for_filter').toggle('normal');
        });

        this.fillMakers();

        $('.gallery_filter_maker_search').on('input', this.searchByMakers.bind(this));
    },

    downloadCards: function (shouldRemove, e) {
        e.preventDefault();
        $('#gallery_card_block .spinner-border').addClass('gallery_ajax_sending');
        let windowHeight = $(window).scrollTop();

        let formData = this.filterForm.serializeArray();
        if (shouldRemove) {
            this.quantityCards = 0;
        }
        formData.push({'name': 'quantity', 'value': this.quantityCards});
        $.ajax({
            url: this.url,
            type: 'POST',
            data: formData,
            beforeSend: function () {
                this.pending = true;
            }.bind(this),
            success: function (data) {
                $('#gallery_card_block .spinner-border').removeClass('gallery_ajax_sending');
                let cardsWrapper = $('#gallery_card_block .row');
                if (shouldRemove) {
                    cardsWrapper.empty();
                }
                this.addCardsToHtml(data, cardsWrapper);
                $(window).scrollTop(windowHeight);

                this.quantityCards += 12;
                this.pending = false;
            }.bind(this),
            error: function(){
                console.log('ajax error');
                $('#gallery_card_block .spinner-border').removeClass('gallery_ajax_sending');
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
    },

    fillMakers: function () {
        $('#id_checkboxes_makers li label').each(function (index, elem) {
            var makerElem = $(elem);
            this.makers[makerElem.text().trim().toUpperCase()] = makerElem;
        }.bind(this));
    },

    searchByMakers: function (e) {
        for (var maker in this.makers) {
            var searchedMaker = $(e.currentTarget).val().toUpperCase();
            this.makers[maker].toggle(maker.startsWith(searchedMaker));
            if (maker.startsWith(searchedMaker)) {
                console.log(maker);
                console.log(searchedMaker);
            }

        }
    }
}
$(function () {
    gallery.init();
});