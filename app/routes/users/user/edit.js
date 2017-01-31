import AuthenticationRoute from '../../authentication';

export default AuthenticationRoute.extend({
  beforeModel: function () {
    let me = this.get('session.user');
    let user = this.modelFor('user.view');

    if (user.id !== me.id) {
      this.transitionTo('user.view.profile');
    }
  },

  model: function () {
    return this.get('session.user');
  }
});
