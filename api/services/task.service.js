const res = require('express/lib/response');
const { TaskEntity } = require('../entities/task.entity');
const { UserService } = require('./user.service');

class TaskService {
  static async getAllTasksFor({ email }) {
    const user = await UserService.findUserByEmail(email);
    return user.getTasks();
  }

  static create(taskDTO) {
    return TaskEntity.create(taskDTO);
  }

  static async update(taskDTO) {
    const task = await this.findById(taskDTO.id);
    return task.update(taskDTO);
  }

  static async deleteById(id) {
    const taskEntity = await this.findById(id);
    this.destroy(taskEntity);
  }

  static findById(id) {
    return TaskEntity.findByPk(id);
  }

  static destroy(taskEntity) {
    if (taskEntity == undefined) {
      throw new Error('There is not a task to delete');
    }

    taskEntity.destroy();
  }
}

module.exports = { TaskService }