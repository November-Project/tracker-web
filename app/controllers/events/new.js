import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['locations', 'workouts'],

  workouts: Ember.computed.alias('model.workouts'),
  workout: Ember.computed.alias('model.event.workout'),
  locations: Ember.computed.alias('model.locations'),
  location: Ember.computed.alias('model.event.location'),

  editingWorkout: false,
  editingLocation: false,

  cleanup: function () {
    this.setProperties({
      editingWorkout: false,
      editingLocation: false
    });
  },

  actions: {
    editWorkout: function () {
      this.set('editingWorkout', true);
    },

    saveWorkout: function () {
      console.log('saved');
      this.get('workout').save().then(() => {
        this.set('editingWorkout', false);
      });
    },

    cancelWorkout: function () {
      this.set('editingWorkout', false);
    },

    newWorkout: function () {
      const tribe = this.get('session').getTribe();
      const newWorkout = this.store.createRecord('workout', { tribe });
      Ember.run.next(() => {
        this.set('workout', newWorkout);
        this.set('editingWorkout', true);
      });
    },

    editLocation: function () {
      this.set('editingLocation', true);
    },

    saveLocation: function () {
      console.log('saved');
      this.set('editingLocation', false);
    },

    cancelLocation: function () {
      this.set('editingLocation', false);
    },

    newLocation: function () {
      const tribe = this.get('session').getTribe();
      const { longitude, latitude } = tribe.getProperties('longitude', 'latitude');
      const newLocation = this.store.createRecord('location', { tribe, longitude, latitude });
      Ember.run.next(() => {
        this.set('location', newLocation);
        this.set('editingLocation', true);
      });
    }
  }
});
