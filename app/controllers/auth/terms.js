import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['tribes'],

  validate: function () {
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
    submitTerms: function () {
      this.validate();

      if (!this.get('tribeError') && !this.get('termsError')) {
        this.model.save().then( function () {
          this.transitionToRoute('index');
        }).bind(this);
      }
    }
  }
});