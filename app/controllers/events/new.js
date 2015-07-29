import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['locations', 'workouts'],

  event: Ember.computed.alias('model.event'),
  workouts: Ember.computed.alias('model.workouts'),
  workout: Ember.computed.alias('model.event.workout'),
  locations: Ember.computed.alias('model.locations'),
  location: Ember.computed.alias('model.event.location'),

  weekOptions: [
    { label: 'Week', value: 0 },
    { label: 'First Week', value: 1 },
    { label: '2nd Week', value: 2 },
    { label: '3rd Week', value: 3 },
    { label: '4th Week', value: 4 },
    { label: 'Last Week', value: -1 },
    { label: '2nd to Last Week', value: -2 },
    { label: '3nd to Last Week', value: -3 },
    { label: '4nd to Last Week', value: -4 }
  ],

  editingWorkout: false,
  editingLocation: false,

  cleanup: function () {
    this.setProperties({
      editingWorkout: false,
      editingLocation: false
    });
  },

  daysOfWeek: Ember.computed.map('session._tribe.daysOfWeek', function (day) {
    const letterForDay = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const wordForDay = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    return Ember.Object.create({
      value: day,
      letter: letterForDay[day],
      word: wordForDay[day],
      checked: false
    });
  }),

  daysChanged: function () {
    const days = this.get('daysOfWeek').filterBy('checked', true).mapBy('value');
    this.set('event.days', days);
  }.observes('daysOfWeek.@each.checked'),

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
      const tribe = this.get('session._tribe');
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
      const tribe = this.get('session._tribe');
      const { longitude, latitude } = tribe.getProperties('longitude', 'latitude');
      const newLocation = this.store.createRecord('location', { tribe, longitude, latitude });
      Ember.run.next(() => {
        this.set('location', newLocation);
        this.set('editingLocation', true);
      });
    }
  }
});
