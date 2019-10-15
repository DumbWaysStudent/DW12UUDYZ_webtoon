const models = require('../models');
const EpisodeImage = models.episode_images;

exports.index = (req, res) => {
  EpisodeImage.findAll({
    where: {
      id_episode: req.params.id_episode,
    },
  }).then(result => res.send(result));
};
