import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Share, Alert } from 'react-native';
import { Icon } from 'native-base';
import Login from './src/screens/Login';
import ForYou from './src/screens/ForYou';
import DetailWebToon from './src/screens/DetailWebToon';
import DetailEpisode from './src/screens/DetailEpisode';
import Profile from './src/screens/Profile';


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
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
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
      headerRight: (
        // eslint-disable-next-line react-native/no-inline-styles
        <Icon style={{ color: 'white' }} name="share" onPress={onShare} />
      ),
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
      headerRight: (
        // eslint-disable-next-line react-native/no-inline-styles
        <Icon style={{ color: 'white' }} name="share" onPress={onShare} />
      ),
      headerStyle: {
        backgroundColor: '#3BAD87',
      },
      headerRightContainerStyle: {
        marginEnd: 15,
      },
      headerTintColor: '#fff',
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      headerLeft: null,
      headerRight: (
        // eslint-disable-next-line react-native/no-inline-styles
        <Icon style={{ color: 'white' }} name="create" onPress={onShare} />
      ),
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
