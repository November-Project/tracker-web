import Ember from 'ember';
import Workout from '../objects/workout';
import Result from '../objects/result';

export default Ember.Controller.extend({
  top3: true,

  tribeEvents: Ember.computed('model.@each', function () {
    const tribes = this.store.peekAll('tribe');

    return this.model.map( (event) => {
      const participcation = event.results.length;
      const participantsWithTime = event.results.filter( result => result.time !== 0 )
      const avgTime = Math.round(participantsWithTime.reduce( (accum, result) => accum + result.time, 0) / participantsWithTime.length);
      const avgSec = avgTime % 60;
      const sorted = event.results.sort(this.resultSort).map( (result) => Result.create(result) );

      return {
        'tribe': tribes.findBy('id', '' + event.tribeId),
        'event': event,
        'date': moment(event.date).format('MMM \'YY'),
        'avgMin': Math.floor(avgTime / 60),
        'avgSec': avgSec < 10 ? '0' + avgSec : avgSec,
        'avgTime': avgTime,
        'participcation': participcation,
        'top3': sorted.slice(0, 3),
        'top3female': sorted.filterBy('userGender', 'female').slice(0, 3),
        'workout': Workout.create(event.workout)
      };
    }).sortBy('avgTime');
  }),

  sortedResults: Ember.computed('model.@each', function () {
    return this.model.reduce( (accum, event) => {
      return accum.pushObjects(event.results.map((result) => {
        return {
          'result': Result.create(result),
          'workout': Workout.create(event.workout)
        };
      }));
    }, []).sort(this.resultSort);
  }),

  sortedFemales: Ember.computed('sortedResults', function () {
    return this.get('sortedResults').filterBy('result.userGender', 'female');
  }),

  displayTop: Ember.computed('top3', 'top3Female', function () {
    return this.get('top3') || this.get('top3Female');
  }),

  resultSort: function (lhs, rhs) {
    if (lhs.time === rhs.time) { return 0; }
    if (lhs.time === 0) { return -1; }
    if (rhs.time === 0) { return 1; }
    return lhs.time > rhs.time ? 1 : -1;
  },

  actions: {
    setFilter: function (filter) {
      this.set('top3', false);
      this.set('top3Female', false);
      this.set('overall', false);
      this.set('overallFemale', false);
      this.set(filter, true);
    }
  }
});
