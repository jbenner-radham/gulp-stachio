/* @flow */
'use strict';

var _                  = require('lodash');
var fs                 = require('fs-extra');
var handlebars         = require('handlebars');
var hasPrivateFilename = require('@radioactivehamster/has-private-filename');
var gutil              = require('gulp-util');
var path               = require('path');
var pkg                = require(`${__dirname}/../package.json`);
var through            = require('through2');

module.exports = function (context = {}) {
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(pkg.name, 'Streaming not supported'));
            return cb();
        }

        let layout;
		let filename = file.path.replace(file.base, '');

        if (hasPrivateFilename(filename)) {
            return cb();
        }

        /**
         * @see http://harpjs.com/docs/development/partial
         */
        fs.readdirSync(file.base)
            .filter(f => hasPrivateFilename(f))
            .filter(f => path.extname(f) == '.hbs')
            .filter(f => f != '_layout.hbs')
            .forEach(partial => {
                let regex   = /^_(.+)\.hbs$/i;
                let matches = partial.match(regex);

                if (matches === null) {
                    return;
                }

                let name     = matches[1];
                let contents = fs.readFileSync(path.join(file.base, partial)).toString();

                handlebars.registerPartial(name, contents);
            });

        /**
         * If no context is supplied switch to the Harp metadata protocol.
         * @see http://harpjs.com/docs/development/metadata
         */
        if (!context) {
            let harp = {
                basename: path.basename(filename, path.extname(filename)),
                data: {}
            };

            try {
                harp.data = fs.readJsonSync(file.base + '_data.json')[harp.basename];
            } catch (_e) {}

			context = harp.data;
        }

        try {
            layout = fs.readFileSync(file.base + '_layout.hbs').toString();
        } catch (_e) {}

        try {
            let template   = handlebars.compile(file.contents.toString())(context);

            /**
             * Utilize the "_layout.hbs" file if present.
             * @see http://harpjs.com/docs/development/layout
             */
            let fileBuffer = (layout) ? handlebars.compile(layout)(_.assign(context, { content: template }))
                                      : template;
            file.contents  = new Buffer(fileBuffer);
            file.path      = gutil.replaceExtension(file.path, '.html');
			this.push(file);
        } catch (err) {
            this.emit('error', new gutil.PluginError(pkg.name, err));
        }

        cb();
    });
};
