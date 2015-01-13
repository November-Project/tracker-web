import ApplicationAdaper from './application';

export default ApplicationAdaper.extend({
  pathForType: function (type) {
    var tribe = this.get('session').getTribe().get('id');
    return 'tribes/' + tribe + '/' + this._super(type);
  }
});