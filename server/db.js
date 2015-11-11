var dbName = 'portfoliostrat-db';
var Promise = require('bluebird');
var DATABASE_URI = proces.env.MONGOLAB_URI || 'mongodb://localhost:27017/' + dbName;

var mongoose = require('mongoose');
var db = mongoose.connect(DATABASE_URI).connection;

var startDbPromise = new Promise(function (resolve, reject) {
  db.on('open', resolve);
  db.on('error', reject);
});;

startDbPromise.then(function () {
  console.log('MongoDB connection opened: ', dbName);
});

module.exports = startDbPromise;