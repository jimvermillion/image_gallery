'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

var files = ['gulpfile.js', './*/*.js', './test/*.js',
 '!node_modules/**', '!*.json'];

gulp.task('lint', () => {
  return gulp.src(files)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('mocha', () => {
  return gulp.src('tests/*.js')
    .pipe(mocha({ reporter: 'nyan' }));
});

gulp.task('watch', () => {
  return gulp.watch(files, ['lint', 'mocha']);
});

gulp.task('default', ['watch', 'lint', 'mocha']);
