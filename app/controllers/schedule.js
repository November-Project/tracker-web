import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['locations'],

  propertiesChanged: function () {
    this.set('savable', (this.get('model._data.location') !== parseInt(this.get('model').get('location').id) || this.get('isDirty')) &&
      this.get('model').get('location') !== null &&
      this.get('time') !== null &&
      !this.get('errors.time'));
  }.observes('location', 'time'),

  timeChanged: function () {
    if (this.get('time') === "") {
      this.set('time', null);
    }

    if (this.get('time') !== null && !moment(this.get('time'), ['h:mA', 'h:m A'], true).isValid()) {
      this.set('errors.time', true);
    } else {
      this.set('errors.time', false);
    }

  }.observes('time'),

  actions: {
    save: function () {
      var self = this;
      this.get('model').save().then( function () {
        self.set('savable', false);
      }, function (err) {
        console.log(err);
      });
    }
  }
});
