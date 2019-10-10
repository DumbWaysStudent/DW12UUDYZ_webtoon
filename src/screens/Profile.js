/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, Icon, List, ListItem } from 'native-base';

const routes = [
    { id: 1, title: 'My Webtoon Creation', icon: '', nextAction: 'MyWebtoon' },
    { id: 2, title: 'Edit Profile', icon: '', nextAction: 'EditProfile' },
    { id: 3, title: 'Log Out', icon: '', nextAction: 'Login' },

];

class Profile extends Component {
    static navigationOptions = ({ navigation }) =>
    {
        const { params } = navigation.state;
        return {
            title: params ? params.otherTitle : 'No Title',
        };
    };
    render() {
        return (
            <View style={styles.viewContent}>
                <Icon style={styles.textTitle} name="contact" />
                <Text style={styles.textSubTitle}>
                    Your Name
                </Text>
                <List dataArray={routes} renderRow={(data) =>
                    <ListItem onPress={() => this.props.navigation.navigate(data.nextAction)}>
                            <Text style={styles.dataList}>{data.title}</Text>
                    </ListItem>} />
            </View>
        );
    }
}

export default Profile;

const styles = StyleSheet.create({
    viewContent: {
        marginTop: '15%',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f5f6fa',
    },
    textTitle: {
        fontSize: 150,
        textAlign: 'center',
        color: 'grey',
    },
    textSubTitle: {
        fontSize: 20,
        marginBottom: '10%',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    dataList: {
        textAlign: 'justify',
    },

});
