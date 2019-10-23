/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Container, Text, View, Content, Item } from 'native-base';
import { connect } from 'react-redux';
import Moment from 'moment';
import * as actionWebtoons from './../redux/actions/actionWebtoons';

class DetailWebToon extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params ? params.otherTitle : 'No Title',
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      position: 1,
      interval: null,
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const webtoonId = navigation.getParam('webtoonId', 'No-ID');
    await this.props.getWebtoonEpisodes(webtoonId);
  }

  render() {
    const { navigation } = this.props;
    const bannerImage = navigation.getParam(
      'bannerImage',
      'http://view.dreamstalk.ca/breeze5/images/no-photo.png',
    );
    const webtoonId = navigation.getParam('webtoonId', 'No-ID');
    console.disableYellowBox = true;
    Moment.locale('en');
    return (
      <Container>
        <Content>
          <View>
            <View style={styles.viewColor}>
              <Item>
                <Image
                  style={{
                    width: '100%',
                    height: 200,
                  }}
                  source={{
                    uri: bannerImage,
                  }}
                />
              </Item>
            </View>

            <Item style={[styles.inputText, styles.itemMarginBottomInput]}>
              <SafeAreaView>
                <View style={styles.viewContent}>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.props.episodesLocal.episodes}
                    renderItem={({ item }) => (
                      <View style={styles.viewAddFav}>
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate('DetailEpisode', {
                              itemTitle: item.title,
                              webtoonId: webtoonId,
                              episodeId: item.id,
                            })
                          }>
                          <Image
                            style={{
                              width: 75,
                              height: 75,
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
                              this.props.navigation.navigate('DetailEpisode', {
                                itemTitle: item.title,
                                webtoonId: webtoonId,
                                episodeId: item.id,
                              })
                            }>
                            <Text>{item.title}</Text>
                            <Text style={{ fontSize: 13 }}>
                              {Moment(item.createdAt).format(
                                'dddd, D MMMM YYYY',
                              )}
                            </Text>
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
    backgroundColor: '#f1f2f6',
  },
  viewContent: {
    marginStart: 10,
    width: '95%',
    alignItems: 'center',
    marginBottom: 15,
  },
  viewColor: {
    backgroundColor: '#ffffff',
  },
  inputText: {
    marginTop: 10,
    marginBottom: 20,
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
    marginBottom: 4,
    fontWeight: 'bold',
  },
  favItem: {
    marginStart: 20,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  viewAddFav: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
    padding: 5,
  },
  viewListItem: {
    marginStart: 10,
    justifyContent: 'center',
  },
  btnFavorite: {
    height: 20,
    width: 120,
  },
});

const mapStateToProps = state => {
  return {
    episodesLocal: state.episodes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getWebtoonEpisodes: id =>
      dispatch(actionWebtoons.handleGetWebtoonEpisodes(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailWebToon);
