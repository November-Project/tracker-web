import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ['title'],
  sortAscending: true,

  filterStandard: true,

  filteredContent: function () {
    var workouts = this.get('arrangedContent');
    var self = this;
    return workouts.filter( function (workout) {
      return workout.get('standard') === self.get('filterStandard');
    });
  }.property('filterStandard'),

  actions: {
    showStandard: function () {
      this.set('filterStandard', true);
    },

    showNonStandard: function () {
      this.set('filterStandard', false);
    }
  }
});
