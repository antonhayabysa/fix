import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Picker, Image, Pressable, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {vw, vh, vmin, vmax} from 'react-native-expo-viewport-units';
import {DefaultTheme, TextInput} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import GLOBAL from '../global.js';
import UserStore from '../store/UserStore.js';
import RNPickerSelect from 'react-native-picker-select';
import {citySelector} from '../store/GeojsonStore.js';
import authParams from '../store/redux/auth/authParams.js';
import AuthStore from '../store/AuthStore.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const theme = {
  underlineColor: '#C4C4C4',
  colors: {
    ...DefaultTheme.colors,
    primary: '#000',
  },
};

const EditProfScreen = ({route, navigation}) => {
  const [data, setData] = React.useState({
    username: undefined,
    userdata: undefined,
    usercity: undefined,
    userphone: undefined,
    usermail: undefined,
  });

  const TextInputName = val => {
    setData({
      ...data,
      username: val,
    });
  };

  const TextInputData = val => {
    setData({
      ...data,
      userdata: val,
    });
  };

  const TextInputCity = val => {
    setData({
      ...data,
      usercity: val,
    });
  };

  const TextInputPhone = val => {
    setData({
      ...data,
      userphone: val,
    });
  };

  const TextInputMail = val => {
    setData({
      ...data,
      usermail: val,
    });
  };

  const [selectImage, setImage] = React.useState(null);

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      setImage(image.path);
    });
  };

  const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };

  const makeImage = (formData, imgPath) => {
    const file = {
      uri: imgPath,
      name: imgPath.substr(imgPath.lastIndexOf('/') + 1),
      type: 'image/jpeg',
    };
    formData.append('image', file);
  };

  const chengedataImg = async (
    username,
    userdata,
    usercity,
    userphone,
    usermail,
  ) => {
    //   let userimg = selectImage
    //     const dataInput = {
    //         username: username,
    //         userdata: userdata,
    //         usercity: usercity,
    //         userphone: userphone,
    //         usermail: usermail,
    //         userimg: userimg
    //     }
    //     alert(JSON.stringify(dataInput, getCircularReplacer()))
    let formData = new FormData();
    formData.append('first_name', username);
    formData.append('birthday', userdata);
    formData.append('phone', userphone);
    formData.append('city', usercity);
    formData.append('email', usermail);

    if (selectImage) {
      makeImage(formData, selectImage);
    }

    console.log(formData);

    const editProf = async data => {
      let loginVia = null
      loginVia = await AsyncStorage.getItem('loggedVia');
      const response = await fetch('https://www.ecomap.online/api/auth/user/', {
        method: 'PUT',
        headers: {
          'Content-Type':
            'multipart/form-data; boundary=—-WebKitFormBoundaryfgtsKTYLsT7PNUVD',
          Authorization: `${loginVia === 'apple' ? authParams.bearer : authParams.token} ${UserStore.token}`,
        },
        body: data,
      });
      navigation.navigate('ProfileScreen');
    };
    editProf(formData);
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setData({
        username: route.params.username,
        userdata: route.params.userdata,
        usercity: route.params.usercity,
        userphone: route.params.userphone,
        usermail: route.params.usermail,
      });
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.headEditProf}>
        <Pressable onPress={choosePhotoFromLibrary} style={styles.imgProf}>
          <Image
            style={styles.imgChange}
            source={
              selectImage === null
                ? require('../assets/ChangeImage.png')
                : {uri: selectImage}
            }
          />
        </Pressable>
        <View style={styles.headEditProfdata}>
          <TextInput
            defaultValue={route.params.username}
            onChangeText={val => TextInputName(val)}
            placeholder="Имя"
            selectionColor="#C4C4C4"
            style={styles.profileName}
            theme={theme}
          />
          {data.userdata ? (
            <Text>{data.userdata}</Text>
          ) : (
            <Text>01.01.1990</Text>
          )}

          {data.usercity ? <Text>{data.usercity}</Text> : <Text>Город</Text>}
        </View>
      </View>
      <View style={styles.bodyEditProfile}>
        <TextInput
          defaultValue={route.params.userdata}
          label="Дата рождения"
          onChangeText={val => TextInputData(val)}
          selectionColor="#C4C4C4"
          underlineColor="#C4C4C4"
          style={styles.profileData}
          theme={theme}
        />
        <RNPickerSelect
          onValueChange={val => TextInputCity(val)}
          pickerProps={{
            accessibilityLabel: 'Selected item title',
          }}
          useNativeAndroidPickerStyle={true}
          placeholder={{
            label: 'Выберите город:',
            value: null,
            color: 'black',
          }}
          items={citySelector}
          style={{color: '#000'}}></RNPickerSelect>
        {/* <TextInput
          defaultValue={route.params.usercity}
          label="Город проживания"
          onChangeText={val => TextInputCity(val)}
          selectionColor="#C4C4C4"
          style={styles.profileData}
          theme={theme}
        /> */}
        <TextInput
          defaultValue={route.params.userphone}
          label="Телефон"
          onChangeText={val => TextInputPhone(val)}
          selectionColor="#C4C4C4"
          style={styles.profileData}
          theme={theme}
        />
        <TextInput
          defaultValue={route.params.usermail}
          label="Mail"
          onChangeText={val => TextInputMail(val)}
          selectionColor="#C4C4C4"
          style={styles.profileData}
          theme={theme}
        />
      </View>
      <Pressable
        style={[styles.button, styles.buttonEdit]}
        onPress={() => {
          chengedataImg(
            data.username,
            data.userdata,
            data.usercity,
            data.userphone,
            data.usermail,
          );
        }}>
        <Text style={styles.editProfileText}>Сохранить</Text>
      </Pressable>
      <Pressable style={styles.deletProfile}>
        <Text style={styles.deletProfileText}>Удалить профиль</Text>
      </Pressable>
    </View>
  );
};

export default EditProfScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 13,
    marginHorizontal: 20,
  },
  deletProfile: {
    marginBottom: 24,
  },
  deletProfileText: {
    color: '#7A7B7B',
    fontSize: 13,
    fontWeight: '400',
    textAlign: 'center',
  },
  buttonEdit: {
    borderWidth: 1,
    borderColor: '#1E9D2D',
    marginBottom: 16,
    marginTop: 20,
  },
  editProfileText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
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
    paddingBottom: 0,
    width: '74%',
    backgroundColor: null,
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginVertical: 0,
    height: 25,
  },
  headEditProfdata: {
    width: '100%',
  },
  profileData: {
    borderBottomColor: '#C4C4C4',
    paddingBottom: 0,
    width: '100%',
    backgroundColor: null,
    paddingHorizontal: 0,
    height: 55,
    marginBottom: 5,
  },
  bodyEditProfile: {
    width: '100%',
  },
});
