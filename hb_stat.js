function HBStat() {
    this.socket = new WebSocket("ws://localhost:8085");
    this.authorize();
};

HBStat.prototype.authorize = function() {
    var user = 'admin';
    var password = 'admin';
    var preparedMessage = {type:'authorize', user: user, password: password};
    this._send(JSON.stringify(preparedMessage));
};

HBStat.prototype.send = function(message) {
    console.log("message to send: " + message);
    var preparedMessage = {type:'message', text: message};
    this._send(JSON.stringify(preparedMessage));
};

HBStat.prototype._send = function(message) {
    if(this.socket.readyState === 1){
        this.socket.send(message);
    }else{
        this.socket.onopen = function() {
            this.socket.send(message);
        }.bind(this);
    }
};
