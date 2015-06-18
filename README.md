# Gulp-Stachio
#### Render mustachio'd templates (Handlebars.js) into HTML.

## Status
- [x] Context Objects
- [x] Layouts
- [x] Metadata Files
- [x] Partials
- [ ] Revamp Unit Tests

## Usage
Follows the [Harp](http://harpjs.com) platform's `_data.json` & `_layout.hbs` [conventions](http://harpjs.com/docs/development/rules).

```js
var gulp    = require('gulp');
var stachio = require('gulp-stachio');

gulp.task('default', function () {
    return gulp.src('src/file.hbs')
        /**
         * Optionally include variables via a context object.
         * `.pipe(stachio({ hello: 'world' })`
         */
        .pipe(stachio())
        .pipe(gulp.dest('dist'));
});
```


## License

MIT © [James Benner](https://github.com/jbenner-radham)
