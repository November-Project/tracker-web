import Ember from 'ember';

export default Ember.Controller.extend({
  tribes: Ember.computed({
    get: function () {
      return this.store.peekAll('tribe');
    }
  }),

  validate: function () {
    var errors = {};

    const model = this.get('model');
    errors.tribe = Ember.isNone(model.get('tribe.id'));
    errors.terms = !model.get('acceptedTerms');

    this.set('error', errors);
  },

  actions: {
    submitTerms: function () {
      this.validate();

      const errors = this.get('error');
      const hasError = Object.keys(errors).reduce( function (accum, item) {
        return accum || errors[item];
      }, false);

      if (!hasError) {
        const btn = Ember.$('button');

        btn.button('loading');
        this.model.set('tribeId', parseInt(this.model.get('tribe.id'), 10));
        this.client.saveUser(this.model).then( () => {
          this.send('changeTribe', this.model.get('tribe'));
        }, (error) => {
          const message = error.responseJSON && error.responseJSON.message ? error.responseJSON.message : 'An Unknown Error Occured';
          this.set('error_message', message);
        }).finally( () => { btn.button('reset'); });
      }
    }
  }
});
