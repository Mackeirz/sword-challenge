'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Tasks',
      'summaryPersonalNotes',
      { type: Sequelize.STRING(2500) }
    );
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Tasks', 'summaryPersonalNotes');
  }
};
