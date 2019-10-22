/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { StyleSheet, FlatList, Image } from 'react-native';
import { Container, Text, View, Icon, Content, Item, Input } from 'native-base';
import { connect } from 'react-redux';
import * as actionWebtoons from './../redux/actions/actionWebtoons';

class Favourite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  setSearchText(event) {
    let searchText = event.nativeEvent.text;
    let data = this.state.dataBackup;
    searchText = searchText.trim().toLowerCase();
    data = data.filter(l => {
      return l.nama.toLowerCase().match(searchText);
    });
    this.setState({
      data: data,
    });
  }

  componentDidMount() {
    this.props.getWebtoonFavourites(this.props.loginLocal.login.id);
  }

  render() {
    //console.log(this.props.favouritesLocal.favourites);
    //console.disableYellowBox = true;
    return (
      <Container>
        <Content>
          <View style={styles.viewContent}>
            <View style={styles.viewColor}>
              <Item rounded style={styles.inputText} regular>
                <Input
                  placeholder="Pencarian"
                  value={this.state.inputValue}
                  onChangeText={searchText =>
                    this.setState({ inputValue: searchText })
                  }
                />
                <Icon active name="search" />
              </Item>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.props.favouritesLocal.favourites.filter(item =>
                  item.WebtoonData.title.includes(this.state.inputValue),
                )}
                renderItem={({ item }) => (
                  <View style={styles.viewAddFav}>
                    <Image
                      onPress={() =>
                        this.props.navigation.navigate('DetailEpisode', {
                          itemTitle: item.WebtoonData.title,
                        })
                      }
                      style={{
                        width: 80,
                        height: 80,
                        borderWidth: 1,
                        borderColor: 'grey',
                        borderRadius: 7,
                      }}
                      source={{ uri: item.WebtoonData.image }}
                    />
                    <View style={styles.viewListItem}>
                      <Text
                        onPress={() =>
                          this.props.navigation.navigate('DetailEpisode', {
                            itemTitle: item.WebtoonData.title,
                          })
                        }>
                        {item.WebtoonData.title}
                      </Text>
                      <Text
                        style={{ fontSize: 13 }}
                        onPress={() =>
                          this.props.navigation.navigate('DetailEpisode', {
                            itemTitle: item.WebtoonData.title,
                          })
                        }>
                        Genre: {item.WebtoonData.genre}
                      </Text>
                    </View>
                  </View>
                )}
                keyExtractor={item => item.WebtoonData.id}
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
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  viewContent: {
    width: '100%',
    alignItems: 'center',
  },
  viewColor: {
    width: '95%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  inputText: {
    marginTop: 20,
    marginBottom: 10,
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
    width: 600,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
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
    favouritesLocal: state.favourites,
    loginLocal: state.login,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getWebtoonFavourites: id =>
      dispatch(actionWebtoons.handleGetWebtoonFavourites(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Favourite);
