search = {
    url: '/get_makers_and_perfumes',
    doneTypingInterval: 400,

    foundPerfumesWrapper: null,
    foundMakersWrapper: null,
    searchWrapper: null,

    pending: false,
    searchTimer: null,
    searchedValue: '',

    init: function () {
        this.foundMakersWrapper = $('.navbar_found_makers_wrapper');
        this.foundPerfumesWrapper = $('.navbar_found_perfumes_wrapper');
        this.searchWrapper = $('.navbar_search_wrapper');

        $('#navbar_search').on('input', this.onTyping.bind(this));

        $('.navbar_search_thin_close').on('click', function () {
           this.searchWrapper.removeClass('navbar_found_items_wrapper_thin');
           $('#navbar_search', this.searchWrapper).val('');
           this.searchedValue = '';
           this.clearFoundWrappers();
        }.bind(this));
    },

    onTyping: function (e) {
        this.clearFoundWrappers();

        let searchInput = $(e.currentTarget);
        if (this.pending) {
            searchInput.val(this.searchedValue);
            return;
        }
        clearTimeout(this.searchTimer);

        let enteredText = searchInput.val();
        this.searchedValue = enteredText;

        this.searchTimer = setTimeout(this.doSearch.bind(this, enteredText), this.doneTypingInterval);
    },

    doSearch: function (enteredText) {
        window.innerWidth < 1600 ? this.searchWrapper.addClass('navbar_found_items_wrapper_thin') :
                                   this.searchWrapper.removeClass('navbar_found_items_wrapper_thin');

         if (enteredText.length === 0) {

        } else if (enteredText.length === 1) {
            this.searchWrapper.removeClass('navbar_searching').addClass('navbar_searched');
            this.fillMakersNotFound();
            this.fillPerfumesNotFound();
        } else {
            this.searchWrapper.addClass('navbar_searching').removeClass('navbar_searched');
            this.getMakersAndPerfumesByName(enteredText);
        }
    },

    clearFoundWrappers: function () {
        this.foundMakersWrapper.empty();
        this.foundPerfumesWrapper.empty();

        this.searchWrapper.removeClass('navbar_searching').removeClass('navbar_searched');
    },

    getMakersAndPerfumesByName: function (name) {
        $.ajax({
            url: this.url,
            type: 'GET',
            data: {name: name},
            beforeSend: function () {
                this.pending = true;
            }.bind(this),
            success: function (data) {
                if (data['error']) {

                } else {
                    if (data['perfumes'].length) {
                        this.fillPerfumes(data['perfumes']);
                    } else {
                        this.fillPerfumesNotFound();
                    }

                    if (data['makers'].length) {
                        this.fillMakers(data['makers']);
                    } else {
                        this.fillMakersNotFound();
                    }

                }

                this.pending = false;
                this.searchWrapper.removeClass('navbar_searching').addClass('navbar_searched');
            }.bind(this),
            error: function(){
                this.pending = false;
                console.log('ajax error');
            }
        });
    },

    fillMakers: function (makers) {
        let makersWrapper = $('.navbar_found_makers_wrapper');

        makersWrapper.html('<span class="text-center">Найденное в брендах:</span>');

        for (let maker of makers) {
           let makerWrapper = this.prepareMakerWrapper(maker);
           makersWrapper.append(makerWrapper);
        }

        this.foundMakersWrapper.append(makersWrapper);
    },

    fillPerfumes: function (perfumes) {
        let perfumesWrapper = $('.navbar_found_perfumes_wrapper');

        perfumesWrapper.html('<span class="text-center">Найденное в товарах:</span>');

        for (let perfume of perfumes) {
            let perfumeWrapper = this.preparePerfumeWrapper(perfume);
            perfumesWrapper.append(perfumeWrapper);
        }

        this.foundPerfumesWrapper.append(perfumesWrapper);
    },

    fillPerfumesNotFound: function () {
        this.foundPerfumesWrapper.html('<span class="text-center">Найденное в товарах: <br> Результаты по запросу отсутствуют</span>');
    },

    fillMakersNotFound: function () {
        this.foundMakersWrapper.html('<span class="text-center">Найденное в брендах: <br>Результаты по запросу отсутствуют</span>');
    },


    prepareMakerWrapper: function (maker) {
        let a = $('<a>', {href: '//' + window.location.hostname + maker.href, class: 'navbar_searched_item_link'});

        let name = $('<span>', {text: maker.name, class: 'navbar_searched_item_name'});
        a.append(name);

        return a;
    },

    preparePerfumeWrapper: function (perfume) {
        let a = $('<a>', {href: '//' + window.location.hostname + perfume.href, class: 'navbar_searched_item_link'});

        // let img = $('<img>', {src: perfume.img, class: 'navbar_searched_product_img'})
        let sex = $('<i>', {text: perfume.sex, class: 'navbar_searched_item_sex'});
        let name = $('<span>', {text: perfume.name, class: 'navbar_searched_item_name'});

        // a.append(img).append(sex).append(name);
        a.append(sex).append(name);

        return a;
    },


}
$(function () {
    search.init();
})