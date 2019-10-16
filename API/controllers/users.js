const jwt = require('jsonwebtoken');
const models = require('../models');
const User = models.users;
const Webtoon = models.webtoons;
const Episode = models.episodes;

exports.index = (req, res) => {
  User.findAll().then(users => res.send(users));
};

exports.show = (req, res) => {
  User.findAll({
    where: {
      id: req.params.id,
    },
  }).then(users => res.send(users));
};

exports.showWebtoon = (req, res) => {
  Webtoon.findAll({
    where: {
      createdBy: req.params.id,
    },
  }).then(users => res.send(users));
};

exports.showEpisodes = (req, res) => {
  Episode.findAll({
    where: {
      id_webtoon: req.params.id_webtoon,
    },
  }).then(episodes => res.send(episodes));
};

exports.store = (req, res) => {
  User.create(req.body).then(user => {
    const token = jwt.sign({ userId: user.id }, 'my-secret-key');
    res.send({
      message: 'success',
      token,
      user,
    });
  });
};

exports.storeWebtoon = (req, res) => {
  Webtoon.create(req.body).then(webtoon => {
    res.send({
      message: 'success',
      webtoon,
    });
  });
};

exports.update = (req, res) => {
  User.update(req.body, { where: { id: req.params.id } }).then(user => {
    res.send({
      message: 'success',
      user,
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

exports.delete = (req, res) => {
  User.destroy({ where: { id: req.params.id } }).then(user => {
    res.send({
      message: 'success',
      user,
    });
  });
};

exports.deleteWebtoon = (req, res) => {
  Webtoon.destroy({ where: { id: req.params.id } }).then(webtoon => {
    res.send({
      message: 'success',
      webtoon,
    });
  });
};
