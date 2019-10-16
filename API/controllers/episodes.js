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
  Episode.create(req.body, { where: { id_webtoon: req.params.id } }).then(
    episodes => {
      res.send({
        message: 'success',
        episodes,
      });
    },
  );
};
