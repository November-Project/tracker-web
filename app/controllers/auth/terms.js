import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['tribes'],

  actions: {
    submitTerms: function () {
      console.log(this.model);
      console.log(this.session.user);
    }
  }
});