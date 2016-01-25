import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: 'date',
  date: moment().format('YYYY-MM-DD'),

  days: Ember.computed('selected', {
    get: function () {
      const sunday = moment(this.get('date')).clone().startOf('week');
      const midWeek = sunday.clone().add(3, 'd');
      const selectedDate = this.get('selected');

      return _.range(7).map( (day) => {
        const date = sunday.clone().add(day, 'd');
        const event = this.get('model').find( (item) => {
          return item.date.format('YYYY-MM-DD') === date.format('YYYY-MM-DD');
        });

        return Ember.Object.create({
          date: date,
          event: Ember.isPresent(event) ? event.model : null,
          recurring: Ember.isPresent(event) ? event.recurring : null,
          dayOfWeek: date.format('ddd'),
          dayOfMonth: date.format('D'),
          secondary: date.format('M') !== midWeek.format('M'),
          today: date.format('L') === moment().format('L'),
          hasEvent: Ember.isPresent(event),
          selected: Ember.isPresent(selectedDate) && date.format('L') === selectedDate.format('L')
        });
      });
    }
  }),

  selected: Ember.computed('_selected', 'model', {
    get: function () {
      if (Ember.isPresent(this.get('_selected'))) { return this.get('_selected'); }

      const date = moment(this.get('date'), 'YYYY-MM-DD');

      if (this.hasEvent(date)) { return date; }

      const newDate = _.range(3).reduce( (accum, offset) => {
        if (Ember.isPresent(accum)) { return accum; }
        const day = parseInt(date.format('e'), 10);

        if (day + offset <= 6) {
          const newDate = date.clone().add(offset, 'd');
          if (this.hasEvent(newDate)) { return newDate; }
        }

        if (day - offset >= 0) {
          const newDate = date.clone().subtract(offset, 'd');
          if (this.hasEvent(newDate)) { return newDate; }
        }
      }, null);

      return Ember.isPresent(newDate) ? newDate : date;
    }
  }),

  hasEvent: function (date) {
    const event = this.get('model').find( (item) => {
      return item.date.format('YYYY-MM-DD') === date.format('YYYY-MM-DD');
    });
    return Ember.isPresent(event);
  },

  selectionChangedObserver: Ember.observer('selected', function () {
    Ember.run.once( () => {
      const selection = this.get('days').find( (item) => {
        return item.get('selected');
      });

      if (Ember.isPresent(selection)) {
        this.send('eventSelected', selection);
      }
    });
  }),

  init: function () {
    Ember.run.schedule('afterRender', this, this.selectionChangedObserver);
  },

  actions: {
    prev: function () {
      const date = this.get('date');
      const newDate = moment(date, 'YYYY-MM-DD').add(-7, 'd');
      this.set('date', newDate.format('YYYY-MM-DD'));
      this.set('_selected', null);
    },

    next: function () {
      const date = this.get('date');
      const newDate = moment(date, 'YYYY-MM-DD').add(7, 'd');
      this.set('date', newDate.format('YYYY-MM-DD'));
      this.set('_selected', null);
    },

    reset: function () {
      this.set('date', moment().format('YYYY-MM-DD'));
      this.set('_selected', null);
    },

    selected: function (selection) {
      this.set('_selected', selection.get('date'));
    }
  }
});
