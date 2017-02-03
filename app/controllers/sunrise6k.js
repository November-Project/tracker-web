/* global _ */
import Ember from 'ember';
import Workout from '../objects/workout';
import Result from '../objects/result';

export default Ember.Controller.extend({
  top3: true,

  tribeEvents: Ember.computed('model.@each', function () {
    const tribes = this.store.peekAll('tribe');

    return this.model.map( (event) => {
      const participcation = event.results.length;
      const participantsWithTime = event.results.filter( result => result.time !== 0 );
      const avgTime = Math.round(participantsWithTime.reduce( (accum, result) => accum + result.time, 0) / participantsWithTime.length);
      const avgSec = avgTime % 60;
      const sorted = participantsWithTime.map( (result) => Result.create(result) ).sortBy('time');
      const sortedAll = _.concat(sorted, event.results.filterBy('time', 0));

      sorted.sort( (lhs, rhs) => {
        if (lhs.time === 0) { return -1; }
        if (rhs.time === 0) { return 1; }
        if (lhs.time === rhs.time) { return 0; }
        return lhs.time > rhs.time ? 1 : -1;
      });

      return {
        'tribe': tribes.findBy('id', '' + event.tribeId),
        'event': event,
        'date': moment(event.date).format('MMM \'YY'),
        'avgMin': Math.floor(avgTime / 60),
        'avgSec': avgSec < 10 ? '0' + avgSec : avgSec,
        'avgTime': avgTime,
        'participcation': participcation,
        'top3': sortedAll.slice(0, 3),
        'top3female': sortedAll.filterBy('userGender', 'female').slice(0, 3),
        'workout': Workout.create(event.workout)
      };
    }).sortBy('avgTime');
  }),

  sortedResults: Ember.computed('model.@each', function () {
    const results = this.model.reduce( (accum, event) => {
      return _.concat(accum , event.results.map( (result) => {
        return {
          'result': Result.create(result),
          'workout': Workout.create(event.workout)
        };
      }));
    }, []);

    const sorted = results.filter( x => x.result.time !== 0 ).sortBy('result.time');
    return _.concat(sorted, results.filterBy('result.time', 0));
  }),

  sortedFemales: Ember.computed('sortedResults', function () {
    return this.get('sortedResults').filterBy('result.userGender', 'female');
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
