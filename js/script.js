$(document).ready(function () {

$.fn.extend({
  animateCss: function (animationName) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    $(this).addClass('animated ' + animationName).one(animationEnd, function() {
        $(this).removeClass('animated ' + animationName + 'animation-element');
    });
  }
});


  //hide menu when select menu item
  $('#navbar-collapse-1 li').each(function(e,n){
    if ( !$(n).hasClass('dropdown')){
      $(n).on('click', function(){
        $('#navbar-collapse-1').removeClass('in');
      });
    }});
  //for display active item
  function getMainMenuItem(item, i) {
    if ( i == 3 ) {
        return false;
    }
    if ( $(item).hasClass('dropdown-toggle') ) {
        $(item).addClass('active');
    }
    getMainMenuItem($(item).parent().parent().prev(), ++i);
  }

$(function () {
    var currentHash = window.location.hash;
    $(document).scroll(function () {
        $('body').find('section').each(function () {
            var top = window.pageYOffset;
            var distance = top - $(this).offset().top;
            var hash = $(this).attr('id');
            x = $(this);
            // 30 is an arbitrary padding choice,
            // if you want a precise check then use distance===0
            if (distance < 30 && distance > -30 && currentHash != hash) {
                window.location.hash = (hash);
                currentHash = hash;
            }
        });
    });
});

  //Active class according to scroll
  $(window).scroll(function(){
    var scrollTop = $(document).scrollTop();
    var anchors = $('body').find('section');
    for (var i = 0; i < anchors.length; i++){
      if (scrollTop > $(anchors[i]).offset().top - 50 && scrollTop < $(anchors[i]).offset().top + $(anchors[i]).height() - 50) {
        $('#header nav ul li a[href="#' + $(anchors[i]).attr('id') + '"]').addClass('active');
        $('#navbar-collapse-1').find('.dropdown-toggle').removeClass('active');
        getMainMenuItem($('#header nav ul li a[href="#' + $(anchors[i]).attr('id') + '"]'), 0);
      } else {
        $('#header nav ul li a[href="#' + $(anchors[i]).attr('id') + '"]').removeClass('active');
      }
    }
  });
  // Main Submenu
  $('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    $(this).parent().siblings().removeClass('open');
    $(this).parent().toggleClass('open');
  });

    // try to do somth with scroll
    var $animation_elements = $('.animation-element');
    var $window = $(window);
    var donothing_animation_diagramm = false;

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
            donothing_animation_diagramm = true;
          }
        }

        $('section h2').each(function () {
          // console.log($(this).text());
          if ($(this).hasClass('in-view')) {
            $(this).animateCss('zoomIn');
          } else {
            $(this).removeClass('zoomIn animated');
          }
        });

        $('#project_info .tab-content').each(function () {
          if ($(this).find('.active .project_step').hasClass('in-view')) {
            $(this).find('.step-up').animateCss('fadeInUp');
            $(this).find('.step-down').animateCss('fadeInDown');
          } else if ($(this).find('.active .application-section').hasClass('in-view')) {
            $(this).find('.icon').animateCss('fadeInDown');
          } else {
            $(this).find('.project_step').removeClass('fadeInUp fadeInDown animated');
            $(this).find('.icon').removeClass('fadeInDown animated');
          }
        });


        $('#diagrams').find('.diagram_circles').each(function(n,e){
            var $el = $(e);
            var el_height = $el.outerHeight();
            var el_top_position = $el.offset().top;
            var el_bottom_position = (el_top_position + el_height);

            if ( 0 == $el.data('run') ) {
              if ( (el_bottom_position >= window_top_position) && (el_top_position <= window_bottom_position) ) {
                $el.circliful({
                    percent: $el.data('percent')
                });
                $el.data('run', '1');
              }
            }
        });
      });
    }
    $window.on('scroll resize', check_if_in_view);
    $window.trigger('scroll');

    /*Load more services block*/
    $( "#services #loadMore" ).click(function() {
      // e.preventDefault();
      $( "#services #secondary-services" ).slideToggle( "slow");
      $(this).text( $(this).text() == 'Show all services' ? "Hide all services" : "Show all services");
    });

    /*Show Contact us form*/
    $( "#contact-form-button, #contact-form-button-close" ).click(function() {
      $( "#contact-form" ).slideToggle( "slow");
    });


    /*Hide Become a member block*/
    $( "#hide-green-block" ).click(function() {
      $( "#become_member" ).slideUp( "slow");
    });

    // Feature Carousel for introduce section
    $("#introduce-carousel").featureCarousel({

    });

    /*Hide Contact Us modal*/
    $( "#contact_us #contactform .close_popup" ).click(function() {
      $( "#contact_us" ).addClass( "clearmap");
      $( "#contact_us #contactform" ).slideUp( "slow");
    });

    //Clent Option section Carousel
    $("#owl-clients").owlCarousel({
      autoPlay: false, //Set AutoPlay to 3 seconds
      items : 1, //5 items above 1000px browser width
      itemsDesktop : [1200,1], //4 items between 1200px and 960px
      itemsDesktopSmall : [960,1], // betweem 960px and 768px
      itemsTablet: [768,1], //2 items between 768 and 640px
      itemsMobile : [640,1], // itemsMobile
      navigation : true,
      rewindNav : true,
      scrollPerPage : false,
      pagination : false
    });

    //Latest News section Carousel
    $("#owl-latest-news").owlCarousel({
      autoPlay: 100000, //Set AutoPlay to 3 seconds
      items : 3,
      itemsDesktop : [1200,3], //4 items between 1200px and 960px
      itemsDesktopSmall : [960,2], // betweem 960px and 768px
      itemsTablet: [768,2], //2 items between 768 and 640px
      itemsMobile : [640,1], // itemsMobile
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
      itemsDesktop : [1200,1], //4 items between 1200px and 960px
      itemsDesktopSmall : [960,1], // betweem 960px and 768px
      itemsTablet: [768,1], //2 items between 768 and 640px
      itemsMobile : [640,1], // itemsMobile
      navigation : true,
      navigationText : ["prev","next"],
      rewindNav : true,
      scrollPerPage : false,
      pagination : false
    });

    //Recebt Work section Carousel
    $("#owl-recent-work").owlCarousel({
      autoPlay: 3000, //Set AutoPlay to 3 seconds
      items : 5, //5 items above 1200px browser width
      itemsDesktop : [1200,4], //4 items between 1200px and 960px
      itemsDesktopSmall : [960,3], // betweem 960px and 768px
      itemsTablet: [768,2], //2 items between 768 and 640px
      itemsMobile : [640,1], // itemsMobile
      navigation : true,
      navigationText : ["prev","next"],
      rewindNav : true,
      scrollPerPage : false,
      pagination : false
    });
    // popup for recent post
    $('.test-popup-link').magnificPopup({
      type: 'image'
      // other options
    });

    // Custom Navigation Events
    $(".next").click(function(){
      owl.trigger('owl.next');
    });
    $(".prev").click(function(){
      owl.trigger('owl.prev');
    });
    $(".play").click(function(){
      owl.trigger('owl.play',1000); //owl.play event accept autoPlay speed as second parameter
    });
    $(".stop").click(function(){
      owl.trigger('owl.stop');
    });


    // Video upload section animation
    function nextState(){
        var timelineItems = $('.timeline__item');
        var emptyItems = timelineItems.filter('.timeline__item--empty');
        var next = emptyItems.first();
        var delay = 1000;
        if(next && next.length){
            if ( $(document).scrollTop() > $('body').find('#video_upload').offset().top - window.innerHeight && $(document).scrollTop() < $('body').find('#video_upload').offset().top + $('body').find('#video_upload').height() ) {
                next.removeClass('timeline__item--empty');
                if(emptyItems.length === 1){
                  delay = 1000;
                }
            }
        } else {
           if ( $(document).scrollTop() > $('body').find('#video_upload').offset().top - window.innerHeight && $(document).scrollTop() < $('body').find('#video_upload').offset().top + $('body').find('#video_upload').height() ) {
               // todo
            } else {
                timelineItems.addClass('timeline__item--empty');
            }
        }

      setTimeout(nextState, delay);
    }
    nextState();

    //Scroll to
    $('a[href^="#"]').on('click', function(event) {
      var target = $(this.getAttribute('href'));
      if( target.length ) {
          $('html, body').stop().animate({
              scrollTop: target.offset().top
          }, 1000);
      }
    });

    // Tabs responsive
    $(".tabbable.responsive").resptabs();

    //Contact US block - googlemap with marker and settings for this
    // The latitude and longitude of your business / place
		var position = [61.456410, 5.840677];
		function showGoogleMaps() {
		    var latLng = new google.maps.LatLng(position[0], position[1]);
		    var mapOptions = {
		        zoom: 16, // initialize zoom level - the max value is 21
		        streetViewControl: false, // hide the yellow Street View pegman
		        scaleControl: false, // dany users to zoom the Google Map
            scrollwheel: false,
            navigationControl: false,
            mapTypeControl: false,
            draggable: false,
		        mapTypeId: google.maps.MapTypeId.ROADMAP,
		        center: latLng,
            styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
		    };
		    map = new google.maps.Map(document.getElementById('googlemaps'),
		        mapOptions);
		    // Show the default red marker at the location
		    marker = new google.maps.Marker({
		        // position: latLng,
						position: {lat: 61.456410, lng: 5.840677},
		        map: map,
		        draggable: false,
		        animation: google.maps.Animation.DROP
		    });
		}
		google.maps.event.addDomListener(window, 'load', showGoogleMaps);
    //End script Contact US block

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
