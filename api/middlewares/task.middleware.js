const { errorResponse } = require("../helpers/error_response");
const { UserService } = require("../services/user.service");

class TaskMiddleware {

  static async index(req, res, next) {
    const user = await UserService.findUserByEmail(req.tokenPayload.email);

    if(user.hasPermissionFor('read:task')) {
      next();
    } else {
      errorResponse(res, 403, 'You are not allowed for reading tasks');
    }
  }

  static async create(req, res, next) {
    const user = await UserService.findUserByEmail(req.tokenPayload.email);
    req.body.userId = user.id;
    req.body.id = req.params.id;

    if (user.hasPermissionFor('create:task')) {
      next();
    } else {
      errorResponse(res, 403, 'You are not allowed for creating tasks');
    }
  }

  static async update(req, res, next) {
    const user = await UserService.findUserByEmail(req.tokenPayload.email);
    req.body.userId = user.id;
    
    if (user.hasPermissionFor('update:task') && req.body.userId === user.id) {
      next();
    } else {
      errorResponse(res, 403, 'You are not allowed for updating tasks');
    }
  }

  static async delete(req, res, next) {
    const user = await UserService.findUserByEmail(req.tokenPayload.email);

    if(user.hasPermissionFor('delete:task')) {
      next();
    } else {
      errorResponse(res, 403, 'You are not allowed for deleting tasks');
    }
  }
}

module.exports = { TaskMiddleware }