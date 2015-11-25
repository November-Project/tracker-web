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

  didInsertElement: function () {
    Ember.run.scheduleOnce('afterRender', () => {
      const options = this.get('options');
      if (Ember.isPresent(options)) {
        const valueKey = this.get('optionValuePath');
        const value = valueKey ? options.findBy(valueKey, this.get('value')) : this.get('value');
        const index = options.indexOf(value);
        if (index >= 0) { this.$().val(index); }
      }
    });
  }
});
