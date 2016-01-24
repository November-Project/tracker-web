import AuthenticationRoute from './authentication';

export default AuthenticationRoute.extend({
  afterModel: function () {
    this.transitionTo('events');
  }
});
