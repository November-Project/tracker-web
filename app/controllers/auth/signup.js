import Ember from 'ember';

export default Ember.Controller.extend({
  tribes: Ember.computed({
    get: function () {
      return this.store.peekAll('tribe');
    }
  }),

  _genderOptions: ['male', 'female', 'other', "don't specify"],

  genders: Ember.computed.map('_genderOptions', function (option) {
    return Ember.Object.create({
      value: option
    });
  }),

  validate: function () {
    var errors = {};
    const model = this.get('model');

    errors.name = Ember.isBlank(model.get('name'));
    errors.email = Ember.isBlank(model.get('email'));
    errors.password = (Ember.isBlank(model.get('password')) || model.get('password').length < 6);
    errors.confirm = this.get('confirm') !== model.get('password');
    errors.gender = Ember.isNone(model.get('gender'));
    errors.tribe = Ember.isNone(model.get('tribe.id'));
    errors.terms = !model.get('acceptedTerms');

    this.set('error', errors);
  },

  cleanup: function () {
    const model = this.get('model');
    if (Ember.isPresent(model)) {
      if (model.get('isNew')) {
        model.destroyRecord();
      } else {
        model.rollbackAttributes();
      }
    }
    this.set('confirm', null);
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
        const model = this.get('model');

        btn.button('loading');
        model.save().then( () => {
          this.auth.openWithEmailAndPassword(model.get('email'), model.get('password')).then( () => {
            model.set('password', null);
            btn.button('reset');
            this.transitionToRoute('index');
          });
        }, (error) => {
          this.set('error_message', error.message || 'An Unknown Error Occured');
          btn.button('reset');
        });
      }
    }
  }
});
