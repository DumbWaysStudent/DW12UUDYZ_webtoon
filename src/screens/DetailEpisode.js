import React, { Component } from 'react';
import { StyleSheet, FlatList, Image, Text } from 'react-native';
import { Container, View, Content } from 'native-base';
import { connect } from 'react-redux';
import * as actionWebtoons from './../redux/actions/actionWebtoons';

class DetailEpisode extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params ? params.itemTitle : 'No Title',
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
    const episodeId = navigation.getParam('episodeId', 'No-ID');
    await this.props.getWebtoonImages(webtoonId, episodeId);
  }

  render() {
    console.disableYellowBox = true;
    return (
      <Container style={styles.container}>
        <Content>
          <View>
            <View style={styles.viewColor}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.props.imagesLocal.images}
                renderItem={({ item }) => (
                  <View style={styles.viewAddFav}>
                    <Image
                      style={{
                        width: '100%',
                        height: 500,
                      }}
                      source={{ uri: item.image }}
                    />
                  </View>
                )}
                keyExtractor={item => item.id}
              />
            </View>
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
    marginVertical: 5,
    padding: 15,
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

const mapStateToProps = state => {
  return {
    imagesLocal: state.images,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getWebtoonImages: (webtoonId, episodeId) =>
      dispatch(actionWebtoons.handleGetWebtoonImages(webtoonId, episodeId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailEpisode);
