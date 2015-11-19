var gulp = require('gulp');
var mocha = require('gulp-mocha');
var Karma = require('karma').Server;

gulp.task('build', function() {
  console.log('supposedly building...');
});

// Testing server side code
gulp.task('testServerJS', function() {
  return gulp.src('./tests/*.spec.js', {
        read: false
      })
      .pipe(mocha({
        reporter: 'spec'
      }));
});

gulp.task('testClientJS', function (done) {
    new Karma({
        configFile: __dirname + '/tests/karma.conf.js',
        singleRun: true
    }, done).start();
});