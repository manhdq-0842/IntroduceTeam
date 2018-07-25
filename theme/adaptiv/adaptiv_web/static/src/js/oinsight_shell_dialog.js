odoo.define('adaptiv_web.oinsight_shell_dialog', function(require) {
  "use strict";
  var Dialog = require('web.Dialog');

  Dialog.include({
    open: function() {
      var self = this;
      var width = $(window).width();
      if (width <= 768){
          this.initShellDialog();
      }
    
      $('.tooltip').remove();

      if (this.shellDialog) {
        this.shellDialog.open().then(function() {
          self._opened.resolve();
        });
      } else {
        this.appendTo($('<div/>')).then(function () {
          self.$modal.find(".modal-body").replaceWith(self.$el);
          self.$modal.modal('show');
          self._opened.resolve();
        });
      }

      return this;
    },
  });

  return {

  };

});
