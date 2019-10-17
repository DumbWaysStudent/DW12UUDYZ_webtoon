const express = require('express');
const bodyParser = require('body-parser');
require('express-group-routes');
const app = express();

const port = 5000;

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.use(bodyParser.json());

//controllers
const AuthController = require('./controllers/auth');
const UsersController = require('./controllers/users');
const WebtoonsController = require('./controllers/webtoons');
const EpisodesController = require('./controllers/episodes');
const EpisodeImagesController = require('./controllers/episodeImages');

//middlewares
const { authenticated } = require('./middleware');

app.group('/api/v1', router => {
  //auth API
  router.post('/login', AuthController.login);
  router.post('/register', AuthController.register);

  //API Users
  router.get('/users', UsersController.index);
  router.get('/user/:id', authenticated, UsersController.show);
  router.patch('/user/:id', authenticated, UsersController.update);
  router.patch('/user/:id', authenticated, UsersController.update);
  router.delete('/user/:id', authenticated, UsersController.delete);

  //API Webtoons
  router.get('/webtoons', WebtoonsController.index); //15
  router.get(
    '/user/:id/webtoons',
    authenticated,
    WebtoonsController.showWebtoon,
  ); //20
  router.post(
    '/user/:id/webtoon',
    authenticated,
    WebtoonsController.storeWebtoon,
  ); //21
  router.put(
    '/user/:userId/webtoon/:webtoonId',
    authenticated,
    WebtoonsController.updateWebtoon,
  ); //22
  router.delete(
    '/user/:userId/webtoon/:webtoonId',
    authenticated,
    WebtoonsController.deleteWebtoon,
  ); //23

  //API Episodes
  router.get('/webtoon/:webtoonId/episodes', EpisodesController.index); //16
  router.get(
    '/user/:userId/webtoon/:webtoonId/episodes',
    authenticated,
    EpisodesController.showEpisodes,
  );
  router.post(
    '/user/:userId/webtoon/:webtoonId/episode',
    authenticated,
    EpisodesController.storeEpisodes,
  ); //24
  router.put(
    '/user/:userId/webtoon/:webtoonId/episode/:episodeId',
    authenticated,
    EpisodesController.updateEpisode,
  ); //25
  router.delete(
    '/user/:userId/webtoon/:webtoonId/episode/:episodeId',
    authenticated,
    EpisodesController.deleteEpisode,
  ); //26

  //API EpisodesImages
  router.get(
    '/webtoon/:webtoonId/episode/:episodeId',
    EpisodeImagesController.index,
  ); //17
  router.get(
    '/user/:userId/webtoon/:webtoonId/episode/:episodeId/images',
    authenticated,
    EpisodeImagesController.index,
  ); //25
  router.post(
    '/user/:userId/webtoon/:webtoonId/episode/:episodeId/image',
    authenticated,
    EpisodeImagesController.storeEpisodeImages,
  ); //27
  router.delete(
    '/user/:userId/webtoon/:webtoonId/episode/:episodeId/image/:imageId',
    authenticated,
    EpisodeImagesController.deleteEpisodeImage,
  ); //28
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
