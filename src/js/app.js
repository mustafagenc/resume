$(function () {
  $(".external").click(function (e) {
    e.preventDefault();
    window.open(this.href);
  });
  if($(window).width()>=768){
    $('.sidebar-wrapper').stickySidebar({
      topSpacing: 80,
      bottomSpacing: 60
    });
  }
});

var scroll = new SmoothScroll('a[href*="#"]', {
  easing: 'easeInQuad',
  topOnEmptyHash: true
});