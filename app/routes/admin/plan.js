import AdministrationRoute from '../administration';
import MapLoader from '../../helpers/map-loader';

export default AdministrationRoute.extend({
  model: function () {
    const start_date = moment().subtract(1, 'year').format('YYYY-MM-DD');
    const end_date = moment().format('YYYY-MM-DD');
    return this.store.query('event', { start_date, end_date });
  },

  afterModel: function () {
    return MapLoader.loadMapAPI();
  }
});
