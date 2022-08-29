const { UserService } = require('../../api/services/user.service');

describe('User Service', () => {
  describe('findUserByEmail method', () => {
    it('should be defined', () => {
      expect(UserService.findUserByEmail).toBeDefined();
    });

    it('should throw error when email is not provided', () => {
      expect(UserService.findUserByEmail()).rejects.toThrowError(new Error("An email should be provided"));
    });
  });

  describe('loadUser method', () => {
    it('should be defined', () => {
      expect(UserService.loadUser).toBeDefined();
    })
  });
});