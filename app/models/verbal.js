import DS from 'ember-data';

export default DS.Model.extend({
  userId: DS.attr('number'),
  userName: DS.attr('string'),
  userPhotoUrl: DS.attr('string'),
  eventId: DS.attr('number')
});
