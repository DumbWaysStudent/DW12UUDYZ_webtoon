/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { StyleSheet, FlatList, Image } from 'react-native';
import {
  Container,
  Text,
  View,
  Content,
  Right,
  Button,
  Label,
  Item,
  Input,
} from 'native-base';
import { connect } from 'react-redux';
import * as actionAccount from './../redux/actions/actionAccounts';

class CreateWebtoon extends Component {
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
            <Label style={[styles.textSubTitle, { marginTop: 15 }]}>
              Title
            </Label>
            <Item style={styles.textInput}>
              <Input placeholder="Input Title Here" />
            </Item>
            <Label style={styles.textSubTitle}>Episode</Label>
            <View style={styles.viewColor}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.state.banners.filter(item =>
                  item.title.includes(this.state.inputValue),
                )}
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
                      source={{ uri: item.url }}
                    />
                    <View style={styles.viewListItem}>
                      <Text>{item.title}</Text>
                      <Text style={{ fontSize: 11, fontColor: 'grey' }}>
                        {item.sumFavorite}
                      </Text>
                    </View>
                  </View>
                )}
                keyExtractor={item => item}
              />
              <Right>
                <Button
                  style={styles.btnComponent}
                  success
                  onPress={() =>
                    this.props.navigation.navigate('CreateWebtoonEpisode')
                  }>
                  <Text style={styles.txtBtn}>+ Add Episode</Text>
                </Button>
              </Right>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 4,
    height: '7%',
    fontSize: 40,
    width: '90%',
    marginBottom: 10,
  },
  container: {
    backgroundColor: '#f1f2f6',
    alignItems: 'center',
  },
  viewContent: {
    marginStart: 5,
    marginEnd: 5,
    borderRadius: 15,
  },
  viewColor: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  inputText: {
    width: '95%',
    marginTop: 10,
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
    textAlign: 'left',
    fontSize: 18,
    marginHorizontal: 4,
    marginStart: 5,
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
  btnComponent: {
    borderRadius: 7,
    marginTop: 10,
    marginBottom: 30,
    width: 118,
    alignItems: 'center',
  },
  txtBtn: {
    textAlign: 'center',
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
    getUserEpisodes: (userId, webtoonId, token) =>
      dispatch(actionAccount.handleGetUserEpisodes(userId, webtoonId, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateWebtoon);
