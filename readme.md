# Gulp-Stachio
#### Render mustachio'd templates (Handlebars.js, support for Mustache, Hogan coming soon) into HTML.


## Usage
For a more advanced example following harp.js conventions check `example.js`

```js
var gulp    = require('gulp');
var stachio = require('gulp-stachio');

gulp.task('default', function () {
	return gulp.src('src/file.hbs')
		/**
		 * You can optionally pass a context object like so:
		 * `.pipe(stachio({ hello: 'world!' }))`
		 */
		.pipe(stachio())
		.pipe(gulp.dest('dist'));
});
```


## License

MIT © [James Benner](https://github.com/jbenner55)
