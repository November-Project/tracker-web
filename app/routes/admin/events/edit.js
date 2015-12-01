import Ember from 'ember';
import EventsRouteNew from './new';

export default EventsRouteNew.extend({
    model: function (params) {
      return this.store.findRecord('event', params.event_id);
    },

    setupController: function (controller, model) {
      this._super(controller, model);

      if (model.get('recurring')) {
        controller.set('isRecurringEvent', true);
      }
    },

    renderTemplate: function (controller, model) {
      this.render('admin.events.new', { model, controller });
    },

    actions: {
      delete: function () {
        var model = this.get('controller.event');
        model.destroyRecord().then( () => {
          this.transitionTo('admin.events.index');
        });
      }
    }
});
