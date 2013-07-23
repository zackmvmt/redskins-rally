$(function() {
	
	$.map = $('#map-container').gmap({
		'center': '41.244772,-92.246597',
		'zoom': 5,
		'styles': styles,
		'scaleControl': false,
		'mapTypeControl': false,
		'streetViewControl': false,
		'zoomControlOptions': {
			style: google.maps.ZoomControlStyle.SMALL,
			position: google.maps.ControlPosition.RIGHT_CENTER
		},
		'panControlOptions': {
			position: google.maps.ControlPosition.RIGHT_CENTER
		}
	});

});