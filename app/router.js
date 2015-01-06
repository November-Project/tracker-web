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
    this.route('forgot');
    this.route('reset', { path: 'reset/:token' });
  });

  this.resource('admin', function () {

  });
});

export default Router;
