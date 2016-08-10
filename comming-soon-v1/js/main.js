$(document).ready(function () {
  var $window           = $(window),
      win_height_padded = $window.height() * 1.1,
      isTouch           = Modernizr.touch;
  if (isTouch) {
    $('.revealOnScroll').addClass('animated');
  }
  $window.on('scroll', revealOnScroll);
  function revealOnScroll() {
    var scrolled = $window.scrollTop(),
    win_height_padded = $window.height() * 1.1;
    // Showed...
    $(".revealOnScroll:not(.animated)").each(function () {
      var $this = $(this),
        offsetTop = $this.offset().top;
      if (scrolled + win_height_padded > offsetTop) {
        if ($this.data('timeout')) {
          window.setTimeout(function(){
            $this.addClass('animated ' + $this.data('animation'));
          }, parseInt($this.data('timeout'),10));
            $('#animated_sales .content').removeClass('running').delay(10).queue(function(next){
                $(this).addClass('running');
                next();
            });
        } else {
            $this.addClass('animated ' + $this.data('animation'));
        }

      }
    });
    // Hidden...
    $(".revealOnScroll.animated").each(function (index) {
    var $this     = $(this),
      offsetTop = $this.offset().top;
    if (scrolled + win_height_padded < offsetTop) {
      $(this).removeClass('animated bounceInDown bounceInUp fadeIn flipInX fadeInUp fadeInDown fadeInLeft fadeInRight zoomIn video-line')
    }
    });
  }
  revealOnScroll();

  //Animation Scrolling anchor links
  $('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if( target.length ) {
        $('html, body').stop().animate({
            scrollTop: target.offset().top
        }, 1000);
    }
  });

  // Script for url on current section position
  // $(function () {
  //     var currentHash = window.location.hash;
  //     $(document).scroll(function () {
  //         $('body').find('section').each(function () {
  //             var top = window.pageYOffset;
  //             var distance = top - $(this).offset().top;
  //             var hash = $(this).attr('id');
  //             x = $(this);
  //             // 30 is an arbitrary padding choice,
  //             // if you want a precise check then use distance===0
  //             if (distance < 30 && distance > -30 && currentHash != hash) {
  //                 window.location.hash = (hash);
  //                 currentHash = hash;
  //             }
  //         });
  //     });
  // });

  // Swow Overlay block
  $('#overlay-show, #overlay-hide').click(function() {
    $('#overlay').slideToggle('slow');
  });

  // WebGl section
  if ( false === $.browser.mobile ) {
    $('body').append('<script src="js/webgl/earth.js" type="text/javascript"></script>');
    var webgl = $('#earth'),
    sectionWebGl = $('#webgl');
    THREE.DefaultLoadingManager.onProgress = function ( item, loaded, total ) {
        if ( loaded == total ) {
            webgl.show();
            $('#loadingProgressG').hide();
        }
    };
    $(window).scroll(function(){
        if ( ($(window).height() - $(window).scrollTop()) <= 0 ) {
            webgl.detach();
            $('#show_webgl_button').html('show animation');
            $('#show_webgl_button').removeAttr('href');
        }
    });
    $('#show_webgl_button').on('click', function(e){
        e.preventDefault();
        if ( 1 === sectionWebGl.children('#earth').length ) {
            webgl.detach();
            $('#show_webgl_button').html('show animation');
            $('#show_webgl_button').removeAttr('href');
        } else {
            webgl.appendTo('#webgl');
            $('#show_webgl_button').html('get started');
            $('#show_webgl_button').attr('href','#introduce');
        }
    });
  }
});
