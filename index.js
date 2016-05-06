function TestApp() {
  this.hbStat = new HBStat();  
  this.init();
};

TestApp.prototype.init = function() {
    this.form = $.find('.test-form');
    this.submitFunc = this.submit.bind(this);
    $(this.form).on('submit',this.submitFunc);
};

TestApp.prototype.submit = function(e) {
    e.preventDefault();
    var outgoingMessage = this.form[0].message.value;
    this.hbStat.send(outgoingMessage);
};

new TestApp();