import Session from '../models/session';

export function initialize (instance) {
  var store = instance.container.lookup('service:store');

  Session.reopen({
    store: store
  });
}

export default {
  name: 'session',
  before: 'currentUser',
  initialize: initialize
};
