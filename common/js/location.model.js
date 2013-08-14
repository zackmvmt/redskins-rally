/* ********** **********
 * LOCATION MODEL
 * Represents a specific location in the dashboard, app, and mobile
 * ********** ********** */
function LocationModel(params) {

	/* ********** **********
	 * VARIABLES
	 * ********** ********** */

	var self = this;

	// properties that belong to this model, but shouldnt be displayed anywhere
	self.ignoredFields = ['ignoredFields', 'saveLoc', 'editLoc', 'removeLoc', 'parent'];

	// given the params, add the properties in as observables
	$.each(params, function(key, value) {
		self[key] = ko.observable(value);
	});

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