var KEY_FOR_IMG_SLIDER = true;
var KEY_FOR_CARD_SLIDER = true

function slider() {
	setInterval(slideNext, 5000);
};
function slideNext(e) {
	if(KEY_FOR_IMG_SLIDER){
		KEY_FOR_IMG_SLIDER = false;
		var image = $('div.slider ul.p-0 li img.showImage');
		var nextImage = (e != undefined ? $('div.slider ul.p-0 li img').eq(e) : (image.parent().next().length ? image.parent().next().children('img') : $('div.slider ul.p-0 li:first img')));
		var block = $('div.showBlock');
		var nextBlock = (e != undefined ? $('div ul.sliderBlockList li div').eq(e) : (block.parent().next().length ? block.parent().next().children() : $('div ul.sliderBlockList li:first div')));
		nextImage.css('left','80vw')
		.animate({left: '-=80vw'}, 1500);
		image.animate({left: '-=80vw'}, 1500)
		.css('left','80vw')
		.removeClass("showImage");
		nextImage.addClass("showImage");
		nextBlock.addClass('showBlock');
		block.removeClass('showBlock');
		setTimeout(function(){KEY_FOR_IMG_SLIDER = true}, 1500);
		};
};
function slidePrev(e) {
	if(KEY_FOR_IMG_SLIDER){
		KEY_FOR_IMG_SLIDER = false;
		var image = $('div.slider ul.p-0 li img.showImage');
		var prevImage = (e != undefined ? $('div.slider ul.p-0 li img').eq(e) : (image.parent().prev().length ? image.parent().prev().children('img') : $('div.slider ul.p-0 li:last img')));
		var block = $('div.showBlock');
		var prevBlock = (e != undefined ? $('div ul.sliderBlockList li div').eq(e) : (block.parent().prev().length ? block.parent().prev().children() : $('div ul.sliderBlockList li:last div')));

		prevImage.css('left','-80vw')
		.animate({left: '+=80vw'}, 1500);
		image.animate({left: '+=80vw'}, 1500)
		.css('left','80vw')
		.removeClass("showImage");
		prevImage.addClass("showImage");
		prevBlock.addClass('showBlock');
		block.removeClass('showBlock');
		setTimeout(function(){KEY_FOR_IMG_SLIDER = true}, 1500);
		};
};
$('.leftButton').on('click', function(){
	slidePrev();
});
$('.rightButton').on('click', function(){
	slideNext();
});
$('.sliderBlock').on('click',function(){
	var number = $(this).parent().index();
	var current = $('.showBlock').parent().index();
	if(current > number)
		slidePrev(number);
	else if (current < number)
		slideNext(number);

});
$(function()
{
	setTimeout(slider, 3000);
});
//Конец слайдера
// Корзина

//функция для изменения кол-ва товара в корзине
function changing(toggle){
	var formOfChange = toggle.parent();
	var csrf_token = $(".formOfChange [name=csrfmiddlewaretoken]").val();
	var product_id = toggle.parent().data("product-id");
	var product_nmb = toggle.parent().data("product-nmb");
	var url = formOfChange.attr("action");
	var toggleClass = toggle.attr('class');
	var data = {};
	data['product_id'] = product_id;
	data['product_nmb'] = product_nmb;
	data['toggle'] = toggleClass;
	data['csrfmiddlewaretoken']=csrf_token;
	$.ajax({
		url: url,
		type: 'POST',
		data: data,
		cache: true,
		success: function (data) {
			$.each(data.products, function (k,v) {
				if (toggleClass=='more change') {
					$('#' + v.product_id + ' .numberOfProductInBasket').html("").html( v.nmb + ' шт.');
					$('#' + v.product_id + ' .totalCostOfProductInBasket').html("").html(v.product_total_cost);
				}
				else {
					$('#' + v.product_id + ' .numberOfProductInBasket').html("").html( v.nmb + ' шт.')
					$('#' + v.product_id + ' .totalCostOfProductInBasket').html("").html(v.product_total_cost);
				}
			})
		},
		error: function (data) {
			console.log("ERROR IN CHANGE")
		}
	});
};
$(function(){
	var formOfBuy = $("#formOfBuy");
	formOfBuy.on('submit', function(e){
		var numb = $('#number');
		var nmbOfProduct = numb.val();
		var product_id = numb.data("product-id");
		var product_name = numb.data("product-name");
		var product_cost = numb.data("product-cost");
		var product_image = numb.data("product-image");
		e.preventDefault();
		var data = {};
		data.product_id = product_id;
		data.nmb = nmbOfProduct;
		var csrf_token = $('#formOfBuy [name="csrfmiddlewaretoken"]').val();

		console.log(csrf_token);
		data["csrfmiddlewaretoken"] = csrf_token;
		var url = formOfBuy.attr('action');;
		$.ajax({
			url:url,
			type: 'POST',
			data: data,
			cache: true,
			success: function(data) {
				if (data.products_total_nmb) {

					$('.basket-items div').html("");
					$('.basket-container').css('height', 100*data.products_total_nmb+'px')
						.css('max-height', 100*data.products_total_nmb+'px');
					$.each(data.products, function (k, v) {
												console.log('a');

						$('.basket-items').append(
							'<div class="container-fluid deleted">'+
								'<div class="row basketH">'+
									'<div class="col-md-5 h-100">'+
										'<img class="basketImage" src="../../files/media/' + v.product_image + '">'+
									'</div>'+
									'<div class="col-md-7 p-0">'+
										'<div>' + v.product_name + '</div>' +
										'<ul class="test p-0 mb-0">'+
											'<li>' + v.product_nmb + ' шт.' + '</li>' +
											'<li class="ml-5">' + v.product_cost + 'р' + '</li>'+
										'</ul>'+
									'</div>'+
								'</div>'+
							'</div>');
						// $('.basket-items .deleted').attr('id', 'basketId'+product_id)
					})
				}
			},
			error: function(data) {
				console.log("ERROR IN ADDING");
			}
		});
	});
	$('.change').on('click', function (e) {
		changing($(this));
		e.preventDefault();
	});
	var formOfDelete = $('.formOfDelete');
	formOfDelete.on('click', function (e) {
		e.preventDefault();
		product_id = $(this).data('product-id');
		csrf_token = $(".formOfDelete [name=csrfmiddlewaretoken]").val();
		url = formOfDelete.attr("action");
		var data={};
		console.log(product_id);
		data['product_id'] = product_id;
		data['csrfmiddlewaretoken']=csrf_token;
		$.ajax({
			url: url,
			data: data,
			cache:true,
			type: 'POST',
			success: function () {
				$('#x_'+product_id).remove();
			},
			error: function () {
				console.log('ERROR IN DELETING');
			}
		});


	});
});


// Конец корзины
// Слайдер для фоток товара
function slideCardPrev() {
	if(KEY_FOR_CARD_SLIDER) {
		KEY_FOR_CARD_SLIDER = false
		var curent_card = $(".showCard");
		var prev_card =  curent_card.prev().length ? curent_card.prev() : $(".rowCard ul:last");
		curent_card
			.animate({left: '+=73vw'}, 1000);
		curent_card
			.removeClass('showCard');
		prev_card.css({'left': '-73vw'})
			.animate({left: '+=73vw'}, 1000);
		prev_card
			.addClass('showCard');
		setTimeout(function(){KEY_FOR_CARD_SLIDER = true}, 1000);
	}
}
function slideCardNext() {
	if(KEY_FOR_CARD_SLIDER) {
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
		setTimeout(function(){KEY_FOR_CARD_SLIDER = true}, 1000);
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

