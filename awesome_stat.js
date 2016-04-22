function AwesomeStat() {
  this.socket = new WebSocket("ws://localhost:8085");

}

AwesomeStat.prototype.send = function(message) {
    console.log("message to send: " + message);
    this.socket.send(message);

}

