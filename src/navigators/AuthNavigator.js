import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Share, Alert, View } from 'react-native';
import { Icon } from 'native-base';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Favourite from '../screens/Favourite';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import ForYou from '../screens/ForYou';
import DetailWebToon from '../screens/DetailWebToon';
import DetailEpisode from '../screens/DetailEpisode';
import MyWebtoon from '../screens/MyWebtoon';
import CreateWebtoon from '../screens/CreateWebtoon';
import CreateWebtoonEpisode from '../screens/CreateWebtoonEpisode';
import EditMyWebtoon from '../screens/EditMyWebtoon';
import EditEpisode from '../screens/EditEpisode';

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

const stack = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: {
      header: null,
    },
  },
  EditProfile: {
    screen: EditProfile,
    navigationOptions: {
      header: null,
    },
  },
});

const TabNavigator = createMaterialBottomTabNavigator(
  {
    ForYou: {
      screen: ForYou,
      navigationOptions: {
        tabBarLabel: 'For You',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'apps'} />
          </View>
        ),
      },
    },
    Favourite: {
      screen: Favourite,
      navigationOptions: {
        tabBarLabel: 'Favourite',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'star'} />
          </View>
        ),
        activeColor: '#f0edf6',
        inactiveColor: '#226557',
        barStyle: { backgroundColor: '#3BAD87' },
      },
    },
    Profile: {
      screen: stack,
      navigationOptions: {
        headerLeft: null,
        headerRight: (
          // eslint-disable-next-line react-native/no-inline-styles
          <Icon style={{ color: 'white' }} name="create" />
        ),
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'person'} />
          </View>
        ),
        activeColor: '#f0edf6',
        inactiveColor: '#226557',
        barStyle: { backgroundColor: '#3BAD87' },
      },
    },
  },
  {
    initialRouteName: 'ForYou',
    activeColor: '#f0edf6',
    inactiveColor: '#226557',
    barStyle: { backgroundColor: '#3BAD87' },
  },
);

const AuthStack = createStackNavigator({
  BottomStack: {
    screen: TabNavigator,
    navigationOptions: {
      header: null,
      cardStack: {
        gesturesEnabled: false,
      },
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
  MyWebtoon: {
    screen: MyWebtoon,
    navigationOptions: {
      headerTitle: 'My Webtoon',
      headerStyle: {
        backgroundColor: '#3BAD87',
      },
      headerRightContainerStyle: {
        marginEnd: 15,
      },
      headerTintColor: '#fff',
    },
  },
  CreateWebtoon: {
    screen: CreateWebtoon,
    navigationOptions: {
      headerTitle: 'Create Webtoon',
      headerRight: (
        // eslint-disable-next-line react-native/no-inline-styles
        <Icon style={{ color: 'white' }} name="checkmark" />
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
  CreateWebtoonEpisode: {
    screen: CreateWebtoonEpisode,
    navigationOptions: {
      headerTitle: 'Create Episode',
      headerRight: (
        // eslint-disable-next-line react-native/no-inline-styles
        <Icon style={{ color: 'white' }} name="checkmark" />
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
  EditMyWebtoon: {
    screen: EditMyWebtoon,
    navigationOptions: {
      headerTitle: 'Edit Webtoon',
      headerRight: (
        // eslint-disable-next-line react-native/no-inline-styles
        <Icon style={{ color: 'white' }} name="checkmark" />
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
  EditEpisode: {
    screen: EditEpisode,
    navigationOptions: {
      headerTitle: 'Edit Episode',
      headerRight: (
        // eslint-disable-next-line react-native/no-inline-styles
        <Icon style={{ color: 'white' }} name="checkmark" />
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

export default createAppContainer(AuthStack);
