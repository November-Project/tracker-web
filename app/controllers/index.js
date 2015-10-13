import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['date'],
  date: null,

  isEventPresent: Ember.computed('model', {
    get: function () {
      return Ember.isPresent(this.get('model'));
    }
  }),

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

  showVerbals: Ember.computed({
    get: function () {
      const date = this.get('model.date').format('YYYY-MM-DD');
      return Ember.isPresent(this.get('model.times').split(',').map( function (time) {
        return moment(date + ' ' + time, 'YYYY-MM-DD H:mm');
      }).find( function (dateTime) {
        return dateTime.diff(moment()) > 0;
      }));
    }
  }),

  refreshVerbals: Ember.observer('model', function () {
    if (!this.get('isEventPresent')) { return; }
    this.store.query('verbal', { eventId: this.get('model').id }).then( (verbals) => {
      this.set('verbals', verbals);
    });
  }),

  actions: {
    eventSelected: function (event, date) {
      if (this.get('date') === date && Ember.isPresent(this.get('event')) && Ember.isEmpty(event)) { return; }
      this.set('date', date);
      this.set('model', event);
    },

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
