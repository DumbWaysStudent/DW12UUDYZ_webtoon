const models = require('../models');
const Episode = models.episodes;

exports.index = (req, res) => {
  Episode.findAll({
    where: {
      webtoonId: req.params.webtoonId,
    },
  }).then(episodes => res.send(episodes));
};

exports.showEpisodes = (req, res) => {
  Episode.findAll({
    where: {
      webtoonId: req.params.webtoonId,
      createdBy: req.params.userId,
    },
  }).then(episodes => res.send(episodes));
};

exports.storeEpisodes = (req, res) => {
  const userId = req.params.userId;
  const webtoonId = req.params.webtoonId;
  const { title, image } = req.body;
  Episode.create({
    title: title,
    image: image,
    createdBy: userId,
    webtoonId: webtoonId,
  }).then(data => {
    res.send({
      success: true,
      id: data.id,
      title: data.title,
      image: data.image,
      createdBy: data.createdBy,
      webtoonId: data.webtoonId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  });
};

exports.updateEpisode = (req, res) => {
  const webtoonId = req.params.webtoonId;
  const userId = req.params.userId;
  const episodeId = req.params.episodeId;
  Episode.update(req.body, {
    where: {
      id: episodeId,
      webtoonId: webtoonId,
      createdBy: userId,
    },
  }).then(data => {
    res.send({
      success: true,
      id: req.body.id,
      title: req.body.title,
      image: req.body.image,
      createdBy: req.body.createdBy,
      webtoonId: req.body.webtoonId,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt,
    });
  });
};

exports.deleteEpisode = (req, res) => {
  const episodeId = req.params.episodeId;
  const createdBy = req.params.userId;
  const webtoonId = req.params.webtoonId;
  Episode.destroy({
    where: { id: episodeId, webtoonId: webtoonId, createdBy: createdBy },
  }).then(episode => {
    res.send({
      message: 'success',
      id: episodeId,
    });
  });
};
