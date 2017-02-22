gulp-stachio
============
[![npm Version][NPM VERSION BADGE]][NPM PAGE]
[![GitHub License][LICENSE BADGE]][LICENSE PAGE]
[![Build Status][BUILD BADGE]][BUILD PAGE]

Render mustachio'd templates (Handlebars.js) into HTML.

Status
------
- [x] Context Objects
- [x] Layouts
- [x] Metadata Files
- [x] Partials
- [x] Revamp Tests

Usage
-----
Follows the [Harp](http://harpjs.com) platform's `_data.json` & `_layout.hbs` [conventions](http://harpjs.com/docs/development/rules).

```js
var gulp    = require('gulp');
var stachio = require('gulp-stachio');

gulp.task('default', function () {
    return gulp.src('src/file.hbs')
        /**
         * Optionally include variables via a context object.
         * `.pipe(stachio({ hello: 'world' }))`
         */
        .pipe(stachio())
        .pipe(gulp.dest('dist'));
});
```

Testing
-------
```sh
$ npm test
```

License
-------
The MIT License (Expat). See the [license file](LICENSE) for details.

[BUILD BADGE]: https://img.shields.io/travis/jbenner-radham/gulp-stachio.svg?style=flat-square
[BUILD PAGE]: https://travis-ci.org/jbenner-radham/gulp-stachio
[LICENSE BADGE]: https://img.shields.io/badge/license-MIT%20License-blue.svg?style=flat-square
[LICENSE PAGE]: https://github.com/jbenner-radham/gulp-stachio/blob/master/LICENSE
[NPM PAGE]: https://www.npmjs.com/package/gulp-stachio
[NPM VERSION BADGE]: https://img.shields.io/npm/v/gulp-stachio.svg?style=flat-square
