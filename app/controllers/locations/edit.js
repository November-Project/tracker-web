import Ember from 'ember';

export default Ember.ObjectController.extend({
  savable: function () {
    return this.get('isDirty') && this.get('title') !== "" && this.get('title') !== undefined;
  }.property('title', 'latitude'),

  actions: {
    save: function () {
      var model = this.get('model');
      model.set('latitude', model.get('latitude').toFixed(6));
      model.set('longitude', model.get('longitude').toFixed(6));

      var self = this;
      model.save().then( function () {
        self.transitionToRoute('locations.index');
      }, function (err) {
        console.log(err);
      });
    }
  }
});
