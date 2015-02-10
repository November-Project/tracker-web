import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string', { defaultValue: '' }),
  description: DS.attr('string', { defaultValue: '' }),
  reps: DS.attr('number', { defaultValue: 0 }),
  time: DS.attr('number', { defaultValue: 0 }),
  standard: DS.attr('boolean', { defaultValue: false }),
  allowUserReps: DS.attr('boolean', { defaultValue: false }),
  allowUserTime: DS.attr('boolean', { defaultValue: false }),
  allowUserPR: DS.attr('boolean', { defaultValue: false }),
  tribe: DS.belongsTo('tribe'),

  minutes: function (key, value, previousValue) {
    if (arguments.lenth > 1) {
      var sec = Math.floor(this.get('time') / previousValue);
      this.set('time', value + sec);
    }

    return Math.floor(this.get('time') / 60);
  }.property('time'),

  seconds: function (key, value, previousValue) {
    if (arguments.lenth > 1) {
      var time = this.get('time') - previousValue;
      this.set('time', value + time);
    }

    return this.get('time') - (this.get('minutes') * 60);
  }.property('time')
});

