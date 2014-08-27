'use strict';

var gutil      = require('gulp-util');
var through    = require('through2');
var handlebars = require('handlebars');

module.exports = function (context) {
	//if (!options.foo) {
	//	throw new gutil.PluginError('gulp-stachio', '`foo` required');
	//}
	console.dir(context);

	//if (!options) {
	//	options = {};
	//}

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
			//console.log(file.contents.toString());
			//var template = handlebars.compile('<h1>' + file.contents.toString() + ' {{yo}}</h1>');
			var renderer = handlebars.compile(file.contents.toString());
			//console.log(template);
			//var context = context || {yo: 'DAWG!!!'};
			//console.log(template(context));
			var template = renderer(context);
			file.contents = new Buffer(template); //, options));

			console.log(template);
			this.push(file);
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-stachio', err));
		}

		cb();
	});
};
