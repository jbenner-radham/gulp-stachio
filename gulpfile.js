'use strict';

let gulp   = require('gulp');
let jscs   = require('gulp-jscs');
let jshint = require('gulp-jshint');

gulp.task('js', () => {
    return gulp.src('lib/**/*.js')
        .pipe(jscs())
        .pipe(jscs.reporter())
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('default', ['js']);
