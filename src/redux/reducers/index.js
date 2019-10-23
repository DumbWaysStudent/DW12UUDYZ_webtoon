//combine all reducer
import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';

import RootNavigator from './../../navigators/RootNavigator';
import reducerWebtoons from './../reducers/reducerWebtoons';
import reducerFavourites from './../reducers/reducerFavourites';
import reducerEpisodes from './../reducers/reducerEpisodes';
import reducerImages from './reducerImages';
import reducerLogin from './../reducers/reducerLogin';
import reducerUserWebtoons from './../reducers/reducerUserWebtoons';
import reducerUserEpisodes from './../reducers/reducerUserEpisodes';
import reducerUserImages from './../reducers/reducerUserImages';
import reducerDeleteEpisode from './../reducers/reducerDeleteEpisode';

const reducerRouter = createNavigationReducer(RootNavigator);

const appReducer = combineReducers({
  router: reducerRouter,
  webtoons: reducerWebtoons,
  favourites: reducerFavourites,
  episodes: reducerEpisodes,
  images: reducerImages,
  login: reducerLogin,
  userWebtoons: reducerUserWebtoons,
  userEpisodes: reducerUserEpisodes,
  userImages: reducerUserImages,
  deleteEpisode: reducerDeleteEpisode,
});

export default appReducer;
