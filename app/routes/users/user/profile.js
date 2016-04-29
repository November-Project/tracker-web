import Ember from 'ember';
import AuthenticationRoute from '../../authentication';

export default AuthenticationRoute.extend({
  model: function () {
    let user = this.modelFor('users.user');
    return Ember.RSVP.hash({
      "stats": this.client.getUserStats(user),
      "prs": this.client.getUserPrs(user)
    });
  }
});
