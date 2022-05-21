var gulp        = require('gulp');
var minifyCSS   = require('gulp-minify-css');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass')(require('node-sass'));

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("app/scss/*.scss")
    .pipe(sass())
    .pipe(minifyCSS({
      relativeTo: './node_modules',
      processImport: true
    }))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function() {

  browserSync.init({
    server: "./app"
  });

  gulp.watch("app/scss/*.scss", gulp.task('sass'));
  gulp.watch("app/*.html").on('change', browserSync.reload);
}));

gulp.task('default', gulp.task('serve'));