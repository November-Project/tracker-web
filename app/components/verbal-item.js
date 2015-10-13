import Ember from 'ember';

export default Ember.Component.extend({
  photoURL: Ember.computed({
    get: function () {
      var url = this.get('model.userPhotoUrl');
      if (Ember.isEmpty(url)) {
        return '/images/no_profile.gif';
      } else {
        return url + '?height=100&width=100';
      }
    }
  })
});
