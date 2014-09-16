/* PROTIP: Rename to `gulpfile.js` if you intend to run this file. */

'use strict';

var $          = require('gulp-load-plugins')();
var fs         = require('fs-extra');
var gulp       = require('gulp');
var handlebars = require('handlebars');
var path       = require('path');

gulp.task('templates', function () {
    return gulp.src(['app/templates/*.hbs', '!app/templates/_layout.hbs'])
        .pipe($.tap(function (file, t) {
            var html;
            var template;
            var context = {
                basename: path.basename(file.path, path.extname(file.path))
            };

            try {
                context.data = fs.readJsonSync(file.base + '_data.json')[context.basename];
            } catch (_e) {
                context.data = {};
            }

            try {
                var layout  = fs.readFileSync(file.base + '_layout.hbs').toString();
                var content = file._contents.toString();

                template = handlebars.compile(layout)({ content: content });
            } catch (_e) {
                template = file._contents.toString();
            }

            html           = handlebars.compile(template)(context.data);
            file._contents = new Buffer(html);
            file.path      = $.util.replaceExtension(file.path, '.html');
        }))
        .pipe(gulp.dest('dist/'));
});
