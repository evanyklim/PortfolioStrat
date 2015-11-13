var router = require('express').Router();
var Graph = require('./graph.model');
var generateTimeSeries = require('./generateTimeSeries');
var Chance = require('chance');  // for generating random values
var chance = new Chance();

module.exports = router;

router.post('/save', function (req, res, next) {
	console.log('save route!');
	var body = req.body,
	 		min = body.data_min, 
			max = body.data_max,
			// generate start date for time series here
			start_date = chance.date(); 
	
	if (req.body.chart_type === 'scatter') {
		body.data = [{ series: generateTimeSeries(10, start_date, min, max) },
								 { series: generateTimeSeries(10, start_date, min, max) }];	
	} else {
		body.data = [{ series: generateTimeSeries(10, start_date, min, max) }];
	}
	Graph.create(body, function (err, graph) {
		if (err) return next(err);
  
		res.send(graph);
	});
});

router.get('/get', function (req, res, next) {
	console.log('req.params', req.params);
	Graph.find().exec().then(function (graphs) {
		res.send(graphs);
	});
});