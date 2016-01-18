import SuperAdministrationRoute from '../../super-administration';
import MapLoader from '../../../helpers/map-loader';

export default SuperAdministrationRoute.extend({
  model: function () {
    return this.store.createRecord('tribe', { title: '', latitude: 0, longitude: 0 });
  },

  afterModel: function () {
    return MapLoader.loadMapAPI();
  },

  actions: {
    save: function () {
      const btn = Ember.$('#save');
      btn.button('loading');

      const model = this.get('controller.model');

      model.save().then( () => {
        btn.button('reset');
        this.transitionTo('admin.tribes');
      }, (error) => {
        this.controller.set('error_message', error.message || 'An Unknown Error Occured');
        window.scrollTo(0, 0);
        btn.button('reset');
      });
    },

    cancel: function () {
      if (window.history.length > 0) { window.history.back(); }
      else { this.transitionTo('admin.tribes'); }
    }
  }
});
