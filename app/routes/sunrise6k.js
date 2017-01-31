import AuthenticationRoute from './authentication';

export default AuthenticationRoute.extend({
  model: function () {
    return this.client.getSunrise6kData();
  }
});
