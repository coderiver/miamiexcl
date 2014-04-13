$(document).ready(function() {
 $(this).scrollTop(0);

 var isiPad = navigator.userAgent.match(/iPad/i) != null;

if (navigator.userAgent.indexOf('Mac OS X') != -1) {
  //$("body").addClass("mac");
  
} else {
  //$("body").addClass("pc");
  isiPad = true;
}
if(isiPad){
	$('body').addClass('simple');
}

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
	if(!isiPad){
	var scroll_top = $(window).scrollTop(),
			el = $('.page__bg'),
			grad = 40;
	el.each(function(){
		var top = $(this).offset().top,
				height = $(this).height();
		if (scroll_top > (top-10) && scroll_top < (top+10)) {
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
		top = top - height - 143;
		if (scroll_top >= top) {
			var angle = grad*(scroll_top - top)/height;
			angle = grad - angle;
			if (angle >= 0) {
				$(this).find('.page__bg-in').css({'-webkit-transform': 'rotateX('+angle+'deg)', '-moz-transform': 'rotateX('+angle+'deg)', '-o-transform': 'rotateX('+angle+'deg)', '-ms-transform': 'rotateX('+angle+'deg)'});
			}
			else{
				$(this).find('.page__bg-in').css({'-webkit-transform': 'rotateX(0deg)', '-moz-transform': 'rotateX(0deg)', '-o-transform': 'rotateX(0deg)', '-ms-transform': 'rotateX(0deg)'});
			}
		};
	});
	}
	else{
		$('.page').addClass('is-active');
		$('.page.is-active').find('.page__content-in').first().addClass('is-active');
		$('.page.is-active').find('.page__nav li:first a').addClass('is-active');
		$('.page__bg').find('.page__bg-in').css({'-webkit-transform': 'rotateX(0deg)', '-moz-transform': 'rotateX(0deg)', '-o-transform': 'rotateX(0deg)', '-ms-transform': 'rotateX(0deg)'});
	}
}
rotate_img();

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
// tabs
function tabs() {
	var nav = page.find('.page__nav'),
			wrap = page.find('.page__content');
	nav.find('a').on('click', function(){
		//$('.page__bg-in').trigger('click');
		
		// ====================== correct bg foto
		ind = $(this).parent().index();
		pbgin = nav.prev().children('.page__bg-in');
		gotoslideakella(ind, pbgin);

		// ====================== correct bg foto
		var item = $(this).attr('href'),
				color = $(this).data('background');
				color1 = hexToRgb($(this).data('backgroundmenu'));
				if(color1==null){color1 = hexToRgb('#999999');}
				//alert(hexToRgb('#000000'));
				console.log(color1);
				color21 = 'rgba('+color1.r+','+color1.g+','+color1.b+',.9)';
				if(!color21){color21 = 'rgba(150,150,150,0.9)';}
		$(this).parents('.page').find('.page__content-in').removeClass('is-active');
		$('#' + item).addClass('is-active');
		$(this).parents('.page').find('.page__content-bg').css('background', color);
		nav.css('background', color21);
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
		// alert(n);
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
		setTimeout(function(){b.removeClass('is-running');},1900);

	}
	else{
		//console.log('cant run');
	}
}
function next(){

	size = $('.pager li').length;
	size = size-1;
	// alert(size);
	cur = $('.nav a.is-active, .pager a.is-active').data('slide');
	if(cur<size){
		goto(cur+1,900)
	}
}
function prev(){
	cur = $('.nav a.is-active, .pager a.is-active').data('slide');
	if(cur>0){
		goto(cur-1,900)
	}
}
prev_u = _.debounce(prev, 160, true)
next_u = _.debounce(next, 160, true)

var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x

$('body').bind(mousewheelevt, function(e){
	if(!isiPad){
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
 	}
});

$(window).scroll(function(event) {
	// rotate
	rotate_img();
});

// slider
function preloadImages(images, callback) {
  var count = images.length;
  if(count === 0) {
    callback();
  }
  var loaded = 0;
  $(images).each(function() {
    $('<img>').attr('src', this).load(function() {
      loaded++;
      if (loaded === count) {
        callback();
      }
    });
  });
};
function gotoslideakella(n, pbg){
	var act = pbg.find('.page__bg-item.is-active'),
	    s_next = pbg.children(':nth-child('+(n+1)+')'),
	    image = s_next.data('image'),
	    preloader = pbg.parent().find('.preloader');
	    pbg.find('.page__bg-item').removeClass('is-active');

	if (!s_next.hasClass('is-loaded')) {
		if (s_next.length) {
			preloadImages([image], function(){
				s_next.addClass('is-active');
				s_next.addClass('is-loaded');
			});
		}
		else{
			$(this).find('.page__bg-item').first().addClass('is-active');	
			preloader.hide();
		}
	}
	else{
		s_next.addClass('is-active');
	}
}
var page_bg = $('.page__bg-in');
page_bg.on('click', function(){
	// var act = $(this).find('.page__bg-item.is-active'),
	//     s_next = act.next(),
	//     image = s_next.data('image'),
	//     preloader = $(this).parent().find('.preloader');
	// $(this).find('.page__bg-item').removeClass('is-active');
	// if (!s_next.hasClass('is-loaded')) {
	// 	if (s_next.length) {
	// 		preloadImages([image], function(){
	// 			s_next.addClass('is-active');
	// 			s_next.addClass('is-loaded');
	// 		});
	// 	}
	// 	else{
	// 		$(this).find('.page__bg-item').first().addClass('is-active');	
	// 		preloader.hide();
	// 	}
	// }
	// else{
	// 	s_next.addClass('is-active');
	// }
	return false;
})

});