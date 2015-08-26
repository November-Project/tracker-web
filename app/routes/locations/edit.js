import LocationsNewRoute from './new';

export default LocationsNewRoute.extend({
  model: function(params) {
    return this.store.findRecord('location', params.location_id);
  }
});
