"use strict";

var gulp = require('gulp'),
    maps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    gutil = require('gulp-util'),   
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),     
    connect = require('gulp-connect'),
    sequence = require('gulp-sequence'), 
    minifyCss = require('gulp-clean-css'),
    tinyPng = require('gulp-tinypng'),
    browserSync = require('browser-sync').create();

var path = {
    js : 'assets/src/js/',
    css : 'assets/src/css/',
    scss : 'assets/src/scss/',
    fonts : 'assets/src/fonts/',
    jquery : 'bower_components/jquery/dist/',
    bootstrapJS : 'bower_components/bootstrap/dist/js/',
    bootstrapCSS : 'bower_components/bootstrap-sass/assets/styesheets/',
    bootstrapFont: 'bower_components/bootstrap-sass/assets/fonts/'
}

// var loc = document.location.pathname;

// Compile SASS / CSS
gulp.task('sass-css', function () {
  return gulp.src('assets/src/style.scss')
    .pipe(sass({includePaths: path.scss }))
    .pipe(maps.init())   
    .pipe(concat('style.css'))
    .pipe(minifyCss({compatibility: 'ie8'})) 
    .pipe(maps.write('.maps'))   
    .pipe(gulp.dest('assets/dist/css'))
    .pipe(browserSync.reload({stream:true}));
});

// Uglify JS
gulp.task('compress', function() {
  return gulp.src([
    path.js + 'init.js'])
    .pipe(concat('init.js'))
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })   
    .pipe(gulp.dest('assets/dist/js'))
});

// Minify CSS third party
// gulp.task('sass-css-3rd', function() {
//   return gulp.src([
//     'bower_components/bootstrap/dist/css/bootstrap.css'])
//     .pipe(concat('style.css'))
//     .pipe(minifyCss({compatibility: 'ie8'}))
//     .pipe(gulp.dest('../../dist/css'));
// });

// Uglify JS third party
gulp.task('compress-3rd', function() {
  return gulp.src([
    path.jquery + 'jquery.js',
    path.bootstrapJS + 'bootstrap.js',
    path.js + 'isotope.pkgd.min.js'])
    .pipe(concat('script.js'))
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })  
    .pipe(gulp.dest('assets/dist/js'));
});

// Copy fonts
gulp.task('copyfonts', function() {
  return gulp.src([
    path.bootstrapFont + '/**/*.{ttf,woff,woff2,eof,svg}',
    path.fonts + '/**/*.{ttf,woff,woff2,eof,svg}'])
   .pipe(gulp.dest('assets/dist/fonts'));
});

// Compress image
gulp.task('tinypng', function () {
    gulp.src(['assets/src/img/**/*.png',
      'assets/src/img/**/*.jpg'])
        .pipe(tinyPng('YVgA9eP8K9eYexMFCxNi78WUqUJrD01A'))
        .pipe(gulp.dest('assets/dist/img'));
});

// Watching files
gulp.task('watch', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("assets/src/js/*.js", ['compress'], function() {browserSync.reload();});
    gulp.watch("assets/src/scss/*.scss", ['sass-css'], function() {browserSync.reload();});
    gulp.watch("assets/src/css/*.css", ['sass-css'], function() {browserSync.reload();});
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("*.php").on('change', browserSync.reload);
});

gulp.task('tinify', ['tinypng']);
gulp.task('dev', ['sass-css', 'compress', 'compress-3rd', 'copyfonts', 'watch']);
gulp.task('default', ['watch']);