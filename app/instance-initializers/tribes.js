export function initialize (instance) {
  return instance.container.lookup('service:store').findAll('tribe');
}

export default {
  name: 'tribes',
  before: 'currentUser',
  initialize: initialize
};
