import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['date'],
  date: null,

  recurring: false,
  deletable: false,
  event: Ember.computed.alias('model'),
  workout: Ember.computed.alias('model.workout'),
  location: Ember.computed.alias('model.location'),

  workouts: Ember.computed('workouts', {
    get: function () {
      return this.store.peekAll('workout');
    }
  }),

  locations: Ember.computed('locations', {
    get: function () {
      return this.store.peekAll('location');
    }
  }),

  editingWorkout: false,
  editingLocation: false,

  cleanup: function () {
    const event = this.get('event');
    if (Ember.isPresent(event)) {
      event.unloadRecord();
    }

    this.setProperties({
      editingWorkout: false,
      editingLocation: false,
      error_message: null
    });
  },

  savable: Ember.computed('event.hasDirtyAttributes', 'event.times', 'workout', 'location', function () {
    return (this.get('event.hasDirtyAttributes') || this.hasDirtyRelationships()) &&
      Ember.isPresent(this.get('event.times'));
  }),

  hasDirtyRelationships: function () {
    return this.get('event._internalModel._relationships.initializedRelationships.workout.canonicalState.id') !== this.get('workout.id') ||
      this.get('event._internalModel._relationships.initializedRelationships.location.canonicalState.id') !== this.get('location.id');
  },

  actions: {
    removeTime: function (index) {
      const times = this.get('event.timesArray').removeAt(index);
      this.set('event.timesArray', times);
    },

    validateTime: function (newValue, callback) {
      const isValid = moment(newValue, ['h:mma', 'h:mm a', 'H:mm'], true).isValid();
      if (!isValid && newValue !== '') {
        Ember.$('#times').parent().addClass('has-error');
      } else {
        Ember.$('#times').parent().removeClass('has-error');
      }
      if (isValid && callback) { callback(); }
    },

    addTime: function (newTime) {
      const military = moment(newTime, ['H:mm'], true);
      const twelveHour = moment(newTime, ['h:mma', 'h:mm a'], true);
      const time = military.isValid() ? military.format('H:mm') : twelveHour.format('h:mm A');
      const times = this.get('event.timesArray').addObject(time);
      this.set('event.timesArray', times);
    },

    editWorkout: function () {
      if (!this.get('workout')) { return; }
      this.set('editingWorkout', true);
    },

    saveWorkout: function () {
      this.get('workout').save().then( () => {
        this.set('editingWorkout', false);
      });
    },

    cancelWorkout: function () {
      this.set('editingWorkout', false);
      const workout = this.get('workout');
      if (workout.get('isNew')) {
        workout.deleteRecord();
      } else {
        workout.rollbackAttributes();
      }
    },

    newWorkout: function () {
      const tribe = this.get('session.tribe');
      const newWorkout = this.store.createRecord('workout', { tribe });
      Ember.run.next(() => {
        this.set('workout', newWorkout);
        this.set('editingWorkout', true);
      });
    },

    editLocation: function () {
      if (!this.get('location')) { return; }
      this.set('editingLocation', true);
    },

    saveLocation: function () {
      var location = this.get('location');
      location.set('latitude', location.get('latitude').toFixed(6));
      location.set('longitude', location.get('longitude').toFixed(6));

      location.save().then( () => {
        this.set('editingLocation', false);
      });
    },

    cancelLocation: function () {
      this.set('editingLocation', false);
      const location = this.get('location');
      if (location.get('isNew')) {
        location.deleteRecord();
      } else {
        location.rollbackAttributes();
      }
    },

    newLocation: function () {
      const tribe = this.get('session.tribe');
      const { longitude, latitude } = tribe.getProperties('longitude', 'latitude');
      const newLocation = this.store.createRecord('location', { tribe, longitude, latitude });
      Ember.run.next(() => {
        this.set('location', newLocation);
        this.set('editingLocation', true);
      });
    }
  }
});
