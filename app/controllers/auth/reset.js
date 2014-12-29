import Ember from 'ember';

export default Ember.ObjectController.extend({
  validate: function () {
    var errors = {};

    errors.password = (Ember.$('#password').val() == null || Ember.$('#password').val().length < 6);
    errors.confirm = Ember.$('#confirm').val() !== Ember.$('#password').val();

    this.set('error', errors);
  },

  actions: {
    submit: function () {
      this.validate();

      var errors = this.get('error');
      var hasError = Object.keys(errors).reduce( function (accum, item) {
        return accum || errors[item];
      }, false);

      if (!hasError) {
        var self = this;
        var btn = Ember.$('button');

        btn.button('loading');
        this.get('session').changePassword(Ember.$('#password').val(), this.get('reset_token')).then( function () {
          self.transitionToRoute('index');
        }, function (error) {
          self.set('error_message', error.responseJSON.message || 'An Unknown Error Occured');
        }).finally( function () { btn.button('reset'); });
      }
    }
  }
});