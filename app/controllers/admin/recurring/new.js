import Ember from 'ember';
import EventsControllerNew from '../events/new';

export default EventsControllerNew.extend({
  queryParams: [],
  recurring: true,

  _weekOptions: [
    { label: 'Week', value: 0 },
    { label: 'First Week', value: 1 },
    { label: '2nd Week', value: 2 },
    { label: 'Last Week', value: -1 },
    { label: '2nd to Last Week', value: -2 }
  ],

  weekOptions: Ember.computed.map('_weekOptions', function (weekOption) {
    return Ember.Object.create({ label: weekOption.label, value: weekOption.value });
  }),

  savable: Ember.computed('event.hasDirtyAttributes', 'event.times', 'event.days', 'event.week', 'workout', 'location', function () {
    return (this.get('event.hasDirtyAttributes') &&
      Ember.isPresent(this.get('event.times')) &&
      Ember.isPresent(this.get('event.days')) &&
      Ember.isPresent(this.get('event.week'))
    ) || this.hasDirtyRelationships();
  }),

  daysOfWeek: Ember.computed('event.daysArray', {
    get: function () {
      return this.get('session.tribe.daysOfWeekArray').map( (day) => {
        const letterForDay = ['S', 'M', 'Tu', 'W', 'Th', 'F', 'S'];
        const wordForDay = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        return Ember.Object.create({
          value: day,
          letter: letterForDay[day],
          word: wordForDay[day],
          checked: this.get('event.daysArray').indexOf(day) >= 0
        });
      });
    }
  }),

  daysChanged: Ember.observer('daysOfWeek.@each.checked', function () {
    const days = this.get('daysOfWeek').filterBy('checked', true).mapBy('value');
    this.set('event.daysArray', days);
  })
});
