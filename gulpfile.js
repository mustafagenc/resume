const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const prefix = require('gulp-autoprefixer')
const plumber = require('gulp-plumber')
const pug = require('gulp-pug')
const minifyCss = require("gulp-minify-css");
const uglify = require("gulp-uglify");
const reload = browserSync.reload

gulp.task('browser-sync', function () {
  browserSync.init({
    notify: false,
    server: {
      baseDir: './'
    }
  })
  gulp.watch('./*.html', reload)
  gulp.watch('./views/**/*.pug', ['html'])
  gulp.watch('./src/scss/**/*.scss', ['css'])
  gulp.watch('./src/js/**/*.js', reload)
})

gulp.task('css', () => {
  return gulp.src('./src/scss/main.scss')
  .pipe(plumber([{ errorHandler: false }]))
  .pipe(sass())
  .pipe(prefix())
  .pipe(minifyCss())
  .pipe(gulp.dest('./'))
  .pipe(browserSync.stream())
})

gulp.task('html', () => {
  return gulp.src('./views/*.pug')
  .pipe(pug())
  .pipe(gulp.dest('./'))
  .on('end', reload)
})

gulp.task('js', function () {
  gulp.src('./src/js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('./'));
});

gulp.task('default', ['browser-sync', 'js', 'html', 'css'])