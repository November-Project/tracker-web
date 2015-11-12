import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    getSelectedDate: function (callback) {
      const date = this.get('date');
      if (Ember.isPresent(date)) { callback(date); }
    }
  }
});
