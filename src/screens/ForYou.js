/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Text,
  View,
  Icon,
  Content,
  Item,
  Label,
  Input,
  Button,
} from 'native-base';
import { API_URL } from '../constant/api_url';
import axios from 'axios';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Slideshow from 'react-native-image-slider-show';
import Favourite from './Favourite';
import Profile from './Profile';
import EditProfile from './EditProfile';

class ForYou extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 1,
      interval: null,
      webtoons: [],
    };
  }
  componentDidMount() {
    axios.get(`${API_URL}/webtoons`).then(res => {
      const webtoons = res.data;
      console.log(webtoons);
      this.setState({ webtoons });
    });
  }
  componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position:
            this.state.position === this.state.webtoons.length
              ? 0
              : this.state.position + 1,
        });
      }, 2000),
    });
  }
  componentWillUnmount() {
    clearInterval(this.state.interval);
  }
  render() {
    console.disableYellowBox = true;
    return (
      <Container style={styles.container}>
        <Content>
          <View style={styles.viewContent}>
            <View style={styles.viewColor}>
              <Item
                rounded
                style={[styles.inputText, { width: '100%', marginTop: 20 }]}
                regular>
                <Input placeholder="Pencarian" />
                <Icon active name="search" />
              </Item>
              <Item style={styles.itemMarginBottom}>
                <Slideshow
                  containerStyle={styles.itemSliderImage}
                  dataSource={this.state.webtoons}
                  position={this.state.position}
                  indicatorSelectedColor="#3BAD87"
                  indicatorColor="#f0edf6"
                  titleStye={styles.textSlideShow}
                  onPositionChanged={position => this.setState({ position })}
                />
              </Item>
            </View>

            <Item style={[styles.inputText, styles.itemMarginBottomInput]}>
              <SafeAreaView>
                <View>
                  <Label style={styles.textSubTitle}>Favourite</Label>
                  <View
                    style={[
                      styles.viewColor,
                      { paddingTop: 10, marginBottom: 10 },
                    ]}>
                    <FlatList
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      data={this.state.webtoons}
                      renderItem={({ item }) => (
                        <View style={styles.favItem}>
                          <TouchableOpacity
                            onPress={() =>
                              this.props.navigation.navigate('DetailWebToon', {
                                otherTitle: item.title,
                              })
                            }>
                            <Image
                              style={{
                                width: 150,
                                height: 100,
                                borderWidth: 0.5,
                                shadowColor: 10,
                                borderColor: 'grey',
                                borderRadius: 7,
                              }}
                              source={{ uri: item.image }}
                            />
                            <Text style={styles.favoriteTitle}>
                              {item.title}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                      keyExtractor={item => item}
                    />
                  </View>
                </View>
                <View>
                  <Label style={styles.textSubTitle}>All</Label>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.webtoons}
                    renderItem={({ item }) => (
                      <View style={styles.viewAddFav}>
                        <Image
                          style={{
                            width: 80,
                            height: 80,
                            borderWidth: 1,
                            borderColor: 'grey',
                            borderRadius: 7,
                          }}
                          source={{ uri: item.image }}
                        />
                        <View style={styles.viewListItem}>
                          <Text>{item.title}</Text>
                          <Button
                            success
                            style={styles.btnFavorite}
                            onPress={() =>
                              this.props.navigation.navigate('DetailWebToon', {
                                otherTitle: item.title,
                              })
                            }>
                            <Text>+ Favorite</Text>
                          </Button>
                        </View>
                      </View>
                    )}
                    keyExtractor={item => item}
                  />
                </View>
              </SafeAreaView>
            </Item>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  viewContent: {
    marginStart: 10,
    width: '95%',
    alignItems: 'center',
    borderRadius: 15,
  },
  viewColor: {
    width: '100%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  inputText: {
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 15,
  },
  itemSliderImage: {
    width: '100%',
    borderRadius: 7,
  },
  itemMarginBottom: {
    marginBottom: 10,
  },
  itemMarginBottomInput: {
    marginBottom: 20,
  },
  favoriteTitle: {
    textAlign: 'center',
  },
  textSubTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textSlideShow: {
    fontSize: 30,
    marginBottom: 4,
    fontWeight: 'bold',
    color: 'white',
  },
  favItem: {
    marginStart: 20,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 15,
  },
  viewAddFav: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    padding: 5,
    paddingStart: 10,
  },
  viewListItem: {
    marginStart: 15,
    justifyContent: 'center',
  },
  btnFavorite: {
    height: 20,
    width: 100,
    textAlign: 'center',
  },
});

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

export default createAppContainer(TabNavigator);
