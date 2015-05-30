import Ember from 'ember';

export default Ember.Component.extend({
  savable: function () {
    return this.get('model.isDirty') && this.get('model.title') !== "" && this.get('model.title') !== undefined;
  }.property('model.title', 'model.isDirty'),

  cleanup: function () {
    const location = this.get('model');

    if (location.get('isNew')) {
      location.destroyRecord();
    } else {
      location.rollback();
    }
  }.on('willDestroyElement'),

  actions: {
    save: function () {
      this.sendAction();
    },

    cancel: function () {
      this.sendAction('cancel');
    }
  }
});
