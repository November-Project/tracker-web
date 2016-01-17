import Ember from 'ember';
import AdministrationRoute from '../../administration';
import MapLoader from '../../../helpers/map-loader';

export default AdministrationRoute.extend({
    model: function () {
      return this.store.createRecord('recurring');
    },

    renderTemplate: function (controller, model) {
      this.render('admin.events.new', { model, controller });
    },

    afterModel: function () {
      return Ember.RSVP.all([
        this.store.findAll('workout'),
        this.store.findAll('location'),
        MapLoader.loadMapAPI()
      ]);
    },

    cleanupController: function () {
      this.controller.cleanup();
    }.on('deactivate'),

    actions: {
      save: function () {
        var model = this.get('controller.event');

        if (model.get('isNew')) {
          model.set('tribe', this.session.get('tribe'));
        }

        model.save().then( () => {
          this.transitionTo('admin.events.index');
        }, function (err) {
          console.log(err);
        });
      },

      cancel: function () {
        if (window.history.length > 0) { window.history.back(); }
        else { this.transitionTo('admin.events.index'); }
      }
    }
});
