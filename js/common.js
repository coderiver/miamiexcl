$(document).ready(function() {

//lazyload
var lazy = $('.lazy-load');
if (lazy.length) {
  lazy.lazyload({
    effect : 'fadeIn',
    //delay: 1000,
    load : function(){
      //$(this).addClass('is-load');
    }
  });
};

$(window).scroll(function(){
	var scroll_top = $(document).scrollTop(),
			header = $('.header');
	if (scroll_top > 0) {
		header.addClass('is-fixed');
	}
	else{
		header.removeClass('is-fixed');
	}
});

});