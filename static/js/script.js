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
	var navbar = document.getElementById("fixed_nav");
	var height_of_nav = navbar.offsetTop;
window.onscroll = function() {fixing_function()};
function fixing_function() {
	if (window.pageYOffset >= 215) {
    	navbar.classList.add("fix");
  	}
	else {
    	navbar.classList.remove("fix");
  	}
}
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
	var quantity_of_cards = $('.SliderCard li').length;
	var nmb_of_current_card = 1;
	function slideCardPrev(width, quantity) {
		if (KEY_FOR_CARD_SLIDER) {
			KEY_FOR_CARD_SLIDER = false;
			$(".SliderCard").animate({left: '+='+width}, 1000);
			nmb_of_current_card -= quantity;
			setTimeout(function () {
				KEY_FOR_CARD_SLIDER = true;
			}, 1000);
		}
	}

	function slideCardNext(width, quantity) {
		if (KEY_FOR_CARD_SLIDER) {
			KEY_FOR_CARD_SLIDER = false
			$(".SliderCard").animate({left: '-='+width}, 1000);
			nmb_of_current_card += quantity;
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
		const w = $('.rowCard').css('width');
		const quantity_of_cards_on_page = parseInt(parseInt(w) / 200);
		if(nmb_of_current_card > 1) {
			slideCardPrev(w, quantity_of_cards_on_page);
		}
	});
	$('.rightSlideCard').on('click', function (e) {
		const w = $('.rowCard').css('width');
		const quantity_of_cards_on_page = parseInt(parseInt(w)/200);
		if(nmb_of_current_card <= quantity_of_cards - quantity_of_cards_on_page) {
			slideCardNext(w, quantity_of_cards_on_page);
		}
	});
}
//filter and checkboxs in gallery
if ($('#gallery').length>0) {
	$(function () {
		//quantity cards on the page
		var quantity = 12;
		//var for ajax progress
		var inProgress = false;
		$('.place_for_search').on('keyup',function(){
			var $this = $(this),
				val = $this.val();
			if(val.length >= 1){
				$('.button_for_turn_back').show(50);
			}else {
				$('.button_for_turn_back').hide(50);
			}
		});		//function for search
		var form_search = $("#formSearch");
		form_search.on('submit', function (e) {
			var text = $('.place_for_search');
			e.preventDefault();
			var data = {};
			var csrf_token = $('#formSearch [name="csrfmiddlewaretoken"]').val();
			var temp_checkbox_list = []
			$.each($('#checkbox .checkbox'), function () {
				if ($(this).prop('checked') == true){
					temp_checkbox_list.push(this.value);
				}
			});
			var checkbox_list = JSON.stringify(temp_checkbox_list);
			data["csrfmiddlewaretoken"] = csrf_token;
			data["search"] = text.val();
			data["refresh"] = "False";
			data["checkbox"] = checkbox_list;
			var url = form_search.attr('action');
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
								"<div class=\"col-12 col-md-4 col-lg-4 col-xl-3 p-0 m-0 galleryCard\">" +
								"<a href=\"../product/" + v[4] + "\">" +
								"<div class=\"card text-center cardforproduct m-auto\">" +
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
		//functin for cancel button
		var cancel_button = $('.button_for_turn_back');
		cancel_button.on('click', function (e) {
			$(this).hide(50);
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
								"<div class=\"col-12 col-md-4 col-lg-4 col-xl-3 p-0 m-0 galleryCard\">" +
								"<a href=\"../product/" + v[4] + "\">" +
								"<div class=\"card text-center cardforproduct m-auto\">" +
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
		//function for checkbox
		var checkbox = $('.checkbox');
		checkbox.on('change', function (e) {
			var text = $('.place_for_search');
			var url = $('#checkbox').attr('action');
			var data = {};
			var csrf_token = $('#checkbox [name="csrfmiddlewaretoken"]').val();
			var temp_checkbox_list = []
			$.each($('#checkbox .checkbox'), function () {
				if ($(this).prop('checked') == true){
					temp_checkbox_list.push(this.value);
				}
			});
			var checkbox_list = JSON.stringify(temp_checkbox_list);
			data["csrfmiddlewaretoken"] = csrf_token;
			data["search"] = text.val();
			data["checkbox"] = checkbox_list;
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
								"<div class=\"col-12 col-md-4 col-lg-4 col-xl-3 p-0 m-0 galleryCard\">" +
								"<a href=\"../product/" + v[4] + "\">" +
								"<div class=\"card text-center cardforproduct m-auto\">" +
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
		//update cards with scroll
		$(window).scroll(function () {
			if ($(window).scrollTop() + $(window).height() >= $(document).height() - 200 && !inProgress) {
				var data = {};
				var csrf_token = $('#formSearch [name="csrfmiddlewaretoken"]').val();
				var temp_checkbox_list = []
				$.each($('#checkbox .checkbox'), function () {
					if ($(this).prop('checked') == true){
						temp_checkbox_list.push(this.value);
					}
				});
				var checkbox_list = JSON.stringify(temp_checkbox_list);
				data["csrfmiddlewaretoken"] = csrf_token;
				data['search'] = $('.place_for_search').val();
				data['quantity'] = quantity;
				data['checkbox'] = checkbox_list;
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
								"<div class=\"col-12 col-md-4 col-lg-4 col-xl-3 p-0 m-0 galleryCard\">" +
								"<a href=\"../product/" + v[4] + "\">" +
								"<div class=\"card text-center cardforproduct m-auto\">" +
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
$(function() {
	$('.itemsMenu').click(function () {
		$(this).toggleClass('itemsMenu_up_down');
		$('.dropMenu').toggle('normal');
	});
});