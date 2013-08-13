/* ********** **********
 * LOCATION MODEL
 * Represents a specific location in the dashboard, app, and mobile
 * ********** ********** */
function LocationModel(params) {

	/* ********** **********
	 * VARIABLES
	 * ********** ********** */

	var self = this;

	// TODO...map values instead of hardcoding them
	self.name = ko.observable(params.name);
	self.city = ko.observable(params.city);
	self.state = ko.observable(params.state);

	/* ********** **********
	 * FUNCTIONS
	 * ********** ********** */

	// update information about the location
	self.saveLoc = function() {
		// TODO...server
	};

};