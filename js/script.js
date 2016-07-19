$(document).ready(function () {
    // try to do somth with scroll
    var $animation_elements = $('.animation-element');
    var $window = $(window);
    var donothing_introduce = false;
    var donothing_diagram = false;
    var donothing_recentwork = false;
    var donothing_recentpost = false;
    var donothing_latestnews = false;
    var donothing_client_opinion = false;
    var donothing_animation_diagramm = false;
    // console.log ('permennaya ' + donothing);
    function check_if_in_view() {
      var window_height = $window.height();
      var window_top_position = $window.scrollTop();
      var window_bottom_position = (window_top_position + window_height);

      $.each($animation_elements, function() {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);

        //check to see if this current container is within viewport
        if ((element_bottom_position >= window_top_position) &&
            (element_top_position <= window_bottom_position)) {
          $element.addClass('in-view');
        } else {
          $element.removeClass('in-view');
        }

        if (donothing_animation_diagramm == false ) {
          if ($('#animated_sales').hasClass('in-view')) {
              $('#animated_sales .content').removeClass('running').delay(10).queue(function(next){
              $(this).addClass('running');
                  next();
              });
              // return false;
            donothing_animation_diagramm = true;
          }
        }

        if (donothing_diagram == false ) {
          if ($('#diagrams').hasClass('in-view')) {
            console.log('Dagrams!');
            /*Circle diagrams*/
            $("#circle1").circliful({
              percent: 58
            });
            $("#circle2").circliful({
              percent: 75
            });
            $("#circle3").circliful({
              percent: 28
            });
            $("#circle4").circliful({
              percent: 97
            });
            donothing_diagram = true;
          }
        }
      });
    }
    $window.on('scroll resize', check_if_in_view);
    $window.trigger('scroll');

    // Load the first 4 list items for Services Section
    $('#services .col-xs-12:lt(4)').show();
    var items =  8;
    var shown =  4;
    $('#loadMore').click(function () {
      shown = $('#services .col-xs-12:visible').size()+4;
      if (shown < items) {
        $('#services .col-xs-12:lt('+shown+')').show();
      }
      else {
        $('#services .col-xs-12:lt('+items+')').show();
        $('#loadMore').hide();
      }
    });

    /*Hide Become a member block*/
    $( "#hide-green-block" ).click(function() {
      $( "#become_member" ).slideUp( "slow");
    });

    // Feature Carousel for introduce section
    $("#introduce-carousel").featureCarousel({

    });

    //Clent Option section Carousel
    $("#owl-clients").owlCarousel({
      autoPlay: 3000, //Set AutoPlay to 3 seconds
      items : 1, //5 items above 1000px browser width
      itemsDesktop : [1000,1],
      itemsDesktopSmall : [960,1], // betweem 900px and 601px
      itemsTablet: [600,1],
      itemsMobile : [320,1],
      navigation : false,
      rewindNav : true,
      scrollPerPage : false,
      pagination : false
    });

    //Latest News section Carousel
    $("#owl-latest-news").owlCarousel({
      autoPlay: 100000, //Set AutoPlay to 3 seconds
      items : 3,
      itemsDesktop : [1000,3],
      itemsDesktopSmall : [960,2], // betweem 900px and 601px
      itemsTablet: [610,1],
      itemsMobile : [320,1],
      navigation : true,
      navigationText : ["prev","next"],
      rewindNav : true,
      scrollPerPage : false,
      pagination : false
    });

    //Recent Post section Carousel
    $("#owl-recent-post").owlCarousel({
      autoPlay: 5000, //Set AutoPlay to 3 seconds
      items : 1, //5 items above 1000px browser width
      itemsDesktop : [1000,1],
      itemsDesktopSmall : [960,1], // betweem 900px and 601px
      itemsTablet: [600,1],
      itemsMobile : [320,1],
      navigation : true,
      navigationText : ["prev","next"],
      rewindNav : true,
      scrollPerPage : false,
      pagination : false
    });

    //Recebt Work section Carousel
    $("#owl-recent-work").owlCarousel({
      autoPlay: 7500, //Set AutoPlay to 3 seconds
      items : 5, //5 items above 1000px browser width
      itemsDesktop : [1000,5], //5 items between 1000px and 901px
      itemsDesktopSmall : [900,3], // betweem 900px and 601px
      itemsTablet: [600,2], //2 items between 600 and 0
      itemsMobile : [320,1], // itemsMobile disabled - inherit from itemsTablet option
      navigation : true,
      navigationText : ["prev","next"],
      rewindNav : true,
      scrollPerPage : false,
      pagination : false
    });

    // Custom Navigation Events
    $(".next").click(function(){
      owl.trigger('owl.next');
    })
    $(".prev").click(function(){
      owl.trigger('owl.prev');
    })
    $(".play").click(function(){
      owl.trigger('owl.play',1000); //owl.play event accept autoPlay speed as second parameter
    })
    $(".stop").click(function(){
      owl.trigger('owl.stop');
    })

    // Video upload section animation
    function nextState(){
      var timelineItems = $('.timeline__item');
      var emptyItems = timelineItems.filter('.timeline__item--empty');
      var next = emptyItems.first();
      var delay = 2000;
      if(next && next.length){
        next.removeClass('timeline__item--empty');
        if(emptyItems.length === 1){
          delay = 5000;
        }
      } else {
        timelineItems.addClass('timeline__item--empty');
      }
      setTimeout(nextState, delay);
    }
    nextState();

    //Scroll to
    $('a[href^="#"]').on('click', function(event) {
      var target = $(this.getAttribute('href'));
      if( target.length ) {
          event.preventDefault();
          $('html, body').stop().animate({
              scrollTop: target.offset().top
          }, 1000);
      }
    });

    // Tabs responsive
    $(".tabbable.responsive").resptabs();
    
    
    // WebGl section
    
    if ( false === $.browser.mobile ) {
        
        var webgl = $('#webgl');

        $(window).scroll(function(){
            if ( ($(window).height() - $(window).scrollTop()) <= 0 ) {
                webgl.detach();
                $('#first').show();
            }
        });

        $('#show_webgl_button').on('click', function(e){
            e.preventDefault();
            showAnimation();
        });

        function showAnimation()
        {
            webgl.appendTo('#webgl_section');
            $('#first').hide();
            return false;
        }
    }
});
