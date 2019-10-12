/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, PixelRatio } from 'react-native';
import { Input, View, Icon, Image, Item } from 'native-base';
import ImagePicker from 'react-native-image-picker';

class EditProfile extends Component
{
    state = {
        avatarSource: null,
    };

    constructor(props)
    {
        super(props);
        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    }

    selectPhotoTapped()
    {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
            },
        };

        ImagePicker.showImagePicker(options, response =>
        {
            console.log('Response = ', response);

            if (response.didCancel)
            {
                console.log('User cancelled photo picker');
            } else if (response.error)
            {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton)
            {
                console.log('User tapped custom button: ', response.customButton);
            } else
            {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });
    }
    render()
    {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={styles.viewContent}>
                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                        <View
                            style={[styles.avatar, styles.avatarContainer, { marginBottom: 20 }]}>
                            {this.state.avatarSource === null ? (
                                <Icon style={styles.textTitle} name="contact" />
                            ) : (
                                <Image style={styles.avatar} source={this.state.avatarSource} />
                            )}
                        </View>
                    </TouchableOpacity>
                    <Item style={styles.textInput} >
                        <Input placeholder="Nama Saya Disini"/>
                    </Item>       
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewContent: {
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    textTitle: {
        fontSize: 150,
        textAlign: 'center',
        color: 'grey',
    },
    textInput: {
        borderWidth: 4,
        borderRadius: 7,
        height: '10%',
        fontSize: 40,
        marginBottom: '30%',
        width: '50%',
    },
    dataList: {
        textAlign: 'justify',
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        alignItems: 'center',
    },
    avatar: {
        borderRadius: 75,
        width: 150,
        height: 150,
    },
});

export default EditProfile;
