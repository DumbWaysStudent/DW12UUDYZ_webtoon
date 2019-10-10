/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { StyleSheet, FlatList, Image } from 'react-native';
import { Container, Text, View, Content } from 'native-base';

class MyWebtoon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      banners: [
        {
          title: 'The Secret of Angel',
          url:
            'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90',
          sumFavorite: '3 Episode(s)',
        },
        {
          title: 'Pasutri Gaje',
          url:
            'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90',
          sumFavorite: '60 Episode(s)',
        },
        {
          title: 'Young Mom',
          url:
            'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90',
          sumFavorite: '48 Episode(s)',
        },
        {
          title: 'Young Lady',
          url:
            'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90',
          sumFavorite: '75 Episode(s)',
        },
        {
          title: 'Old Mom',
          url:
            'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90',
          sumFavorite: '10 Episode(s)',
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
                        this.props.navigation.navigate('DetailEpisode', {
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
