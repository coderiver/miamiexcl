$(document).ready(function() {


var header = $('.header'),
		header_top = header.find('.header__links li.is-center a'),
		body = $('html, body'),
    lazy = $('.lazy-load'),
    nav = $('.nav, .pager'),
    page = $('.page');

// lazyload
if (lazy.length) {
  //lazy.lazyload({
    //effect : 'fadeIn',
    //load : function(){
    //  $(this).parents('.page').addClass('is-load');
    //}
  //});
};

// nav
function navigation() {
	var link = nav.find('a');
	link.on('click', function(){
		var item = $(this).attr('href');
		var top = $('#' + item).offset().top;
		body.animate({scrollTop: top}, 900);			
		return false;
	});	
}
navigation();

function navigation_scroll() {
	var link = nav.find('a');
	var scroll_top = $(window).scrollTop();
	page.each(function(){		
		var item_scroll_top = $(this).offset().top;
		if (scroll_top >= item_scroll_top) {
			var item_el = $(this).attr('id');
			link.each(function(){	
				var link_item = $(this).attr('href');
				if (item_el == link_item) {
					$(this).parents('ul').find('a').removeClass('is-active');
					$(this).addClass('is-active');
				};
			});
		};
	});
};
navigation_scroll();

// rotate
function rotate_img() {
	var scroll_top = $(window).scrollTop(),
			el = $('.page__bg'),
			grad = 40;
	el.each(function(){
		var top = $(this).offset().top,
				height = $(this).height();
		if (scroll_top >= top) {
			$(this).parents('.page').addClass('is-active');
			var thiss = $(this);
			setTimeout(function(){
				$('.page.is-active').find('.page__content-in').first().addClass('is-active');
			}, 500);
		}
		else{
			$(this).parents('.page').removeClass('is-active');
			page.find('.page__content-in').removeClass('is-active');
		}
		top = top - height;
		if (scroll_top >= top) {
			var angle = grad*(scroll_top - top)/height;
			angle = grad - angle;
			if (angle >= 0) {
				el.find('.page__bg-img').css({'-webkit-transform': 'rotateX('+angle+'deg)', '-moz-transform': 'rotateX('+angle+'deg)', '-o-transform': 'rotateX('+angle+'deg)', '-ms-transform': 'rotateX('+angle+'deg)'});
			}
			else{
				el.find('.page__bg-img').css({'-webkit-transform': 'rotateX(0deg)', '-moz-transform': 'rotateX(0deg)', '-o-transform': 'rotateX(0deg)', '-ms-transform': 'rotateX(0deg)'});
			}
		};
	});
}
rotate_img();

// tabs
function tabs() {
	var nav = page.find('.page__nav'),
			wrap = page.find('.page__content');
	nav.find('a').on('click', function(){
		var item = $(this).attr('href');
		$(this).parents('.page').find('.page__content-in').removeClass('is-active');
		$('#' + item).addClass('is-active');
		$(this).parents('.page').find('.page__nav a').removeClass('is-active');
		$(this).addClass('is-active');
		return false;
	});
}
tabs();

$(window).scroll(function(){
	// nav
	navigation_scroll();
	// rotate
	rotate_img();
});

});