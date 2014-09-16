var $          = require('gulp-load-plugins')();
var fs         = require('fs-extra');
var gulp       = require('gulp');
var handlebars = require('handlebars');
var path       = require('path');

gulp.task('templates', function () {
    return gulp.src('app/templates/*.hbs')
        .pipe($.tap(function (file, t) {
            var context = {
                basename: path.basename(file.path, path.extname(file.path))
            };
            context.path = file.base + context.basename + '.json';
            // var basename = path.basename(file.path, path.extname(file.path));
            // var contextPath = file.base + basename + '.json';
            try {
                context.data = fs.readJsonSync(context.path);
            } catch (_e) {
                context.data = {};
            }

            var html;
            // if ('data' in context) {
            try {
                var layout = fs.readFileSync(file.base + '_layout.hbs');

                context.data.content = file._contents.toString();
                html                 = handlebars.compile(layout)(context.data);
            } catch (_e) {
                var template = file._contents.toString();

                html = handlebars.compile(template)(context.data);
            }

            file._contents = new Buffer(html);
            file.path      = $.util.replaceExtension(file.path, '.html');
            // }
        }))
        .pipe(gulp.dest('dist/'));
});
