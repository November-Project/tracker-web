import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'select',

  _setClasses: function () {
    this.get('classNames').pushObjects(Ember.String.w(this.get('classes') || ""));
  }.on('init'),

  optionModels: Ember.computed.map('options', function (option) {
    return option.get(this.get('optionTitlePath'));
  }),

  selectionChanged: function (e) {
    const valueKey = this.get('optionValuePath');
    const value = this.get('options').objectAt(Ember.$(e.target).val());
    this.set('value', valueKey ? value.get(valueKey) : value);
  }.on('change'),

  setup: function () {
    const valueKey = this.get('optionValuePath');
    const value = valueKey ? this.get('options').findBy(valueKey, this.get('value')) : this.get('value');
    const index = this.get('options').indexOf(value);
    this.$().val(index);
  }.on('didInsertElement')
});
