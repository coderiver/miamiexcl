$(document).ready(function() {


var header = $('.header'),
		header_top = header.find('.header__links li.is-center a'),
		body = $('html, body'),
    lazy = $('.lazy-load'),
    nav = $('.nav');

//lazyload
if (lazy.length) {
  lazy.lazyload({
    effect : 'fadeIn',
    //delay: 1000,
    load : function(){
      //$(this).addClass('is-load');
    }
  });
};

//header top
header_top.on('click', function(){
	body.animate({scrollTop: 0}, 500);
	return false;
});

//nav
nav.find('a').on('click', function(){
	var item = $(this).attr('href'),
			top = $(item).offset().top;
	body.animate({scrollTop: top}, 500);
	return false;
});

$(window).scroll(function(){
	var scroll_top = $(document).scrollTop();
	if (scroll_top > 0) {
		header.addClass('is-fixed');
	}
	else{
		header.removeClass('is-fixed');
	};
});

});