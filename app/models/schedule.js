import DS from 'ember-data';

export default DS.Model.extend({
  time: DS.attr('string'),
  dayOfWeek: DS.attr('number'),
  tribe: DS.belongsTo('tribe'),
  location: DS.belongsTo('location'),

  displayDay: function () {
    switch (this.get('dayOfWeek')) {
      case 0: return 'Sun';
      case 1: return 'Mon';
      case 2: return 'Tue';
      case 3: return 'Wed';
      case 4: return 'Thu';
      case 5: return 'Fri';
      case 6: return 'Sat';
    }
  }.property()
});