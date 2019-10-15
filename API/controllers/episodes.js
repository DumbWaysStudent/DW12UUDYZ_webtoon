const models = require('../models');
const Episode = models.episodes;

exports.index = (req, res) => {
  Episode.findAll({
    where: {
      id_webtoon: req.params.id_webtoon,
    },
  }).then(episodes => res.send(episodes));
};
