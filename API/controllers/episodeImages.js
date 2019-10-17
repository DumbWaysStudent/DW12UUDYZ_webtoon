const models = require('../models');
const EpisodeImage = models.episode_images;

exports.index = (req, res) => {
  const webtoonId = req.params.webtoonId;
  const episodeId = req.params.episodeId;
  const createdBy = req.params.userId;
  EpisodeImage.findAll({
    where: {
      webtoonId: webtoonId,
      episodeId: episodeId,
      createdBy: createdBy,
    },
  }).then(result => res.send(result));
};

exports.storeEpisodeImages = (req, res) => {
  const webtoonId = req.params.webtoonId;
  const episodeId = req.params.episodeId;
  const createdBy = req.params.userId;
  const { page, image } = req.body;
  EpisodeImage.create({
    page: page,
    image: image,
    episodeId: episodeId,
    createdBy: createdBy,
    webtoonId: webtoonId,
  }).then(data => {
    res.send({
      success: true,
      id: data.id,
      page: data.page,
      image: data.image,
      createdBy: data.createdBy,
      webtoonId: data.webtoonId,
      episodeId: data.episodeId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  });
};

exports.deleteEpisodeImage = (req, res) => {
  const imageId = req.params.imageId;
  const webtoonId = req.params.webtoonId;
  const episodeId = req.params.episodeId;
  const createdBy = req.params.userId;
  EpisodeImage.destroy({
    where: {
      id: imageId,
      createdBy: createdBy,
      webtoonId: webtoonId,
      episodeId: episodeId,
    },
  }).then(episodeImages => {
    res.send({
      message: 'success',
      id: imageId,
    });
  });
};
