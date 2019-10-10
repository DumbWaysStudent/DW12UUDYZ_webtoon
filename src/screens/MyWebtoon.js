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
  Icon,
} from 'native-base';

class MyWebtoon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      banners: [
        {
          title: 'The Secret ....',
          url:
            'https://swebtoon-phinf.pstatic.net/20190111_246/1547145672832qC9wR_JPEG/10_EC8DB8EB84A4EC9DBC_ipad.jpg',
          sumFavorite: '3 Episode(s)',
        },
        {
          title: 'Pasutri Gaje',
          url:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfxPFjUCBTEVAwdDegTAKb5n05StXMUBjNJKZ4C8fJNQUqGdxB',
          sumFavorite: '3 Episode(s)',
        },
        {
          title: 'Young Kids',
          url:
            'https://swebtoon-phinf.pstatic.net/20190702_222/1562021366038KBkoL_JPEG/10_EC8DB8EB84A4EC9DBC_ipad.jpg',
          sumFavorite: '3 Episode(s)',
        },
        {
          title: 'Young Boys',
          url:
            'https://swebtoon-phinf.pstatic.net/20181026_50/1540502090211TQ4tw_JPEG/10_EC8DB8EB84A4EC9DBC_ipad+28329.jpg',
          sumFavorite: '3 Episode(s)',
        },
        {
          title: 'Old School',
          url:
            'https://mmc.tirto.id/image/otf/500x0/2019/07/02/webtoon-flawless--web_ratio-16x9.jpg',
          sumFavorite: '3 Episode(s)',
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
                        this.props.navigation.navigate('EditMyWebtoon', {
                          itemTitle: item.title,
                        })
                      }
                      style={{
                        width: 60,
                        height: 60,
                        borderWidth: 3,
                        borderColor: 'grey',
                      }}
                      source={{ uri: item.url }}
                    />
                    <View style={styles.viewListItem}>
                      <Text
                        onPress={() =>
                          this.props.navigation.navigate('EditMyWebtoon', {
                            itemTitle: item.title,
                          })
                        }>
                        {item.title}
                      </Text>
                      <Text
                        style={{ fontSize: 13, fontColor: 'grey' }}
                        onPress={() =>
                          this.props.navigation.navigate('EditMyWebtoon', {
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
              <Right>
                <Button
                  rounded
                  success
                  onPress={() =>
                    this.props.navigation.navigate('CreateWebtoon')
                  }>
                  <Icon name="add" />
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
});

export default MyWebtoon;
