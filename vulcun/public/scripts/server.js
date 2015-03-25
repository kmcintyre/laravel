var requirejs = require('requirejs'),
        mysql      = require('mysql'),
        WebSocketServer = require('ws').Server,
        wss = new WebSocketServer({port: 8080});

requirejs.config({
    nodeRequire: require
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

wss.on('connection', function(ws) {
	var swkey = ws.upgradeReq.headers['sec-websocket-key'];
	console.log(this.clients.length + ' connections new client:' + swkey);
	
    ws.send(swkey);

    ws.disconnect = function() {
    	console.log('disconnect');
    }

    ws.on('message', function(message) {
    	console.log('received: %s', message.length == 0 ? '<blank>' : message );
    	var play = JSON.parse(message);
    	var connection = mysql.createConnection({
                host     : 'localhost',
                user     : '',
                password : '',
                database : ''
        });

    	connection.config.queryFormat = function (query, values) {
    		  if (!values) return query;
    		  return query.replace(/\:(\w+)/g, function (txt, key) {
    		    if (values.hasOwnProperty(key)) {
    		      return this.escape(values[key]);
    		    }
    		    return txt;
    		  }.bind(this));
    	};
    	
        var ev = (play.action == 'Enter' ? 1 : -1);
        connection.query('update contests set entries = entries + :entry where id = :id', { entry : ev , id : parseInt(play.id) });
        connection.query('select entries, maxentries from contests where id = :id', { entry : ev , id : parseInt(play.id) } , function(err, rows, fields) {
        	if (err) throw err;
        	console.log('Total entries: ', rows[0].entries);
		wss.broadcast(JSON.stringify({id : parseInt(play.id), entries : rows[0].entries, maxentries : rows[0].maxentries}))
        });

        connection.end();
    });

    ws.on('close', function() {
        console.log('close');
        ws.disconnect();
    });

});

console.log('start standard in');
var stdin = process.openStdin();
stdin.on('data', function(message) {
	var msg = message.toString().substring(0, message.length - 1);
	console.log( msg );
});
