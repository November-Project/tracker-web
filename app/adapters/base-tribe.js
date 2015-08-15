import ApplicationAdaper from './application';

export default ApplicationAdaper.extend({
  pathForType: function (type) {
    const tribe = this.get('session._tribe.id');
    return 'tribes/' + tribe + '/' + this._super(type);
  }
});
