'use strict';

var $          = require('gulp-load-plugins');
var fs         = require('fs-extra');
var handlebars = require('handlebars');
var path       = require('path');
var through    = require('through2');

module.exports = function (context) {
	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			this.push(file);
			return cb();

		}

		let filename = file.path.replace(file.base, '');

		if (filename.charAt(0) === '/') {
			filename = filename.slice(1);
		}

		/**
		 * If no context is supplied switch to the Harp metadata protocol.
		 * @link http://harpjs.com/docs/development/metadata
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

		if (file.isStream()) {
			this.emit('error', new $.util.PluginError('gulp-stachio', 'Streaming not supported'));
			return cb();
		}

		try {
			let template = handlebars.compile(file.contents.toString())(context);

			file.contents = new Buffer(template);
			this.push(file);
		} catch (err) {
			this.emit('error', new $.util.PluginError('gulp-stachio', err));
		}

		cb();
	});
};
