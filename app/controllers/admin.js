import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    setActive: function (route) {
      this.get('model').setEach('selected', false);
      const item = this.get('model').find( function (item) {
        return route.startsWith(item.get('route'));
      });
      if (item) { item.set('selected', true); }
    }
  }
});
