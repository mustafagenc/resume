$(function () {
  $(".external").click(function (e) {
    e.preventDefault();
    window.open(this.href);
  });

});

var scroll = new SmoothScroll('a[href*="#"]');