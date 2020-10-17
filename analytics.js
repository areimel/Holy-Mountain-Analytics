/********************************************
*********************************************

Holy Mountain - Analytics Plugin

*********************************************
********************************************/







/********************************************

PRE-FLIGHT CHECK

********************************************/

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

INITIALIZATION

********************************************/
$(document).ready(function() {

	//console log
		console.log("---Holy Mountain Analytics initialized.---");

	//GTM detect - check for GTM script in <head>
		var gtm_detect = 0;
		$('script').each(function() {
			if($(this).text("https://www.googletagmanager.com/gtm.js?id=")){
				gtm_detect = 1;
				return false;
			}
		});

		if(gtm_detect == 1){
			console.log("GTM script detected.");
		} else {
			console.log("No GTM script detected.  Double check GTM installation.");
		}
});



/********************************************

USER ID COOKIE  

********************************************/
$(document).ready(function() {


	$.fn.uid_cookie = function(cname, cvalue, exdays){
		 var d = new Date();
		  d.setTime(d.getTime() + (exdays*24*60*60*1000));
		  var expires = "expires="+ d.toUTCString();
		  document.cookie = cname + "=" + cvalue + ";" + expires + ";";

		  console.log("user_id_cookie successful " + cname + "=" + cvalue + ";" + expires + ";");
	};


	var cookie_check = getCookie("hm_analytics_uid");
	if(username != ""){
		//

	} else{
		//set cookie
		var uid_rand = Math.floor(Math.random() * 1000000);  

		var cname = "hm_analytics_uid_daily";
		var cvalue = "hm-d-" + uid_rand;
		var exdays = 30;

		$(document).uid_cookie(cname, cvalue, exdays);
	}
	

});



/********************************************

GA EVENTS - MAIN 

Example:

data-event="GAEvent" data-category="Home" data-label="CTA" data-action="Click" data-value="undefined"

- 	The above code should be pasted into the opening tag, 
	as data-attributes, of whatever element you want to put a click event on.
	The below codes then grabs the data attributes you've set,	and pipes it through GTM and GA

********************************************/
$(document).ready(function(){


	$.fn.eventfire_ready = function(){

		console.log("Event Firing primed.  Ready for takeoff.");

		$("[data-event='GAEvent']").click(function() {
			//Set vars
			var evCat = $(this).attr('data-category') 	? $(this).attr('data-category') : '';
			var evAct = $(this).attr('data-action') 		? $(this).attr('data-action') : '';
			var evLab = $(this).attr('data-label') 		? $(this).attr('data-label') : '';
			var evVal = $(this).attr('data-value') 		? $(this).attr('data-value') : '';

			try {
				//Fire event
				window.dataLayer = window.dataLayer || [];
				dataLayer.push({
					'event': 			'GAEvent',
					'eventCategory': 	evCat,
					'eventAction': 		evAct,
					'eventLabel': 		evLab,
					'eventValue': 		evVal,
				});

				console.log("GA Event fired - Event Category: ["+evCat+"], Event Label: ["+evLab+"], Event Action: ["+evAct+"]");

			} catch (e) {
				console.log("GA Event Error");
			}
		});
	};
});


/********************************************

GA AUTO-TAGGER - PROGRAMMATIC VERSION

********************************************/

$(document).ready(function() {

	//console.log('Holy Mountain Analytics Initiated');

	/***** PLUGIN FUNCTION - targets specific elements *****/
		$.fn.autotagger = function(category, action, value, label_format) {
		    
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
						if(label_format != ""){
							label = label.replace(label_format);
						} else{
							//Normal formatter - replaces spaces with dashes
							label = label.replace(/\ /g, "-");
						}
						
					
					//set attributes
						$(this).attr('data-event', 'GAEvent');
						$(this).attr('data-category', category);
						$(this).attr('data-label', label);
						$(this).attr('data-action', action);
						$(this).attr('data-value', value);

				}
			});

		};

});




/********************************************

GA EVENTS - FORM SUBMISSIONS

	- This block of code is for firing an event after a form 
	has been successfully submitted.  There should be an 
	event tag on the submit button, but this is specifically 
	for after the form submits and the page refreshes.

	var urlParams = new URLSearchParams(window.location.search);	//grab data
	urlParams.has('parameter'); 		// check if parameter exists
	urlParams.get('parameter'); 		// get value of parameter

	URL Parameter example:
	?ga_event="true"&ga_cat="form"&ga_act="pageload"&ga_lab="form-success"&ga_val=""
	
********************************************/
$(document).ready(function() {

	$.fn.url_param_tag = function() {

		var urlParams = new URLSearchParams(window.location.search);

		//Check if ga_event param exists
		if (urlParams.has('ga_event')) {

			console.log("URL parameter-based ga event detected.");

			//Set vars
			var evCat = urlParams.get('ga_cat')	 	? urlParams.get('ga_cat') : '';
			var evAct = urlParams.get('ga_act') 		? urlParams.get('ga_act') : '';
			var evLab = urlParams.get('ga_lab') 	? urlParams.get('ga_lab') : '';
			var evVal = urlParams.get('ga_val')		? urlParams.get('ga_val') : '';

			try {
				//Fire event
				window.dataLayer = window.dataLayer || [];
				dataLayer.push({
					'event': 			'ga_event',
					'eventCategory': 	evCat,
					'eventAction': 		evAct,
					'eventLabel': 		evLab,
					'eventValue': 		evVal,
				});

				console.log("GA Event fired - Event Category: ["+evCat+"], Event Label: ["+evLab+"], Event Action: ["+evAct+"]");

			} catch (e) {
				console.log("GA Event Error");
			}

		}else{
			//do nothing
		}

	}

});




/********************************************

UTM EVENT

EX: alecreimel.com?utm_source=test&utm_medium=test&utm_campaign=test&utm_term=test&utm_content=test
	
********************************************/

$(document).ready(function(){
	
});