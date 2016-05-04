var http = require('http');
var Static = require('node-static');
var WebSocketServer = new require('ws');

// подключенные клиенты
var clients = {};

// WebSocket-сервер на порту 8085
var webSocketServer = new WebSocketServer.Server({port: 8085});
webSocketServer.on('connection', function(ws) {
    var isRegistered = false;
    var id = Math.random();
    clients[id] = ws;
    console.log("новое соединение " + id);

  ws.on('message', function(message) {
    console.log('получено сообщение ' + message);

    var event = JSON.parse(message);
    if (event.type === 'authorize') {
        checkUser(event.user, event.password, function (success) {
            isRegistered = success;

            var returning = {type:'authorize', success: success};
            
            ws.send (JSON.stringify(returning));
        });

    });
  }

  ws.on('close', function() {
    console.log('соединение закрыто ' + id);
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
   
       
console.log("Сервер запущен на портах 8085");


