'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Tasks', [
      {
        id: 1,
        name: 'A',
        summary: 'This is a summary for task ONE, associated to user ID 1',
        userId: 1,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        id: 2,
        name: 'B',
        summary: 'This is a summary for task TWO, associated to user ID 2',
        userId: 3,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Tasks');
  }
};
