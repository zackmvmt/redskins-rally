// dummy data to work off of
var database = [
	{ name: 'Charles Village Pub', city: 'Towson', state: 'Maryland' },
	{ name: 'Sothern Sun', city: 'Boulder', state: 'Colorado' },
	{ name: 'The Dark Horse', city: 'Boulder', state: 'Colorado' },
	{ name: 'Kito\'s Cave', city: 'Petersburg', state: 'Alaska' }
];

function LocationModel(params) {

	var self = this;

	// data
	// TODO...map values instead of hardcoding them
	self.name = ko.observable(params.name);
	self.city = ko.observable(params.city);
	self.state = ko.observable(params.state);

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
	}
	self.editLoc = function(loc) {
		self.activeLoc(loc);
		$('.locationModal').modal('toggle');
	}

	// routes

};

// start up knockout
ko.applyBindings(new AppViewModel());