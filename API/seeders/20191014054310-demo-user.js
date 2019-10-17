'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'johni@gmail.com',
          password: 'johnijohni',
          createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Johni Kecil',
        },
        {
          email: 'ardi@gmail.com',
          password: 'ardi',
          createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Ardi Ardi',
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
