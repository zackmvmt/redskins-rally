// dummy data to work off of
var database = [
	{ name: 'Charles Village Pub', city: 'Towson', state: 'Maryland' },
	{ name: 'Sothern Sun', city: 'Boulder', state: 'Colorado' },
	{ name: 'The Dark Horse', city: 'Boulder', state: 'Colorado' },
	{ name: 'Kito\'s Cave', city: 'Petersburg', state: 'Alaska' }
];

// custom binding to loop through an objects properties
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

function LocationModel(params) {

	var self = this;

	// data
	// TODO...map values instead of hardcoding them
	self.name = ko.observable(params.name);
	self.city = ko.observable(params.city);
	self.state = ko.observable(params.state);

	self.saveLoc = function() {
		// TODO...server
	};

};

function AppViewModel() {

	var self = this;

	// data
	self.locs = ko.observableArray($.map(database, function(loc) {
		return new LocationModel(loc);
	}));
	self.activeLoc = ko.observable();

	// functions
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

	// routes

};

// start up knockout
ko.applyBindings(new AppViewModel());