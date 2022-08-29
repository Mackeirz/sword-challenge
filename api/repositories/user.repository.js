'use strict';

const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserRepository extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.TaskRepository, { as: 'Tasks', foreignKey: 'userId' });
    }
  }

  UserRepository.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: DataTypes.STRING,
    role: {
      allowNull: false,
      defaultValue: 'TECHNICIAN',
      type: DataTypes.ENUM('MANAGER', 'TECHNICIAN')
    }
  }, {
    sequelize,
    modelName: 'UserRepository',
    tableName: 'Users'
  });
  return UserRepository;
};