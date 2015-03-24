define(["jquery"], function($) {	
	$( document ).ready(function() {

		$('table tr th').each(function (el) {
		   console.log(el)
		   $(this).click(function (e) {
			$('table tr:gt(0)').detach().sort(function (a, b) {
			 var ca =  $(a).children(':eq(' + el + ')').html();
			 var cb =  $(b).children(':eq(' + el + ')').html();
			 if (e.target.classList.contains('down')){
			  return (ca < cb) ? (ca < cb) ? 1 : 0 : -1;
			 } else {
			  return (ca > cb) ? (ca > cb) ? 1 : 0 : -1;
			 }
			}).appendTo('table');
			if (!e.target.classList.contains('down')){
			  e.target.classList.add('down');
			}else{
			  e.target.classList.remove('down');
			}
		   });
		})

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
