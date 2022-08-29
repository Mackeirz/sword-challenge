const { ManagerEntity } = require('../entities/manager.entity');
const { TechnicianEntity } = require('../entities/technician.entity');
const { UserEntity } = require('../entities/user.entity');

class UserService {

  static async findUserByEmail(email = null) {
    if (!email) {
      throw new Error("An email should be provided");
    }

    const user = await UserEntity.findOne({ where: { email: email }});
    
    if (!user) {
      throw new Error("User cannot be found in the DB");
    }

    return this.loadUser(user);
  }

  static async findById(id = null) {
    if (!id) {
      throw new Error("An id should be provided");
    }

    const user = await UserEntity.findByPk(id);
    
    if (!user) {
      throw new Error("User cannot be found in the DB");
    }

    return this.loadUser(user);
  }

  static loadUser(user) {
    if (user.role === 'MANAGER') {
      return new ManagerEntity(user);   
    }

    return new TechnicianEntity(user);
  }
}

module.exports = { UserService }