const { UserEntity } = require("./user.entity");
const { TaskEntity } = require("./task.entity");

class ManagerEntity extends UserEntity {
  constructor(props = {}) {
    super();
    Object.assign(this, props);
    this.role = 'MANAGER';
    this._permissions = [
      'read:task',
      'delete:task'
    ];
  }

  // @Override
  // Overrides default getTasks, listing all (hiding summaryNotes...)
  getTasks() {
    return TaskEntity.findAll()
      .then(tasks => 
        tasks.map(({id, summary, date, userId, createdAt, updatedAt}) =>
          ({id, summary, date, userId, createdAt, updatedAt})));
  }
}

module.exports = { ManagerEntity }