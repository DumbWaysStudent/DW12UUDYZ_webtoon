const models = require('../models');
const Sequelize = require('sequelize');
const Webtoon = models.webtoons;
const Op = Sequelize.Op;

exports.index = (req, res) => {
  let favorite = req.query.is_favorite;
  let title = req.query.title;
  if (favorite === 'true') {
    favorite = 1;
    Webtoon.findAll({
      where: {
        isFavorite: favorite,
      },
    }).then(webtoons => res.send(webtoons));
  } else if (title != null) {
    Webtoon.findAll({
      where: {
        title: { [Op.like]: title + '%' },
      },
    }).then(webtoons => res.send(webtoons));
  }
  Webtoon.findAll().then(webtoons => res.send(webtoons));
};

exports.showWebtoon = (req, res) => {
  Webtoon.findAll({
    where: {
      createdBy: req.params.id,
    },
  }).then(users => res.send(users));
};

exports.storeWebtoon = (req, res) => {
  const userId = req.params.id;
  const { title, genre, isFavorite, image } = req.body;
  Webtoon.create({
    title: title,
    genre: genre,
    isFavorite: isFavorite,
    image: image,
    createdBy: userId,
  }).then(data => {
    res.send({
      success: true,
      id: data.id,
      title: data.title,
      genre: data.genre,
      isFavorite: data.isFavorite,
      image: data.image,
      createdBy: data.createdBy,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  });
};

exports.updateWebtoon = (req, res) => {
  const webtoonId = req.params.webtoonId;
  const userId = req.params.userId;
  Webtoon.update(req.body, {
    where: { id: webtoonId, createdBy: userId },
  }).then(webtoon => {
    res.send({
      success: true,
      id: req.body.id,
      title: req.body.title,
      genre: req.body.genre,
      isFavorite: req.body.isFavorite,
      image: req.body.image,
      createdBy: req.body.createdBy,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt,
    });
  });
};

exports.deleteWebtoon = (req, res) => {
  const webtoonId = req.params.webtoonId;
  const userId = req.params.userId;
  Webtoon.destroy({ where: { id: webtoonId, createdBy: userId } }).then(
    webtoon => {
      res.send({
        message: 'success',
        id: webtoonId,
      });
    },
  );
};
