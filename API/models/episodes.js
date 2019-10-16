'use strict';
module.exports = (sequelize, DataTypes) => {
  const episodes = sequelize.define(
    'episodes',
    {
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      id_webtoon: DataTypes.INTEGER,
    },
    {},
  );
  episodes.associate = function(models) {
    // associations can be defined here
  };
  return episodes;
};
