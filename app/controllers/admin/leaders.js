import Ember from 'ember';

export default Ember.Controller.extend({
  users: [],

  nonLeaders: Ember.computed('users', 'users.[]', {
    get: function () {
      return this.get('users').filter( (user) => {
        return Ember.isBlank(user.get('tribeAdmin.id'));
      });
    }
  }),

  actions: {
    remove: function (leader) {
      leader.destroyRecord().catch( (error) => {
        this.set('error_message', error.message || 'An Unknown Error Occured');
        window.scrollTo(0, 0);
      });
    },

    search: function () {
      const q = this.get('searchText') || '';
      this.store.query('user', { q }).then( (users) => {
        this.set('users', users);
      });
    },

    add: function (user) {
      this.store.createRecord('leader', {
        id: user.get('id'),
        name: user.get('name'),
        email: user.get('email')
      }).save().then( () => {
        this.get('users').removeObject(user);
      }, (error) => {
        this.set('error_message', error.message || 'An Unknown Error Occured');
        window.scrollTo(0, 0);
      });
    }
  }
});
