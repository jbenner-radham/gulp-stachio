/* @flow */
'use strict';

var _ = require('lodash');
var fs = require('fs-extra');
var handlebars = require('handlebars');
var hasPrivateFilename = require('@radioactivehamster/has-private-filename');
var gutil = require('gulp-util');
var path = require('path');
var pkg = require('' + __dirname + '/../package.json');
var through = require('through2');

module.exports = function () {
    var context = arguments[0] === undefined ? {} : arguments[0];

    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(pkg.name, 'Streaming not supported'));
            return cb();
        }

        var layout = undefined;
        var filename = file.path.replace(file.base, '');

        if (hasPrivateFilename(filename)) {
            return cb();
        }

        /**
         * @see http://harpjs.com/docs/development/partial
         */
        fs.readdirSync(file.base).filter(function (f) {
            return hasPrivateFilename(f);
        }).filter(function (f) {
            return path.extname(f) == '.hbs';
        }).filter(function (f) {
            return f != '_layout.hbs';
        }).forEach(function (partial) {
            var regex = /^_(.+)\.hbs$/i;
            var matches = partial.match(regex);

            if (matches === null) {
                return;
            }

            var name = matches[1];
            var contents = fs.readFileSync(path.join(file.base, partial)).toString();

            handlebars.registerPartial(name, contents);
        });

        /**
         * Implement the Harp metadata protocol.
         * @see http://harpjs.com/docs/development/metadata
         */
        var harp = {
            basename: path.basename(filename, path.extname(filename)),
            data: {}
        };

        try {
            harp.data = fs.readJsonSync(file.base + '_data.json')[harp.basename];
        } catch (_e) {}

        _.assign(context, harp.data);

        try {
            layout = fs.readFileSync(file.base + '_layout.hbs').toString();
        } catch (_e) {}

        try {
            var template = handlebars.compile(file.contents.toString())(context);

            /**
             * Utilize the "_layout.hbs" file if present.
             * @see http://harpjs.com/docs/development/layout
             */
            var fileBuffer = layout ? handlebars.compile(layout)(_.assign(context, { content: template })) : template;
            file.contents = new Buffer(fileBuffer);
            file.path = gutil.replaceExtension(file.path, '.html');
            this.push(file);
        } catch (err) {
            this.emit('error', new gutil.PluginError(pkg.name, err));
        }

        cb();
    });
};