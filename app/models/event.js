import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr(),
  times: DS.attr(),
  recurring: DS.attr('boolean'),
  inverseRecurring: DS.attr('boolean'),
  week: DS.attr('number'),
  days: DS.attr(),
  recurringEvent: DS.belongsTo('event'),
  tribe: DS.belongsTo('tribe'),
  location: DS.belongsTo('location'),
  workout: DS.belongsTo('workout'),

  title: function () {
    if (arguments.length > 1) {}

    if (this.get('workout')) { return this.get('workout').get('title'); }
    if (this.get('location')) { return this.get('location').get('title'); }
    return '';
  }.property('workout', 'location')
});
