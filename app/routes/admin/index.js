import AdministrationRoute from '../administration';

export default AdministrationRoute.extend({
  model: function () {
    return [
      {
        'title': 'Events',
        'icon': 'fa fa-calendar fa-4x'
      },
      {
        'title': 'Schedules',
        'icon': 'fa fa-clock-o fa-4x'
      },
      {
        'title': 'Locations',
        'icon': 'fa fa-map-marker fa-4x'
      },
      {
        'title': 'Workouts',
        'icon': 'fa fa-group fa-4x'
      }
    ]
  }
});