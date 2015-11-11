// nodemon server/start.js
//var startDb = require('./db');
var port = (process.env.PORT || 7787);
var app;
app = require('./app');
app.listen(port, function () {
	console.log('server listening on port', port);
});
// startDb.then(function() {
// 	app = require('./app');
// 	app.listen(port, function () {
// 		console.log('server listening on port ', port);
// 	});
// })
// .catch(function (err) {
// 	console.log('Problem detected starting up');
// 	console.log(err.message);
// 	process.kill(1);
// });


