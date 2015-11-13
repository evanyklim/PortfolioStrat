var router = require('express').Router();
var Graph = require('./graph.model');
var generateTimeSeries = require('./generateTimeSeries');

module.exports = router;

router.post('/save', function (req, res, next) {
	console.log('save route!');
	var body = req.body;
	var min = body.data_min, 
			max = body.data_max;
	if (req.body.chart_type === 'scatter') {
		body.data = [{ series: generateTimeSeries(10, min, max) },
								 { series: generateTimeSeries(10, min, max) }];	
	} else {
		body.data = [{ series: generateTimeSeries(10, min, max) }];
	}
	res.send(body);
	
	// Graph.create(req.body, function (err, graph) {
	// 	if (err) return next(err);
  
	// 	res.send(graph);
	// });
});

router.get('/get', function (req, res, next) {
	Graph.find().exec().then(function (graphs) {
		res.send(graphs);
	});
});