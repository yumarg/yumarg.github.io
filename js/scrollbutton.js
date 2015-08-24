$(window).scroll(function() {
    if ($(this).scrollTop() >= 50) {
        $('.returntotop').fadeIn(300);
    } else {
        $('.returntotop').fadeOut(300); }
});
$('.returntotop').click(function() {
  $('body, html').animate({
    scrollTop : 0
  }, 1500); 
});