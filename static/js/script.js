var KEY_FOR_IMG_SLIDER = true;
var KEY_FOR_CARD_SLIDER = true;
var KEY_FOR_COPY = true;
//navbar
function myFunction() {
	if (KEY_FOR_COPY) {
		KEY_FOR_COPY = false;
		var ta = document.getElementById('mail'); 	//производим его выделение
		var range = document.createRange();
		range.selectNode(ta);
		window.getSelection().addRange(range);
		var copyBlock = $('.copyBlock')
		//пытаемся скопировать текст в буфер обмена
		try {
			document.execCommand('copy');
			copyBlock.css({opacity: 1});
		} catch (err) {
			console.log('Can`t copy, boss');
		}
		//очистим выделение текста, чтобы пользователь "не парился"
		window.getSelection().removeAllRanges();
		copyBlock.animate({opacity: 0}, 1000);
		setTimeout(function(){KEY_FOR_COPY = true}, 1100);
	}
};
//end_navbar
if ($('#main').length>0) {
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
	function slideCardPrev() {
		if (KEY_FOR_CARD_SLIDER) {
			KEY_FOR_CARD_SLIDER = false
			var curent_card = $(".showCard");
			var prev_card = curent_card.prev().length ? curent_card.prev() : $(".rowCard ul:last");
			curent_card
				.animate({left: '+=73vw'}, 1000);
			curent_card
				.removeClass('showCard');
			prev_card.css({'left': '-73vw'})
				.animate({left: '+=73vw'}, 1000);
			prev_card
				.addClass('showCard');
			setTimeout(function () {
				KEY_FOR_CARD_SLIDER = true
			}, 1000);
		}
	}

	function slideCardNext() {
		if (KEY_FOR_CARD_SLIDER) {
			KEY_FOR_CARD_SLIDER = false
			var curent_card = $(".showCard");
			var prev_card = curent_card.prev();
			var next_card = curent_card.next().length ? curent_card.next() : $(".rowCard ul:first");
			curent_card
				.animate({left: '-=75vw'}, 1000);
			curent_card
				.removeClass('showCard');
			next_card.css({'left': '73vw'})
				.animate({left: '-=73vw'}, 1000);
			next_card
				.addClass('showCard');
			setTimeout(function () {
				KEY_FOR_CARD_SLIDER = true
			}, 1000);
		}
	}

	$(function () {
		// setInterval(slideCard, 1500);
		// slideCard();
	});
	$('.leftSlideCard').on('click', function (e) {
		slideCardPrev();
	});
	$('.rightSlideCard').on('click', function (e) {
		slideCardNext();
	});
}
//filter and checkboxs in gallery
if ($('#gallery').length>0) {
	$(function () {
		var quantity = 12;
		var inProgress = false;
		var form_search = $("#formSearch");
		form_search.on('submit', function (e) {
			var text = $('.place_for_search1');
			e.preventDefault();
			var data = {};
			var csrf_token = $('#formSearch [name="csrfmiddlewaretoken"]').val();
			data["csrfmiddlewaretoken"] = csrf_token;
			data["search"] = text.val();
			data["refresh"] = "False";
			var url = form_search.attr('action');
			$.ajax({
				url: url,
				type: 'POST',
				data: data,
				cache: true,
				success: function (data) {
					console.log(data);
					$('.galleryCard').remove();
					var place_for_card = $('.cards');
					$.each(data, function (k, v) {
						if (k > 0) {
							place_for_card.append("" +
								"<div class=\"col-md-3 p-0 m-0 galleryCard\">" +
								"<a href=\"../product/" + v[4] + "\">" +
								"<div class=\"card text-center cardforproduct\">" +
								"<div class=\"card-img-top\"><img class=\"img-card\" src=" + v[3] + "></div>" +
								"<div class=\"card-body\">" +
								"<div class=\"card-title\"><h1>" + v[0] + "</h1></div>" +
								"<div class=\"card-text\">" + v[1] + "</div>" +
								"<div class=\"card-text\"><h2>" + v[2] + " р.</h2></div>" +
								"</div" +
								"</div>" +
								"</a>" +
								"</div>")
						}
					});
					quantity = 12;
				},
				error: function (data) {
					console.log("ERROR IN SEARCH");
				}
			});
		});
		var cancel_button = $('.button_for_turn_back');
		cancel_button.on('click', function (e) {
			e.preventDefault();
			var data = {};
			var csrf_token = $('#formSearch [name="csrfmiddlewaretoken"]').val();
			data["csrfmiddlewaretoken"] = csrf_token;
			data["search"] = '';
			data["refresh"] = "True";
			form_search.trigger('reset');
			$('#checkbox').trigger('reset');
			var url = form_search.attr('action');
			$.ajax({
				url: url,
				type: 'POST',
				data: data,
				cache: true,
				success: function (data) {
					$('.galleryCard').remove();
					var place_for_card = $('.cards');
					$.each(data, function (k, v, e) {
						if (k > 0) {
							place_for_card.append("" +
								"<div class=\"col-md-3 p-0 m-0 galleryCard\">" +
								"<a href=\"../product/" + v[4] + "\">" +
								"<div class=\"card text-center cardforproduct\">" +
								"<div class=\"card-img-top\"><img class=\"img-card\" src=" + v[3] + "></div>" +
								"<div class=\"card-body\">" +
								"<div class=\"card-title\"><h1>" + v[0] + "</h1></div>" +
								"<div class=\"card-text\">" + v[1] + "</div>" +
								"<div class=\"card-text\"><h2>" + v[2] + " р.</h2></div>" +
								"</div" +
								"</div>" +
								"</a>" +
								"</div>")
						}
					});
					quantity = 12;
				},
				error: function (data) {
					console.log("ERROR IN SEARCH");
				}
			});
		});
		var checkbox = $('.checkbox');
		checkbox.on('change', function (e) {
			var text = $('.place_for_search1');
			var url = $('#checkbox').attr('action');
			var data = {};
			console.log(url);
			var csrf_token = $('#checkbox [name="csrfmiddlewaretoken"]').val();
			data["csrfmiddlewaretoken"] = csrf_token;
			data["search"] = text.val();
			data["checkbox"] = this.value;
			data["status"] = $(this).prop('checked')
			$.ajax({
				url: url,
				type: 'POST',
				data: data,
				cache: true,
				success: function (data) {
					$('.galleryCard').remove();
					var place_for_card = $('.cards');
					$.each(data, function (k, v) {
						if (k > 0) {
							place_for_card.append("" +
								"<div class=\"col-md-3 p-0 m-0 galleryCard\">" +
								"<a href=\"../product/" + v[4] + "\">" +
								"<div class=\"card text-center cardforproduct\">" +
								"<div class=\"card-img-top\"><img class=\"img-card\" src=" + v[3] + "></div>" +
								"<div class=\"card-body\">" +
								"<div class=\"card-title\"><h1>" + v[0] + "</h1></div>" +
								"<div class=\"card-text\">" + v[1] + "</div>" +
								"<div class=\"card-text\"><h2>" + v[2] + " р.</h2></div>" +
								"</div" +
								"</div>" +
								"</a>" +
								"</div>")
						}
					});
					quantity = 12;
				},
				error: function (data) {
					console.log("ERROR IN SEARCH");
				}
			});
		})
		$(window).scroll(function () {
			if ($(window).scrollTop() + $(window).height() >= $(document).height() - 200 && !inProgress) {
				var data = {};
				data['lol'] = 'lol';
				var csrf_token = $('#formSearch [name="csrfmiddlewaretoken"]').val();
				data["csrfmiddlewaretoken"] = csrf_token;
				data['search'] = $('.place_for_search1').val();
				data['quantity'] = quantity;
				$.ajax({
					url: "/update_content",
					type: 'POST',
					data: data,
					cache: true,
					beforeSend: function () {
						inProgress = true;
					},
					success: function (data) {
						var place_for_card = $('.cards');
						$.each(data, function (k, v) {
							place_for_card.append("" +
								"<div class=\"col-md-3 p-0 m-0 galleryCard\">" +
								"<a href=\"../product/" + v[4] + "\">" +
								"<div class=\"card text-center cardforproduct\">" +
								"<div class=\"card-img-top\"><img class=\"img-card\" src=" + v[3] + "></div>" +
								"<div class=\"card-body\">" +
								"<div class=\"card-title\"><h1>" + v[0] + "</h1></div>" +
								"<div class=\"card-text\">" + v[1] + "</div>" +
								"<div class=\"card-text\"><h2>" + v[2] + " р.</h2></div>" +
								"</div" +
								"</div>" +
								"</a>" +
								"</div>")
						});
						quantity += 12;
						inProgress = false;
					}

				})

			}
		});
	});
}

