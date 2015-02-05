/* global google */
import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['id'],
  id: 'map',

  insertMap: function () {
    var mapOptions = {
      center: { lat: parseFloat(this.get('latitude')), lng: parseFloat(this.get('longitude')) },
      zoom: 14,
      mapTypeControl: false,
      streetViewControl: false,
      scrollwheel: false
    };

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var marker = new google.maps.Marker({
      map: map
    });

    marker.bindTo('position', map, 'center');

    var self = this;
    google.maps.event.addListener(map, 'center_changed', function () {
      var location = map.getCenter();
      self.set('latitude', location.lat());
      self.set('longitude', location.lng());
    });
  }.on('didInsertElement')
});
