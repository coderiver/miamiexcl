$(document).ready(function() {

//lazyload
var lazy = $('.lazy-load');
if (lazy.length) {
  lazy.lazyload({
    effect : 'fadeIn',
    delay: 1000,
    load : function(){
      $(this).addClass('is-load');
    }
  });
};


});