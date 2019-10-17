'use strict';
module.exports = (sequelize, DataTypes) => {
  const episodes = sequelize.define(
    'episodes',
    {
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      webtoonId: DataTypes.INTEGER,
      createdBy: DataTypes.INTEGER,
    },
    {},
  );
  episodes.associate = function(models) {
    // associations can be defined here
  };
  return episodes;
};
