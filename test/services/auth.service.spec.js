const { AuthService } = require("../../api/services/auth.service");

describe('Auth Service', () => {
  describe('login method', () => {
    it('should be defined', () => {
      expect(AuthService.login).toBeDefined();
    });
  });
});