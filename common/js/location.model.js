/* ********** **********
 * LOCATION MODEL
 * Represents a specific location in the dashboard, app, and mobile
 * ********** ********** */
function LocationModel(params) {

	/* ********** **********
	 * VARIABLES
	 * ********** ********** */

	var self = this;

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

	// update information about the location or make a new location
	self.saveLoc = function() {
		$('.locationModal .btn').hide();
		var fields = {};
		$.each(self.parent.locProps, function(index, key) { fields[key] = self[key](); });
		var type = 'POST';
		var url = '../api/locations';
		// if it's an existing model, update the method and the url
		if (self.hasOwnProperty('id')) {
			type = 'PUT';
			url += '/' + self.id();
		}
		$.ajax({
			type: type,
			url: url,
			data: fields,
			dataType: 'json',
			success: function(data) {
				if (!self.hasOwnProperty('id')) {
					self.id = ko.observable(data.id);
					self.parent.locs.push(self);
				}
				$('.locationModal').modal('toggle');
				$('.locationModal .btn').show();
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
		if (self.hasOwnProperty('id')) {
			$.each(self.values, function(key, value) { self[key](value); });
		} else {
			delete self; // its a new model, just delete it
		}
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