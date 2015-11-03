import DS from 'ember-data';
import TimeModel from './time-model';

export default TimeModel.extend({
  userId: DS.attr('number'),
  userName: DS.attr('string'),
  userPhotoUrl: DS.attr('string'),
  event: DS.belongsTo('event', { async: true }),
  eventTime: DS.attr('string'),
  reps: DS.attr('number', { defaultValue: 0 }),
  pr: DS.attr('boolean')
});
