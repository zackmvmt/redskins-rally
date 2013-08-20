/* ********** **********
 * ENTRY MODEL
 * Handles all the rendering and submission logic for an entry
 * NOTE: there are no params, this is created with blank fields
 * ********** ********** */
function EntryModel() {

	/* ********** **********
	 * VARIABLES
	 * ********** ********** */

	var self = this;

	// all the states :-/
	self.states = new Array("", "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming");

	// stores the fields
	self.fieldMap = { 'First Name'	: 'f_name',
						'Last Name'	: 'l_name',
						'Email'		: 'email',
						'DOB Month'	: 'dob_m',
						'DOB Day'	: 'dob_d',
						'DOB Year'	: 'dob_y',
						'Address'	: 'address',
						'City'		: 'city',
						'State'		: 'state',
						'Zip'		: 'zip' };
	$.each(self.fieldMap, function(i, val) { self[val] = ko.observable(''); });

	// store the checkbox values
	self.ofAge = ko.observable(false);
	self.readRules = ko.observable(false);

	/* ********** **********
	 * SUBMIT
	 * ********** ********** */

	// submit an entry
	self.submitEnter = function() {
		console.clear();
		// validate fields
		var valid = true;
		var message = '';
		$.each(self.fieldMap, function(index, key) {
			if (self[key]() == '' && key != 'address' && key != 'state') {
				message += ' ' + index + ',';
				valid = false;
			}
		});
		if (!valid) {
			message = message.substr(0, message.length - 1);
			alert('Please enter the following missing fields:' + message + '.');
			return false;
		}
		// TODO: validate more than simple completion (email, over 21, zip)
		// ensure check boxes
		if (!self.ofAge()) {
			alert('You must be 21 or older to enter.');
			return false;
		}
		if (!self.readRules()) {
			alert('Please read the official rules.')
			return false;
		}
		// send the information to the server
		$('.enter-form .submit-btn').hide();
		var fields = {};
		$.each(self.fieldMap, function(index, key) { fields[key] = self[key](); });
		$.ajax({
			type: 'POST',
			url: '../api/entries',
			data: fields,
			dataType: 'json',
			success: function(data) {
				$('.enter-form').hide();
				$('.enter-thanks').fadeIn();
			}
		});
	};

};