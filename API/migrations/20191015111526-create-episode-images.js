'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('episode_images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      page: {
        type: Sequelize.INTEGER,
      },
      image: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      episodeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'episodes',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      webtoonId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'webtoons',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('episode_images');
  },
};
