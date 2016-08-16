// Zoom Lines Carousel
function removeLines(fast){
	if (fast == true) {
		jQuery('.num').addClass('anim-fast');
		jQuery('.num').removeClass('active');
		jQuery('.num').removeClass('anim-done');
		setTimeout(function(){
			jQuery('.num').removeClass('anim-fast');
		}, 200);
	} else {
		jQuery('.num').removeClass('active');
		setTimeout(function(){
			jQuery('.num').removeClass('anim-done');
		}, 200);
	}
}

function activateZoom(selector) {
	var zoom_item = jQuery(selector);
	var img_src = zoom_item.find('.num_img img').attr('src');
	// Lines animation
	zoom_item.addClass('active');
	setTimeout(function(){
		zoom_item.addClass('anim-done');
	}, 400);
	// Zoom image content
	var post_img_zoom = jQuery('#post-zoom-image');
	setTimeout(function(){
		post_img_zoom.find('img').attr('src', img_src);
	}, 600);
}

function carouselZoomLines(){
	jQuery('.num').find('.dot').click(function(){
		var parent = jQuery(this).parent();
		removeLines();
		activateZoom(parent);
	})
}

// Round Carousel
function carouselAddClass(object){
	for (var i = 0; i < object.length; i++) {
		switch(i) {
			case 0:
				var itm_class = 'active';
				break;
			case 1:
				var itm_class = 'right';
				break;
			case 2:
				var itm_class = 'back_right';
				break;
			case 3:
				var itm_class = 'back_left';
				break;
			case 4:
				var itm_class = 'left';
				break;
		}
		object[i].removeAttr('class');
		object[i].addClass(itm_class);
	};
}

function carouselTurn(object, direction) {
	if (direction == 'left') {
		removeLines(true);
		temp = object.shift();
		object.push(temp);
		carouselAddClass(object)
	};
	if (direction == 'right') {
		removeLines(true);
		temp = object.pop();
		object.unshift(temp);
		carouselAddClass(object)
	};
	// Turn active pagination item
	var active_id = jQuery('#doing-carousel_list').find('li.active').attr('data-id');
	var pagination_item = jQuery('#doing_titles').find('li[data-id="' + active_id + '"]');
	var active_zoom = parseInt(active_id)+1;
	setTimeout(function(){
		removeLines();
		activateZoom('.num_' + active_zoom + '_1');
	}, 400);

	pagination_item.addClass('active');
	pagination_item.siblings().removeClass('active');
}

function paginationClick(object) {
	var pagination = jQuery('#doing_titles');
	pagination.find('li a').click(function(event){
		event.preventDefault();
	})
	pagination.find('li').eq(0).addClass('active');
	pagination.find('li').click(function(){
		jQuery(this).addClass('active');
		jQuery(this).siblings().removeClass('active');
		var pag_id 		= jQuery(this).attr('data-id');
		var active_id 	= jQuery('#doing-carousel_list').find('li.active').attr('data-id');
		//console.log(active_id - pag_id);
		if (active_id == pag_id) {};
		if (active_id - pag_id == -1) {
			carouselTurn(object, 'left');
		}
		if (active_id - pag_id == 1) {
			carouselTurn(object, 'right');
		}
		if (active_id - pag_id == -2) {
			carouselTurn(object, 'left');
			setTimeout(function(){ carouselTurn(object, 'left');	 }, 200);
		}
		if (active_id - pag_id == 2) {
			carouselTurn(object, 'right');
			setTimeout(function(){ carouselTurn(object, 'right');	 }, 200);
		}
		if (active_id - pag_id == -3) {
			carouselTurn(object, 'right');
			setTimeout(function(){ carouselTurn(object, 'right');	 }, 200);
		}
		if (active_id - pag_id == 3) {
			carouselTurn(object, 'left');
			setTimeout(function(){ carouselTurn(object, 'left');	 }, 200);
		}
		if (active_id - pag_id == -4) {
			carouselTurn(object, 'right');
		}
		if (active_id - pag_id == 4) {
			carouselTurn(object, 'left');
		}
	})
}

function doingCarousel() {
	var container 	= jQuery('#doing-carousel_list');
	var items_array = [];
	container.find('li').each(function(){
		items_array.push(jQuery(this));
	});
	carouselAddClass(items_array);
	jQuery('#round_left').click(function(){
		carouselTurn(items_array, 'right');
	})
	jQuery('#round_right').click(function(){
		carouselTurn(items_array, 'left');
	})
	paginationClick(items_array);
	container.on('swipeleft', function(){
		carouselTurn(items_array, 'left');
	})
	container.on('swiperight', function(){
		carouselTurn(items_array, 'right');
	})
}

//=====================================================================*/

jQuery(document).ready(function(){
	//Carousel
	doingCarousel();
	activateZoom('.num_1_1');
	carouselZoomLines();
})
