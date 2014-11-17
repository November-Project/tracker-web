import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('auth', function () {
    this.route('login');
    this.route('signup');
    this.route('logout');
    this.route('terms');
  });
});

export default Router;
