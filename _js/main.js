// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
var stringScrambler = require( 'sfco-string-scrambler' );

// --------------------------------------------------
// INIT
// --------------------------------------------------
( function() {
	var titleShort = document.querySelector( '.page-title--short' );
	var titleFuture = document.querySelector( '.page-title--future' );
	var counter = 0;
	var intervalDur = 30000; // 30s

	var interval = setInterval( function() {
		if ( counter % 2 === 0 ) {
			titleShort.innerHTML = stringScrambler( titleShort.innerHTML, { useChars: 'short'.split( '' ) } );
		} else {
			titleFuture.innerHTML = stringScrambler( titleFuture.innerHTML, { useChars: 'future'.split( '' ) } );
		}

		counter++;
	}, intervalDur );
} )();
