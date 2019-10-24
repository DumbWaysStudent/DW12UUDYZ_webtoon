/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { StyleSheet, FlatList, Image, Alert } from 'react-native';
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

class EditEpisode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const webtoonId = navigation.getParam('webtoonId', 'No-ID');
    const episodeId = navigation.getParam('episodeId', 'No-ID');
    console.log(webtoonId);
    console.log(episodeId);
    await this.props.getUserImages(
      this.props.loginLocal.login.id,
      webtoonId,
      episodeId,
      this.props.loginLocal.login.token,
    );
  }

  handleDeleteEpisode = async () => {
    const { navigation } = this.props;
    const webtoonId = navigation.getParam('webtoonId', 'No-ID');
    const episodeId = navigation.getParam('episodeId', 'No-ID');
    console.log(webtoonId);
    console.log(episodeId);
    await this.props.deleteUserEpisode(
      this.props.loginLocal.login.id,
      webtoonId,
      episodeId,
      this.props.loginLocal.login.token,
    );
    if (this.props.deleteEpisodeLocal.deleteEpisode.message === 'success') {
      Alert.alert('Success', 'Delete image successfully');
      this.props.navigation.navigate('MyWebtoon');
    } else {
      Alert.alert('Waring', 'Delete image failed');
    }
  };

  handleDeleteImage = async id => {
    const { navigation } = this.props;
    const webtoonId = navigation.getParam('webtoonId', 'No-ID');
    const episodeId = navigation.getParam('episodeId', 'No-ID');
    const imageId = id;
    console.log(webtoonId);
    console.log(episodeId);
    await this.props.deleteUserImage(
      this.props.loginLocal.login.id,
      webtoonId,
      episodeId,
      imageId,
      this.props.loginLocal.login.token,
    );
    this.props.navigation.navigate('EditMyWebtoon');
    // if (this.props.deleteImageLocal.deleteImage.message === 'success') {
    //   Alert.alert('Success', 'Delete image successfully');
    // } else {
    //   Alert.alert('Waring', 'Delete image failed');
    // }
  };

  handleUpdateEpisode = async () => {
    const { navigation } = this.props;
    const webtoonId = navigation.getParam('webtoonId', 'No-ID');
    const episodeId = navigation.getParam('episodeId', 'No-ID');
    const { inputValue } = this.state;
    console.log(webtoonId);
    if (inputValue === '') {
      Alert.alert('Warning', 'Field Title is Null');
    } else {
      await this.props.updateUserEpisode(
        this.props.loginLocal.login.id,
        webtoonId,
        episodeId,
        inputValue,
        this.props.loginLocal.login.token,
      );
      this.props.navigation.navigate('EditMyWebtoon');
    }
  };

  onEditTitle = text => {
    this.setState({ inputValue: text });
  };

  render() {
    console.disableYellowBox = true;
    const { navigation } = this.props;
    const episodeTitle = navigation.getParam('itemTitle', 'No-ID');
    const { goBack } = this.props.navigation;
    return (
      <Container>
        <Content>
          <Header style={styles.headerStyle}>
            <Left style={{ marginStart: 10 }}>
              <Icon
                onPress={() => goBack()}
                name="arrow-back"
                style={{ color: 'white' }}
              />
            </Left>
            <Text style={{ color: 'white', fontSize: 20 }}>Edit Episode</Text>
            <Right style={{ marginEnd: 10 }}>
              <Icon
                name="checkmark"
                style={{ color: 'white' }}
                onPress={() => {
                  this.handleUpdateEpisode();
                }}
              />
            </Right>
          </Header>
          <View style={styles.viewContent}>
            <Label style={[styles.textSubTitle, { marginTop: 15 }]}>Name</Label>
            <Item style={styles.textInput}>
              <Input
                value={this.state.inputValue}
                onChangeText={text => this.onEditTitle(text)}
                placeholder={episodeTitle}
              />
            </Item>
            <Label style={styles.textSubTitle}>Add Image</Label>
            <View style={styles.viewColor}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.props.userImagesLocal.userImages}
                renderItem={({ item }) => (
                  <View style={styles.viewAddFav}>
                    <Image
                      style={{
                        width: 80,
                        height: 120,
                        borderWidth: 1,
                        borderColor: 'grey',
                        borderRadius: 7,
                      }}
                      source={{ uri: item.image }}
                    />
                    <View style={styles.viewListItem}>
                      <Text style={{ marginBottom: 10 }}>{item.image}</Text>
                      <Button
                        danger
                        style={styles.btnFavorite}
                        onPress={() => this.handleDeleteImage(item.id)}>
                        <Text style={{ fontSize: 10 }}>Delete</Text>
                      </Button>
                    </View>
                  </View>
                )}
                keyExtractor={item => item.id}
              />
              <View style={{ flexDirection: 'row', marginBottom: 100 }}>
                <Button style={styles.btnComponent} success>
                  <Text>+ Image</Text>
                </Button>
                <Button
                  style={styles.btnComponentDelete}
                  danger
                  onPress={() => {
                    this.handleDeleteEpisode();
                  }}>
                  <Text style={styles.txtBtn}>Delete Episode</Text>
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
    marginEnd: 10,
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
    width: 65,
    textAlign: 'center',
  },
  btnComponent: {
    borderRadius: 7,
    marginTop: 15,
    marginEnd: 15,
    width: 80,
    textAlign: 'center',
    alignItems: 'center',
  },
  btnComponentDelete: {
    borderRadius: 7,
    marginTop: 15,
    width: 100,
    textAlign: 'center',
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
    deleteEpisodeLocal: state.deleteEpisode,
    deleteImageLocal: state.deleteImage,
    loginLocal: state.login,
    userImagesLocal: state.userImages,
    updateUpdateLocal: state.updateUpdate,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserImages: (userId, webtoonId, episodeId, token) =>
      dispatch(
        actionAccount.handleGetUserImages(userId, webtoonId, episodeId, token),
      ),
    deleteUserEpisode: (userId, webtoonId, episodeId, token) =>
      dispatch(
        actionAccount.handleDeleteUserEpisode(
          userId,
          webtoonId,
          episodeId,
          token,
        ),
      ),
    updateUserEpisode: (userId, webtoonId, episodeId, title, token) =>
      dispatch(
        actionAccount.handleUpdateUserEpisode(
          userId,
          webtoonId,
          episodeId,
          title,
          token,
        ),
      ),
    deleteUserImage: (userId, webtoonId, episodeId, imageId, token) =>
      dispatch(
        actionAccount.handleDeleteUserImage(
          userId,
          webtoonId,
          episodeId,
          imageId,
          token,
        ),
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditEpisode);
