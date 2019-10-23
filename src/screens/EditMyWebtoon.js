/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import {
  Container,
  Text,
  View,
  Content,
  Button,
  Label,
  Item,
  Input,
} from 'native-base';
import { connect } from 'react-redux';
import * as actionAccount from './../redux/actions/actionAccounts';
import Moment from 'moment';

class EditMyWebtoon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const webtoonId = navigation.getParam('webtoonId', 'No-ID');
    await this.props.getUserEpisodes(
      this.props.loginLocal.login.id,
      webtoonId,
      this.props.loginLocal.login.token,
    );
  }

  render() {
    console.disableYellowBox = true;
    const { navigation } = this.props;
    const webtoonTitle = navigation.getParam('itemTitle', 'No-ID');
    return (
      <Container>
        <Content>
          <View style={styles.viewContent}>
            <Label style={[styles.textSubTitle, { marginTop: 15 }]}>
              Title
            </Label>
            <Item style={styles.textInput}>
              <Input value={webtoonTitle} />
            </Item>
            <Label style={styles.textSubTitle}>Episode</Label>
            <View style={styles.viewColor}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.props.userEpisodesLocal.userEpisodes}
                renderItem={({ item }) => (
                  <View style={styles.viewAddFav}>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('EditEpisode', {
                          itemTitle: item.title,
                          episodeId: item.id,
                          webtoonId: item.webtoonId,
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
                          this.props.navigation.navigate('EditEpisode', {
                            itemTitle: item.title,
                            episodeId: item.id,
                            webtoonId: item.webtoonId,
                          })
                        }>
                        <Text>{item.title}</Text>
                        <Text style={{ fontSize: 13 }}>
                          {Moment(item.createdAt).format('dddd, D MMMM YYYY')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                keyExtractor={item => item.id}
              />
              <View style={styles.viewRow}>
                <Button
                  style={styles.btnComponent}
                  success
                  onPress={() =>
                    this.props.navigation.navigate('CreateWebtoonEpisode')
                  }>
                  <Text style={styles.txtBtn}>+ Add Episode</Text>
                </Button>
                <Button
                  style={styles.btnComponent}
                  danger
                  onPress={() =>
                    this.props.navigation.navigate('CreateWebtoonEpisode')
                  }>
                  <Text style={styles.txtBtn}>Delete Webtoon</Text>
                </Button>
              </View>
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
    height: '10%',
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
    textAlign: 'left',
    fontSize: 18,
    marginHorizontal: 4,
    marginStart: 5,
    marginBottom: 5,
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
  viewRow: {
    flexDirection: 'row',
  },
  btnComponent: {
    borderRadius: 7,
    marginTop: 15,
    marginEnd: 15,
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
    userEpisodesLocal: state.userEpisodes,
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
)(EditMyWebtoon);
