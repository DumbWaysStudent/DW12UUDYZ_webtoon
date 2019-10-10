import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Share, Alert } from 'react-native';
import { Icon } from 'native-base';
import Login from './src/screens/Login';
import ForYou from './src/screens/ForYou';
import DetailWebToon from './src/screens/DetailWebToon';
import DetailEpisode from './src/screens/DetailEpisode';

const onShare = async () => {
  try {
    const result = await Share.share({
      message: 'Aplikasi Webtoon Ardi ini',
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        Alert.alert('1');
      } else {
        Alert.alert('2');
      }
    } else if (result.action === Share.dismissedAction) {
      Alert.alert('3');
    }
  } catch (error) {
    Alert.alert(error.message);
  }
};

const AuthStack = createStackNavigator({
  ForYou: {
    screen: ForYou,
    navigationOptions: {
      title: 'ForYou',
      header: null,
      cardStack: {
        gesturesEnabled: false,
      },
    },
  },
  DetailWebToon: {
    screen: DetailWebToon,
    navigationOptions: {
      headerRight: <Icon light name="share" onPress={onShare} />,
      headerStyle: {
        backgroundColor: '#3BAD87',
      },
      headerRightContainerStyle: {
        marginEnd: 15,
      },
      headerTintColor: '#fff',
    },
  },
  DetailEpisode: {
    screen: DetailEpisode,
    navigationOptions: {
      headerRight: <Icon light name="share" onPress={onShare} />,
      headerStyle: {
        backgroundColor: '#3BAD87',
      },
      headerRightContainerStyle: {
        marginEnd: 15,
      },
      headerTintColor: '#fff',
    },
  },
});

const App = createSwitchNavigator({
  App: {
    screen: Login,
  },
  Auth: {
    screen: AuthStack,
  },
});

export default createAppContainer(App);
