import AuthenticationRoute from '../../authentication';
import Ember from 'ember';

export default AuthenticationRoute.extend({
  model: function () {
    let user = this.modelFor('users.user');
    return this.client.getUserStats(user);
  }
});
