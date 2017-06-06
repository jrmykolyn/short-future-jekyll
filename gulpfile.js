// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor
var gulp = require( 'gulp' );
var sass = require( 'gulp-sass' );
var PathMap = require( 'sfco-path-map' );

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
var PATHS = new PathMap( {
	cssSrc: './css',
	sassSrc: './_sass/styles.scss'
} );

// --------------------------------------------------
// DEFINE TASKS
// --------------------------------------------------
gulp.task( 'default', [ 'styles' ] );

gulp.task( 'styles', [ 'sass' ] );

gulp.task( 'sass', function() {
	gulp.src( PATHS.sassSrc )
		.pipe(
			sass( {
				outputStyle: 'expanded'
			} )
		)
		.pipe( gulp.dest( PATHS.cssSrc ) );
} );
