import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    setActive: function (route) {
      this.get('model').setEach('selected', false);
      const item = this.get('model').findBy('route', route.split('.')[0]);
      if (item) { item.set('selected', true); }
    }
  }
});
