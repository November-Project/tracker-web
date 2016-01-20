import Ember from 'ember';

export default Ember.Controller.extend({
  displayDate: Ember.computed('date', {
    get: function () {
      if (Ember.isPresent(this.get('date'))) {
        return this.get('date').format('ddd, MMM D YYYY');
      } else {
        return '';
      }
    }
  })
});
