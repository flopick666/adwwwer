"use strict";
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
  // Here main menu several scripts
  //hide menu when select menu item
  $('#navbar-collapse-1 li').each(function(e,n){
    if ( !$(n).hasClass('dropdown')){
      $(n).on('click', function(){
        $('#navbar-collapse-1').removeClass('in');
      });
    }
  });

  // Main Submenu
  $('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    $(this).parent().siblings().removeClass('open');
    $(this).parent().toggleClass('open');
  });
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
  // Here featureCarousel functionallity
  // Feature Carousel for introduce section
  $("#introduce-carousel").featureCarousel({
    carouselSpeed: 500,
    autoPlay: 2000
  });

  // Here owlCarousel functionallity to several sections
  //Testimonials section Carousel
  $("#owl-clients").owlCarousel({
    autoPlay: false, //Set AutoPlay to 3 seconds
    items : 1, //5 items above 1000px browser width
    itemsDesktop : [1200,1], //4 items between 1200px and 960px
    itemsDesktopSmall : [960,1], // betweem 960px and 768px
    itemsTablet: [768,1], //2 items between 768 and 640px
    itemsMobile : [640,1], // itemsMobile
    nav : true,
    rewindNav : true,
    scrollPerPage : false,
    pagination : false,
    loop: true
  });

  //Latest News section Carousel
  $("#owl-latest-news").owlCarousel({
    autoPlay: 100000, //Set AutoPlay to 3 seconds
    items : 3,
    itemsDesktop : [1200,3], //4 items between 1200px and 960px
    itemsDesktopSmall : [960,2], // betweem 960px and 768px
    itemsTablet: [768,2], //2 items between 768 and 640px
    itemsMobile : [640,1], // itemsMobile

    nav : true,
    navText : ["prev","next"],
    rewindNav : true,
    scrollPerPage : false,
    pagination : false,
    loop: true,
    responsiveClass: true,
    responsive:{
      0:{
        items:1
      },
      640:{
        items:2
      },
      768:{
        items:2
      },
      960:{
        items:3
      }
    }
  });

  //Recent Post section Carousel
  $("#owl-recent-post").owlCarousel({
    autoPlay: 5000, //Set AutoPlay to 5 seconds
    nav : true,
    navText : ["prev","next"],
    rewindNav : true,
    scrollPerPage : false,
    pagination : false,
    loop: true,
    responsiveClass: true,
    responsive:{
      0:{
        items:1
      }
    }
  });

  //Recent Work section Carousel
  $("#owl-recent-work").owlCarousel({
    autoPlay: 3000, //Set AutoPlay to 3 seconds
    nav : true,
    navText : ["prev","next"],
    rewindNav : true,
    scrollPerPage : false,
    pagination : false,
    loop: true,
    responsiveClass: true,
    responsive:{
      0:{
        items:1
      },
      640:{
        items:2
      },
      768:{
        items:3
      },
      960:{
        items:4
      },
      1200:{
        items: 5
      }
    }
  });
  // popup for recent post
  $('.test-popup-link').magnificPopup({
    type: 'image',
    removalDelay: 300,
    mainClass: 'mfp-fade'
  });

  /*Load more services block*/
  $( "#services #loadMore" ).on('click', function() {
    // e.preventDefault();
    $( "#services #secondary-services" ).slideToggle( "slow");
    $(this).text( $(this).text() == 'Show all services' ? "Hide all services" : "Show all services");
  });
  // Hide Become a member block
  $( "#hide-green-block" ).on('click', function() {
    $( "#become_member" ).slideUp( "slow");
  });
  // Tabs responsive
  $(".tabbable.responsive").resptabs();

  $window.on('scroll resize', function() {
     $('#diagrams').find('.diagram_circles').each(function(n,e){
         var window_height = $window.height();
         var window_top_position = $window.scrollTop();
         var window_bottom_position = (window_top_position + window_height);
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
  // Here contact_us functionallity
  /*Hide Contact Us modal*/
  $( "#contact_us #contactform .close_popup" ).on('click', function() {
    $( "#contact_us" ).addClass( "clearmap");
    $( "#contact_us #contactform" ).slideUp( "slow");
  });
  /*Show Contact us form*/
  $( "#contact-form-button, #contact-form-button-close" ).on('click', function() {
    $( "#contact-form" ).slideToggle( "slow");
  });
  // Contact US block - googlemap with marker and settings for this
  // The latitude and longitude of your business / place
	var position = [41.0621212, -73.5423603];
	function showGoogleMaps() {
	    var latLng = new google.maps.LatLng(position[0], position[1]);
	    var mapOptions = {
	        zoom: 16, // initialize zoom level - the max value is 21
	        streetViewControl: false, // hide the yellow Street View pegman
	        scaleControl: false, // dany users to zoom the Google Map
         scrollwheel: false,
         navigationControl: false,
         mapTypeControl: false,
         // draggable: false,
	        mapTypeId: google.maps.MapTypeId.ROADMAP,
	        center: latLng,
         styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
	    };
	    map = new google.maps.Map(document.getElementById('googlemaps'),
	        mapOptions);
	    // Show the default red marker at the location
	    marker = new google.maps.Marker({
	        // position: latLng,
					position: {lat: 41.0621212, lng: -73.5423603},
	        map: map,
	        draggable: false,
	        animation: google.maps.Animation.DROP
	    });
	}
	google.maps.event.addDomListener(window, 'load', showGoogleMaps);
  // End contact_us functionallity

  // send contact form
    $('#contact-form').find('form').on('submit', function(e){
        e.preventDefault();
        $.post("/server.php", {
            name: $('#contact-form').find('#contact-name').val(),
            email: $('#contact-form').find('#contact-email').val() ,
            phone: $('#contact-form').find('#contact-phone').val(),
            message: $('#contact-form').find('#contact-message').val()
        })
        .done(function(data) {
            $('#contact-form').find('#contact-name').val('');
            $('#contact-form').find('#contact-email').val('');
            $('#contact-form').find('#contact-phone').val('');
            $('#contact-form').find('#contact-message').val('');
            $('#contact-form').find('#success').show('fade out');
            setTimeout(function(){
                $('#contact-form').find('#success').hide('fade in');
            }, 5000);
        });
    });





    var position = [41.0621212, -73.5423603];

	    var latLng = new google.maps.LatLng(position[0], position[1]);
	    var mapOptions = {
	        zoom: 16, // initialize zoom level - the max value is 21
	        streetViewControl: false, // hide the yellow Street View pegman
	        scaleControl: false, // dany users to zoom the Google Map
          scrollwheel: false,
          navigationControl: false,
          mapTypeControl: false,
          // draggable: false,
	        mapTypeId: google.maps.MapTypeId.ROADMAP,
	        center: latLng,
          styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
	    };
	    map = new google.maps.Map(document.getElementById('googlemaps'),
	        mapOptions);
	    // Show the default red marker at the location
	    marker = new google.maps.Marker({
	        // position: latLng,
                position: {lat: 41.0621212, lng: -73.5423603},
	        map: map,
	        draggable: false,
	        animation: google.maps.Animation.DROP
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
