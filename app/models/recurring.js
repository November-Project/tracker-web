import Ember from 'ember';
import DS from 'ember-data';

Ember.Inflector.inflector.uncountable('recurring');

export default DS.Model.extend({
  title: DS.attr('string'),
  times: DS.attr('string', { defaultValue: "" }),
  week: DS.attr('number', { defaultValue: 0 }),
  days: DS.attr('string', { defaultValue: "" }),
  hideWorkout: DS.attr('boolean', { defaultValue: true }),
  tribe: DS.belongsTo('tribe', { async: false }),
  location: DS.belongsTo('location', { async: false }),
  workout: DS.belongsTo('workout', { async: false }),

  displayTitle: Ember.computed('workout', 'location', {
    get: function () {
      if (!Ember.isBlank(this.get('title'))) { return this.get('title'); }
      if (!this.get('hideWorkout') && this.get('workout')) { return this.get('workout').get('title'); }
      if (this.get('location')) { return this.get('location').get('title'); }
      return '';
    }
  }),

  timesArray: Ember.computed('times', {
    get: function () {
      return this.get('times').split(',').filter(Ember.isPresent);
    },
    set: function (key, value) {
      this.set('times', value.join(','));
      return value;
    }
  }),

  daysArray: Ember.computed('days', {
    get: function () {
      return this.get('days').split(',').filter(Ember.isPresent).map( function (v) { return parseInt(v); });
    },
    set: function (key, value) {
      this.set('days', value.join(','));
      return value;
    }
  })
});
