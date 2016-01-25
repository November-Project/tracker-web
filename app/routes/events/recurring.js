import AuthenticationRoute from '../authentication';

export default AuthenticationRoute.extend({
  model: function (params) {
    return this.store.findRecord('recurring', params.recurring_id);
  },

  setupController: function (controller, model) {
      this._super(controller, model);
      const selection = moment(controller.get('selection'), 'YYYY-MM-DD');
      this.controllerFor('events').set('_selected', selection);
      this._reloadVerbals(controller.get('selection'));
  },

  _reloadVerbals: function (date) {
    this.store.query('verbal', { date }).then( (verbals) => {
      this.controller.set('verbals', verbals);
    });
  },

  actions: {
    reloadVerbals: function (date) {
      this._reloadVerbals(date);
    }
  }
});
