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

	self.locs = ko.observableArray();

	self.activeLoc = ko.observable();

	/* ********** **********
	 * FUNCTIONS
	 * ********** ********** */

	// make a new location and trigger the popup
	self.newLoc = function() {
		// TODO...fix this
		self.activeLoc = new LocationModel({});
		$('.locationModal').modal('toggle');
	};

	// initialize function for pageload, grab the locations
	$.ajax({
		type: 'GET',
		url: '../api/locations',
		dataType: 'json',
		success: function(data) {
			// on success, add all the locations to the array
			self.locs($.map(data, function(loc) {
				var new_loc = new LocationModel(loc);
				new_loc.parent = self;
				return new_loc;
			}));
		}
	});

};


// start up knockout
ko.applyBindings(new DashViewModel());