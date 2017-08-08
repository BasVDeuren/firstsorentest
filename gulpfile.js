var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var connect = require('gulp-connect');

gulp.task('nunjucks', function() {
  // Gets .nunjucks files in app
  return gulp.src('app/pages/**/*.+(nunjucks)')
  // Renders template with nunjucks
  .pipe(nunjucksRender({
      path: ['app/templates']
    }))
  // output files in app folder
  .pipe(gulp.dest('app/dist'))
});

gulp.task('webserver', function(){
	connect.server({
		livereload: true,
		port: 1234,
	});
});

gulp.task('watch', function(){
	gulp.watch('app/**/*.nunjucks', ['nunjucks']);
});

gulp.task('default', ['nunjucks','webserver', 'watch']);