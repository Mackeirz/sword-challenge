const { TechnicianEntity } = require('../../api/entities/technician.entity');
let technician;

describe("Technician entity", () => {~

  beforeEach(() => {
    technician = TechnicianEntity.build({
      id: 1,
      email: 'technicianjane@user.com',
      name: 'Jane',
      password: 'apassword'
    });
  });

  it("should return technician role", () => {
    expect(technician.role).toEqual('TECHNICIAN');
  });

  describe("hasPermissionFor method", () => {   
    it("should be able of reading tasks", () => {
      expect(technician.hasPermissionFor('read:task')).toBe(true);
    });
    
    it("should be able of create tasks", () => {
      expect(technician.hasPermissionFor('create:task')).toBe(true);
    });
    
    it("should be able of update tasks", () => {
      expect(technician.hasPermissionFor('update:task')).toBe(true);
    });
    
    it("should not be able of delete tasks", () => {
      expect(technician.hasPermissionFor('delete:task')).toBe(false);
    });
  });

  describe("getPermissions method", () => {
    it("should return an array of associated permissions", () => {
      expect(technician.getPermissions())
        .toEqual(expect.arrayContaining(['read:task', 'create:task', 'update:task']));
    });
  });

  describe("getTasks method", () => {
    beforeEach(() => {
      jest
        .spyOn(TechnicianEntity.prototype, 'getTasks')
        .mockImplementation(() => {
          return Promise.resolve([
            {
              id: 1,
              name: 'A',
              summary: 'This is a summary for task ONE, associated to user ID 1',
              userId: 1,
            }
          ])
        });
    });

    it("should return two tasks for the manager", async () => {
      expect((await technician.getTasks()).length).toBe(1);
    });
  });
});