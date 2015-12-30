import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  title: DS.attr('string'),
  daysOfWeek: DS.attr('string', { defaultValue: "" }),
  latitude: DS.attr('number'),
  longitude: DS.attr('number'),
  timezone: DS.attr('string'),

  daysOfWeekArray: Ember.computed('daysOfWeek', {
    get: function () {
      return _.map(this.get('daysOfWeek').split(',').filter(Ember.isPresent), function (v) { return parseInt(v); });
    },
    set: function (key, value) {
      this.set('daysOfWeek', value.join(','));
      return value;
    }
  })
});
