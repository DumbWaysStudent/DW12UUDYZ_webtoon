/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, PixelRatio, Image, Text } from 'react-native';
import { Input, View, Icon, Item, Right, Left, Header } from 'native-base';
import ImagePicker from 'react-native-image-picker';

class EditProfile extends Component
{

    constructor(props)
    {
        super(props);
        const { navigation } = this.props;
        this.state = {
            avatarSource: null,
            imageProfile: navigation.getParam('imageProfile'),
            nameProfile: navigation.getParam('name')
        };
    }

    handleEditPhoto = () =>
    {
        const options = {
            title: 'Select Photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, res =>
        {
            if (res.didCancel)
            {
                alert('Edit Poto Canceled');
            } else if (res.error)
            {
                console.log(res.error);
                alert('Response Erorr');
            } else if (res.customButton)
            {
                console.log(res.customButton);
            } else
            {
                const sourceImage = res.uri;
                this.setState({ imageProfile: sourceImage });
            }
        });
    };
    
    render()
    {
        const { imageProfile, isEditProfile, nameProfile } = this.state;
        const { goBack } = this.props.navigation;
        return (
            <View style={{ flex: 1 }}>
                <Header style={styles.headerStyle}>
                    <Left style={{ marginStart: 10 }}><Icon onPress={() => goBack()} name="arrow-back" style={{ color: 'white' }} /></Left><Text style={{ color: 'white', fontSize: 20, }}>Edit Profile</Text>
                    <Right style={{ marginEnd: 10 }}><Icon name="checkmark" style={{ color: 'white' }}
                        onPress={() =>
                        {
                            this.props.navigation.navigate('Profile', {
                                image: this.state.imageProfile,
                                name:
                                    nameProfile !== nameProfile
                                        ? this.props.navigation.getParam('name')
                                        : nameProfile,
                            });
                        }} />
                    </Right>
                </Header>
                <View style={styles.viewContent}>
                    <Image
                        style={styles.avatar}
                        source={{
                            uri: imageProfile,
                        }}
                    />
                    <TouchableOpacity onPress={() => this.handleEditPhoto()}>
                        <Icon name="camera" />
                    </TouchableOpacity>
                    <Item style={{ paddingHorizontal: 40 }}>
                        <Input
                            value={nameProfile}
                            placeholder={
                                !this.props.navigation.getParam('name')
                                    ? nameProfile
                                    : this.props.navigation.getParam('name')
                            }
                            onChangeText={text => this.setState({ nameProfile: text })}
                        />
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
        marginTop: '20%',
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        alignItems: 'center',
    },
    avatar: {
        marginTop: '20%',
        borderRadius: 75,
        width: 150,
        height: 150,
    },
    headerStyle: {
        alignItems: 'center',
        backgroundColor: '#3BAD87',
        color: '#3BAD87',
    },
});

export default EditProfile;
