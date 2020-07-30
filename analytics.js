if (typeof jQuery == 'undefined') {

    // jQuery IS NOT loaded, do stuff here.

    /*
    function loadjs() {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js';
        script.onload = function(){
            alert("Script is ready!"); 
            console.log(test.defult_id);
        };
        document.body.appendChild(script);
     }
     */

     // Get the first script element on the page
     var ref = w.document.getElementsByTagName( 'script' )[ 0 ];

     // Create a new script element
     var script = w.document.createElement( 'script' );

     // Set the script element `src`
     script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.j';

     // Inject the script into the DOM
     ref.parentNode.insertBefore( script, ref );

}


/********************************************

GA EVENTS - MAIN 

Example:

data-event="GAEvent" data-category="Home" data-label="CTA" data-action="Click" data-value="undefined"

- 	The above code should be pasted into the opening tag, as data-attributes,
	of whatever element you want to put a click event on.
	The below codes then grabs the data attributes you've set,
	and pipes it through GTM and GA

********************************************/
$(document).ready(function(){

	
/*
	$("[data-event='GAEvent']").click(function() {
		var evCat = $(this).attr('data-category') 	? $(this).attr('data-category') : '',
			evAct = $(this).attr('data-action') 	? $(this).attr('data-action') : '',
			evLab = $(this).attr('data-label') 		? $(this).attr('data-label') : '',
			evVal = $(this).attr('data-value') 		? $(this).attr('data-value') : '';

			try {

				window.dataLayer = window.dataLayer || [];
				dataLayer.push({
					'event': 'GAEvent',
					'eventCategory': evCat,
					'eventAction': evAct,
					'eventLabel': evLab,
					'eventValue': evVal,
				});
				console.log("GA Event fired - Event Category: ["+evCat+"], Event Label: ["+evLab+"], Event Action: ["+evAct+"]");

			} catch (e) {
				console.log("GA Event Error");
			}
	});
*/

	

	$.fn.eventfire_ready = function(){

		console.log("Event Firing primed");

		$("[data-event='GAEvent']").click(function() {
				var evCat = $(this).attr('data-category') 	? $(this).attr('data-category') : '',
					evAct = $(this).attr('data-action') 	? $(this).attr('data-action') : '',
					evLab = $(this).attr('data-label') 		? $(this).attr('data-label') : '',
					evVal = $(this).attr('data-value') 		? $(this).attr('data-value') : '';

					try {

						window.dataLayer = window.dataLayer || [];
						dataLayer.push({
							'event': 'GAEvent',
							'eventCategory': evCat,
							'eventAction': evAct,
							'eventLabel': evLab,
							'eventValue': evVal,
						});
						console.log("GA Event fired - Event Category: ["+evCat+"], Event Label: ["+evLab+"], Event Action: ["+evAct+"]");

					} catch (e) {
						console.log("GA Event Error");
					}
			});

	};

});


/********************************************

GA AUTO-TAGGER - PLUGIN VERSION

********************************************/

$(document).ready(function() {

	console.log('Holy Mountain Analytics Initiated');

	/***** PLUGIN FUNCTION - targets specific elements *****/
		$.fn.autotagger = function(category, action, value) {
		    
			$(this).each(function(){
				if($(this).attr('data-event')){
					//nothing - already tagged
				} else {

					//console.log notification
						console.log('GA Auto-Tagger - element tagged - category: '+category);
					//label grabber
						if($(this).children().is('img')){
							var label = $(this).attr('alt');
						} else if($(this).text() == "") {
							var label = $(this).attr('aria-label');
						} else {
							var label = $(this).text();
						}
					//label formatter
						label = label.replace(/\ /g, "-");
					
					$(this).attr('data-event', 'GAEvent');
					$(this).attr('data-category', category);
					$(this).attr('data-label', label);
					$(this).attr('data-action', action);
					$(this).attr('data-value', value);

				}
			});

		};

});



