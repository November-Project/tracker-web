/* global _ */
import Ember from 'ember';

export default Ember.Component.extend({
  photoURL: Ember.computed({
    get: function () {
      const url = _.replace(this.get('model.userPhotoUrl'), 'http://', '//');
      if (Ember.isEmpty(url)) {
        return '/images/no_profile.gif';
      } else {
        return url + '?height=100&width=100';
      }
    }
  })
});
