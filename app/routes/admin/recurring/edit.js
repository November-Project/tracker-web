import RecurringRouteNew from './new';

export default RecurringRouteNew.extend({
    model: function (params) {
      return this.store.findRecord('recurring', params.recurring_id);
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
