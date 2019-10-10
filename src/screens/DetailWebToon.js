/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { StyleSheet, FlatList, SafeAreaView, Image } from 'react-native';
import { Container, Text, View, Content, Item } from 'native-base';

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
      banners: [
        {
          title: 'Ep.4 - Last Game ',
          url:
            'https://awsimages.detik.net.id/community/media/visual/2018/02/06/9ccd0ab5-43c8-4ea0-876c-9b0763bd38d6_43.jpeg?w=780&q=90',
          releaseDate: '9 Oktober 2019',
        },
        {
          title: 'Ep.3 - Kaburnya dari Rumah',
          url:
            'https://forums.tapas.io/uploads/default/original/3X/4/d/4dcd6b2abf71721199d507d6b28c73dc1e2a55e4.png',
          releaseDate: '3 Oktober 2019',
        },
        {
          title: 'Ep.2 - Teringat Kerumah',
          url:
            'https://66.media.tumblr.com/d5cff69e37d4dc86ae33f3e9c6dd6970/tumblr_inline_pkorbg5I481szvfcc_540.jpg',
          releaseDate: '23 September 2019',
        },
        {
          title: 'Ep.1 - Kembalinya Nyata',
          url:
            'https://cf.shopee.co.id/file/2843f78cb557d57de7c7ab97e4344e9b_tn',
          releaseDate: '17 September 2019',
        },
        {
          title: 'Prolog',
          url:
            'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90',
          releaseDate: '1 September 2019',
        },
      ],
    };
  }
  componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position:
            this.state.position === this.state.banners.length
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
          <View>
            <View style={styles.viewColor}>
              <Item>
                <Image
                  style={{
                    width: '100%',
                    height: 200,
                  }}
                  source={{
                    uri:
                      'https://cdn.idntimes.com/content-images/post/20190119/save-me-bts-01dacdfa280c37894b18ae59b09bb6c2_600x400.jpg',
                  }}
                />
              </Item>
            </View>

            <Item style={[styles.inputText, styles.itemMarginBottomInput]}>
              <SafeAreaView>
                <View style={styles.viewContent}>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.banners}
                    renderItem={({ item }) => (
                      <View
                        style={styles.viewAddFav}
                        onPress={() =>
                          this.props.navigation.navigate('DetailEpisode', {
                            itemTitle: item.title,
                          })
                        }>
                        <Image
                          onPress={() =>
                            this.props.navigation.navigate('DetailEpisode', {
                              itemTitle: item.title,
                            })
                          }
                          style={{
                            width: 50,
                            height: 50,
                            borderWidth: 3,
                            borderColor: 'grey',
                          }}
                          source={{ uri: item.url }}
                        />
                        <View style={styles.viewListItem}>
                          <Text
                            onPress={() =>
                              this.props.navigation.navigate('DetailEpisode', {
                                itemTitle: item.title,
                              })
                            }>
                            {item.title}
                          </Text>
                          <Text
                            style={{ fontSize: 13, fontColor: 'grey' }}
                            onPress={() =>
                              this.props.navigation.navigate('DetailEpisode', {
                                itemTitle: item.title,
                              })
                            }>
                            {item.releaseDate}
                          </Text>
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
    backgroundColor: '#f1f2f6',
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
    width: '90%',
    borderWidth: 3,
    borderColor: 'grey',
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
    borderRadius: 15,
  },
  viewAddFav: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
    padding: 5,
  },
  viewListItem: {
    width: '100%',
    marginStart: 10,
    justifyContent: 'center',
  },
  btnFavorite: {
    height: 20,
    width: 120,
  },
});

export default DetailWebToon;
