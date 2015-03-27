import Ember from 'ember';

export default Ember.Component.extend({
  savable: function () {
    return this.get('isDirty') && this.get('title') !== "" && this.get('title') !== undefined;
  }.property('title', 'isDirty'),

  actions: {
    save: function () {
      this.sendAction();
    }
  }
});
