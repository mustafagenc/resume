const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const prefix = require('gulp-autoprefixer')
const plumber = require('gulp-plumber')
const pug = require('gulp-pug')
const concat = require('gulp-concat');
const minifyCss = require("gulp-minify-css");
const minify = require("gulp-minify");
const uglify = require("gulp-uglify");
const sourcemaps = require('gulp-sourcemaps');
const reload = browserSync.reload

gulp.task('browser-sync', function () {
  browserSync.init({
    notify: false,
    server: {
      baseDir: './'
    }
  })
  gulp.watch('./views/**/*.pug', ['html'])
  gulp.watch('./src/scss/**/*.scss', ['css'])
  gulp.watch('./src/js/**/*.js', ['js'])
})

gulp.task('css', () => {
  return gulp.src('./src/scss/app.scss')
  .pipe(plumber([{ errorHandler: false }]))
  .pipe(sass())
  .pipe(prefix())
  .pipe(minifyCss())
  .pipe(gulp.dest('./'))
  .pipe(browserSync.stream())
  .on('end', reload);
})

gulp.task('html', () => {
  return gulp.src('./views/*.pug')
  .pipe(pug())
  .pipe(gulp.dest('./'))
  .on('end', reload);
})

gulp.task('js', function () {
  gulp.src('./src/js/app.js')
  .pipe(uglify())
  .pipe(gulp.dest('./'))
  .on('end', reload);
});

gulp.task('default', ['browser-sync', 'js', 'html', 'css'])