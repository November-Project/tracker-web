import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['tribes'],

  validate: function () {
    if (this.get('name') == null || Ember.$.trim(this.get('name')) === '') {
      this.set('nameError', 'Name required.');
    } else {
      this.set('nameError', null);
    }

    if (this.get('email') == null || Ember.$.trim(this.get('email')) === '') {
      this.set('emailError', 'Email required.');
    } else {
      this.set('emailError', null);
    }

    if (this.get('password') == null || this.get('password').length < 6) {
      this.set('passwordError', 'Password required.');
    } else {
      this.set('passwordError', null);
    }

    if (Ember.$('#confirm').val() !== this.get('password')) {
      this.set('confirmError', 'Passwords do not match.');
    } else {
      this.set('confirmError', null);
    }

    if (this.get('gender') == null) {
      this.set('genderError', 'Gender required.');
    } else {
      this.set('genderError', null);
    }

    if (this.get('tribe') == null) {
      this.set('tribeError', 'No Tribe selected.');
    } else {
      this.set('tribeError', null);
    }

    if (this.get('acceptedTerms') === false) {
      this.set('termsError', 'You must accept the terms.');
    } else {
      this.set('termsError', null);
    }
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

      if (!this.get('tribeError') && !this.get('termsError')) {
        this.model.save().then( function () {
          this.transitionToRoute('index');
        }).bind(this);
      }
    }
  }
});