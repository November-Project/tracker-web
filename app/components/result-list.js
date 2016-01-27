import Ember from 'ember';

export default Ember.Component.extend({
  multiTime: Ember.computed('times', {
    get: function () {
      return this.get('times').length > 1;
    }
  }),

  selectedTime: Ember.computed('_selectedTime', {
    get: function () {
      const _selectedTime = this.get('_selectedTime');
      if (Ember.isEmpty(_selectedTime)) {
        return this.get('times')[0];
      } else {
        return _selectedTime;
      }
    }
  }),

  filteredResults: Ember.computed('selectedTime', 'results', {
    get: function () {
      const selectedTime = this.get('selectedTime');
      return this.get('results').filterBy('eventTime', selectedTime).sort( (x, y) => {
        const xreps = x.get('reps');
        const yreps = y.get('reps');

        if (xreps === yreps) {
          const xtime = x.get('time');
          const ytime = y.get('time');

          if (xtime === 0) return 1;
          if (ytime === 0) return -1;
          if (xtime === ytime) return 0;
          return xtime > ytime ? 1 : -1;
        } else {
          return xreps < yreps ? 1 : -1;
        }
      });
    }
  }),

  submittedResult: Ember.computed('filteredResults', {
    get: function () {
      const currentUserId = parseInt(this.get('currentUser.id'), 10);
      return this.get('filteredResults').filterBy('userId', currentUserId).objectAt(0);
    }
  }),

  userHasSubmitted: Ember.computed('submittedResult', {
    get: function () {
      return Ember.isPresent(this.get('submittedResult'));
    }
  }),

  timeObserver: Ember.observer('selectedTime', function () {
    const time = this.get('selectedTime');
    Ember.$('button[data-time]').removeClass('active');
    Ember.$('button[data-time="'+time+'"]').addClass('active');
  }),

  actions: {
    changeTime: function (time) {
      this.set('_selectedTime', time);
    },

    newResult: function (time) {
      this.sendAction('newResult', time);
    }
  }
});
