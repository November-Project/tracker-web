import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ['title'],
  sortAscending: true,

  filterStandard: true,

  filteredContent: function () {
    var locations = this.get('arrangedContent');
    var self = this;
    return locations.filter( function (location) {
      return location.get('standard') === self.get('filterStandard');
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
