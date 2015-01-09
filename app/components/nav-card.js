import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['card'],

  click: function () {
    console.log(this.get('title'));
  }
});