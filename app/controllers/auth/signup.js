import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['tribes'],

  validate: function () {
    var errors = {};

    errors.name = (this.get('name') == null || Ember.$.trim(this.get('name')) === '');
    errors.email = (this.get('email') == null || Ember.$.trim(this.get('email')) === '');
    errors.password = (this.get('password') == null || this.get('password').length < 6);
    errors.confirm = Ember.$('#confirm').val() !== this.get('password');
    errors.gender = this.get('gender') == null;
    errors.tribe = this.get('tribe') == null;
    errors.terms = !this.get('acceptedTerms');

    this.set('error', errors);
  },

  actions: {
    setMale: function () {
      this.model.set('gender', 'male');
      Ember.$('#male').addClass('active');
      Ember.$('#female').removeClass('active');
    },

    setFemale: function () {
      this.model.set('gender', 'female');
      Ember.$('#female').addClass('active');
      Ember.$('#male').removeClass('active');
    },

    submit: function () {
      this.validate();

      var errors = this.get('error');
      var hasError = Object.keys(errors).reduce( function (accum, item) {
        return accum || errors[item];
      }, false);

      if (!hasError) {
        var self = this;
        this.model.save().then( function () {
          self.get('session').openWithEmailAndPassword(self.get('email'), self.get('password')).then( function () {
            self.transitionToRoute('index');
          });
        });
      }
    }
  }
});