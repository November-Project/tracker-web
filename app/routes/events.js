import Ember from 'ember';
import AuthenticationRoute from './authentication';

export default AuthenticationRoute.extend({
  queryParams: {
    date: {
      refreshModel: true
    }
  },

  model: function (params) {
    var date = moment(params.date, 'YYYY-MM-DD');
    if (!date.isValid()) { date = moment(); }
    const start_date = date.clone().startOf('week').format('YYYY-MM-DD');
    const end_date = date.clone().endOf('week').format('YYYY-MM-DD');

    return this.get('store').query('event', { start_date, end_date });
  },

  actions: {
    eventSelected: function (selection) {
      Ember.run.next(this, function () {
        if (selection.hasEvent) {
          this.transitionTo('events.view', selection.event);
        } else {
          this.transitionTo('events.no_event').then( () => {
            const controller = this.controllerFor('events.no_event');
            if (Ember.isPresent(controller)) {
              controller.set('date', selection.date);
            }
          });
        }
      });
    }
  }
});
