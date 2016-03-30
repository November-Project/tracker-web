import AuthenticationRoute from '../../authentication';
import Ember from 'ember';

export default AuthenticationRoute.extend({
  model: function () {
    let user = this.modelFor('users.user');
    debugger;
    return Ember.RSVP.hash({
      'stats': user.get('stats')
    });
  },

  afterModel: function (model) {
    console.log(model);
  }

  // setupController: function (controller, model) {
  //   this._super(controller, model);
  //   controller.set('user', this.modelFor)
  // }
});
