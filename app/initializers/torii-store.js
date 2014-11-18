export default {
  name: 'torii-store',
  after: 'store',

  initialize: function (container, app) {
    app.inject('torii-adapter', 'store', 'store:main');
  }
};