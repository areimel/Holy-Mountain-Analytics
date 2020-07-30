$(document).ready(function() {

/********************************************

GA AUTO-TAGGER

********************************************/
	
	/***** NAV *****/
		var category	= "Nav";
		var action		= "Click";
		var value		= "NULL";

		$('nav a').autotagger(category, action, value);

	/***** FOOTER *****/
		var category	= "Footer";
		var action		= "Click";
		var value		= "NULL";

		$('footer a').autotagger(category, action, value);
	
	/***** INITIALIZE *****/
		$('html').eventfire_ready();
});