'use strict';

import babel from 'gulp-babel';
import gulp from 'gulp';

gulp.task('js', () => {
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['js']);
