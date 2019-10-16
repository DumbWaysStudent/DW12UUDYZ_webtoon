const jwt = require('jsonwebtoken');
const models = require('../models');
const Sequelize = require('sequelize');
const Webtoon = models.webtoons;
const Op = Sequelize.Op;

exports.index = (req, res) => {
  Webtoon.findAll().then(webtoons => res.send(webtoons));
};

exports.show = (req, res) => {
  Webtoon.findAll({
    where: {
      title: { [Op.like]: req.params.title + '%' },
    },
  }).then(webtoons => res.send(webtoons));
};

exports.showFav = (req, res) => {
  Webtoon.findAll({
    where: {
      isFavorite: req.params.favorite,
    },
  }).then(webtoons => res.send(webtoons));
};

exports.showWebtoon = (req, res) => {
  Webtoon.findAll({
    where: {
      createdBy: req.params.id,
    },
  }).then(users => res.send(users));
};

exports.storeWebtoon = (req, res) => {
  Webtoon.create(req.body).then(webtoon => {
    res.send({
      message: 'success',
      webtoon,
    });
  });
};

exports.updateWebtoon = (req, res) => {
  Webtoon.update(req.body, { where: { id: req.params.id } }).then(webtoon => {
    res.send({
      message: 'success',
      webtoon,
    });
  });
};

exports.deleteWebtoon = (req, res) => {
  const id_webtoon = req.params.id;
  Webtoon.destroy({ where: { id: id_webtoon } }).then(webtoon => {
    res.send({
      message: 'success',
      id: id_webtoon,
    });
  });
};
