import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['time'],
  time: null,

  modelWasSet: Ember.observer('model', function () {
    if (this.get('model.event.timesArray').indexOf(this.get('time')) >= 0) {
      this.set('model.eventTime', this.get('time'));
    }
  })
});
