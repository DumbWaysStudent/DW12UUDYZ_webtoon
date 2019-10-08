/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
    Container,
    Text,
    View,
} from 'native-base';

class Home extends Component {


    onValidateEmail = text => {
        this.setState({ emailValue: text });
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            this.setState({ isValidEmail: false });
        } else {
            this.setState({ isValidEmail: true });
        }
    };

    onValidatePassword = text => {
        this.setState({ passwordValue: text });
    };

    onShowPassword = () => {
        if (this.state.passwordValue != '') {
            !this.state.isShowPassword ? this.setState({ isShowPassword: true }) : this.setState({ isShowPassword: false });
            if ((this.state.emailValue == this.state.userEmail) && (this.state.passwordValue == this.state.userPassword)) {
                this.setState({ isValidLogin: true });
            } else {
                this.setState({ isValidLogin: false });
            }
        }
    };


    render() {
        return (
            <Container style={styles.container}>
                <View style={styles.viewContent}>
                    <Text style={styles.textTitle}>LOGED IN</Text>
                    <Text style={styles.textSubTitle}>
                        Login Success
                    </Text>
                </View>
            </Container>
        );
    }
}

export default Home;

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
});
