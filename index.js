function TestApp() {
    this.eventStat = new HBStat();
    this.init();
}

TestApp.prototype.init = function() {
    this.form = $el.find('.test-form');
    this.form.on('submit',this.submit);
}


TestApp.prototype.submit = function() {
this.form

// отправить сообщение из формы publish
document.forms.publish.onsubmit = function() {
  var outgoingMessage = this.message.value;

  eventStat.send(outgoingMessage);
  return false;
};

$(document).ready(function () {
    
    
    ProfilePersonalInformation.prototype.reloadData = function () {
    
    
    
});
}