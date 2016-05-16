  this.form = $.find('.test-form');
    this.submitFunc = this.submit.bind(this);
    $(this.form).on('submit',this.submitFunc);