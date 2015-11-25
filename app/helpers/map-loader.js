import Ember from 'ember';

export default {
  loadMapAPI: function () {
    return new Ember.RSVP.Promise( function (resolve, reject) {
      if (!window.google) {
        window.mapAPILoaded = Ember.run.bind(resolve);
        Ember.$.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCYKDmsSlu_GNmW5OHDv_R8VZzhQpHEW9E&libraries=visualization&sensor=false&callback=mapAPILoaded').fail(reject);
      } else {
        resolve();
      }
    });
  }
}
