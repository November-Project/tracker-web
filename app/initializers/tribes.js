export default {
  name: 'tribes',
  before: 'currentUser',
  after: 'store',

  initialize: function (instance) {
    return instance.container.lookup('service:store').findAll('tribe');
  }
};
