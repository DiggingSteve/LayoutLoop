
var gulp = require('gulp');

var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');

gulp.task('build', function () {
	// main.js is your main JS file with all your module inclusions
	return browserify({
		entries: 'src/main.js',
		standalone: 'Div',
		debug: true,
		transform: ['babelify', 'browserify-versionify'],
		plugin: ['browserify-derequire']
	})
		.transform("babelify", { presets: ["es2015"] })
		.bundle()
		.pipe(source('main.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init())
			.pipe(uglify())
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('./dist'))

		.pipe(livereload());
});

gulp.task('watch', ['build'], function () {
	livereload.listen();
	gulp.watch('./src/*.js', ['build']);
});

gulp.task('default', ['watch']);