import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['week-calendar'],

  displayMonth: Ember.computed('currentDate', {
    get: function () {
      return this.get('currentDate').clone().startOf('week').add(3, 'd').format('MMMM');
    }
  }),

  displayYear: Ember.computed('currentDate', {
    get: function () {
      return this.get('currentDate').clone().startOf('week').add(3, 'd').format('YYYY');
    }
  }),

  currentDate: Ember.computed('date', {
    get: function () {
      return moment(this.get('date'), 'YYYY-MM-DD');
    }
  }),

  actions: {
    prev: function () {
      this.sendAction('prev');
    },

    next: function () {
      this.sendAction('next');
    },

    reset: function () {
      this.sendAction('reset');
    },

    selected: function (day) {
      this.sendAction('selected', day);
    }
  }
});
