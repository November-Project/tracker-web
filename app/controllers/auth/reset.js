import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: 'reset_token',
  reset_token: null,

  validate: function () {
    var errors = {};

    errors.password = Ember.isBlank(this.get('password')) || this.get('password').length < 6;
    errors.confirm = this.get('confirm') !== this.get('password');

    this.set('error', errors);
  },

  cleanup: function () {
    this.set('password', '');
    this.set('confirm', '');
    this.set('error_message', null);
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
        const reset_token = decodeURIComponent(this.get('reset_token'));

        btn.button('loading');
        this.auth.changePassword(this.get('password'), reset_token).then( () => {
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
