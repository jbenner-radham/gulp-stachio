'use strict';

var assert     = require('assert');
var gutil      = require('gulp-util');
var handlebars = require('handlebars');
var stachio    = require('../');

it('should ', function (cb) {
    var template = '<h1>Unicorns are... {{something}}!</h1>';
    var context  = { something: 'awesome' };
    var stream   = stachio(context);

    stream.on('data', function (file) {
        var renderer = handlebars.compile(template);
        assert.equal(file.relative, 'file.ext');
        assert.equal(file.contents.toString(), renderer(context));
    });

    stream.on('end', cb);

    stream.write(new gutil.File({
        base: __dirname,
        path: __dirname + '/file.ext',
        contents: new Buffer(template)
    }));

    stream.end();
});
