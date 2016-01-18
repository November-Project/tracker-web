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
      const btn = Ember.$('#delete');
      btn.button('loading');

      const model = this.get('controller.event');
      model.destroyRecord().then( () => {
        btn.button('reset');
        this.transitionTo('admin.events.index');
      }, (error) => {
        this.controller.set('error_message', error.message || 'An Unknown Error Occured');
        window.scrollTo(0, 0);
        btn.button('reset');
      });
    }
  }
});
