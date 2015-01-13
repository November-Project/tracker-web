import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['card'],

  click: function () {
    this.sendAction('action', this.get('route'));
  }
});