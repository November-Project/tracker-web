import Ember from 'ember';
import DS from 'ember-data';
import _ from 'lodash';

export default DS.Model.extend({
  date: DS.attr('moment-date'),
  times: DS.attr('string-array', { defaultValue: "" }),
  recurring: DS.attr('boolean', { defaultValue: false }),
  week: DS.attr('number', { defaultValue: 0 }),
  days: DS.attr('int-array', { defaultValue: "" }),
  hideWorkout: DS.attr('boolean', { defaultValue: true }),
  recurringEvent: DS.belongsTo('event'),
  tribe: DS.belongsTo('tribe', { async: false }),
  location: DS.belongsTo('location', { async: false }),
  workout: DS.belongsTo('workout', { async: false }),

  title: Ember.computed('workout', 'location', {
    get: function () {
      if (this.get('workout')) { return this.get('workout').get('title'); }
      if (this.get('location')) { return this.get('location').get('title'); }
      return '';
    }
  }),

  timesArray: Ember.computed({
    get: function () {
      return this.get('times').split(',');
    },
    set: function (key, value) {
      this.set('times', value.join(','));
      return value;
    }
  }),

  daysArray: Ember.computed({
    get: function () {
      return _.map(this.get('days').split(','), function (v) { return parseInt(v); });
    },
    set: function (key, value) {
      this.set('days', value.join(','));
      return value;
    }
  })
});
