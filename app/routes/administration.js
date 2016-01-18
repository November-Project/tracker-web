import AuthenticationRoute from './authentication';

export default AuthenticationRoute.extend({
  beforeModel: function () {
    this._super();
    const session = this.get('session');
    const user = session.get('user');

    if (!user.isLeaderOf(session.get('tribe'))) {
      this.transitionTo('index');
    }
  },

  actions: {
    didTransition: function () {
      this.send('setAdminNavActive', this.routeName);
    }
  }
});
