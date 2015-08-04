import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr(),
  times: DS.attr({ defaultValue: [] }),
  recurring: DS.attr('boolean', { defaultValue: false }),
  week: DS.attr('number', { defaultValue: 0 }),
  days: DS.attr({ defaultValue: [] }),
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
