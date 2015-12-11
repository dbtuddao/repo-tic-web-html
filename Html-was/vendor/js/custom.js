// JavaScript Document

$(document).ready(function() {
//**** Slick-Slider ****//
$('.feature-slider').slick({
      autoplay: true,
      autoplaySpeed: 5000,
      centerMode: true,
      centerPadding: '60px',
      slidesToShow: 3,
      infinite: true,
      dots: true,
      arrows: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0',
            slidesToShow: 3
          }
        }
      ]
    });

// Ms Drop Down ****//
$("select").msDropdown();
//**** Mobile-Menu ****//
$('#nav').clone().appendTo('.sub');
$("#mobile_menu").click(function(e) {
    $('body').toggleClass('open');
});

//**** Menu- Icon ****//
(function() {
  "use strict";
  var toggles = document.querySelectorAll(".cmn-toggle-switch");
  for (var i = toggles.length - 1; i >= 0; i--) {
    var toggle = toggles[i];
    toggleHandler(toggle);
  };
  function toggleHandler(toggle) {
    toggle.addEventListener( "click", function(e) {
      e.preventDefault();
      (this.classList.contains("active") === true) ? this.classList.remove("active") : this.classList.add("active");
    });
  }
})();

//**** Choose-Menu ****//
$('.choose-block ul li h6').click(function(e) {
    $(this).parent().find('ul').slideToggle();
    $(this).parent().siblings().find('ul').slideUp();
});


});

//****scrollup ****///

$(document).ready(function () {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.top-scroll').fadeIn();
        } else {
            $('.top-scroll').fadeOut();
        }
    });

    $('.top-scroll').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

    $('#go-to-feature').click(function(){
      $("html, body").animate({ scrollTop: $('.main-content').offset().top }, 400);
    });

});
