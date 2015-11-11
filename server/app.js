var express = require('express');
var app = express();
var path = require('path');

var indexHtmlPath = path.join(__dirname, '../views/index.html');
var clientPath = path.join(__dirname, '../client/js');
var nodePath = path.join(__dirname, '../node_modules');

app.use(express.static(indexHtmlPath));
app.use(express.static(clientPath));
app.use(express.static(nodePath));

app.post('/graph/save', function (req, res, next) {
	// saves a graph to the graph model
});

app.get('/graph/get', function (req, res, next) {
	// retrieves a graph using _id
	// use query params?
	res.send('<div>get</div>');
});

app.use('/', function (req, res, next) {
	res.sendFile(indexHtmlPath);
});

app.use(function (req, res, next) {
	var err = new Error('Unknown Route');
	err.status = 404;
	next(err);
});

app.use(function (err, req, res, next) {
  res.sendStatus(err.status || 500);
});

module.exports = app;