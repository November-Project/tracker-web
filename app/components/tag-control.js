import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['form-control', 'tag-control'],

  newValueChange: function () {
    this.sendAction('validate', this.get('newValue'));
  }.observes('newValue'),

  actions: {
    remove: function (index) {
      this.sendAction('remove', index);
    },

    enterPressed: function () {
      this.sendAction('validate', this.get('newValue'), () => {
        this.sendAction('add', this.get('newValue'));
        this.set('newValue', '');
      });
    }
  }
});
