import Ember from 'ember';

export default Ember.Object.extend({
  minutes: Ember.computed('time', {
    get: function () {
      return Math.floor(this.get('time') / 60);
    },
    set: function (key, value, previousValue) {
      const sec = this.get('time') - previousValue * 60;
      this.set('time', value * 60 + sec);
      return Math.floor(this.get('time') / 60);
    }
  }),

  seconds: Ember.computed('time', {
    get: function () {
      return this.get('time') % 60;
    },
    set: function (key, value, previousValue) {
      const time = this.get('time') - previousValue;
      this.set('time', value * 1 + time);
      return this.get('time') % 60;
    }
  })
});
