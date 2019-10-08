import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './src/screens/Login';
import Home from './src/screens/Home';

const AppNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
      header: null,
    },
  },
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home',
      headerLeft: null,
      cardStack: {
        gesturesEnabled: false,
      },
    },
  },
});

export default createAppContainer(AppNavigator);
