import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['tribes'],

  validate: function () {
    var errors = {};

    errors.tribe = this.get('tribe') == null;
    errors.terms = this.get('acceptedTerms') === false;

    this.set('error', errors);
  },

  actions: {
    submitTerms: function () {
      this.validate();

      var errors = this.get('error');
      var hasError = Object.keys(errors).reduce( function (accum, item) {
        return accum || errors[item];
      }, false);

      if (!hasError) {
        var self = this;
        var btn = Ember.$('button');

        btn.button('loading');
        this.model.save().then( function () {
          self.transitionToRoute('index');
        }).finally( function () { btn.button('reset'); });
      }
    }
  }
});