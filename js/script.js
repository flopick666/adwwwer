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

        if (donothing_introduce == false ) {
          if ($('#introduce').hasClass('in-view')) {
            console.log('introduce!');
            /*jquery.featureCarousel*/
            var carousel = $("#carousel").featureCarousel({
              trackerSummation: false,
              trackerIndividual: false
            });
            donothing_introduce = true;
          }
        }

        if (donothing_recentwork == false ) {
          if ($('#recent_works').hasClass('in-view')) {
            console.log('recent_works!');
            /*recent post*/
            // http://sachinchoolur.github.io/lightslider/

            donothing_recentwork = true;
          }
        }

        if (donothing_recentpost == false ) {
          if ($('#recent_post').hasClass('in-view')) {
            console.log('recent_post!');
            $('#recent-post-carousel').carousel({
              pauseOnHover: true,
              interval: 5000,
            });
            donothing_recentpost = true;
          }
        }

        if (donothing_latestnews == false ) {
          if ($('#latest_news').hasClass('in-view')) {
            console.log('latestnews!');
            $('#news-carousel').carousel({
              pauseOnHover: true,
              interval: 5000,
            });
            donothing_latestnews = true;
          }
        }

        if (donothing_client_opinion == false ) {
          if ($('#client_opinion').hasClass('in-view')) {
            console.log('donothing_client_opinion!');
            //Set the carousel options
            $('#quote-carousel').carousel({
              pauseOnHover: true,
              interval: 2000,
            });
            donothing_client_opinion = true;
          }
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

    // Load the first 4 list items from another HTML file
    //$('#myList').load('externalList.html li:lt(3)');
    $('#services .col-xs-12:lt(4)').show();

    var items =  8;
    var shown =  4;
    $('#loadMore').click(function () {

        shown = $('#services .col-xs-12:visible').size()+4;
        if(shown< items) {$('#services .col-xs-12:lt('+shown+')').show();}
        else {$('#services .col-xs-12:lt('+items+')').show();
             $('#loadMore').hide();
             }
    });

    /*hide green block*/
    $( "#hide-green-block" ).click(function() {
      $( "#become_member" ).slideUp( "slow");
    });
    /*recent_post*/
    $("#content-slider").lightSlider({
        loop:true,
        keyPress:true,
        item: 5,
        autoWidth: false,
        slideMove: 1, // slidemove will be 1 if loop is true
        slideMargin: 0,
        responsive : [
            {
                breakpoint:992,
                settings: {
                    item:4,
                    slideMove:1,
                    slideMargin:6,
                  }
            },
            {
                breakpoint:768,
                settings: {
                    item:2,
                    slideMove:1
                  }
            },
            {
                breakpoint:640,
                settings: {
                    item:1,
                    slideMove:1
                  }
            }
        ]
    });
});
