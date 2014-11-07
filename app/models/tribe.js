import DS from 'ember-data';

var Tribe = DS.Model.extend({
  title: DS.attr('string'),
  latitude: DS.attr('number'),
  longitude: DS.attr('number'),
  timezone: DS.attr('string')
});

export default Tribe;