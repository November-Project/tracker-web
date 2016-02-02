import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    download: function () {
      const csv = this.get('model').map( (row) => {
        return '"' + row.get('name') + '"';
      }).join('\r\n');
      const csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);
      const tribeTitle = this.get('session.tribe.title').replace(/[,\.]/g, '').replace(/\s/g, '-');
      const filename = encodeURIComponent(tribeTitle + '-export') + '.csv';

      Ember.$('#export-csv').attr({
        download: filename,
        href: csvData
      });
    }
  }
});
