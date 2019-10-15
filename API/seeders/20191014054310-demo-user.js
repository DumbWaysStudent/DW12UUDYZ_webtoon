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
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', [
      {
        name: 'John Kecil',
      },
    ]);
  },
};
