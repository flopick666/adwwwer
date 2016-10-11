$(document).ready(function () {
  // Swow Settings Menu block
  $('#open-settings').click(function() {
    if ($('#settings-menu').hasClass('closing')) {
      $('#settings-menu').animate({"right":"0px"}, "slow").removeClass('closing').addClass('open');
    } else {
      $('#settings-menu').animate({"right":"-200px"}, "slow").removeClass('open').addClass('closing');
    }
  });
  // Time Circle
  $("#DateCountdown").TimeCircles({
    "animation": "smooth",
    "bg_width": 0.4,
    "fg_width": 0.005,
    "circle_bg_color": "#60686F",
    "time": {
        "Days": {
            "text": "Days",
            "color": "#20b7a3",
            "show": true
        },
        "Hours": {
            "text": "Hours",
            "color": "#20b7a3",
            "show": true
        },
        "Minutes": {
            "text": "Minutes",
            "color": "#20b7a3",
            "show": true
        },
        "Seconds": {
            "text": "Seconds",
            "color": "#20b7a3",
            "show": true
        }
    }
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
  }
});
