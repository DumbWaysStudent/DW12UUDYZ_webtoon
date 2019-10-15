/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { StyleSheet, FlatList, Image } from 'react-native';
import { Container, Text, View, Icon, Content, Item, Input } from 'native-base';

class Favourite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      banners: [
        {
          title: 'The Secret ....',
          url:
            'https://swebtoon-phinf.pstatic.net/20190111_246/1547145672832qC9wR_JPEG/10_EC8DB8EB84A4EC9DBC_ipad.jpg',
          sumFavorite: '180 Favorite',
        },
        {
          title: 'Pasutri Gaje',
          url:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfxPFjUCBTEVAwdDegTAKb5n05StXMUBjNJKZ4C8fJNQUqGdxB',
          sumFavorite: '80 Favorite',
        },
        {
          title: 'Young Kids',
          url:
            'https://swebtoon-phinf.pstatic.net/20190702_222/1562021366038KBkoL_JPEG/10_EC8DB8EB84A4EC9DBC_ipad.jpg',
          sumFavorite: '13 Favorite',
        },
        {
          title: 'Young Boys',
          url:
            'https://swebtoon-phinf.pstatic.net/20181026_50/1540502090211TQ4tw_JPEG/10_EC8DB8EB84A4EC9DBC_ipad+28329.jpg',
          sumFavorite: '29 Favorite',
        },
        {
          title: 'Old School',
          url:
            'https://mmc.tirto.id/image/otf/500x0/2019/07/02/webtoon-flawless--web_ratio-16x9.jpg',
          sumFavorite: '80 Favorite',
        },
      ],
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

  render() {
    console.disableYellowBox = true;
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
                data={this.state.banners.filter(item =>
                  item.title.includes(this.state.inputValue),
                )}
                renderItem={({ item }) => (
                  <View style={styles.viewAddFav}>
                    <Image
                      onPress={() =>
                        this.props.navigation.navigate('DetailEpisode', {
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
                        {item.sumFavorite}
                      </Text>
                    </View>
                  </View>
                )}
                keyExtractor={item => item}
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
    marginStart: 13,
    marginEnd: 10,
    alignItems: 'center',
    borderRadius: 15,
    width: '95%',
  },
  viewColor: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  inputText: {
    width: '100%',
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

export default Favourite;
