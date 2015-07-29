import ApplicationAdaper from './application';

export default ApplicationAdaper.extend({
  pathForType: function (type) {
    var tribe = this.get('session._tribe.id');
    return 'tribes/' + tribe + '/' + this._super(type);
  }
});
