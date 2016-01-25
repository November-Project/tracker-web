/* global _ */
import Ember from 'ember';
import AuthenticationRoute from './authentication';
import RecurringEvents from '../helpers/recurring-events';

export default AuthenticationRoute.extend({
  queryParams: {
    date: {
      refreshModel: true
    }
  },

  model: function (params) {
    var date = moment(params.date, 'YYYY-MM-DD');
    if (!date.isValid()) { date = moment(); }
    const start_date = date.clone().startOf('week').format('YYYY-MM-DD');
    const end_date = date.clone().endOf('week').format('YYYY-MM-DD');

    //return this.get('store').query('event', { start_date, end_date });

    return Ember.RSVP.hash({
      events: this.get('store').query('event', { start_date, end_date }),
      recurring: this.get('store').findAll('recurring')
    }).then( (hash) => {
      var events = hash.events.map( (event) => {
        return {
          model: event,
          date: event.get('date')
        };
      });

      // create all recurring events between start_date and end_date that are also in the future
      let takenDates = hash.events.map( (event) => { return event.get('date').format('YYYY-MM-DD'); });
      let recurrings = _.sortBy(hash.recurring.toArray(), (recurring) => {
        return -1 * Math.abs(recurring.get('week'));
      }).reduce( (accum, recurring) => {
        const rs = RecurringEvents.eventsFromRecurring(recurring, start_date, end_date, takenDates);
        const rss = _.uniqBy(rs, 'model_date').map( (item) => {
          item.date = moment(item.model_date, 'YYYY-MM-DD');
          return item;
        });
        return accum.pushObjects(rss);
      }, []);

      return events.pushObjects(recurrings);
    });
  },

  actions: {
    eventSelected: function (selection) {
      Ember.run.next(this, function () {
        if (Ember.isPresent(selection.event)) {
          this.transitionTo('events.view', selection.event);
        } else if (Ember.isPresent(selection.recurring)) {
          this.transitionTo('events.recurring', selection.recurring,
            { queryParams: { selection: selection.date.format('YYYY-MM-DD') } });
        } else {
          this.transitionTo('events.no_event').then( () => {
            const controller = this.controllerFor('events.no_event');
            if (Ember.isPresent(controller)) {
              controller.set('date', selection.date);
            }
          });
        }
      });
    }
  }
});
