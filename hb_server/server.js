var http = require('http');
var Static = require('node-static');
var WebSocketServer = new require('ws'),
    webSocketServer = new WebSocketServer.Server({port: 8085});


var MongoClient = require('mongodb').MongoClient;   
var hbstatBD;
MongoClient.connect('mongodb://127.0.0.1:27017/hb_stat', function (err, db) {
	if (err) {throw err}
	console.log("connection to bd is successfull");
	hbstatBD = db.collection('hbstat');
});

var clients = {};

webSocketServer.on('connection', function(ws) {
    var currentId;
    var id = Math.random();
    clients[id] = ws;
    console.log("new connection " + id);

  ws.on('message', function(message) {
    var event = JSON.parse(message);
    if (event.type === 'authorize') {
        console.log('authorize: ' + event.id);
        checkId(event.id, function (success) {
            currentId = event.id; 
            var returning = {type:'authorize', success: success};
            ws.send (JSON.stringify(returning));
        });
    }
     else {
        if(!currentId){
            console.log('AUTORIZATION is needed!');
            var returning = {type:'authorize', success: false};
            ws.send (JSON.stringify(returning));
        }
        if(event.type === 'message'){
            pushEvent(currentId, Math.random(), event.text);
        }
    }
  });

  ws.on('close', function() {
    console.log('connection closed ' + id);
    delete clients[id];
  });

});

function checkId(id, callback) {
    hbstatBD.find({id: id}).toArray(function (error, list) {
        console.log(list);
		callback (list.length !== 0);
	});
}

function pushEvent (id, eventId, message, callback) {
    hbstatBD.update({id:id}, {$push:{events:{eventId: eventId, message: message}}});
}
       
console.log("Server runs on port 8085");


