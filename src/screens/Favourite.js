/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
    Container,
    Text,
    View,
} from 'native-base';

class Favourite extends Component {
    render() {
        return (
            <Container style={styles.container}>
                <View style={styles.viewContent}>
                    <Text style={styles.textTitle}>Favourite</Text>
                    <Text style={styles.textSubTitle}>
                        Login with your account WEBTOON
                    </Text>

                </View>
            </Container>
        );
    }
}

export default Favourite;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f6fa',
        alignItems: 'center',
    },
    viewContent: {
        flex: 1,
        justifyContent: 'center',
    },
    textTitle: {
        fontSize: 40,
        textAlign: 'center',
    },
    textSubTitle: {
        fontSize: 15,
        marginBottom: '10%',
        textAlign: 'center',
    },
    textInput: {
        fontSize: 20,
        borderWidth: 1,
    },
    textButton: {
        color: 'black',
    },
    itemInput: {
        marginBottom: '3%',
        width: '80%',
    },
    itemInput2: {
        marginBottom: '8%',
        width: '80%',
    },
    textInputError: {
        borderColor: 'red',
    },
});
