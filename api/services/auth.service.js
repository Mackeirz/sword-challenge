const { UserService } = require("./user.service");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


class AuthService {

  static async login(email, password) {
    const user = await UserService.findUserByEmail(email);
    
    if (await this.isCorrectPassword(user, password)) {
      return jwt.sign({ email: user.email }, process.env.JWT_PRIVATE_KEY, { algorithm: 'HS512', expiresIn: 1800 });
    }
    throw new Error('Password mismatch');
  }

  static async isCorrectPassword(user, password) {
    return bcrypt.compare(password, user.password);
  }
}

module.exports = { AuthService }