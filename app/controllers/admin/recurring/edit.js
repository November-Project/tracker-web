import Ember from 'ember';
import RecurringControllerNew from './new';

export default RecurringControllerNew.extend({
  deletable: Ember.computed({
    get: function () {
      return !this.get('model.isNew');
    }
  })
});
