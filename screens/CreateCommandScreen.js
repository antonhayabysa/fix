import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  Pressable,
  TextInput,
  Platform,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';
import {vw, vh, vmin, vmax} from 'react-native-expo-viewport-units';
import ImagePicker from 'react-native-image-crop-picker';
import AwesomeButton from 'react-native-really-awesome-button';
import GLOBAL from '../global.js';
import UserStore from '../store/UserStore.js';
import authParams from '../store/redux/auth/authParams.js';
import AuthStore from '../store/AuthStore.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CREATE_TEAM_URL = 'https://www.ecomap.online/api/auth/create-team/';
const JOIN_USER_URL = 'https://www.ecomap.online/api/auth/join-team/';
const TEAM_INFO_URL = 'https://www.ecomap.online/api/auth/team/';

const CreateCommandScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    username: '',
    groupdescr: '',
  });
  const [selectedImage, setSelectedImage] = React.useState(null);

  const TextInputName = val => {
    setData({
      ...data,
      username: val,
    });
  };

  const TextInputDescr = val => {
    setData({
      ...data,
      groupdescr: val,
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      setSelectedImage(image.path);
    });
  };

  const chengedataImg = async (username, groupdescr) => {
    let loginVia = null
    loginVia = await AsyncStorage.getItem('loggedVia');
    const response = await fetch('https://www.ecomap.online/api/auth/user/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${loginVia === 'apple' ? authParams.bearer : authParams.token} ${UserStore.token}`,
      },
    });
    const admin = await response.json();

    let formData = new FormData();

    formData.append('title', username);
    formData.append('description', groupdescr);
    formData.append('admin_id', admin.id);

    if (selectedImage) {
      makeImage(formData, selectedImage);
    }

    createCommand(formData);
  };

  const makeImage = (formData, imgPath) => {
    const file = {
      uri: imgPath,
      name: imgPath.substr(imgPath.lastIndexOf('/') + 1),
      type: 'image/jpeg',
    };
    formData.append('image', file);
  };

  const joinGroup = async groupID => {
    let userID = null;
    let loginVia = null
    loginVia = await AsyncStorage.getItem('loggedVia');
    fetch('https://www.ecomap.online/api/auth/user/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${loginVia === 'apple' ? authParams.bearer : authParams.token} ${UserStore.token}`,
      },
    })
      .then(response => response.json())
      .then(json => {
        userID = json.id;
      })
      .catch(error => {
        console.error(error);
      });

    const response = await fetch(TEAM_INFO_URL + groupID, {
      method: 'GET',
      headers: {
        Authorization: `${loginVia === 'apple' ? authParams.bearer : authParams.token} ${UserStore.token}`,
      },
    });

    const group = await response.json();
    const groupLink = group.link;

    console.log(groupLink);

    if (userID && groupLink) {
      let formData = new FormData();

      formData.append('link', groupLink);
      formData.append('team', groupID);
      formData.append('user', userID);
      
      fetch(`${JOIN_USER_URL}${groupLink}/`, {
        method: 'POST',
        headers: {
          'Content-Type':
            'multipart/form-data; boundary=—-WebKitFormBoundaryfgtsKTYLsT7PNUVD',
            Authorization: `${loginVia === 'apple' ? authParams.bearer : authParams.token} ${UserStore.token}`,
        },
      })
        .then(res => {
          navigation.dispatch(
            StackActions.replace('CommandUserScreen', {
              id: groupID,
            }),
          );
        })

        .catch(error => {
          console.error(error);
        });
    }
  };

  const createCommand = async data => {
    let loginVia = null
    loginVia = await AsyncStorage.getItem('loggedVia');
    const response = await fetch(CREATE_TEAM_URL, {
      method: 'POST',
      headers: {
        'Content-Type':
          'multipart/form-data; boundary=—-WebKitFormBoundaryfgtsKTYLsT7PNUVD',
        Authorization: `${loginVia === 'apple' ? authParams.bearer : authParams.token} ${UserStore.token}`,
      },
      body: data,
    });
    const result = await response.json();
    
    joinGroup(result.id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headEditProf}>
        <Pressable onPress={choosePhotoFromLibrary} style={styles.imgProf}>
          <Image
            style={styles.imgChange}
            source={
              selectedImage !== null
                ? {uri: selectedImage}
                : require('../assets/ChangeImage.png')
            }
          />
        </Pressable>
        <View style={styles.headEditProfdata}>
          <TextInput
            onChangeText={val => TextInputName(val)}
            style={styles.profileName}
            placeholder="Введите название"
          />
        </View>
      </View>
      <Text style={styles.TextDescriptionCommand}>Введите описание</Text>
      <View style={styles.textAreaContainer}>
        <TextInput
          style={styles.textArea}
          onChangeText={val => TextInputDescr(val)}
          underlineColorAndroid="transparent"
          placeholderTextColor="grey"
          numberOfLines={10}
          multiline={true}
        />
      </View>
      <View style={styles.buttonBlock}>
        <View style={{width: '100%', marginBottom: 20, marginTop: 20}}>
          <AwesomeButton
            type="primary"
            backgroundColor="#1E9D2D"
            backgroundDarker="#3D7606"
            borderRadius={15}
            width={null}
            stretch
            onPress={() => {
              chengedataImg(data.username, data.groupdescr);
            }}>
            <Text style={styles.textStyle}>Создать</Text>
          </AwesomeButton>
        </View>
      </View>
    </View>
  );
};

export default CreateCommandScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 60,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 13,
  },
  thumbnail: {
    width: 300,
    height: 300,
  },
  imgChange: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  headEditProf: {
    flexDirection: 'row',
  },
  imgProf: {
    marginRight: 12,
  },
  profileName: {
    borderBottomColor: '#C4C4C4',
    borderBottomWidth: 1,
    paddingBottom: 0,
    width: '75%',
    backgroundColor: null,
  },
  headEditProfdata: {
    width: '100%',
  },
  profileData: {
    borderBottomColor: '#C4C4C4',
    paddingBottom: 0,
    width: '100%',
    backgroundColor: null,
  },
  bodyEditProfile: {
    width: '100%',
  },
  textAreaContainer: {
    borderColor: '#c4c4c4',
    borderWidth: 1,
    padding: 5,
    borderRadius: 8,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonOpen: {
    backgroundColor: '#1E9D2D',
    marginBottom: 12,
  },
  textStyle: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 19,
  },
  TextDescriptionCommand: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 12,
    marginBottom: 8,
  },
  buttonBlock: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
