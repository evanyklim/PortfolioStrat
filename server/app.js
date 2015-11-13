var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var indexHtmlPath = path.join(__dirname, '../views/index.html');
var clientPath = path.join(__dirname, '../client/angular');
var nodePath = path.join(__dirname, '../node_modules');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(clientPath));
app.use(express.static(nodePath));

// graph routes
app.use('/graph', require('./routes/graphs'));

app.use('/*', function (req, res, next) {
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