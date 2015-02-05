import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['time-entry'],
  attributeBindings: ['id'],
  id: 'time',

  setTime: function () {
    var min = this.get('minutes');
    var sec = this.get('seconds');
    this.set('time', min * 60 + sec);
  }.observes('minutes', 'seconds'),

  setParts: function () {
    var time = this.get('time');
    var min = parseInt(time / 60, 10);
    var sec = time - min;
    this.set('minutes', min);
    this.set('seconds', sec);
  }.observes('time')
});