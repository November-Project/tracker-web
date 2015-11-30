import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('moment-date'),
  times: DS.attr('string-array', { defaultValue: "" }),
  recurring: DS.attr('boolean', { defaultValue: false }),
  week: DS.attr('number', { defaultValue: 0 }),
  days: DS.attr('int-array', { defaultValue: "" }),
  hideWorkout: DS.attr('boolean', { defaultValue: true }),
  recurringEvent: DS.attr('number'),
  tribe: DS.belongsTo('tribe', { async: false }),
  location: DS.belongsTo('location', { async: false }),
  workout: DS.belongsTo('workout', { async: false }),
  verbalCount: DS.attr('number'),
  resultCount: DS.attr('number'),
  results: DS.hasMany('result', { async: true }),
  verbals: DS.hasMany('verbal', { async: true }),

  title: Ember.computed('workout', 'location', {
    get: function () {
      if (this.get('workout')) { return this.get('workout').get('title'); }
      if (this.get('location')) { return this.get('location').get('title'); }
      return '';
    }
  }),

  timesArray: Ember.computed({
    get: function () {
      return this.get('times').split(',').filter(Ember.isPresent);
    },
    set: function (key, value) {
      this.set('times', value.join(','));
      return value;
    }
  }),

  daysArray: Ember.computed({
    get: function () {
      return _.map(this.get('days').split(',').filter(Ember.isPresent), function (v) { return parseInt(v); });
    },
    set: function (key, value) {
      this.set('days', value.join(','));
      return value;
    }
  })
});
