import Ember from 'ember';

export default Ember.Controller.extend({
  weekOffset: 0,

  resetCalendar: function () {
    this.set('weekOffset', 0);
  },

  actions: {
    getSelectedDate: function (callback) {
      const date = this.get('date');
      if (Ember.isPresent(date)) { callback(date); }
    }
  }
});
