var dbName = 'portfoliostrat-db-tests';
var dbURI = 'mongodb://localhost:27017/' + dbName;
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var mongoose = require('mongoose');
var request = require('supertest');
var app = require("../server/app");

var Graph = require('../server/routes/graphs/graph.model.js');

describe('Portfolio strat tests', function (done) {

	before('Connect to db', function (done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  after('Clear test database', function (done) {
    clearDB(done);
  });

  describe('Graph model tests', function () {

	  it('should exist', function (done) {
	    expect(Graph).to.be.a('function');
	    done();
	  });
  });

	describe('Graph GET and POST', function () {

		describe('POST', function () {
	  	it('Should create a document in the db', function (done) {
	  		var testGraph = {
	  			title: 'Test Chart',
	  			chart_type: 'scatter',
	  			data_min: 1,
	  			data_max: 5
	  		};
	  		request(app).post('/graph/save').send(testGraph).end(function (err,data) {
	  			if (err) done(err);

	  			expect(data.body.title).to.equal('Test Chart');
	  			expect(data.body.chart_type).to.equal('scatter');
	  			done();
	  		});
	  	});
	  });

	  describe('GET', function () {

	  	var id;

	  	beforeEach('create documents', function (done) {
	  		
	  		var testGraphs = [{ title: 'test 1', chart_type: 'scatter', data_min: 3, data_max: 10 },
	  											{ title: 'test 2', chart_type: 'line', data_min: 1, data_max: 10 },
	  											{ title: 'test 3', chart_type: 'bar', data_min: -10, data_max: 10 }];
	  		Graph.create(testGraphs, function (err, testArray) {
	  			if (err) done(err);
	  			id = testArray[0]._id;
	  			done();
	  		});
	  	});

	  	it('Should return an array of all graphs', function (done) {
	  		request(app).get('/graph/get/undefined').end(function (err, data) {
	  			if (err) done(err);
	  			
	  			expect(data.body.length).to.equal(3);
	  			expect(data.body[1].title).to.equal('test 2');
	  			expect(data.body[2].data_min).to.equal(-10);
					done();
	  		});
	  	});

	  	it('Should return a specific graph by id', function (done) {
	  		request(app).get('/graph/get/' + id).end(function (err, data) {
	  			if (err) done(err);
	  			
	  			expect(data.body[0]._id).to.equal(id.toString());
					done();
	  		});
	  	});
	  });
	});
});
