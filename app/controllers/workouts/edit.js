import Ember from 'ember';

export default Ember.ObjectController.extend({
  savable: function () {
    return this.get('isDirty') && this.get('title') !== "" && this.get('title') !== undefined;
  }.property('title', 'isDirty'),

  actions: {
    save: function () {
      var self = this;
      this.get('model').save().then( function () {
        self.replaceRoute('workouts.index');
      }, function (err) {
        console.log(err);
      });
    }
  }
});
