// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor
var gulp = require( 'gulp' );
var rename = require( 'gulp-rename' );
var PathMap = require( 'sfco-path-map' );

// Vendor: Images
var imageResize = require( 'gulp-image-resize' );

// Vendor: Scripts
var browserify = require( 'gulp-browserify' );

// Vendor: Styles
var sass = require( 'gulp-sass' );
var cleanCSS = require( 'gulp-clean-css' );
var autoprefixer = require( 'gulp-autoprefixer' );


// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
var PATHS = new PathMap( {
	cssSrc: './css',
	sassSrc: './_sass/styles.scss',
	scriptsSrc: './_js/main.js',
	scriptsDest: './js',
	imagesSrc: './_images/**/*.jpg',
	imagesDest: './images'
} );

var IMAGE_SIZES = [ 100, 200, 400, 600, 768, 960, 1024, 1280 ];

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function processImages( src, dest, opts ) {
	gulp.src( src )
		.pipe( imageResize( opts ) )
		.pipe( rename( function( path ) {
			path.basename += `x${opts.width}`;
		} ) )
		.pipe( gulp.dest( dest ) )
}

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

gulp.task( 'images', [ 'images:migrate', 'images:resize' ] );

gulp.task( 'images:migrate', function() {
	gulp.src( PATHS.imagesSrc )
		.pipe( gulp.dest( PATHS.imagesDest ) );
} );

gulp.task( 'images:resize', function() {
	IMAGE_SIZES.forEach( function( size ) {
		processImages( PATHS.imagesSrc, PATHS.imagesDest, { width: size } );
	} );
} );

gulp.task( 'watch', function() {
	gulp.watch( '_sass/**/*.scss', [ 'sass' ] );
	gulp.watch( '_js/**/*.js', [ 'scripts' ] );
	gulp.watch( 'css/styles.css', [ 'css:minify' ] );
} );
