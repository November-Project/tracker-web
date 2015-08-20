import Ember from 'ember';

export default Ember.Controller.extend({
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
    { label: '3rd to Last Week', value: -3 },
    { label: '4th to Last Week', value: -4 }
  ],

  editingWorkout: false,
  editingLocation: false,

  cleanup: function () {
    this.setProperties({
      editingWorkout: false,
      editingLocation: false
    });
  },

  savable: Ember.computed('event.title', 'event.hasDirtyAttributes', 'workout', 'location', 'event.times', {
    get: function () {
      return this.get('event.hasDirtyAttributes') &&
        Ember.isPresent(this.get('event.title')) &&
        Ember.isPresent(this.get('workout')) &&
        Ember.isPresent(this.get('location')) &&
        Ember.isPresent(this.get('event.times'));
    }
  }),

  daysOfWeek: Ember.computed.map('session.tribe.daysOfWeek', function (day) {
    const letterForDay = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const wordForDay = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    return Ember.Object.create({
      value: day,
      letter: letterForDay[day],
      word: wordForDay[day],
      checked: false
    });
  }),

  daysChanged: Ember.observer('daysOfWeek.@each.checked', function () {
    const days = this.get('daysOfWeek').filterBy('checked', true).mapBy('value');
    this.set('event.days', days);
  }),

  actions: {
    removeTime: function (index) {
      this.get('event.times').removeAt(index);
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
      this.get('event.times').addObject(time);
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
      this.get('location').save().then( () => {
        this.set('editingLocation', false);
      });
    },

    cancelLocation: function () {
      this.set('editingLocation', false);
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
