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

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var marker = new google.maps.Marker({
      map: this.map
    });

    marker.bindTo('position', this.map, 'center');

    google.maps.event.addListener(this.map, 'center_changed', () => {
      var location = this.map.getCenter();
      this.set('latitude', location.lat());
      this.set('longitude', location.lng());
    });
  }.on('didInsertElement'),

  positionChanged: function () {
    var latLng = new google.maps.LatLng(parseFloat(this.get('latitude')), parseFloat(this.get('longitude')));
    this.map.setCenter(latLng);
  }.observes('latitude', 'longitude')
});
