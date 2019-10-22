//combine all reducer
import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';

import RootNavigator from './../../navigators/RootNavigator';
import reducerWebtoons from './../reducers/reducerWebtoons';
import reducerFavourites from './../reducers/reducerFavourites';
import reducerLogin from './../reducers/reducerLogin';

const reducerRouter = createNavigationReducer(RootNavigator);

const appReducer = combineReducers({
  router: reducerRouter,
  webtoons: reducerWebtoons,
  favourites: reducerFavourites,
  login: reducerLogin,
});

export default appReducer;
