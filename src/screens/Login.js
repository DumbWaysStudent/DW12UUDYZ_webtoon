/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, Image, Alert } from 'react-native';
import {
    Container,
    Text,
    View,
    Icon,
    Item,
    Input,
    Label,
    Button,
    Toast,
} from 'native-base';
import axios from 'axios';
import deviceStorage from '../services/deviceStorage';
import { AsyncStorage } from 'react-native';
import {API_URL} from '../constant/api_url';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowPassword: false,
            isValidLogin: true,
            isValidEmail: true,
            emailValue: '',
            passwordValue: '',
            showToast: false,
        };
    }

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
        if (this.state.passwordValue !== '') {
            !this.state.isShowPassword ? this.setState({ isShowPassword: true }) : this.setState({ isShowPassword: false });
            if ((this.state.emailValue = this.state.userEmail) && (this.state.passwordValue === this.state.userPassword)) {
                this.setState({ isValidLogin: true });
            } else {
                this.setState({ isValidLogin: false });
            }
        }
    };

    loginUser = () =>
    {
        const { emailValue, passwordValue } = this.state;

        axios.post(`${API_URL}/login`, {
            email: emailValue,
            password: passwordValue,
        }).then((response) => {
            console.log(response);
            if (response.data.success === true){
                deviceStorage.saveItem('id_token', response.data.token);
                deviceStorage.saveItem('userId', response.data.userId);
                AsyncStorage.getItem('id_token', (_err, result) =>
                {
                    console.log(result);
                    this.props.navigation.navigate('ForYou');
                });
            } else {
                Alert.alert('Incorrect', 'Email or Password is Incorrect');
                // Toast.show({
                //     text: 'Wrong password!',
                //     buttonText: 'Okay',
                //     type: 'danger',
                // });
            }
        }).catch((error) => {
        });
    };

    render() {
        return (
            <Container style={styles.container}>
                <View style={styles.viewContent}>
                    <Image
                        style={{
                            width: 300,
                            height: 200,
                        }}
                        source={{ uri: 'https://i.ibb.co/SRX5RMn/comic-boom-explosion-2-1.png' }}
                    />
                    <Text style={styles.textSubTitle}>
                        Already have an Account?
                        Login Now!
                    </Text>
                    <Item floatingLabel style={[styles.itemInput, !this.state.isValidEmail ? styles.textInputError : null]}>
                        <Label style={styles.textLabel}>
                            Email
                        </Label>
                        <Input
                            style={{color:'white'}}
                            placeholder="Email"
                            autoCapitalize="none"
                            onChangeText={text => this.onValidateEmail(text)}
                            value={this.state.emailValue}
                        />
                    </Item>
                    <Item floatingLabel style={styles.itemInput2}>
                        <Label style={styles.textLabel}>Password</Label>
                        <Input
                            style={{ color: 'white' }}
                            placeholder="Password"
                            autoCapitalize="none"
                            secureTextEntry={!this.state.isShowPassword ? true : false}
                            onChangeText={text => this.onValidatePassword(text)}
                            value={this.state.passwordValue}
                        />
                        <Icon
                            // eslint-disable-next-line react-native/no-inline-styles
                            style={{ color:'#f5f6fa'}}
                            active name={!this.state.isShowPassword ? 'eye-off' : 'eye'}
                            onPress={() => {
                                this.onShowPassword();
                            }}
                        />
                    </Item>
                    <Button full success
                        // eslint-disable-next-line react-native/no-inline-styles
                        style={{ borderRadius: 7, backgroundColor: '#ecf0f1'}}
                        onPress={() => {
                            this.loginUser();
                        }}
                    >
                        <Text style={styles.textButton}>Log In</Text>
                    </Button>
                    <Text style={styles.textSubTitle2} onPress={() =>
                        this.props.navigation.navigate('Register')
                    }>
                        New user? Register Now
                    </Text>
                </View>
            </Container>
        );
    }
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3BAD87',
        alignItems: 'center',
    },
    viewContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textTitle: {
        color: '#3BAD87',
        fontSize: 40,
        textAlign: 'center',
    },
    textLabel: {
        color: '#f5f6fa',
    },
    textSubTitle: {
        color: '#f5f6fa',
        fontSize: 15,
        marginTop: '5%',
        marginBottom: '10%',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    textSubTitle2: {
        color: '#f5f6fa',
        fontSize: 15,
        marginTop: '5%',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    textInput: {
        fontSize: 20,
        borderWidth: 1,
    },
    textButton: {
        color: '#3BAD87',
        fontWeight: 'bold',
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
