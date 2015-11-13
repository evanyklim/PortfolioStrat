var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('build', function() {
  console.log('supposedly building...');
});

// Testing server side code
gulp.task('test', function() {
  return gulp.src('./tests/*.spec.js', {
        read: false
      })
      .pipe(mocha({
        reporter: 'spec'
      }));
});