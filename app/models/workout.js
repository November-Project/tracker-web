import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  reps: DS.attr('number', { defaultValue: 0 }),
  time: DS.attr('number', { defaultValue: 0 }),
  standard: DS.attr('boolean', { defaultValue: false }),
  allowUserReps: DS.attr('boolean', { defaultValue: false }),
  allowUserTime: DS.attr('boolean', { defaultValue: false }),
  allowUserPR: DS.attr('boolean', { defaultValue: false }),
  tribe: DS.belongsTo('tribe'),

  minutes: function (key, value, previousValue) {
    if (arguments.length > 1) {
      var sec = this.get('time') - previousValue * 60;
      this.set('time', value * 60 + sec);
    }

    return Math.floor(this.get('time') / 60);
  }.property('time'),

  seconds: function (key, value, previousValue) {
    if (arguments.length > 1) {
      var time = this.get('time') - previousValue;
      this.set('time', value * 1 + time);
    }

    return this.get('time') % 60;
  }.property('time')
});

