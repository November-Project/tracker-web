import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.route('auth', function () {
    this.route('login');
    this.route('signup');
    this.route('logout');
    this.route('terms');
    this.route('forgot');
    this.route('reset', { path: 'reset/:token' });
  });

  this.route('events', function () {
    this.route('no_event', { path: '/' });

    this.route('view', { path: ':event_id' }, function () {
      this.route('results', function () {
        this.route('edit', { path: ':result_id' });
        this.route('new');
      });
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

    this.route('tribes', function () {
      this.route('edit', { path: ':tribe_id' });
      this.route('new');
    });

    this.route('leaders');
    this.route('plan');
  });
});
