'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'episode_images',
      [
        {
          page: 1,
          image:
            'https://www.pixelstalk.net/wp-content/uploads/2016/05/Chidori-Sasuke-Wallpaper.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
          episodeId: 1,
          webtoonId: 1,
          createdBy: 1,
        },
        {
          page: 2,
          image:
            'https://www.pixelstalk.net/wp-content/uploads/2016/05/Chidori-Sasuke-Wallpaper.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
          episodeId: 1,
          webtoonId: 1,
          createdBy: 1,
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('episode_images', null, {});
  },
};
