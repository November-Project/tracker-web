import AdministrationRoute from '../administration';

export default AdministrationRoute.extend({
  beforeModel: function () {
      this.transitionTo('events');
  }
});
