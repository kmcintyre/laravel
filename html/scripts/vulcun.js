define(["jquery"], function($) {	
	$( document ).ready(function() {
		var websocket = new WebSocket('ws://vulcun.nwice.com:8080');		
		
		websocket.onopen = function(evt) {			
			console.log('on open');			
		}; 
			
		websocket.onclose = function(evt) { 
			console.log('onclose')
		};
			
		websocket.onerror = function(evt) {
			console.log('error')
			console.log(evt);
		};
			
		websocket.onmessage = function(evt) {
			$(document.body).append(evt.data);
		}
	});
});