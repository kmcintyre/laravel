define(["jquery"], function($) {	
	$( document ).ready(function() {

		$('table tr th').each(function (el) {
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
		var leagues = new Array();
		$('table tr:gt(0)').each(function () {
		  $(this).children('td:eq(5)').each(function () {
		    this.classList.add('league')
		    if ($.inArray(this.innerHTML, leagues) < 0 ) {
			leagues[leagues.length] = this.innerHTML;
		    }
		  });
		});
		$('table').prepend('<select><option value="">Filter</select>')
		$('select').change(function () {
		  var sv = this.options[this.selectedIndex].value;
		  if(sv){
	            $('.league').each(function () {
			if (this.innerHTML == sv) {
			  $(this.parentNode).show()
			} else {
			  $(this.parentNode).hide()
			}
		    });
		  } else {
		    $('.league').parent().show()
		  }
		});
		$.each(leagues, function () {
		  $('select').append('<option value=' + this + '>' + this);
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
			try {
			    var json = JSON.parse(evt.data)
			    console.log(json)
			    $('table tr:gt(0)').find('td:eq(0)').each(function () {
				if ( parseInt(this.innerHTML) == json.id ) {
				  $(this).siblings(':eq(3)').html(json.entries + ' of ' + json.maxentries);
				  this.parentNode.classList.add('changed')
				  setTimeout(function () { $('.changed').removeClass('changed')}, 3000 );
				}
			    });
			} catch (err) {
			    $(document.body).append('connection key:' + evt.data);
			}
		}
		$('button').click(function (e){
			var id = e.target.parentNode.parentNode.firstElementChild.innerHTML;
			var action = e.target.innerHTML;
			console.log(id + ':' + action);
			if ( action == 'Enter' ) {
				e.target.innerHTML = 'Exit';
			} else {
				e.target.innerHTML = 'Enter';
			}
			websocket.send(JSON.stringify({ id: id, action : action }));
		});
		
		

	});
});
