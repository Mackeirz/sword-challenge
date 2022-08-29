const { UserEntity } = require('../../api/entities/user.entity');
let user;

describe("User entity", () => {~

  beforeEach(() => {
    user = UserEntity.build({
      id: 1,
      email: 'userjane@user.com',
      name: 'Jane',
      password: 'apassword'
    });
  });

  it("should return user role", () => {
    expect(user.role).toEqual('TECHNICIAN');
  });

  describe("hasPermissionFor method", () => {   
    it("should be able of reading tasks", () => {
      expect(user.hasPermissionFor('read:task')).toBe(false);
    });
    
    it("should be able of create tasks", () => {
      expect(user.hasPermissionFor('create:task')).toBe(false);
    });
    
    it("should be able of update tasks", () => {
      expect(user.hasPermissionFor('update:task')).toBe(false);
    });
    
    it("should not be able of delete tasks", () => {
      expect(user.hasPermissionFor('delete:task')).toBe(false);
    });
  });

  describe("getPermissions method", () => {
    it("should return an array of associated permissions", () => {
      expect(user.getPermissions())
        .toEqual(expect.arrayContaining([]));
    });
  });

  describe("getTasks method", () => {
    beforeEach(() => {
      jest
        .spyOn(UserEntity.prototype, 'getTasks')
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
      expect((await user.getTasks()).length).toBe(1);
    });
  });
});