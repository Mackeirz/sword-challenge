const { errorResponse } = require("../helpers/error_response");
const { AuthService } = require("../services/auth.service");

class AuthController {
  /**
   * POST: /auth
   * @param {*} req 
   * @param {*} res 
   * @returns Response with JWT access token
   */
  static async login(req, res) {
    try {
      const accessToken = await AuthService.login(req.body.email, req.body.password);
      res.status(200).json({ accessToken });
    } catch (error) {
      console.error(error.message);
      errorResponse(res, 401, 'User not found or mismatch password');
    }
  }
}

module.exports = { AuthController }