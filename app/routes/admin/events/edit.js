import Ember from 'ember';
import EventsRouteNew from './new';

export default EventsRouteNew.extend({
    model: function (params) {
      return this.store.findRecord('event', params.event_id);
    },

    renderTemplate: function (model, controller) {
      this.render('admin.events.new', model, controller);
    }
});
