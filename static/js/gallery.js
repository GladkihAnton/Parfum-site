gallery = {
    url: '/gallery_update_content',
    cardsOnPage: 12,
    pending: false,
    makers: {},

    showMoreCardsWrapper: null,
    spinnerWrapper: null,
    filterForm: null,

    init: function () {
        this.filterForm = $('#gallery_filter_form');
        this.showMoreCardsWrapper = $('.gallery_download_new_cards');
        this.spinnerWrapper = $('#gallery_card_block .spinner-border');

        $('.gallery_toggle_block_for_filter').on('click', function () {
            $(this).next().toggle('normal');
            if ($(this).hasClass('mobile')) {
                $('body').addClass('disable_scroll');
            }
        });

        this.showMoreCardsWrapper.on('click', this.downloadCards.bind(this, false));
        this.filterForm.on('submit', this.downloadCards.bind(this, true));

        $('.gallery_close').on('click', this.closeFilter);

        this.fillMakers();

        const urlParams = new URLSearchParams(window.location.search);
        const makerParam = urlParams.get('maker');

        if (makerParam && this.makers[makerParam.toUpperCase()]) {
            $('input', this.makers[makerParam.toUpperCase()]).prop('checked', true);
        }

        $('.gallery_filter_maker_search').on('input', this.searchByMakers.bind(this));
    },

    closeFilter: function () {
        $('.gallery_mobile_block_for_filter').hide('normal');
        $('body').removeClass('disable_scroll');
    },

    downloadCards: function (shouldRemove, e) {
        e.preventDefault();
        this.closeFilter();

        this.spinnerWrapper.addClass('gallery_ajax_sending');

        let windowHeight = $(window).scrollTop();
        let cardsWrapper = $('#gallery_card_block .row');

        let formData = $('#gallery_filter_form :input[value!=""]').serializeArray();

        if (shouldRemove) {
            this.cardsOnPage = 0;
            cardsWrapper.empty();
        }

        let min_cost = $('#gallery_filter_form input[name="cost_range_0"]').val();
        if (min_cost) {
            formData.push({'name': 'min_cost', 'value': min_cost})
        }

        let max_cost = $('#gallery_filter_form input[name="cost_range_1"]').val();
        if (max_cost) {
            formData.push({'name': 'max_cost', 'value': max_cost})
        }

        formData.push({'name': 'cardsOnPage', 'value': this.cardsOnPage});

        $.ajax({
            url: this.url,
            type: 'POST',
            data: formData,
            beforeSend: function () {
                this.pending = true;
            }.bind(this),
            success: function (data) {
                this.spinnerWrapper.removeClass('gallery_ajax_sending');

                if (data['error']) {
                    alert(this.getErrorMessage(data['error']));
                } else {

                    this.addCardsToHtml(data, cardsWrapper);
                    if (!shouldRemove) {
                        $(window).scrollTop(windowHeight);
                    }

                    this.cardsOnPage += 12;
                    this.pending = false;
                }
            }.bind(this),
            error: function(){
                this.getErrorMessage('unknown_error')
                this.spinnerWrapper.removeClass('gallery_ajax_sending');
            }.bind(this)
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
                src: v['img_url']
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
                href: '/perfumes/' + v['id'],
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
        }
    },

    getErrorMessage: function (error) {
        switch (error) {
            case 'wrong_data':
                return 'Incorrect data when loading product cards';
            default:
                return 'Undefined error when loading product cards'
        }
    }
}
$(function () {
    gallery.init();
});