$(document).ready(function () {
    $(function() {

    $(window).scroll(function() {

    var current = $(this).scrollTop();

    if (current > 500) {
      $('#introduce h2').css( "color", "red" );
    }
    else {
      $('#introduce h2').css( "color", "white" );
    }
    if (current > 500 || current < 2000) {
      $('#recent_works h2').css( "color", "green" );
    }
    else {
      $('#recent_works h2').css( "color", "white" );
    }
    });
    });
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

    /*Circle diagrams*/

    $("#circle1").circliful({
      animationStep: 5,
      foregroundBorderWidth: 13,
      backgroundBorderWidth: 13,
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

    //Set the carousel options
    $('#quote-carousel').carousel({
      pauseOnHover: true,
      interval: 2000,
    });

    $('#news-carousel').carousel({
      pauseOnHover: true,
      interval: 5000,
    });
    $('#recent-post-carousel').carousel({
      pauseOnHover: true,
      interval: 5000,
    });


    /*jquery.featureCarousel*/
    var carousel = $("#carousel").featureCarousel({
      // include options like this:
      // (use quotes only for string values, and no trailing comma after last option)
      // option: value,
      // option: value
      trackerSummation: false,
      trackerIndividual: false
    });
});
