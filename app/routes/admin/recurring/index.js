import AdministrationRoute from '../../administration';
import Ember from 'ember';

export default AdministrationRoute.extend({
  beforeModel: function () {
    this.transitionTo('admin.events.index');
  }
});
