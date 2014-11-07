import DS from 'ember-data';

var User = DS.Model.extend({
  name: DS.attr('string'),
  email: DS.attr('string'),
  password: DS.attr('string'),
  tribe: DS.belongsTo('tribe'),
  gender: DS.attr('string'),
  facebookId: DS.attr('number'),
  isVerified: DS.attr('boolean', { defaultValue: false }),
  isAdmin: DS.attr('boolean', { defaultValue: false }),
  tribeAdmin: DS.belongsTo('tribe')
});

export default User;