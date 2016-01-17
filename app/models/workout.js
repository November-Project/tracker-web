import DS from 'ember-data';
import TimeModel from './time-model';

export default TimeModel.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  reps: DS.attr('number', { defaultValue: 0 }),
  standard: DS.attr('boolean', { defaultValue: false }),
  allowUserReps: DS.attr('boolean', { defaultValue: false }),
  allowUserTime: DS.attr('boolean', { defaultValue: false }),
  allowUserPR: DS.attr('boolean', { defaultValue: false }),
  tribe: DS.belongsTo('tribe')
});
