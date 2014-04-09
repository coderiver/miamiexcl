$(document).ready(function() {


var header = $('.header'),
		header_top = header.find('.header__links li.is-center a'),
		body = $('html, body'),
    lazy = $('.lazy-load'),
    nav = $('.nav, .pager'),
    page = $('.page');

// lazyload
if (lazy.length) {
  lazy.lazyload({
    effect : 'fadeIn',
    //delay: 1000,
    load : function(){
      //$(this).addClass('is-load');
    }
  });
};

// header top
header_top.on('click', function(){
	body.animate({scrollTop: 0}, 500);
	return false;
});

// nav
function navigation() {
	var link = nav.find('a');
	link.on('click', function(){
		var item = $(this).attr('href');
		var top = $('#' + item).offset().top;
		body.animate({scrollTop: top}, 500);			
		return false;
	});	
}
navigation();

function navigation_scroll() {
	var link = nav.find('a');
	var offset_top = $(window).scrollTop();
	page.each(function(){		
		var item_scroll_top = $(this).offset().top;
		if (offset_top >= item_scroll_top) {
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

$(window).scroll(function(){
	// nav
	navigation_scroll();
});

});