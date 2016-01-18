import Ember from 'ember';

export default Ember.Controller.extend({
  validate: function () {
    var errors = {};

    errors.password = Ember.isBlank(this.get('password')) || this.get('password').length < 6;
    errors.confirm = this.get('confirm') !== this.get('password');

    this.set('error', errors);
  },

  cleanup: function () {
    this.set('password', '');
    this.set('confirm', '');
  },

  actions: {
    submit: function () {
      this.validate();

      const errors = this.get('error');
      const hasError = Object.keys(errors).reduce( function (accum, item) {
        return accum || errors[item];
      }, false);

      if (!hasError) {
        const btn = Ember.$('button');

        btn.button('loading');
        this.get('session').changePassword(this.get('password'), this.get('model.reset_token')).then( () => {
          this.transitionToRoute('index');
        }, (error) => {
          if (error.status === 404) {
            this.set('error_message', 'Reset token already used.');
          } else {
            const message = error.responseJSON && error.responseJSON.message ? error.responseJSON.message : 'An Unknown Error Occured';
            this.set('error_message', message);
          }
        }).finally( () => { btn.button('reset'); });
      }
    }
  }
});
