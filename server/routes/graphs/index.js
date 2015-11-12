var router = require('express').router();

var Graph = require('./graph.model');

module.exports = router;

router.post('/save', function (req, res, next) {
	Graph.create(req.body, function (err, graph) {
		if (err) return next(err);

		res.send(graph);
	});
});

router.get('/get', function (req, res, next) {
	Graph.find().exec().then(function (graphs) {
		res.send(graphs);
	});
});