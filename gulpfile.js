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
				outputStyle: 'compressed',
				includePaths: [
					'./node_modules/bourbon/app/assets/stylesheets',
					'./node_modules/susy/sass',
					'./node_modules/sfco-sass-utils'
				]
			} )
		)
		.pipe( gulp.dest( PATHS.cssSrc ) );
} );
