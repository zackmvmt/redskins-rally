/* ********** **********
 * APP VIEW MODEL
 * Handles all the overall functionality of the application
 * ********** ********** */
function AppViewModel() {

	/* ********** **********
	 * VARIABLES
	 * ********** ********** */

	var self = this;

	// wether or not we should fade out the background
	self.fade = ko.observable(false);

	// the model that represents the entry
	self.entryModel = ko.observable();

	/* ********** **********
	 * INIT
	 * ********** ********** */

	// init the map TODO: load the map points
	// $.mainMap = $('#map-container').gmap({
	// 	'center': '41.244772,-92.246597',
	// 	'zoom': 5,
	// 	'styles': styles,
	// 	'scaleControl': false,
	// 	'mapTypeControl': false,
	// 	'streetViewControl': false,
	// 	'zoomControlOptions': {
	// 		style: google.maps.ZoomControlStyle.SMALL,
	// 		position: google.maps.ControlPosition.RIGHT_CENTER
	// 	},
	// 	'panControlOptions': {
	// 		position: google.maps.ControlPosition.RIGHT_CENTER
	// 	}
	// });

	/* ********** **********
	 * ENTER TO WIN
	 * ********** ********** */

	// open the enter to win dialog
	self.openEnter = function() {
		self.entryModel(new EntryModel());
		$('.enter-form .submit-btn').show();
		$('.enter-form').show();
		$('.enter-thanks').hide();
		$('.enter-start').addClass('expanded');
		self.fade(true);
	};

	// close the enter to win dialog
	self.closeEnter = function() {
		$('.enter-start').removeClass('expanded');
		self.fade(false);
	};

	/* ********** **********
	 * SOCIAL BUTTONS (after entering)
	 * ********** ********** */

	// FB share on the thank you screen
	self.fbShare = function() {
		// TODO: add more content to the share box
		window.open(
			'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href),
			'facebook-share-dialog',
			'width=626,height=436'
		);
	};

	// tweet on the thank you screen
	self.twitterShare = function() {
		// TODO: add mroe content to the tweet box
		var twitterUrl = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent('Redskins Rally');
		window.open(twitterUrl,'','width=450,height=450');
	};

};


// start up knockout
ko.applyBindings(new AppViewModel());