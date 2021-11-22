'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      { username: 'Demo User', role: 'demo', email: 'demo_ppotions@gmail.com', password: 'demo', createdAt: new Date(), updatedAt: new Date() },
      { username: 'RegularGuy', role: 'user', email: 'admin_ppotions@gmail.com', password: 'admin', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }

};
