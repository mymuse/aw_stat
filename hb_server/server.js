var http = require('http');
var Static = require('node-static');
var WebSocketServer = new require('ws');

var clients = {};

var webSocketServer = new WebSocketServer.Server({port: 8085});

webSocketServer.on('connection', function(ws) {
    var isRegistered = false;
    var id = Math.random();
    clients[id] = ws;
    console.log("new connection " + id);
    

  ws.on('message', function(message) {
    var event = JSON.parse(message);
    if (event.type === 'authorize') {
        console.log('authorize: ' + event.user + '  ' + event.password);
        checkUser(event.user, event.password, function (success) {
            isRegistered = success;
            var returning = {type:'authorize', success: success};
            ws.send (JSON.stringify(returning));
        });

    }
    if(!isRegistered){
        console.log('AUTORIZATION is needed!');
        var returning = {type:'authorize', success: success};
        ws.send (JSON.stringify(returning));
    } else {
        if(event.type === 'message'){
             console.log('MESSAGE--> ' + event.text); 
        }
    }
  });

  ws.on('close', function() {
    console.log('connection closed ' + id);
    delete clients[id];
  });

});

function checkUser (user, password, callback) {
	existUser(user, function (exist) {
		if (exist) {
            callback (user === "admin" && password === "admin");
		} else {
			callback (false);
		}
	});
}

function existUser (user, callback) {
	if(user === "admin"){
        callback(true);
    }
}
   
       
console.log("Server runs on port 8085");


