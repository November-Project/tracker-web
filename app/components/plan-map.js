/* global google */
import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['big-map'],
  attributeBindings: ['id'],
  id: 'map',

  insertMap: function () {
    Ember.$('#map').css('top', (Ember.$('.inputs').offset().top + 30) + 'px');

    const mapOptions = {
      center: { lat: parseFloat(this.get('latitude')), lng: parseFloat(this.get('longitude')) },
      zoom: 13,
      mapTypeControl: false,
      streetViewControl: false,
      scrollwheel: false
    };

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    this.heatmap = new google.maps.visualization.HeatmapLayer({
      data: this.get('locations'),
      radius: 30,
      opacity: 0.6,
      maxIntensity: 2
    });
    this.heatmap.setMap(this.map);
  }.on('didInsertElement'),

  locationsChanged: Ember.observer('locations', function () {
    this.heatmap.set('data', this.get('locations'));
  })
});
