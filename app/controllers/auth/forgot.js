import Ember from 'ember';

export default Ember.ObjectController.extend({
  validate: function () {
    var errors = {};

    errors.email = Ember.$.trim(Ember.$('#email').val()) === '';

    this.set('error', errors);
  },

  actions: {
    forgot: function () {
      this.validate();

      var errors = this.get('error');
      var hasError = Object.keys(errors).reduce( function (accum, item) {
        return accum || errors[item];
      }, false);

      if (!hasError) {
        var self = this;
        var btn = Ember.$('button');

        btn.button('loading');
        this.get('session').forgotPassword(Ember.$('#email').val()).then( function () {
          self.set('error_message', null);
          self.set('info_message', 'Email sent!');
        }, function (error) {
          self.set('error_message', error.responseJSON.message || 'An Unknown Error Occured');
        }).finally( function () { btn.button('reset'); });
      }
    }
  }
});
