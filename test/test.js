'use strict';

const expect     = require('chai').expect;
const gutil      = require('gulp-util');
const handlebars = require('handlebars');
const stachio    = require('../');

describe('Gulp Stachio', () => {
    let template  = '<h1>Unicorns are... {{something}}!</h1>';
    let context   = {something: 'awesome'};
    let vinylFile = new gutil.File({
        base:     __dirname,
        path:     `${__dirname}/file.hbs`,
        contents: new Buffer(template)
    });

    it('should compile a template with context', (cb) => {
        let stream = stachio(context);

        stream.write(vinylFile);

        stream.on('data', function (file) {
            let html = handlebars.compile(template)(context);

            expect(file.contents.toString()).to.equal(html);
        });

        stream.on('end', cb);

        stream.end();
    });

    it('should compile a template without context', (cb) => {
        let stream    = stachio();
        let template  = '<h1>Unicorns are... awesome!</h1>';
        let vinylFile = new gutil.File({
            path:     `${__dirname}/file.hbs`,
            contents: new Buffer(template)
        });

        stream.write(vinylFile);

        stream.on('data', function (file) {
            let html = handlebars.compile(template)();

            expect(file.contents.toString()).to.equal(html);
        });

        stream.on('end', cb);

        stream.end();
    });

    it('should change the file extension to "html"', (cb) => {
        let stream = stachio(context);

        stream.write(vinylFile);

        stream.on('data', (file) => {
            expect(file.relative).to.equal('file.html');
        });

        stream.on('end', cb);

        stream.end();
    });
});
