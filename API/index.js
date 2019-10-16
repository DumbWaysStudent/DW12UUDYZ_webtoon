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
  router.get('/webtoons', WebtoonsController.index);
  router.get('/webtoons/title=:title', WebtoonsController.show);
  router.get(
    '/webtoons/isFavorite=:favorite',
    authenticated,
    WebtoonsController.showFav,
  );
  router.get(
    '/user/:id/webtoons',
    authenticated,
    WebtoonsController.showWebtoon,
  );
  router.post(
    '/user/:id/webtoon',
    authenticated,
    WebtoonsController.storeWebtoon,
  );
  router.put(
    '/user/webtoon/:id',
    authenticated,
    WebtoonsController.updateWebtoon,
  );
  router.delete(
    '/user/webtoon/:id',
    authenticated,
    WebtoonsController.deleteWebtoon,
  );

  //API Episodes
  router.get('/webtoon/:id_webtoon/episodes', EpisodesController.index);
  router.get(
    '/user/webtoon/:id_webtoon/episodes',
    authenticated,
    EpisodesController.showEpisodes,
  );
  router.post(
    '/user/webtoon/:id_webtoon/episode',
    authenticated,
    EpisodesController.storeEpisodes,
  );

  //API EpisodesImages
  router.get('/webtoon/episode/:id_episode', EpisodeImagesController.index);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
