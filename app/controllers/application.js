import Ember from 'ember';

export default Ember.Controller.extend({
  currentTribeTitle: Ember.computed.alias('session.tribe.title')
});
