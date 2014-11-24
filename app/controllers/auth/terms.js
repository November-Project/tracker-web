import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['tribes'],

  actions: {
    submitTerms: function () {
      console.log(this.get('tribe'));
      console.log(this.session.user);
      console.log(this.get('hasAcceptedTerms'));
    }
  }
});