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
  Content,
  Item,
  Label,
  Button,
} from 'native-base';
import Slideshow from 'react-native-image-slider-show';
import { connect } from 'react-redux';
import * as actionWebtoons from './../redux/actions/actionWebtoons';

class ForYou extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 1,
      interval: null,
    };
  }
  async componentDidMount() {
    await this.props.getWebtoons();
    await this.props.getWebtoonFavourites(this.props.loginLocal.login.id);
  }
  UNSAFE_componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position:
            this.state.position === this.props.webtoonsLocal.webtoons.length
              ? 0
              : this.state.position + 1,
        });
      }, 2000),
    });
  }
  UNSAFE_componentWillUnmount() {
    clearInterval(this.state.interval);
  }
  render() {
    console.disableYellowBox = true;
    return (
      <Container style={styles.container}>
        <Content>
          <View>
            <Item style={styles.itemMarginBottom}>
              <Slideshow
                dataSource={this.props.webtoonsLocal.webtoons}
                position={this.state.position}
                indicatorSelectedColor="#3BAD87"
                indicatorColor="#f0edf6"
                titleStye={styles.textSlideShow}
                onPositionChanged={position => this.setState({ position })}
              />
            </Item>
            <Item style={[styles.inputText, styles.itemMarginBottomInput]}>
              <SafeAreaView>
                <View style={{ marginStart: 10 }}>
                  <Label style={styles.textSubTitle}>Favourite</Label>
                  <View
                    style={[
                      styles.viewColor,
                      { paddingTop: 10, marginBottom: 10 },
                    ]}>
                    <FlatList
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      data={this.props.favouritesLocal.favourites}
                      renderItem={({ item, index }) => (
                        <View style={styles.favItem}>
                          <TouchableOpacity
                            onPress={() =>
                              this.props.navigation.navigate('DetailWebToon', {
                                otherTitle: item.WebtoonData.title,
                                bannerImage: item.WebtoonData.image,
                                webtoonId: item.WebtoonData.id,
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
                              source={{ uri: item.WebtoonData.image }}
                            />
                            <Text style={styles.favoriteTitle}>
                              {item.WebtoonData.title}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                      keyExtractor={item => item.WebtoonData.title}
                    />
                  </View>
                </View>
                <View style={{ marginBottom: 5, marginStart: 10 }}>
                  <Label style={styles.textSubTitle}>All</Label>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.props.webtoonsLocal.webtoons}
                    renderItem={({ item, index }) => (
                      <View style={styles.viewAddFav}>
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate('DetailWebToon', {
                              otherTitle: item.title,
                              bannerImage: item.image,
                              webtoonId: item.id,
                            })
                          }>
                          <Image
                            style={{
                              width: 100,
                              height: 80,
                              borderWidth: 1,
                              borderColor: 'grey',
                              borderRadius: 7,
                            }}
                            source={{ uri: item.image }}
                          />
                        </TouchableOpacity>
                        <View style={styles.viewListItem}>
                          <TouchableOpacity
                            onPress={() =>
                              this.props.navigation.navigate('DetailWebToon', {
                                otherTitle: item.title,
                                bannerImage: item.image,
                                webtoonId: item.id,
                              })
                            }>
                            <Text>{item.title}</Text>
                            <Text
                              style={{
                                fontSize: 12,
                                marginBottom: 3,
                              }}>
                              Genre: {item.genre}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() =>
                              this.props.navigation.navigate('DetailWebToon', {
                                otherTitle: item.title,
                                bannerImage: item.image,
                                webtoonId: item.id,
                              })
                            }>
                            <Button
                              success
                              style={styles.btnFavorite}
                              onPress={() =>
                                this.props.navigation.navigate(
                                  'DetailWebToon',
                                  {
                                    otherTitle: item.title,
                                    bannerImage: item.image,
                                    webtoonId: item.id,
                                  },
                                )
                              }>
                              <Text style={{ fontSize: 10 }}>+ Favorite</Text>
                            </Button>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                    keyExtractor={item => item.title}
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
    alignItems: 'center',
  },
  viewColor: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  inputText: {
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 15,
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
    marginStart: 8,
    fontSize: 20,
    fontWeight: 'bold',
  },
  textSlideShow: {
    fontSize: 30,
    marginBottom: 4,
    fontWeight: 'bold',
    color: 'white',
  },
  favItem: {
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
    width: 90,
    textAlign: 'center',
  },
});

const mapStateToProps = state => {
  return {
    webtoonsLocal: state.webtoons,
    favouritesLocal: state.favourites,
    loginLocal: state.login,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getWebtoons: () => dispatch(actionWebtoons.handleGetWebtoons()),
    getWebtoonFavourites: id =>
      dispatch(actionWebtoons.handleGetWebtoonFavourites(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForYou);
