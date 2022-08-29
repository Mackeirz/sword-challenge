const { TaskService } = require('../../api/services/task.service');

describe('Task Service', () => {
    describe('getAllTasksFor method', () => {
      it('should be defined', () => {
        expect(TaskService.getAllTasksFor).toBeDefined();
      });
    });

    describe('create method', () => {
      it('should be defined', () => {
        expect(TaskService.create).toBeDefined();
      });
    });

    describe('update method', () => {
      it('should be defined', () => {
        expect(TaskService.update).toBeDefined();
      });
    });

    describe('deleteById method', () => {
      it('should be defined', () => {
        expect(TaskService.deleteById).toBeDefined();
      });
    });

    describe('findById method', () => {
      it('should be defined', () => {
        expect(TaskService.findById).toBeDefined();
      });
    });

    describe('destroy method', () => {
      it('should be defined', () => {
        expect(TaskService.destroy).toBeDefined();
      });
    });
});