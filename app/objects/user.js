import Ember from 'ember';

export default Ember.Object.extend({
  isSuperAdmin: function () {
    return this.get('isAdmin');
  },

  isLeader: function () {
    return this.isSuperAdmin() || Ember.isPresent(this.get('tribeAdminId'));
  },

  isLeaderOf: function (tribe) {
    return this.isSuperAdmin() || (this.isLeader() && String(this.get('tribeAdminId')) === tribe.get('id'));
  }
});
