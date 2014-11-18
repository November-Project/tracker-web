import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['tribes'],
  acceptedTerms: false,

  actions: {
    submitTerms: function (data) {
      console.log(this.get("selectedTribe"));
      console.log(this.get("acceptedTerms"));
    }
  }
});