const { errorResponse } = require("../helpers/error_response");
const { TaskService } = require("../services/task.service");

class TasksController {

  static async index(req, res) {
    try {
      const tasks = await TaskService.getAllTasksFor(req.tokenPayload);
      return res.status(200).json({ tasks });
    } catch (error) {
      console.error(error.message);
      errorResponse(res, 404, 'Cannot find user tasks');
    }
  }  
  
  static async create(req, res) {
    try {
      const task = await TaskService.create(req.body);
      return res.status(201).json(task);
    } catch (error) {
      console.log(error.message);
      errorResponse(res, 503, 'Not available to create a new task');
    }
  }

  static async update(req, res) {
    try {
      const task = await TaskService.update(req.body);
      return res.status(200).json(task);
    } catch (error) {
      console.log(error.message);
      errorResponse(res, 503, `Not available to update task ${req.params.id}`);
    }
  }

  static async delete(req, res) {
    try {
      await TaskService.deleteById(req.params.id);
      return res.sendStatus(204);
    } catch (error) {
      console.error(error.message);
      errorResponse(res, 404, `Task with id: ${req.params.id} could not be found`);
    }
  }
}

module.exports = { TasksController }