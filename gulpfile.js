var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');

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

gulp.task('default', function(){
	gulp.watch('app/**/*.nunjucks', ['nunjucks']);
});