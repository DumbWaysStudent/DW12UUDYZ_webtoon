'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Episodes',
      [
        {
          title: 'Ep.1 Naruto Kembali',
          image:
            'https://www.pixelstalk.net/wp-content/uploads/2016/05/Chidori-Sasuke-Wallpaper.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
          webtoonId: 1,
          createdBy: 1,
        },
        {
          title: 'Ep.2 Sasuke Kembali',
          image:
            'https://www.pixelstalk.net/wp-content/uploads/2016/05/Chidori-Sasuke-Wallpaper.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
          webtoonId: 1,
          createdBy: 1,
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('episodes', null, {});
  },
};
