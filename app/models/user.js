import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  email: DS.attr('string'),
  password: DS.attr('string'),
  tribe: DS.belongsTo('tribe'),
  gender: DS.attr('string'),
  facebookId: DS.attr('number'),
  acceptedTerms: DS.attr('boolean', { defaultValue: false }),
  isVerified: DS.attr('boolean', { defaultValue: false }),
  isAdmin: DS.attr('boolean', { defaultValue: false }),
  tribeAdmin: DS.belongsTo('tribe')
});