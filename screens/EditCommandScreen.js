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
import {vw, vh, vmin, vmax} from 'react-native-expo-viewport-units';
import {
  HeaderButtons,
  HeaderButton,
  Item,
  HiddenItem,
  OverflowMenu,
} from 'react-navigation-header-buttons';
import ImagePicker from 'react-native-image-crop-picker';
import GLOBAL from '../global.js'
import UserStore from '../store/UserStore.js';
import authParams from '../store/redux/auth/authParams.js';
import AuthStore from '../store/AuthStore.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EDIT_TEAM_URL = 'https://www.ecomap.online/api/auth/edit-team/';

const CreateCommandScreen = ({route, navigation}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons style={styles.headerlink}>
          <Pressable
            style={styles.headerButtonSave}
            onPress={() => alert('Сохранено')}>
            <Text>Сохранить</Text>
          </Pressable>
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  const [group, setGroup] = React.useState(null);

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

  React.useEffect(() => {
    setGroup(route.params.group);
    setData({
      username: route.params.group.title,
      groupdescr: route.params.group.description,
    });
  }, []);

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
    formData.append('link', group.link);

    if (selectedImage) {
      makeImage(formData, selectedImage);
    }

    editCommand(formData);
  };

  const makeImage = (formData, imgPath) => {
    const file = {
      uri: imgPath,
      name: imgPath.substr(imgPath.lastIndexOf('/') + 1),
      type: 'image/jpeg',
    };
    formData.append('image', file);
  };

  const editCommand = async data => {
    let loginVia = null
    loginVia = await AsyncStorage.getItem('loggedVia');
    const response = await fetch(EDIT_TEAM_URL + route.params.group.id + '/', {
      method: 'PUT',
      headers: {
        'Content-Type':
          'multipart/form-data; boundary=—-WebKitFormBoundaryfgtsKTYLsT7PNUVD',
        Authorization: `${loginVia === 'apple' ? authParams.bearer : authParams.token} ${UserStore.token}`,
      },
      body: data,
    });
    const result = await response.json();
    navigation.navigate('CommandUserScreen', {
      id: result.id,
    });
  };

  if (group == null) {
    return (
      <View style={styles.container}>
        <Text>Загрузка</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headEditProf}>
        <Pressable onPress={choosePhotoFromLibrary} style={styles.imgProf}>
          <Image
            style={styles.imgChange}
            source={
              group.image !== null
                ? {uri: 'https://www.ecomap.online' + group.image}
                : require('../assets/ChangeImage.png')
            }
          />
        </Pressable>
        <View style={styles.headEditProfdata}>
          <TextInput
            onChangeText={val => TextInputName(val)}
            style={styles.profileName}
            defaultValue={group.title}
          />
          <Text>80 участников</Text>
        </View>
      </View>
      <Text style={styles.TextDescriptionCommand}>Введите описание</Text>
      <View style={styles.textAreaContainer}>
        <TextInput
          defaultValue={group.description}
          style={styles.textArea}
          onChangeText={val => TextInputDescr(val)}
          underlineColorAndroid="transparent"
          placeholderTextColor="grey"
          numberOfLines={10}
          multiline={true}
        />
      </View>
      <Pressable
        style={[styles.button, styles.editUsersButton]}
        onPress={() =>
          navigation.navigate('EditUserCommandScreen', {
            id: group.id,
          })
        }>
        <Text>Редактировать список участников</Text>
        <Image source={require('../assets/arrowRight.png')} />
      </Pressable>
      <View style={styles.buttonBlock}>
        <Pressable
          onPress={() => {
            chengedataImg(data.username, data.groupdescr);
          }}
          style={[styles.button, styles.buttonEdit]}>
          <Text style={styles.editProfileText}>Сохранить</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.signOutProfile}>
          <Text style={styles.deletProfileText}>Отмена</Text>
        </Pressable>
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
    marginBottom: 60
  },
  editProfileText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
  },
  buttonEdit: {
    borderWidth: 1,
    borderColor: '#1E9D2D',
    marginBottom: 20,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 13,
  },
  deletProfileText: {
    color: '#B2B2B2',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 25
  },
  deletProfile: {
    marginBottom: 24,
  },
  thumbnail: {
    width: 300,
    height: 300,
  },
  imgChange: {
    width: 64,
    height: 64,
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
  editUsersButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textAreaContainer: {
    borderColor: '#c4c4c4',
    borderWidth: 1,
    padding: 5,
    borderRadius: 8,
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
  },
  buttonOpen: {
    backgroundColor: '#1E9D2D',
    marginBottom: 12,
  },
  textStyle: {
    color: 'white',
    fontWeight: '400',
    textAlign: 'center',
    fontSize: 16,
  },
  TextDescriptionCommand: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 12,
    marginBottom: 8,
  },
  buttonBlock: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  headerButtonSave: {
    marginRight: 20,
  },
});
