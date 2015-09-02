import Ember from 'ember';
import AdministrationRoute from './administration';

export default AdministrationRoute.extend({
  model: function () {
    return [
      {
        'title': 'Events',
        'icon': 'fa fa-calendar',
        'route': 'events'
      },
      {
        'title': 'Locations',
        'icon': 'fa fa-map-marker',
        'route': 'locations'
      },
      {
        'title': 'Workouts',
        'icon': 'fa fa-heartbeat',
        'route': 'workouts'
      },
      {
        'title': 'Tribes',
        'icon': 'fa fa-group',
        'route': 'tribes'
      }
    ].map( (item) => {
      return Ember.Object.create(item);
    });
  },

  actions: {
    transition: function (route) {
      this.transitionTo(route);
    },

    setAdminNavActive: function (route) {
      this.controllerFor('admin').send('setActive', route);
    }
  }
});
