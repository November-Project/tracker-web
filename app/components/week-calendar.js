import Ember from 'ember';
import _ from 'lodash';

export default Ember.Component.extend({
  classNames: ['week-calendar'],

  _weekOffset: 0,

  displayMonth: Ember.computed('_weekOffset', {
    get: function () {
      return this.get('weekDays').filterBy('secondary', false).objectAt(0).get('month');
    }
  }),

  displayYear: Ember.computed('_weekOffset', {
    get: function () {
      return this.get('weekDays').filterBy('secondary', false).objectAt(0).get('year');
    }
  }),

  currentDate: Ember.computed('_weekOffset', {
    get: function () {
      const offset = this.get('_weekOffset');
      return moment().add(offset, 'w');
    }
  }),

  calculateSecondaries: function (values) {
    const justMonths = values.mapBy('month');
    if (justMonths.length <= 1) { return values; }

    const counts = _.countBy(justMonths);
    return values.map( function (value) {
      if (counts[value.get('month')] < 4) {
        value.set('secondary', true);
      }
      return value;
    });
  },

  weekDays: Ember.computed('currentDate', 'selected', 'validDays', {
    get: function () {
      const currentSunday = this.get('currentDate').startOf('week');
      const validDays = this.get('validDays');
      debugger;
      const selectedDate = this.get('selected');

      return this.calculateSecondaries(_.range(7).map( (day) => {
        const date = currentSunday.clone().add(day, 'd');

        return Ember.Object.create({
          date: date,
          dayOfWeek: date.format('ddd'),
          dayOfMonth: date.format('D'),
          month: date.format('MMMM'),
          year: date.format('YYYY'),
          secondary: false,
          today: date.format('L') === moment().format('L'),
          hasEvent: _.contains(validDays, day),
          selected: date.format('L') === selectedDate.format('L')
        });
      }));
    }
  }),

  deb: function () {
    debugger;
  }.on('didRender'),

  selected: Ember.computed('_selected', 'validDays', {
    get: function () {
      if (!Ember.isPresent(this.get('_selected'))) {
        const defaultDay = moment();
        const day = parseInt(defaultDay.format('e'), 10);
        const validDays = this.get('validDays');

        if (!_.contains(validDays, day)) {
          if (day > validDays[validDays.length - 1]) {
            const diff = validDays[validDays.length - 1] - day;
            defaultDay.add(diff, 'd');
          } else if (day < validDays[0]) {
            const diff = validDays[0] - day;
            defaultDay.add(diff, 'd');
          } else {
            var nextDay = parseInt(defaultDay.format('e'), 10);
            do {
              nextDay++;
            } while (!_.contains(validDays, nextDay) && nextDay < 6);
            if (_.contains(validDays, nextDay)) {
              defaultDay.add(nextDay - day);
            }
          }
        }
        return defaultDay;
      }
      return this.get('_selected');
    }
  }),

  events: [],

  initialSetup: function () {
    this.updateEvents();
  }.on('didInitAttrs'),

  updateEvents: function () {
    const currentDate = this.get('currentDate');
    const startDate = currentDate.clone().startOf('week').format('YYYY-MM-DD');
    const endDate = currentDate.clone().endOf('week').format('YYYY-MM-DD');

    Ember.$('#events-loading').show();
    this.sendAction('getEvents', startDate, endDate, (events) => {
      Ember.$('#events-loading').hide();
      this.set('events', events);
    });
  },

  onWeekChange: Ember.observer('currentDate', function () {
    this.updateEvents();
  }),

  validDays: Ember.computed('events', {
    get: function () {
      return this.get('events').map( (event) => {
        return parseInt(event.get('date').format('e'), 10);
      });
    }
  }),

  actions: {
    prev: function () {
      const offset = this.get('_weekOffset');
      this.set('_weekOffset', offset - 1);
    },

    next: function () {
      const offset = this.get('_weekOffset');
      this.set('_weekOffset', offset + 1);
    },

    reset: function () {
      this.set('_weekOffset', 0);
    },

    selected: function (date) {
      this.set('_selected', date);
    }
  }
});
