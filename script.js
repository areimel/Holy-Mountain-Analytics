$(document).ready(function() {

/********************************************

HOLY MOUNTAIN
GA AUTO-TAGGER

NOTES:
	Make sure you have all autotagger instances run before you 
	initialize the .eventfire_ready function to ensure all tags are caught.

	Use label_format var to set custom label formatting.
	Refer to main script for formatting example.

********************************************/
	
	/***** NAV *****/
		var category		= "Nav";
		var action			= "Click";
		var value			= "";
		var label_format	="";

		$('#nav a').autotagger(category, action, value, label_format);

	/***** FOOTER *****/
		var category		= "Footer";
		var action			= "Click";
		var value			= "";
		var label_format	= "";

		$('#footer a').autotagger(category, action, value, label_format);
	
	/***** INITIALIZE *****/
		$('html').eventfire_ready();
});