const { UserEntity } = require("./user.entity");

class TechnicianEntity extends UserEntity {
  constructor(props = {}) {
    super();
    Object.assign(this, props);
    this.role = 'TECHNICIAN';
    this._permissions = [
      'read:task',
      'create:task',
      'update:task'
    ];
  }
}

module.exports = { TechnicianEntity }