import AdministrationRoute from '../administration';

export default AdministrationRoute.extend({
  model: function () {
    return [
      {
        'title': 'Events',
        'icon': 'fa fa-calendar fa-4x',
        'route': 'events'
      },
      {
        'title': 'Schedule',
        'icon': 'fa fa-clock-o fa-4x',
        'route': 'schedules'
      },
      {
        'title': 'Locations',
        'icon': 'fa fa-map-marker fa-4x',
        'route': 'locations'
      },
      {
        'title': 'Workouts',
        'icon': 'fa fa-heartbeat fa-4x',
        'route': 'workouts'
      },
      {
        'title': 'Tribes',
        'icon': 'fa fa-group fa-4x',
        'route': 'tribes'
      }
    ];
  },

  actions: {
    transition: function (route) {
      this.transitionTo(route);
    }
  }
});