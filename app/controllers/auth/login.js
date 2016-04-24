import Ember from 'ember';

export default Ember.Controller.extend({
  validate: function () {
    var errors = {};

    errors.email = Ember.isBlank(this.get('email'));
    errors.password = Ember.isBlank(this.get('password'));

    this.set('error', errors);
  },

  cleanup: function () {
    this.set('email', '');
    this.set('password', '');
    this.set('error_message', null);
  },

  actions: {
    login: function () {
      this.validate();

      const errors = this.get('error');
      const hasError = Object.keys(errors).reduce( function (accum, item) {
        return accum || errors[item];
      }, false);

      if (!hasError) {
        const btn = Ember.$('button');

        btn.button('loading');
        this.auth.openWithEmailAndPassword(this.get('email'), this.get('password')).then( () => {
          this.transitionToRoute('index');
        }, (error) => {
          const message = error.responseJSON && error.responseJSON.message ? error.responseJSON.message : 'An Unknown Error Occured';
          this.set('error_message', message);
        }).finally( () => { btn.button('reset'); });
      }
    }
  }
});
