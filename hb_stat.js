function HBStat() {
  this.socket = new WebSocket("ws://localhost:8085");

}

HBStat.prototype.send = function(message) {
    console.log("message to send: " + message);
    this.socket.send(message);

}

