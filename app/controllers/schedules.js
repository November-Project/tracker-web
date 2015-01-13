import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: ['locations'],
  sortProperties: ['dayOfWeek'],
  sortAscending: true
});
