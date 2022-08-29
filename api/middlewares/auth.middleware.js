const jwt = require('jsonwebtoken');
const { errorResponse } = require('../helpers/error_response');

class AuthMiddleware {

  static verifyToken(req, res, next) {
    const { authorization: bearerHeader } = req.headers;
    
    if (typeof bearerHeader === 'undefined') {
      return errorResponse(res, 401, 'Access not allowed');
    }

    const bearer = bearerHeader.split(' ');
    if (bearer.length == 2 && bearer[0] == 'Bearer') {
      req.token = bearer[1];
      next();
    } else {
      console.error('Wrong formed token');
      errorResponse(res, 401, 'Access not allowed');
    }
  }

  static decodeToken(req, res, next) {
    try {
      const decodedToken = jwt.verify(req.token, process.env.JWT_PRIVATE_KEY, { algorithms: ['HS512'] });
      req.tokenPayload = decodedToken;
      next();
    } catch (error) {
      console.error(error.message);
      errorResponse(res, 401, 'Access not allowed');
    }
  }
}

module.exports = { AuthMiddleware }