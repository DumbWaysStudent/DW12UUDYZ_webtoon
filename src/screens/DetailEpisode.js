import React, { Component } from 'react';
import { StyleSheet, FlatList, Image } from 'react-native';
import { Container, View, Content } from 'native-base';

class DetailEpisode extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params ? params.itemTitle : 'No Title',
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      position: 1,
      interval: null,
      banners: [
        {
          url:
            'https://pm1.narvii.com/6516/33c1043bd66581e0306c86032611b7c69f9861cf_hq.jpg',
        },
        {
          url:
            'https://i.pinimg.com/originals/4c/6f/b9/4c6fb973437cc39b13197688a95c2362.png',
        },
        {
          url:
            'https://i.pinimg.com/originals/aa/45/4c/aa454ca6f22cf4c75d965ed4f36dcc5c.png',
        },
        {
          url:
            'https://scontent-lga3-1.cdninstagram.com/vp/ec0f2974758e822f5d982809440f0d00/5DB7E267/t51.2885-15/e35/34863244_2019620481622929_9059925939713998848_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&ig_cache_key=MTgwOTEyNTAxNzIzNTkzNTE2Mg%3D%3D.2',
        },
        {
          url: 'https://pbs.twimg.com/media/D-MIGS6U4AEjALU.jpg',
        },
        {
          url:
            'https://www.anime-planet.com/images/manga/covers/sweet-home-23975.jpg?t=1516403924',
        },
        {
          url:
            'https://66.media.tumblr.com/b3d9535aca236e23efb6349458270016/tumblr_p6gki04CX11r4xqamo3_r1_500.jpg',
        },
      ],
    };
  }
  render() {
    console.disableYellowBox = true;
    return (
      <Container style={styles.container}>
        <Content>
          <View>
            <View style={styles.viewColor}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.state.banners}
                renderItem={({ item }) => (
                  <View style={styles.viewAddFav}>
                    <Image
                      style={{
                        width: '100%',
                        height: 500,
                      }}
                      source={{ uri: item.url }}
                    />
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
    marginStart: 10,
    width: '95%',
    alignItems: 'center',
    borderRadius: 15,
  },
  viewColor: {
    width: '100%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  inputText: {
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 15,
  },
  itemSliderImage: {
    width: '90%',
    borderWidth: 3,
    borderColor: 'grey',
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
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    padding: 15,
  },
  viewListItem: {
    width: '100%',
    marginStart: 10,
    justifyContent: 'center',
  },
  btnFavorite: {
    height: 20,
    width: 120,
  },
});

export default DetailEpisode;
