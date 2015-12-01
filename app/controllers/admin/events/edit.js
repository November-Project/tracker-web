import EventsControllerNew from './new';

export default EventsControllerNew.extend({
  deletable: Ember.computed({
    get: function () {
      return !this.get('model.isNew');
    }
  })
});
