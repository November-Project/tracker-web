import AuthenticationRoute from '../../authentication';

export default AuthenticationRoute.extend({
  model: function () {
    let user = this.modelFor('users.user');
    return this.client.getUserStats(user);
  }
});
