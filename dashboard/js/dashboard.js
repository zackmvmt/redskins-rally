/* ********** **********
 * DUMMY DATABSE DATA
 * ********** ********** */
var database = [
	{ name: 'Charles Village Pub', city: 'Towson', state: 'Maryland' },
	{ name: 'Sothern Sun', city: 'Boulder', state: 'Colorado' },
	{ name: 'The Dark Horse', city: 'Boulder', state: 'Colorado' },
	{ name: 'Kito\'s Cave', city: 'Petersburg', state: 'Alaska' }
];


/* ********** **********
 * FOREACHPROP
 * Custom handler that loops through an objects properties and
 * returns an array of key value pairs
 * NOTE: This is not fully abstracted out (see saveLoc)
 * ********** ********** */
ko.bindingHandlers.foreachprop = {
	getProps: function(obj) {
		var props = [];
		for (key in obj) {
			// NOTE: the saveLoc check is not abstracted
			if (obj.hasOwnProperty(key) && key != 'saveLoc')
				props.push({ key: key, value: obj[key] });
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

	self.locs = ko.observableArray($.map(database, function(loc) {
		return new LocationModel(loc);
	}));

	self.activeLoc = ko.observable();

	/* ********** **********
	 * FUNCTIONS
	 * ********** ********** */

	self.removeLoc = function(loc) {
		// TODO...server
		self.locs.remove(loc);
	};

	self.editLoc = function(loc) {
		self.activeLoc(loc);
		$('.locationModal').modal('toggle');
	};

	self.newLoc = function() {
		// TODO...fix this
		self.activeLoc = new LocationModel({});
		$('.locationModal').modal('toggle');
	};

};


// start up knockout
ko.applyBindings(new DashViewModel());