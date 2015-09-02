import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['card'],

  didInsertElement: function () {
    this.setSelected();
  }.on('didInsertElement'),

  selectedChanged: Ember.observer('selected', function () {
    this.setSelected();
  }),

  setSelected: function () {
    if (this.get('selected')) {
      this.$().addClass('selected');
    } else {
      this.$().removeClass('selected');
    }
  },

  click: function () {
    this.sendAction('action', this.get('route'));
  }
});
