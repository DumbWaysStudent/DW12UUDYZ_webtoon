'use strict';
module.exports = (sequelize, DataTypes) => {
  const episode_images = sequelize.define(
    'episode_images',
    {
      page: DataTypes.NUMBER,
      image: DataTypes.STRING,
      episodeId: DataTypes.INTEGER,
      webtoonId: DataTypes.INTEGER,
      createdBy: DataTypes.INTEGER,
    },
    {},
  );
  episode_images.associate = function(models) {
    // associations can be defined here
  };
  return episode_images;
};
