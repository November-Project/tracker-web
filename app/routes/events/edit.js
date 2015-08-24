import Ember from 'ember';
import EventsRouteNew from './new';

export default EventsRouteNew.extend({
    model: function (params) {
      return Ember.RSVP.hash({
        event: this.store.findRecord('event', params.event_id),
        workouts: this.store.findAll('workout'),
        locations: this.store.findAll('location'),
      });
    },

    renderTemplate: function (model, controller) {
      this.render('events.new', model, controller);
    }
});
