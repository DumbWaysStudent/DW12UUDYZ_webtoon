import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screens/Login';
import Register from '../screens/Login';

const UnAuthStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
      header: null,
      cardStack: {
        gesturesEnabled: false,
      },
    },
  },
  Register: {
    screen: Register,
    navigationOptions: {
      title: 'Register',
      header: null,
      cardStack: {
        gesturesEnabled: false,
      },
    },
  },
});

export default createAppContainer(UnAuthStack);
