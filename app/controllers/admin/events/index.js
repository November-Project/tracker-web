import Ember from 'ember';

export default Ember.Controller.extend({
  daysArray: Ember.computed.alias('session.tribe.daysOfWeekArray')
});
