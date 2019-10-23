/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Container, Text, View, Content } from 'native-base';
import { connect } from 'react-redux';
import * as actionWebtoons from './../redux/actions/actionAccounts';

class MyWebtoon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  async componentDidMount() {
    await this.props.getUserWebtoons(
      this.props.loginLocal.login.id,
      this.props.loginLocal.login.token,
    );
  }

  render() {
    console.disableYellowBox = true;
    return (
      <Container>
        <Content>
          <View style={styles.viewContent}>
            <View style={styles.viewColor}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.props.userWebtoonsLocal.userWebtoons}
                renderItem={({ item }) => (
                  <View style={styles.viewAddFav}>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('EditMyWebtoon', {
                          itemTitle: item.title,
                          webtoonId: item.id,
                        })
                      }>
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
                    </TouchableOpacity>
                    <View style={styles.viewListItem}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('EditMyWebtoon', {
                            itemTitle: item.title,
                            webtoonId: item.id,
                          })
                        }>
                        <Text>{item.title}</Text>
                        <Text
                          style={{ fontSize: 13 }}
                          onPress={() =>
                            this.props.navigation.navigate('EditMyWebtoon', {
                              itemTitle: item.title,
                              webtoonId: item.id,
                            })
                          }>
                          {item.sumFavorite}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </Content>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => this.props.navigation.navigate('CreateWebtoon')}>
          <Text style={styles.text}>+</Text>
        </TouchableOpacity>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  fixedView: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#f1f2f6',
    alignItems: 'center',
  },
  viewContent: {
    marginStart: 5,
    marginEnd: 5,
    alignItems: 'center',
    borderRadius: 15,
  },
  viewColor: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    marginTop: 20,
  },
  inputText: {
    width: '95%',
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
  fab: {
    height: 50,
    width: 50,
    borderRadius: 200,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3BAD87',
  },
  text: {
    fontSize: 30,
    color: 'white',
  },
});

const mapStateToProps = state => {
  return {
    loginLocal: state.login,
    userWebtoonsLocal: state.userWebtoons,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserWebtoons: (userId, token) =>
      dispatch(actionWebtoons.handleGetUserWebtoons(userId, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyWebtoon);
