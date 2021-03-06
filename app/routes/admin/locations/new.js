import AdministrationRoute from '../../administration';
import MapLoader from '../../../helpers/map-loader';

export default AdministrationRoute.extend({
  model: function () {
    const tribe = this.get('session.tribe');
    const { longitude, latitude } = tribe.getProperties('longitude', 'latitude');
    return this.store.createRecord('location', { tribe, longitude, latitude });
  },

  beforeModel: function () {
    return MapLoader.loadMapAPI();
  },

  actions: {
    save: function () {
      var model = this.get('controller.model');
      model.set('latitude', model.get('latitude').toFixed(6));
      model.set('longitude', model.get('longitude').toFixed(6));

      model.save().then( () => {
        this.transitionTo('admin.locations.index');
      }, (error) => {
        this.controller.set('error_message', error.message || 'An Unknown Error Occured');
        window.scrollTo(0, 0);
      });
    },

    cancel: function () {
      if (window.history.length > 0) { window.history.back(); }
      else { this.transitionTo('admin.locations'); }
    }
  }
});
