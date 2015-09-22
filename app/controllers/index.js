import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['date'],
  date: null,

  actions: {
    eventSelected: function (event, date) {
      if (this.get('date') === date && Ember.isPresent(this.get('event')) && Ember.isEmpty(event)) { return; }
      this.set('date', date);
      this.set('event', event);
    }
  }
});
