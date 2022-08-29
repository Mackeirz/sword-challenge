'use strict';

const {
  Model,
} = require('sequelize');
const { AmqpService } = require('../services/amqp.service');

module.exports = (sequelize, DataTypes) => {
  class TaskRepository extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.UserRepository, { as: 'User', foreignKey: 'userId'});
    }
  }

  TaskRepository.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    summary: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    summaryPersonalNotes: {
      type: DataTypes.STRING
    },
    date: DataTypes.DATE,
    status: {
      allowNull: false,
      defaultValue: 'CREATED',
      type: DataTypes.ENUM('CREATED', 'FINISHED')
    },
    userId: {
      allowNull: false,
      type: DataTypes.BIGINT
    }
  }, {
    sequelize,
    modelName: 'TaskRepository',
    tableName: 'Tasks'
  });

  TaskRepository.addHook('afterCreate', 'notifyManagers', (task, options) => {
    if (task.status === 'FINISHED') {
      AmqpService.publishExchange('managers', {
        userId: task.userId,
        date: task.date,
        name: task.name
      });
    }
  });
  
  TaskRepository.addHook('afterUpdate', 'notifyManagers', (task, options) => {
    if (task.status === 'FINISHED') {
      AmqpService.publishExchange('managers', {
        userId: task.userId,
        date: task.date,
        name: task.name
      });
    }
  });

  return TaskRepository;
};