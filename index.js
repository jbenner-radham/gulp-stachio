'use strict';

var gutil      = require('gulp-util');
var through    = require('through2');
var handlebars = require('handlebars');

module.exports = function (context) {
	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			this.push(file);
			return cb();

		}

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError('gulp-stachio', 'Streaming not supported'));
			return cb();
		}

		try {
			// var renderer = handlebars.compile(file.contents.toString());
			// var template = renderer(context);

			// var template = handlebars.compile(file.contents.toString()).call(this, context);
			var template = handlebars.compile(file.contents.toString())(context);

			file.contents = new Buffer(template); //, options));
			this.push(file);
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-stachio', err));
		}

		cb();
	});
};
