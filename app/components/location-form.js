import Ember from 'ember';

export default Ember.Component.extend({
  savable: function () {
    return this.get('model.isDirty') && this.get('model.title') !== "" && this.get('model.title') !== undefined;
  }.property('model.title', 'model.isDirty'),

  actions: {
    save: function () {
      this.sendAction();
    }
  }
});
