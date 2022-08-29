const { TasksController } = require('../../api/controllers/tasks.controller');

describe('Tasks Controller', () => {
  describe('index method', () => {
    it('should be defined', () => {
      expect(TasksController.index).toBeDefined();
    });
  });

  describe('create method', () => {
    it('should be defined', () => {
      expect(TasksController.create).toBeDefined();
    });
  });

  describe('update method', () => {
    it('should be defined', () => {
      expect(TasksController.update).toBeDefined();
    });
  });

  describe('delete method', () => {
    it('should be defined', () => {
      expect(TasksController.delete).toBeDefined();
    });
  });
});