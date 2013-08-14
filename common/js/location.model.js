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
	self.ignoredFields = ['ignoredFields', 'id', 'values', 'parent',
		'saveLoc', 'editLoc', 'removeLoc', 'resetLoc'];

	// stores initial values so user can reset back (canceling in edit)
	self.values = {};

	// given the params, add the properties in as observables
	$.each(params, function(key, value) {
		self[key] = ko.observable(value);
		self.values[key] = value;
	});

	/* ********** **********
	 * DASHBOARD FUNCTIONS
	 * ********** ********** */

	// update information about the location
	self.saveLoc = function() {
		// TODO: determine if this is new or old
		var fields = {};
		for (key in self.values) {
			if (key != 'id') fields[key] = self[key]();
		}
		$.ajax({
			type: 'PUT', // or post!
			url: '../api/locations/' + self.id(),
			data: fields,
			dataType: 'json',
			success: function(data) {
				$('.locationModal').modal('toggle');
			}
		});
	};

	// when the user clicks on the edit button, show the popup
	self.editLoc = function() {
		self.parent.activeLoc(self);
		$('.locationModal').modal('toggle');
	};

	// if the user goes to edit, and then cancels, reset the information
	self.resetLoc = function() {
		$.each(self.values, function(key, value) {
			self[key](value);
		});
	};

	// when the user clicks on the delete button, remove this location
	self.removeLoc = function() {
		var btn = $('tr[data-id=' + self.id() + '] .btn-danger');
		if (btn.text() == 'Delete') {
			btn.text('Sure?');
		} else {
			$.ajax({
				type: 'DELETE',
				url: '../api/locations/' + self.id(),
				dataType: 'json',
				success: function(data) {
					self.parent.locs.remove(self);
				}
			});
		}
	};

};