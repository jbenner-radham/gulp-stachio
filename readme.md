# Gulp-Stachio
## Render mustachio'd templates (Handlebars.js, support for Mustache, Hogan coming soon) into HTML.


## Usage

```js
var gulp    = require('gulp');
var stachio = require('gulp-stachio');

gulp.task('default', function () {
	return gulp.src('src/file.ext')
		.pipe(stachio())
		.pipe(gulp.dest('dist'));
});
```


## License

MIT © [James Benner](https://github.com/jbenner55)
