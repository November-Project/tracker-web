import Ember from 'ember';

export default Ember.Controller.extend({
  validate: function () {
    var errors = {};

    errors.email = Ember.isBlank(this.get('email'));

    this.set('error', errors);
  },

  cleanup: function () {
    this.set('email', '');
  },

  actions: {
    forgot: function () {
      this.validate();

      var errors = this.get('error');
      var hasError = Object.keys(errors).reduce( function (accum, item) {
        return accum || errors[item];
      }, false);

      if (!hasError) {
        var btn = Ember.$('button');

        btn.button('loading');
        this.get('session').forgotPassword(this.get('email')).then( () => {
          this.set('error_message', null);
          this.set('info_message', 'Email sent!');
        }, (error) => {
          const message = error.responseJSON && error.responseJSON.message ? error.responseJSON.message : 'An Unknown Error Occured';
          this.set('error_message', message);
        }).finally( () => { btn.button('reset'); });
      }
    }
  }
});
