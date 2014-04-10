$(document).ready(function() {


var header = $('.header'),
		header_top = header.find('.header__links li.is-center a'),
		body = $('html, body'),
		b = $('body'),
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

// rotate
function rotate_img() {
	var scroll_top = $(window).scrollTop(),
			el = $('.page__bg'),
			grad = 40;
	el.each(function(){
		var top = $(this).offset().top,
				height = $(this).height();
		if (scroll_top == top) {
			$(this).parents('.page').addClass('is-active');
			var thiss = $(this);
			setTimeout(function(){
				$('.page.is-active').find('.page__content-in').first().addClass('is-active');
				$('.page.is-active').find('.page__nav li:first a').addClass('is-active');
			}, 500);
		}
		else{
			$(this).parents('.page').removeClass('is-active');
			page.find('.page__content-in').removeClass('is-active');
			page.find('.page__nav li a').removeClass('is-active');
		}
		top = top - height;
		if (scroll_top >= top) {
			var angle = grad*(scroll_top - top)/height;
			angle = grad - angle;
			if (angle >= 0) {
				$(this).find('.page__bg-img').css({'-webkit-transform': 'rotateX('+angle+'deg)', '-moz-transform': 'rotateX('+angle+'deg)', '-o-transform': 'rotateX('+angle+'deg)', '-ms-transform': 'rotateX('+angle+'deg)'});
			}
			else{
				$(this).find('.page__bg-img').css({'-webkit-transform': 'rotateX(0deg)', '-moz-transform': 'rotateX(0deg)', '-o-transform': 'rotateX(0deg)', '-ms-transform': 'rotateX(0deg)'});
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





// clicking nav
$('.nav a, .pager a').on('click', function() {
	gotoslide = $(this).data('slide');
	goto(gotoslide, 500);
	return false;
});
var n = 0;
function goto(n, time){
	if(!(b.hasClass('is-running'))){

		//console.log('go');

		b.addClass('is-running');
		$('.nav a, .pager a').removeClass('is-active');
		$('.nav li:nth-child('+(n+1)+') a, .pager li:nth-child('+(n+1)+') a').addClass('is-active');

		if(!n){n = 0;}

		slide = $('#slide'+n);
		if (n == 1) {
			var el = $('#slide'+n);
			var t_height = el.height();
			body.animate({
		    scrollTop: t_height
		  }, time);
		}
		else {
			body.animate({
		    scrollTop: slide.offset().top
		  }, time);
		}
		
		//hilite nav
		setTimeout(function(){b.removeClass('is-running');},1000);

	}
	else{
		//console.log('cant run');
	}
}
function next(){
	size = $('.nav li').length;
	size = size-1;
	cur = $('.nav a.is-active, .pager a.is-active').data('slide');
	if(cur<size){
		goto(cur+1,500)
	}
}
function prev(){
	cur = $('.nav a.is-active, .pager a.is-active').data('slide');
	if(cur>0){
		goto(cur-1,500)
	}
}
prev_u = _.debounce(prev, 60, true)
next_u = _.debounce(next, 60, true)

var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x

$('body').bind(mousewheelevt, function(e){
	var evt = window.event || e //equalize event object     
	evt = evt.originalEvent ? evt.originalEvent : evt; //convert to originalEvent if possible               
	var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta //check for detail first, because it is used by Opera and FF
	if(delta > 0) {
	  prev();
	}
	else{
	  next();
	}   
	return false;
});

$(window).scroll(function(event) {
	// rotate
	rotate_img();
});

});