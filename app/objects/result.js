import Ember from 'ember';
import TimeObject from './time';

export default TimeObject.extend({
  userId: Ember.computed('user.id', function () {
    return this.get('user.id');
  }),

  userName: Ember.computed('user.name', function () {
    return this.get('user.name');
  }),

  userPhotoUrl: Ember.computed('user.photoUrl', function () {
    return this.get('user.photoUrl');
  })
});
