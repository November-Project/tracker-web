import Ember from 'ember';

export default Ember.Controller.extend({
  displayDate: Ember.computed({
    get: function () {
      return this.get('model.date').format('ddd, MMM D YYYY');
    }
  }),

  displayTitle: Ember.computed({
    get: function () {
      return this.get('model.title');
    }
  }),

  displayTimes: Ember.computed({
    get: function () {
      return this.get('model.times').split(',').map( function (time) {
        return moment(time, 'H:mm').format('h:mm A');
      }).join(', ');
    }
  }),

  mapLink: Ember.computed({
    get: function () {
      const lat = this.get('model.location.latitude');
      const lng = this.get('model.location.longitude');
      return 'http://maps.google.com/?q=loc:' + lat + ',' + lng + '&z=14&t=h';
    }
  }),

  isFutureEvent: Ember.computed({
    get: function () {
      const date = this.get('model.date').format('YYYY-MM-DD');
      const futureTimes = this.get('model.timesArray').map( function (time) {
        return moment(date + ' ' + time, 'YYYY-MM-DD H:mm');
      }).find( function (dateTime) {
        return dateTime.diff(moment()) > 0;
      });
      return Ember.isPresent(futureTimes);
    }
  }),

  verbals: [],
  results: [],

  refreshVerbals: Ember.observer('model', function () {
    this.store.query('verbal', { eventId: this.get('model').id }).then( (verbals) => {
      this.set('verbals', verbals);
    });
  }),

  refreshResults: Ember.observer('model', function () {
    if (this.get('isFutureEvent')) { this.set('results', []); return; }
    this.store.query('result', { eventId: this.get('model').id }).then( (results) => {
      this.set('results', results);
    });
  }),

  actions: {
    takeBackVerbal: function (verbal) {
      verbal.destroyRecord();
    },

    giveVerbal: function () {
      const user = this.get('session.user');
      const verbal = this.store.createRecord('verbal', {
        userId: user.id,
        userName: user.get('name'),
        userPhotoUrl: user.get('photoUrl'),
        eventId: this.get('model.id')
      }).save().then( () => {
        this.get('verbals').pushObject(verbal);
      });
    },

    toggle: function (selected) {
      if (Ember.$('a[href="#'+selected+'"]').hasClass('active')) { return; }
      Ember.$('a[data-toggle="tab"]').removeClass('active');
      Ember.$('a[href="#'+selected+'"]').addClass('active');
    }
  }
});
