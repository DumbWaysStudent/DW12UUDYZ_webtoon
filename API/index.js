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

//middlewares
const { authenticated } = require('./middleware');

app.group('/api/v1', router => {
  //auth API
  router.post('/login', AuthController.login);
  router.post('/register', AuthController.register);

  //API Users
  router.get('/users', UsersController.index);
  router.get('/user/:id', UsersController.show);
  router.patch('/user/:id', authenticated, UsersController.update);
  router.delete('/user/:id', authenticated, UsersController.delete);

  //API Webtoons
  router.get('/webtoons', WebtoonsController.index);
//   router.get('/webtoons/isFavorite=:favorite', WebtoonsController.showFav);
//   router.get('/webtoons/title=:title', WebtoonsController.show);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
