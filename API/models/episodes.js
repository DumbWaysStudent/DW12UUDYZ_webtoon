'use strict';
module.exports = (sequelize, DataTypes) => {
  const episodes = sequelize.define('episodes', {
    title: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  episodes.associate = function(models) {
    // associations can be defined here
  };
  return episodes;
};