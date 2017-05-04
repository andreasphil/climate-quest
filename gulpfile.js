var gulp = require('gulp');

var babel = require('gulp-babel');
var cleancss = require('gulp-clean-css');
var concat = require('gulp-concat');
var del = require('del');
var eslint = require('gulp-eslint');
var htmlmin = require('gulp-htmlmin');
var less = require('gulp-less');
var replace = require('gulp-replace');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');


// -----------------------------------------------------------------------------------------------
//  DEVELOPMENT TASKS
// -----------------------------------------------------------------------------------------------

// Lint application javascript
gulp.task('lint', function()
{
	return gulp.src('./src/js/**/*.js')
		.pipe(eslint.format());
});

// Transpile ES6
gulp.task('babel', ['lint'], function()
{
	return gulp.src('./src/js/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat('index.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./src'))
});

// Compile LESS in source folder
gulp.task('less-source', function()
{
	return gulp.src(
		[
			'./src/less/style.less',
			'./src/less/frame.less'
		])
		.pipe(less())
		.pipe(gulp.dest('./src/css'));
});

// Watch for javascript/less file changes
gulp.task('watch', function()
{
	gulp.watch('./src/js/**/*.js', ['babel']);
	gulp.watch('./src/less/**/*.less', ['less-source']);
});

// Default task: Lint JS, compile LESS and watch for changes
gulp.task('default', ['babel', 'less-source', 'watch']);


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
			'./src/components/jquery/dist/jquery.js',
			'./src/components/vue/dist/vue.js',
			'./src/components/vue-router/dist/vue-router.js',
			'./src/components/chartist/dist/chartist.js'
		])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js'));
});

// Concatenate and compress javascript
gulp.task('build-js-app', function()
{
	return gulp.src('./src/js/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat('index.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./dist'))
});

// Compile and compress LESS
gulp.task('build-less', function()
{
	return gulp.src(
		[
			'./src/less/style.less',
			'./src/less/frame.less',
		])
		.pipe(less())
		.pipe(cleancss())
		.pipe(gulp.dest('./dist/css'));
});

// Copy fonts from the fonts folder
gulp.task('build-copy-fonts', function()
{
	return gulp.src('./src/components/feather/webfont/feather-webfont/fonts/*.{eot,svg,ttf,woff,otf}')
		.pipe(gulp.dest('./dist/components/feather/webfont/feather-webfont/fonts'));
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
