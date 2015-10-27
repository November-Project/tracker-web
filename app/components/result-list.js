import Ember from 'ember';

export default Ember.Component.extend({
  resultTimes: Ember.computed('results', 'times', {
    get: function () {
      return this.get('times').map( (time) => {
        const result = this.get('results').find( (result) => {
          return result.get('userId') === parseInt(this.get('currentUser.id'), 10)
            && result.get('eventTime') === time;
        });

        return Ember.Object.create({
          model: result,
          submitted: Ember.isPresent(result),
          time: time
        });
      });
    }
  }),

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

  filteredResults: Ember.computed('selectedTime', {
    get: function () {
      const selectedTime = this.get('selectedTime');
      return this.get('results').filterBy('eventTime', selectedTime);
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
    }
  }
});
