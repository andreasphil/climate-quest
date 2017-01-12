var gulp = require('gulp');

var cleancss = require('gulp-clean-css');
var concat = require('gulp-concat');
var del = require('del');
var htmlmin = require('gulp-htmlmin');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var replace = require('gulp-replace');
var uglify = require('gulp-uglify');


// -----------------------------------------------------------------------------------------------
//  DEVELOPMENT TASKS
// -----------------------------------------------------------------------------------------------

// Lint application javascript
gulp.task('lint', function()
{
	return gulp.src('./src/js/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// Compile LESS in source folder
gulp.task('less-source', function()
{
	return gulp.src('./src/less/style.less')
		.pipe(less())
		.pipe(gulp.dest('./src/css'));
});

// Watch for javascript/less file changes
gulp.task('watch', function()
{
	gulp.watch('./src/js/**/*.js', ['lint']);
	gulp.watch('./src/less/**/*.less', ['less-source']);
});

// Default task: Lint JS, compile LESS and watch for changes
gulp.task('default', ['lint', 'less-source', 'watch']);


// -----------------------------------------------------------------------------------------------
//  BUILD TASKS
// -----------------------------------------------------------------------------------------------

// Clean dist folder
gulp.task('clean', function()
{
	del('dist');
});

// Minify HTML and copy it to the dist folder
gulp.task('build-html', function()
{
	var scriptReplacePattern = /(<!-- Replace Scripts -->)[\s\S]*(<!-- Replace Scripts -->)/g;
	var scriptReplaceString = '<script type="text/javascript" src="js/libs.min.js"></script>'
		+ '<script type="text/javascript" src="js/application.min.js"></script>'

	return gulp.src('./src/*.html')
		.pipe(replace(scriptReplacePattern, scriptReplaceString))
		.pipe(htmlmin())
		.pipe(gulp.dest('./dist'));
});

// Concatenate and compress javascript libraries
gulp.task('build-js-libs', function()
{
	return gulp.src(
		[
			// Insert libraries here
		])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js'));
});

// Concatenate and compress javascript
gulp.task('build-js-app', function()
{
	return gulp.src(
		[
			// Insert application javascript here
		])
		.pipe(concat('application.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js'));
});

// Compile and compress LESS
gulp.task('build-less', function()
{
	return gulp.src('./src/less/style.less')
		.pipe(less())
		.pipe(cleancss())
		.pipe(gulp.dest('./dist/css'));
});

// Copy fonts from the fonts folder
gulp.task('build-copy-fonts', function()
{
	return gulp.src('./src/font/*.{eot,svg,ttf,woff,otf}')
		.pipe(gulp.dest('./dist/font'));
});

// Copy images from the img folder
gulp.task('build-copy-images', function()
{
	return gulp.src('./src/img/*.png')
		.pipe(gulp.dest('./dist/img'))
});

// Build task: Build HTML, javascript and LESS and copy fonts and images
gulp.task('build', ['clean', 'build-html', 'build-js-libs', 'build-js-app', 'build-less', 
	'build-copy-fonts', 'build-copy-images' ]);
