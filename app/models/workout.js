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
    value = value === '' ? 0 : parseInt(value, 10);
    if (value || value === 0) {
      var sec = this.get('time') - previousValue * 60;
      this.set('time', value * 60 + sec);
    }

    return Math.floor(this.get('time') / 60);
  }.property(),

  seconds: function (key, value, previousValue) {
    value = value === '' ? 0 : parseInt(value, 10);
    if (value || value === 0) {
      var time = this.get('time') - previousValue;
      this.set('time', value + time);
    }

    return this.get('time') - this.get('minutes') * 60;
  }.property()
});