jQuery(document).ready(function () {
    jQuery(window).scroll(function () {
      if (jQuery(this).scrollTop() > 100) {
        jQuery('.scroll-top').fadeIn();
      } else {
        jQuery('.scroll-top').fadeOut();
      }
    });
  
    jQuery('.scroll-top').click(function() {
      jQuery("html, body").animate({
        scrollTop: 0
      }, 300);
      return false;
    });
  
  });