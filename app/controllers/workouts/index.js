import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ['title'],
  sortAscending: true,

  filterStandard: true,

  filteredContent: Ember.computed('filterStandard', {
    get: function () {
      var workouts = this.get('arrangedContent');
      return workouts.filter( (workout) => {
        return workout.get('standard') === this.get('filterStandard');
      });
    }
  }),

  actions: {
    showStandard: function () {
      this.set('filterStandard', true);
    },

    showNonStandard: function () {
      this.set('filterStandard', false);
    }
  }
});
