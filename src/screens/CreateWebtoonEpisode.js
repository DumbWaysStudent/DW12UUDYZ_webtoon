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
  Label,
  Item,
  Input,
} from 'native-base';

class CreateWebtoonEpisode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      banners: [
        {
          title: 'page1.png',
          url:
            'https://pm1.narvii.com/6516/33c1043bd66581e0306c86032611b7c69f9861cf_hq.jpg',
          sumFavorite: '23 September 2019',
        },
        {
          title: 'page2.png',
          url: 'https://pbs.twimg.com/media/D-MIGS6U4AEjALU.jpg',
          sumFavorite: '17 September 2019',
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
            <Label style={[styles.textSubTitle, { marginTop: 15 }]}>Name</Label>
            <Item style={styles.textInput}>
              <Input />
            </Item>
            <Label style={styles.textSubTitle}>Add Image</Label>
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
                        borderWidth: 3,
                        borderColor: 'grey',
                      }}
                      source={{ uri: item.url }}
                    />
                    <View style={styles.viewListItem}>
                      <Text>{item.title}</Text>
                      <Button danger style={{ height: 25, width: 85 }}>
                        <Text>Delete</Text>
                      </Button>
                    </View>
                  </View>
                )}
                keyExtractor={item => item}
              />
              <Right>
                <Button success style={styles.btnComponent}>
                  <Text style={styles.txtBtn}>+  Image</Text>
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
  btnComponent: {
    borderRadius: 7,
    marginTop: 10,
    width: 100,
    alignItems: 'center',
  },
  txtBtn: {
    textAlign: 'center',
  },
});

export default CreateWebtoonEpisode;
