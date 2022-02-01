import React from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  Platform,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Rating, AirbnbRating} from 'react-native-elements';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GLOBAL from '../global.js';
import UserStore from '../store/UserStore.js';
import authParams from '../store/redux/auth/authParams.js';
import AuthStore from '../store/AuthStore.js';
import AsyncStorage from '@react-native-async-storage/async-storage';


const EvaluationEdit = ({route, navigation}) => {
  const {streetName, streetid, commentIdunic} = route.params;
  const CREATE_COMMENT_URL = `https://www.ecomap.online/api/map/create-review/${commentIdunic}/`;
  const COMMENT_DELET_URl = `https://www.ecomap.online/api/map/review/${commentIdunic}`

  const ratingColors = {
    1: '#D92020',
    2: '#FFD700',
    3: '#3D7606',
  };

  const [selectImage, setImage] = React.useState(null);

  const [rating, setRating] = React.useState(3);

  const [user, setUser] = React.useState({});

  const [userScore, setUserScore] = React.useState('good');

  const [activeFactor, setActiveFactor] = React.useState('');

  const [data, setData] = React.useState({
    description: '',
  });

  React.useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    let loginVia = null
    loginVia = await AsyncStorage.getItem('loggedVia');
    fetch('https://www.ecomap.online/api/auth/user/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${loginVia === 'apple' ? authParams.bearer : authParams.token} ${UserStore.token}`
      },
    })
      .then(response => response.json())
      .then(json => {
        setUser(json);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const TextInputDescr = val => {
    setData({
      ...data,
      description: val,
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      setImage(image.path);
    });
  };

  const makeImage = (formData, imgPath) => {
    const file = {
      uri: imgPath,
      name: imgPath.substr(imgPath.lastIndexOf('/') + 1),
      type: 'image/jpeg',
    };
    formData.append('image', file);
  };

  const handleChangeRating = rate => {
    setRating(rate);
    setUserScore(rate < 3 ? 'bad' : 'good');
  };

  const handleChangeFactor = (e, factor) => {
    setActiveFactor(factor);
  };

  const handleSendReview = () => {
    let formData = new FormData();

    // formData.append('geo_json_id', streetid);
    formData.append('rating', rating);
    formData.append('date', '2021-08-14T10:33');
    formData.append('text', data.description);

    if (selectImage) {
      makeImage(formData, selectImage);
    }

    createComment(formData);
    navigation.navigate('HomeScreen');
  };

  const createComment = async data => {
    let loginVia = null
    loginVia = await AsyncStorage.getItem('loggedVia');
    const response = await fetch(CREATE_COMMENT_URL, {
      method: 'POST',
      headers: {
        'Content-Type':
        'multipart/form-data; boundary=—-WebKitFormBoundaryfgtsKTYLsT7PNUVD',
        Authorization: `${loginVia === 'apple' ? authParams.bearer : authParams.token} ${UserStore.token}`
      },
      body: data,
    });
    const result = await response.json();
    UserStore.incrementCrowns();
  };

  const deleteReview = async () => {
    let loginVia = null
    loginVia = await AsyncStorage.getItem('loggedVia');
    fetch(COMMENT_DELET_URl, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${loginVia === 'apple' ? authParams.bearer : authParams.token} ${UserStore.token}`,
        }
    })
    .then(response => response.json())
    .then(json => {
        console.log(json)            
    })
    .catch(error => {
        console.log(error);
    });
    navigation.navigate('HomeScreen')
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{streetName}</Text>
      <Text style={styles.addPhotoText}>Добавить фото</Text>

      <Pressable onPress={choosePhotoFromLibrary} style={styles.imgProf}>
        <Image
          style={styles.imgChange}
          source={
            selectImage !== null
              ? {uri: selectImage}
              : require('../assets/ChangeImage.png')
          }
        />
      </Pressable>

      <View style={styles.textAreaContainer}>
        <TextInput
          onChangeText={val => TextInputDescr(val)}
          style={styles.textArea}
          underlineColorAndroid="transparent"
          placeholderTextColor="grey"
          numberOfLines={10}
          multiline={true}
        />
      </View>

      <Rating
        minValue={1}
        type="custom"
        ratingColor={ratingColors[rating]}
        ratingCount={3}
        imageSize={90}
        style={{paddingVertical: 10}}
        startingValue={3}
        onFinishRating={rate => handleChangeRating(rate)}
        tintColor={'#f2f2f2'}
        ratingImage={require('../assets/Exclude.png')}
      />

      <Pressable
        style={[styles.button, styles.buttonEdit]}
        onPress={() => {
          handleSendReview(data.description);
        }}>
        <Text style={styles.editProfileText}>Сохранить</Text>
      </Pressable>

      <Pressable
        onPress={() => deleteReview()}
      >
        <Text style={styles.deletComment}>Удалить отзыв</Text>
      </Pressable>
      <Text style={styles.deletProfileText} >Редактировать отзыв вы можете в течение 7 дней после публикации.</Text>
    </ScrollView>
  );
};

export default EvaluationEdit;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 58
  },
  textStyle: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 19,
  },
  deletComment: {
    color: '#B2B2B2',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 16
  },
  deletProfileText: {
    color: '#B2B2B2',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center'
  },
  imgProf: {
    width: '100%',
    borderRadius: 5,
  },
  rating_style: {
    flexDirection: 'column',
    alignContent: 'space-between',
  },
  imgChange: {
    width: '100%',
    height: 130,
    borderRadius: 10,
  },
  myStarStyle: {
    color: 'yellow',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: 'white',
  },
  textAreaContainer: {
    borderColor: '#c4c4c4',
    borderWidth: 1,
    padding: 5,
    borderRadius: 8,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  button: {
    borderRadius: 8,
    paddingVertical: 13,
  },
  buttonEdit: {
    marginBottom: 16,
    marginTop: 20,
    backgroundColor: '#1E9D2D',
  },
  editProfileText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 21,
    marginBottom: 10,
  },
  addPhotoText: {
    marginBottom: 8,
    fontSize: 16
  },
  evalStreetSitiation: {
    marginTop: 16,
    fontSize: 16,
    marginBottom: 8
  },
  evalStreetWhy: {
    marginBottom: 8,
    fontSize: 16,
    marginTop: 16
  },
  evalStreetDescript: {
    marginBottom: 8,
    fontSize: 16,
    marginTop: 8
  },
});
