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

exports.store = (req, res) => {
  Webtoon.create(req.body).then(webtoon => {
    const token = jwt.sign({ webtoonId: webtoon.id }, 'my-secret-key');
    res.send({
      message: 'success',
      token,
      webtoon,
    });
  });
};

exports.update = (req, res) => {
  Webtoon.update(req.body, { where: { id: req.params.id } }).then(user => {
    res.send({
      message: 'success',
      user,
    });
  });
};

exports.delete = (req, res) => {
  Webtoon.destroy({ where: { id: req.params.id } }).then(user => {
    res.send({
      message: 'success',
      user,
    });
  });
};
