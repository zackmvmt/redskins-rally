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
	 * DASHBOARD FUNCTIONS
	 * ********** ********** */

	// update information about the location
	self.saveLoc = function() {
		// TODO...server
	};

	// when the user clicks on the edit button, show the popup
	self.editLoc = function() {
		self.parent.activeLoc(self);
		$('.locationModal').modal('toggle');
	};

	// when the user clicks on the delete button, remove this location
	self.removeLoc = function() {
		// TODO...server
		self.parent.locs.remove(self);
	};

};