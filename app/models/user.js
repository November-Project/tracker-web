import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),
  email: DS.attr('string'),
  password: DS.attr('string'),
  tribe: DS.belongsTo('tribe', { async: true }),
  gender: DS.attr('string'),
  photoURL: DS.attr('string'),
  facebookId: DS.attr('string'),
  acceptedTerms: DS.attr('boolean', { defaultValue: false }),
  isVerified: DS.attr('boolean', { defaultValue: false }),
  isAdmin: DS.attr('boolean', { defaultValue: false }),
  tribeAdmin: DS.belongsTo('tribe', { async: true }),

  isSuperAdmin: function () {
    return this.get('isAdmin');
  },

  isLeader: function () {
    return this.isSuperAdmin() || Ember.isPresent(this.get('tribeAdmin'));
  },

  isLeaderOf: function (tribe) {
    return this.isSuperAdmin() || (this.isLeader() && this.get('tribeAdmin.id') === tribe.get('id'));
  }
});
