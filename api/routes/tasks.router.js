const express = require('express');
const router = express.Router();

const { validate } = require('../validators');
const { checkSchema } = require('express-validator');
const { taskSchema } = require('../validators/task.schema');

const { AuthMiddleware } = require('../middlewares/auth.middleware');
const { TaskMiddleware } = require('../middlewares/task.middleware');

const { TasksController } = require('../controllers/tasks.controller');

// Apply general middlewares to validate provided token
router.use(
  AuthMiddleware.verifyToken,
  AuthMiddleware.decodeToken
);

router.get('/', TaskMiddleware.index, TasksController.index);
router.post('/', validate(checkSchema(taskSchema)), TaskMiddleware.create, TasksController.create);
router.put('/:id', validate(checkSchema(taskSchema)), TaskMiddleware.update, TasksController.update);
router.delete('/:id', TaskMiddleware.delete, TasksController.delete);

module.exports = router;