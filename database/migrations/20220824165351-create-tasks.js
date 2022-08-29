'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      summary: {
        allowNull: false,
        type: Sequelize.STRING(2500)
      },
      status: {
        allowNull: false,
        defaultValue: 'CREATED',
        type: Sequelize.ENUM("CREATED", "FINISHED"),
      },
      date: {
        type: Sequelize.DATE
      },
      userId: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    
    // Adding userId as foreign key of Users table
    await queryInterface.addConstraint('Tasks', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fkey_tasks_user_id',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Tasks', 'fkey_tasks_user_id');
    await queryInterface.dropTable('Tasks');
  }
};
