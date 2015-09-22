import DS from 'ember-data';

export default DS.Model.export({
  userId: DS.attr('number'),
  userName: DS.attr('string'),
  reps: DS.attr('number'),
  time: DS.attr('number'),
  pr: DS.attr('boolean'),
  eventTime: DS.attr('string')
});
