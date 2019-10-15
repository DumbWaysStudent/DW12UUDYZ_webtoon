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

class EditMyWebtoon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      banners: [
        {
          title: 'Ep.2 - Teringat Kerumah',
          url:
            'https://66.media.tumblr.com/d5cff69e37d4dc86ae33f3e9c6dd6970/tumblr_inline_pkorbg5I481szvfcc_540.jpg',
          sumFavorite: '23 September 2019',
        },
        {
          title: 'Ep.1 - Kembalinya Nyata',
          url:
            'https://cf.shopee.co.id/file/2843f78cb557d57de7c7ab97e4344e9b_tn',
          sumFavorite: '17 September 2019',
        },
        {
          title: 'Prolog',
          url:
            'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90',
          sumFavorite: '1 September 2019',
        },
      ],
    };
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
              <Input value="Pasutri Gaje" />
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
                      onPress={() =>
                        this.props.navigation.navigate('EditEpisode', {
                          itemTitle: item.title,
                        })
                      }
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
                      <Text
                        onPress={() =>
                          this.props.navigation.navigate('EditEpisode', {
                            itemTitle: item.title,
                          })
                        }>
                        {item.title}
                      </Text>
                      <Text
                        style={{ fontSize: 11, fontColor: 'grey' }}
                        onPress={() =>
                          this.props.navigation.navigate('EditEpisode', {
                            itemTitle: item.title,
                          })
                        }>
                        {item.sumFavorite}
                      </Text>
                    </View>
                  </View>
                )}
                keyExtractor={item => item}
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

export default EditMyWebtoon;
