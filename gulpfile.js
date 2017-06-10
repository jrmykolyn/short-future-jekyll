// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor
var gulp = require( 'gulp' );
var browserify = require( 'gulp-browserify' );
var rename = require( 'gulp-rename' );
var sass = require( 'gulp-sass' );
var cleanCSS = require( 'gulp-clean-css' );
var autoprefixer = require( 'gulp-autoprefixer' );
var PathMap = require( 'sfco-path-map' );

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
var PATHS = new PathMap( {
	cssSrc: './css',
	sassSrc: './_sass/styles.scss',
	scriptsSrc: './_js/main.js',
	scriptsDest: './js',
} );

// --------------------------------------------------
// DEFINE TASKS
// --------------------------------------------------
gulp.task( 'default', [ 'styles', 'scripts', 'watch' ] );

gulp.task( 'styles', [ 'sass', 'css:minify' ] );

gulp.task( 'sass', function() {
	gulp.src( PATHS.sassSrc )
		.pipe(
			sass( {
				outputStyle: 'expanded',
				includePaths: [
					'./node_modules/bourbon/app/assets/stylesheets',
					'./node_modules/susy/sass',
					'./node_modules/sfco-sass-utils'
				]
			} )
		)
		.pipe( autoprefixer() )
		.pipe( gulp.dest( PATHS.cssSrc ) );
} );

/// TODO[@jrmykolyn] - Ensure that `css:minify` task correctly minifies compiled SASS on initial invocation.
gulp.task( 'css:minify', function() {
	gulp.src( `${PATHS.cssSrc}/styles.css` )
		.pipe( cleanCSS() )
		.pipe( rename( { extname: '.min.css' } ) )
		.pipe( gulp.dest( PATHS.cssSrc ) );
} );

gulp.task( 'scripts', function() {
	gulp.src( PATHS.scriptsSrc )
		.pipe( browserify() )
		.pipe( gulp.dest( PATHS.scriptsDest ) );
} );

gulp.task( 'watch', function() {
	gulp.watch( '_sass/**/*.scss', [ 'sass' ] );
	gulp.watch( '_js/**/*.js', [ 'scripts' ] );
} );
