import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('date'),
  tribe: DS.belongsTo('tribe'),
  location: DS.belongsTo('location'),
  workout: DS.belongsTo('workout')
});