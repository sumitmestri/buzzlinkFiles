jQuery(function($){ // use jQuery code inside this to avoid "$ is not defined" error
	$('.more-news .button').click(function(){
		var button = $(this),
			postsCurrentAttr = parseInt(button.attr('data-counter')),
			postTypeAttr     = button.attr('data-type'),
			data = {
				action: 'ajax_works',
				postsCount: ajaxworks.postsCount,
				postsCurrent: postsCurrentAttr,
				postType: postTypeAttr
			},
			firstDot = $('.first-dot'),
			secondDot = $('.second-dot'),
			currentPosition = window.scrollY;

		$('.works-displace').removeClass('works-displace');

		$.ajax({ // you can also use $.post here
			url : ajaxworks.ajaxurl, // AJAX handler
			type : 'POST',
			data : data,
			beforeSend : function ( xhr ) {
				addAnimationsDots(button, firstDot, secondDot);
			},
			success : function( data ){
				if(postTypeAttr == 'work') {
					postsCurrentAttr = (postsCurrentAttr + 4);
				}else {
					postsCurrentAttr = (postsCurrentAttr + 6);
				}
				if( data ) {
					button.attr('data-counter', postsCurrentAttr);
					setTimeout(function(){
						if(postTypeAttr == 'work') {
							$('.works .container > div').append(data); //apend loaded posts
						}else {
							$('.blog .container').append(data);
						}

						removeAnimationsDots(button, firstDot, secondDot, false);

						if ( postsCurrentAttr == ajaxworks.postsCount ) {
							removeAnimationsDots(button, firstDot, secondDot, true);
						}
					}, 1500);
			
				}else {
					removeAnimationsDots(button, firstDot, secondDot, true);
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {}
		});
	});
});

function displace(classDisplace) {
	Array.from(document.querySelectorAll(classDisplace)).forEach((el) => {
		const imgs = Array.from(el.querySelectorAll('img'));
		new hoverEffect({
			parent: el,
			intensity: el.dataset.intensity || undefined,
			speedIn: el.dataset.speedin || undefined,
			speedOut: el.dataset.speedout || undefined,
			easing: el.dataset.easing || undefined,
			hover: el.dataset.hover || undefined,
			image1: imgs[0].getAttribute('src'),
			image2: imgs[1].getAttribute('src'),
			displacementImage: el.dataset.displacement
		});
	});
}

function addAnimationsDots(button, firstDot, secondDot) {
	button.parent().addClass('remove-text');
	setTimeout(function(){
		button.parent().addClass('loading-items');
	}, 200);
	setTimeout(function() {
		button.parent().addClass('animate-borders');
	}, 250);
	setTimeout(function(){
		firstDot.addClass('animate-dot');
	}, 500)
	setTimeout(function(){
		button.addClass('animate-dot');
	}, 600)
	setTimeout(function(){
		secondDot.addClass('animate-dot')
	}, 700)
}
function removeAnimationsDots(button, firstDot, secondDot, last){
	if(last) {
		button.remove(); // if last page, remove the button
		firstDot.remove();
		secondDot.remove();
	}else {
		setTimeout(function(){
			secondDot.removeClass('animate-dot')
		}, 150);
		setTimeout(function() {
			button.removeClass('animate-dot');
		}, 200);
		setTimeout(function(){
			button.removeClass('animate-dot');
		}, 300)
		setTimeout(function(){
			button.parent().removeClass('animate-borders');
			firstDot.removeClass('animate-dot');
		}, 400)
		setTimeout(function(){
			button.parent().removeClass('loading-items');
			button.parent().removeClass('remove-text');
		}, 500)
	}
}