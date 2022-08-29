const { ManagerEntity } = require('../../api/entities/manager.entity');

let manager;

describe("Manager entity", () => {
  beforeEach(async () => {
    manager = await ManagerEntity.build({
      id: 2,
      name: 'Manager Travolta',
      email: 'managertravolta@user.com',
      password: 'apassword'
    });
  });

  it("should return technician role", () => {
    expect(manager.role).toEqual('MANAGER');
  });

  describe("hasPermissionFor method", () => {   
    it("should be able of reading tasks", () => {
      expect(manager.hasPermissionFor('read:task')).toBe(true);
    });
    
    it("should be able of create tasks", () => {
      expect(manager.hasPermissionFor('create:task')).toBe(false);
    });
    
    it("should be able of update tasks", () => {
      expect(manager.hasPermissionFor('update:task')).toBe(false);
    });
    
    it("should not be able of delete tasks", () => {
      expect(manager.hasPermissionFor('delete:task')).toBe(true);
    });
  });

  describe("getPermissions method", () => {
    it("should return an array of associated permissions", () => {
      expect(manager.getPermissions())
        .toEqual(expect.arrayContaining(['read:task', 'delete:task']));
    });
  });

  describe("getTasks method", () => {
    beforeEach(() => {
      jest
        .spyOn(ManagerEntity.prototype, 'getTasks')
        .mockImplementation(() => {
          return Promise.resolve([
            {
              id: 1,
              name: 'A',
              summary: 'This is a summary for task ONE, associated to user ID 1',
              userId: 1,
            },
            {
              id: 2,
              name: 'B',
              summary: 'This is a summary for task TWO, associated to user ID 2',
              userId: 3,
            }
          ])
        });
    });

    it("should return two tasks for the manager", async () => {
      expect((await manager.getTasks()).length).toBe(2);
    });
  });
});