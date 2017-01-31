import Ember from 'ember';
import Workout from '../objects/workout';
import Result from '../objects/result';

export default Ember.Controller.extend({
  top3: true,

  tribeEvents: Ember.computed('model.@each', function () {
    const tribes = this.store.peekAll('tribe');

    return this.model.map( (event) => {
      const participcation = event.results.length;
      const avgTime = event.results.reduce( (accum, result) => accum + result.time, 0) / participcation;
      const avgSec = avgTime % 60;
      const sorted = event.results.sortBy('time').map( (result) => Result.create(result) );

      return {
        'tribe': tribes.findBy('id', '' + event.tribeId),
        'event': event,
        'date': moment(event.date).format('MMM \'YY'),
        'avgMin': Math.floor(avgTime / 60),
        'avgSec': avgSec < 10 ? '0' + avgSec : avgSec,
        'participcation': participcation,
        'top3': sorted.slice(0, 3),
        'top3female': sorted.filterBy('user.gender', 'female').slice(0, 3),
        'workout': Workout.create(event.workout),
        'sortedResults': sorted,
        'sortedFemales': sorted.filterBy('user.gender', 'female')
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
    }, []).sortBy('result.result.time');
  }),

  sortedFemales: Ember.computed('sortedResults', function () {
    return this.get('sortedResults').filterBy('result.result.user.gender', 'female');
  }),

  displayTop: Ember.computed('top3', 'top3Female', function () {
    return this.get('top3') || this.get('top3Female');
  }),

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
