/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Container,
  Text,
  View,
  Content,
  Button,
  Label,
  Item,
  Input,
  Right,
  Left,
  Header,
  Icon,
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

  handleDeleteWebtoon = async () => {
    const { navigation } = this.props;
    const webtoonId = navigation.getParam('webtoonId', 'No-ID');
    console.log(webtoonId);
    await this.props.deleteUserWebtoon(
      this.props.loginLocal.login.id,
      webtoonId,
      this.props.loginLocal.login.token,
    );
    if (this.props.deleteEpisodeLocal.deleteEpisode.message === 'success') {
      Alert.alert('Success', 'Delete image successfully');
      await this.props.getUserWebtoons(
        this.props.loginLocal.login.id,
        this.props.loginLocal.login.token,
      );
      this.props.navigation.navigate('MyWebtoon');
    } else {
      Alert.alert('Waring', 'Delete image failed');
    }
  };

  handleUpdateWebtoon = async () => {
    const { navigation } = this.props;
    const webtoonId = navigation.getParam('webtoonId', 'No-ID');
    const { inputValue } = this.state;
    console.log(webtoonId);
    if (inputValue === '') {
      Alert.alert('Warning', 'Field Title is Null');
    } else {
      await this.props.updateUserWebtoon(
        this.props.loginLocal.login.id,
        webtoonId,
        inputValue,
        this.props.loginLocal.login.token,
      );
      this.props.navigation.navigate('MyWebtoon');
    }
  };

  onEditTitle = text => {
    this.setState({ inputValue: text });
  };

  render() {
    console.disableYellowBox = true;
    const { navigation } = this.props;
    const webtoonTitle = navigation.getParam('itemTitle', 'No-ID');
    const { goBack } = this.props.navigation;
    return (
      <Container>
        <Header style={styles.headerStyle}>
          <Left style={{ marginStart: 10 }}>
            <Icon
              onPress={() => goBack()}
              name="arrow-back"
              style={{ color: 'white' }}
            />
          </Left>
          <Text style={{ color: 'white', fontSize: 20 }}>Edit Webtoon</Text>
          <Right style={{ marginEnd: 10 }}>
            <Icon
              name="checkmark"
              style={{ color: 'white' }}
              onPress={() => {
                this.handleUpdateWebtoon();
              }}
            />
          </Right>
        </Header>
        <Content>
          <View style={styles.viewContent}>
            <Label style={[styles.textSubTitle, { marginTop: 15 }]}>
              Title
            </Label>
            <Item style={styles.textInput}>
              <Input
                value={this.state.inputValue}
                onChangeText={text => this.onEditTitle(text)}
                placeholder={webtoonTitle}
              />
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
                  onPress={() => {
                    this.handleDeleteWebtoon();
                  }}>
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
  headerStyle: {
    alignItems: 'center',
    backgroundColor: '#3BAD87',
    color: '#3BAD87',
  },
});

const mapStateToProps = state => {
  return {
    loginLocal: state.login,
    userWebtoonsLocal: state.userWebtoons,
    userEpisodesLocal: state.userEpisodes,
    deleteWebtoonLocal: state.deleteWebtoon,
    updateWebtoonLocal: state.updateWebtoon,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserEpisodes: (userId, webtoonId, token) =>
      dispatch(actionAccount.handleGetUserEpisodes(userId, webtoonId, token)),
    deleteUserWebtoon: (userId, webtoonId, token) =>
      dispatch(actionAccount.handleDeleteUserWebtoon(userId, webtoonId, token)),
    updateUserWebtoon: (userId, webtoonId, title, token) =>
      dispatch(
        actionAccount.handleUpdateUserWebtoon(userId, webtoonId, title, token),
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditMyWebtoon);
