# [gulp](http://gulpjs.com)-stachio [![Build Status](https://travis-ci.org/jbenner55/gulp-stachio.svg?branch=master)](https://travis-ci.org/jbenner55/gulp-stachio)

> Lorem ipsum


## Install

```sh
$ npm install --save-dev gulp-stachio
```


## Usage

```js
var gulp = require('gulp');
var stachio = require('gulp-stachio');

gulp.task('default', function () {
	return gulp.src('src/file.ext')
		.pipe(stachio())
		.pipe(gulp.dest('dist'));
});
```


## API

### stachio(options)

#### options

##### foo

Type: `boolean`  
Default: `false`

Lorem ipsum.


## License

MIT © [James Benner](https://github.com/jbenner55)
