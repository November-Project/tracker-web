import AuthenticationRoute from './authentication';

export default AuthenticationRoute.extend({
  model: function (params) {
    return this.client.getSunrise6kData();
  }
});
