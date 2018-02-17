'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var minify = require('gulp-csso');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
var svgstore = require('gulp-svgstore');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var run = require('run-sequence');
var del = require('del');
var server = require('browser-sync').create();

gulp.task('style', function() {
  gulp
    .src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('images', function() {
  return gulp
    .src('source/img/**/*.{png,jpg,svg}')
    .pipe(
      imagemin(
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.svgo()
      )
    )
    .pipe(gulp.dest('build/img'));
});

gulp.task('webp', ['images'], function() {
  return gulp
    .src('build/img/**/*.{png,jpg}')
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest('build/img'));
});

gulp.task('svg-symbols', function() {
  return gulp
    .src('build/img/svg-symbols/*.svg')
    .pipe(
      svgstore({
        inlineSvg: true
      })
    )
    .pipe(rename('symbols.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('copy-html', function() {
  return gulp.src('source/**.html', { base: 'source' })
  .pipe(gulp.dest('build'));
});

gulp.task('copy-img', function() {
  return gulp
    .src('source/img/**/*.{jpg,png,svg}', { base: 'source' })
    .pipe(gulp.dest('build'));
});

gulp.task('copy-js', function() {
  return gulp
    .src('source/js/**.js', { base: 'source' })
    .pipe(gulp.dest('build'));
});

gulp.task('copy-fonts', function() {
  return gulp
    .src('source/fonts/**/*.{woff,woff2}', { base: 'source' })
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function() {
  return del('build');
});

gulp.task('copy', ['copy-html', 'copy-img', 'copy-js', 'copy-fonts']);

gulp.task('build', function(done) {
  run('clean', 'copy', 'svg-symbols', 'style', 'webp', done);
});

gulp.task('serve', function() {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/sass/**/*.{scss,sass}', ['style']);
  gulp.watch('source/*.html', ['copy-html']).on('change', server.reload);
});
