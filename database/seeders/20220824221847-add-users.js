'use strict';

const bcrypt = require('bcrypt');
const passwordHash = async (password) => {
  const salt = await bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const technicianJoePass = await passwordHash('technicianjoe2022');
    const technicianSusanPass = await passwordHash('techniciansusan2022');
    const managerPass = await passwordHash('managertravolta2022');
    
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        name: 'Technician Joe',
        email: 'technicianjoe@user.com',
        password: technicianJoePass,
        role: 'TECHNICIAN',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        id: 2,
        name: 'Manager Travolta',
        email: 'managertravolta@user.com',
        password: managerPass,
        role: 'MANAGER',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        id: 3,
        name: 'Technician Susan',
        email: 'techniciansusan@user.com',
        password: technicianSusanPass,
        role: 'TECHNICIAN',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users');
  }
};