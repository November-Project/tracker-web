import Ember from 'ember';

export default Ember.Controller.extend({
  active: null,

  displayDate: Ember.computed('_date', {
    get: function () {
      return this.get('_date').format('ddd, MMM D YYYY');
    }
  }),

  displayTitle: Ember.computed('model', {
    get: function () {
      return this.get('model.displayTitle');
    }
  }),

  displayTimes: Ember.computed('model', {
    get: function () {
      return this.get('model.timesArray').map( function (time) {
        return moment(time, 'H:mm').format('h:mm A');
      }).join(', ');
    }
  }),

  mapLink: Ember.computed('model', {
    get: function () {
      const lat = this.get('model.location.latitude');
      const lng = this.get('model.location.longitude');
      return 'http://maps.google.com/?q=loc:' + lat + ',' + lng + '&z=14&t=h';
    }
  }),

  onActiveTabChange: Ember.observer('active', function () {
    const tab = this.get('active');
    Ember.$('a[data-toggle="tab"]').removeClass('active');
    Ember.$('a[href="#'+tab+'"]').addClass('active');
  }),

  _date: Ember.computed('model', 'date', {
    get: function () {
      if (Ember.isPresent(this.get('model.date'))) {
        return this.get('model.date');
      } else {
        return moment(this.get('selection'), 'YYYY-MM-DD');
      }
    }
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
        date: this.get('_date').format('YYYY-MM-DD'),
        tribe: this.get('session.tribe.id')
      }).save().then( () => {
        this.send('reloadVerbals', this.get('_date').format('YYYY-MM-DD'));
      });
    },

    changeTab: function (tab) {
      this.set('active', tab);
    }
  }
});
