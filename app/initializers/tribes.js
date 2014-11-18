export default {
  name: 'tribes',
  after: 'store',

  initialize: function (container) {
    return container.lookup('store:main').find('tribe');
  }
};