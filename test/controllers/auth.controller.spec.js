const { AuthController } = require('../../api/controllers/auth.controller');

describe('Auth Controller', () => {
  describe('login method', () => {
    it('should be defined', () => {
      expect(AuthController.login).toBeDefined();
    });
  });
});