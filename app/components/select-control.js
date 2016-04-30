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
      if (Ember.isEmpty(options)) { return; }
      if (Ember.isNone(this.get('value'))) { return; }

      const valueKey = this.get('optionValuePath');
      var index = -1;

      if (valueKey) {
        const value = options.findBy(valueKey, this.get('value'));
        index = options.indexOf(value);
      } else {
        options.find( (item, idx) => {
          if (item === this.get('value') || item === this.get('value').content) {
            index = idx;
            return true;
          } else {
            return false;
          }
        });
      }

      if (index >= 0) { this.$().val(index); }
    });
  }
});
