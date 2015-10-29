import NewResultsRoute from './new';

export default NewResultsRoute.extend({
  renderTemplate: function () {
    this.render('events.view.results.edit', { into: 'application' });
  }
});
