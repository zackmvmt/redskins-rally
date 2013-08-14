/* ********** **********
 * FOREACHPROP
 * Custom handler that loops through an objects properties and
 * returns an array of key value pairs
 * NOTE: you can add an 'ignoredFields' property to the object to omit certain keys
 * ********** ********** */
ko.bindingHandlers.foreachprop = {
	getProps: function(obj) {
		var props = [];
		for (key in obj) {
			var showKey = true;
			if (!obj.hasOwnProperty(key))
				showKey = false;
			if (obj.hasOwnProperty('ignoredFields') && obj.ignoredFields.indexOf(key) != -1)
				showKey = false;
			if (showKey) {
				var value = obj[key];
				props.push({ key: key, value: obj[key] });
			}
		}
		return props;
	},

	init: function(el, val) {
		var value = ko.utils.unwrapObservable(val());
		var props = ko.bindingHandlers.foreachprop.getProps(value);
		ko.applyBindingsToNode(el, { foreach: props });
		return { controlsDescendantBindings: true };
	}

}


/* ********** **********
 * DASH VIEW MODEL
 * Handles all the overall functionality of the dashboard
 * ********** ********** */
function DashViewModel() {

	/* ********** **********
	 * VARIABLES
	 * ********** ********** */

	var self = this;

	// all the locations
	self.locs = ko.observableArray();

	// the active location (for the modal to show)
	self.activeLoc = ko.observable();

	// the properties each location has (to show an empty form)
	self.locProps = [];

	/* ********** **********
	 * FUNCTIONS
	 * ********** ********** */

	// make a new location and trigger the popup
	self.newLoc = function() {
		self.activeLoc(new LocationModel({ name: 'New Location' }));
		$('.locationModal').modal('toggle');
	};

	// initialize function for pageload, grab the locations
	$.ajax({
		type: 'GET',
		url: '../api/locations',
		dataType: 'json',
		success: function(data) {
			// on success, add all the locations to the array
			self.locs($.map(data, function(loc, i) {
				// for the first, store all the keys (except id)
				if (i == 0) self.locProps = $.map(loc, function(val, key) { return key; });
				// make a new model and save the information
				var new_loc = new LocationModel(loc);
				new_loc.parent = self;
				return new_loc;
			}));
			self.locProps.splice(self.locProps.indexOf('id'), 1);
			// generate a list of ignored values (to avoid every prop loading in modal)
			$.each(self.locs(), function(index, loc) {
				loc.ignoredFields = [];
				for (key in loc) {
					if (self.locProps.indexOf(key) == -1) loc.ignoredFields.push(key);
				}
			});
		}
	});

};


// start up knockout
ko.applyBindings(new DashViewModel());