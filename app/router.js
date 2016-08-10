/* global ga */

import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType,

  notifyGoogleAnalytics: function() {
    return ga('send', 'pageview', {
      'page': this.get('url'),
      'title': this.get('url')
    });
  }.on('didTransition')
});

export default Router.map(function() {
  this.route('auth', function () {
    this.route('login');
    this.route('signup');
    this.route('logout');
    this.route('terms');
    this.route('forgot');
    this.route('reset');
  });

  this.route('events', function () {
    this.route('recurring', { path: 'recurring/:recurring_id' });
    this.route('no_event', { path: '/' });

    this.route('view', { path: ':event_id' }, function () {
      this.route('results', function () {
        this.route('edit', { path: ':result_id' });
        this.route('new');
      });
    });
  });

  this.route('users', function () {
    this.route('user', { path: ':user_id' }, function () {
      this.route('profile');
      this.route('edit');
    });
  });

  this.route('admin', function () {
    this.route('locations', function () {
      this.route('edit', { path: ':location_id' });
      this.route('new');
    });

    this.route('workouts', function () {
      this.route('edit', { path: ':workout_id' });
      this.route('new');
    });

    this.route('events', function () {
      this.route('edit', { path: ':event_id' });
      this.route('new');
    });

    this.route('recurring', function () {
      this.route('edit', { path: ':recurring_id' });
      this.route('new');
    });

    this.route('tribes', function () {
      this.route('edit', { path: ':tribe_id' });
      this.route('new');
    });

    this.route('leaders');
    this.route('plan');
    this.route('members');
  });
});
