var stat = new AwesomeStat();


// отправить сообщение из формы publish
document.forms.publish.onsubmit = function() {
  var outgoingMessage = this.message.value;

  stat.send(outgoingMessage);
  return false;
};

