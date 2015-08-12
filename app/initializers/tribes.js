export default {
  name: 'tribes',
  before: 'currentUser',
  after: 'store',

  initialize: function (container) {
    return container.lookup('service:store').findAll('tribe');
  }
};
