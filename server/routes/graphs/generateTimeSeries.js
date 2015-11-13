var Chance = require('chance');  // for generating random values
var chance = new Chance();
var _ = require('lodash');   // for zipping values together

module.exports = function (points, min, max) {
	
	// points = the number of data points to generate
	// generate random time series within the given parameters
	var values = [], dates = [], date_strings = [];
	var start_date = chance.date();

	// generate values
	for (var i = 0; i < points; i++) {
		values.push(chance.floating({ min: min, max: max , fixed: 2 }));
	}

	for (var i = 0; i < points; i++) {
		dates.push(start_date.setDate(start_date.getDate() + 1));
	}

	date_strings = dates.map(function (date) {
		var date_str = new Date(date);
		return date_str.toLocaleDateString();
	});

	return _.zip(date_strings, values);

};