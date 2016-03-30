import Ember from 'ember';

export default Ember.Controller.extend({
  photoURL: Ember.computed({
    get: function () {
      const url = this.get('model.photoURL');
      if (Ember.isEmpty(url)) {
        return '/images/no_profile.gif';
      } else {
        return url.replace('http://', '//') + '?height=200&width=200';
      }
    }
  }),

  hasSocial: Ember.computed({
    get: function () {
      return this.get('model.facebookId');
    }
  })
});
