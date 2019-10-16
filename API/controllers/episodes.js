const models = require('../models');
const Episode = models.episodes;

exports.index = (req, res) => {
  Episode.findAll({
    where: {
      id_webtoon: req.params.id_webtoon,
    },
  }).then(episodes => res.send(episodes));
};

exports.showEpisodes = (req, res) => {
  Episode.findAll({
    where: {
      id_webtoon: req.params.id_webtoon,
    },
  }).then(episodes => res.send(episodes));
};

exports.storeEpisodes = (req, res) => {
  Episode.create(req.body, {
    where: { id_webtoon: req.params.id_episode },
  }).then(episodes => {
    res.send({
      message: 'success',
      episodes,
    });
  });
};

exports.updateEpisode = (req, res) => {
  Episode.update(req.body, { where: { id: req.params.id_episode } }).then(
    episode => {
      res.send({
        message: 'success',
        episode,
      });
    },
  );
};

exports.deleteEpisode = (req, res) => {
  const id_episode = req.params.id_episode;
  Episode.destroy({ where: { id: id_episode } }).then(episode => {
    res.send({
      message: 'success',
      id: id_episode,
    });
  });
};
