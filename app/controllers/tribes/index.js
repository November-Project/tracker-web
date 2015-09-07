import Ember from 'ember';

export default Ember.Controller.extend({
  titleSorting: ['title'],
  sorted: Ember.computed.sort('model', 'titleSorting')
});
