import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  latitude: DS.attr('number'),
  longitude: DS.attr('number'),
  standard: DS.attr('boolean'),
  tribe: DS.belongsTo('tribe')
});