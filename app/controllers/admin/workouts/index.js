import Ember from 'ember';

export default Ember.Controller.extend({
  titleSorting: ['title'],
  sorted: Ember.computed.sort('model', 'titleSorting'),

  filterStandard: true,

  filteredContent: Ember.computed('filterStandard', 'model.[]', {
    get: function () {
      return this.get('sorted').filter( (workout) => {
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
