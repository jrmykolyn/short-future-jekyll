// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
var stringScrambler = require( 'sfco-string-scrambler' );

// --------------------------------------------------
// INIT
// --------------------------------------------------
( function() {
	var titleElem = document.getElementById( 'title' );
	var charElems = titleElem.querySelectorAll( 'span' );
	var timeoutRef = null;
	var timeoutDur = 20000 // 10s
	var intervalRef = null;
	var intervalDur = 5000; // 2s

	timeoutRef = setTimeout( function() {
		intervalRef = setInterval( function() {
			var el = Array.prototype.slice.call( charElems, 0 )[ Math.floor( Math.random() * charElems.length ) ];
			el.innerHTML = stringScrambler( 'a' ); // NOTE - Invocation at left will scrambler 1x char.
		}, intervalDur );
	}, timeoutDur );
} )();
