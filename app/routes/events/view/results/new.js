import AuthenticationRoute from '../../../authentication';

export default AuthenticationRoute.extend({
  model: function () {
    const eventId = this.modelFor('events.view').id;
    return this.store.createRecord('result', { eventId });
  },

  renderTemplate: function () {
    this.render('events.view.results.new', { into: 'application' });
  }
});
