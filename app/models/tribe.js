import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  daysOfWeek: DS.attr(),
  latitude: DS.attr('number'),
  longitude: DS.attr('number'),
  timezone: DS.attr('string')
});
