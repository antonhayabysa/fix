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
  KeyboardAvoidingView,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import AwesomeAlert from 'react-native-awesome-alerts';
import {Rating, AirbnbRating} from 'react-native-elements';
import AwesomeButton from 'react-native-really-awesome-button';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GLOBAL from '../global.js';
import UserStore from '../store/UserStore';
import authParams from '../store/redux/auth/authParams.js';
import AuthStore from '../store/AuthStore.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CREATE_COMMENT_URL = 'https://www.ecomap.online/api/map/create-review/';

const CreateEvaluation = ({route, navigation}) => {
  const {streetName, streetid, streetFreezz} = route.params;

  const factors = {
    good: [
      {
        title: 'Чисто',
        image: require('../assets/clean.png'),
      },
      {
        title: 'Много зелени',
        image: require('../assets/green.png'),
      },
      {
        title: 'Светло',
        image: require('../assets/light.png'),
      },
      {
        title: 'Удобно передвигаться',
        image: require('../assets/move.png'),
      },
      {
        title: 'Мало машин',
        image: require('../assets/auto.png'),
      },
      {
        title: 'Тихо',
        image: require('../assets/nosaund.png'),
      },
      {
        title: 'Безопасно',
        image: require('../assets/secyr.png'),
      },
      {
        title: 'Архитектура',
        image: require('../assets/architecture.png'),
      },
      {
        title: 'Благоустройство',
        image: require('../assets/landscaping.png'),
      },
    ],
    bad: [
      {
        title: 'Лужи',
        image: require('../assets/puddles.png'),
      },
      {
        title: 'Пыльно',
        image: require('../assets/dust.png'),
      },
      {
        title: 'Мало зелени',
        image: require('../assets/low_green.png'),
      },
      {
        title: 'Много машин',
        image: require('../assets/cars.png'),
      },
      {
        title: 'Шумно',
        image: require('../assets/noisily.png'),
      },
      {
        title: 'Темно',
        image: require('../assets/dark.png'),
      },
      {
        title: 'Много рекламы',
        image: require('../assets/advertising.png'),
      },
      {
        title: 'Граффити',
        image: require('../assets/grafiti.png'),
      },
      {
        title: 'Архитектура',
        image: require('../assets/archruin.png'),
      },
      {
        title: 'Грязь',
        image: require('../assets/dirt.png'),
      },
    ],
  };

  const ratingColors = {
    1: '#D92020',
    2: '#FFD700',
    3: '#3D7606',
  };

  const [selectImage, setImage] = React.useState(null);

  const [rating, setRating] = React.useState(3);

  const [inputError, setInputError] = React.useState(false);

  const [user, setUser] = React.useState({});

  const [userScore, setUserScore] = React.useState('good');

  const [activeFactors, setActiveFactors] = React.useState([]);

  const [showAlertt, setShowAlert] = React.useState(false);

  function showAlert() {
    setShowAlert(true);
  }

  function hideAlert() {
    setShowAlert(false);
  }

  if (streetFreezz) {
    React.useEffect(() => {
      showAlert();
    }, []);
  }

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
        Authorization: `${loginVia === 'apple' ? authParams.bearer : authParams.token} ${UserStore.token}`,
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
    setActiveFactors([]);
    setRating(rate);
    setUserScore(rate < 3 ? 'bad' : 'good');
  };

  const handleChangeFactor = (e, factor) => {
    if (activeFactors.includes(factor)) {
      setActiveFactors(
        activeFactors.filter(item => {
          return item !== factor;
        }),
      );
      return;
    }
    setActiveFactors([...activeFactors, factor]);
  };

  const handleSendReview = () => {
    // if (data.description != '') {
      let formData = new FormData();

      formData.append('geo_json_id', streetid);
      formData.append('rating', rating);
      formData.append('date', '2021-08-17T07:27');
      formData.append('text', data.description);

      if (selectImage) {
        makeImage(formData, selectImage);
      }

      createComment(formData);
      navigation.navigate('HomeScreen');
    // } else {
    //   setInputError(true);
    // }
  };

  const createComment = async data => {
    console.log('До');
    
    try {
      let loginVia = null
      loginVia = await AsyncStorage.getItem('loggedVia');
      const response = await fetch(CREATE_COMMENT_URL, {
        method: 'POST',
        headers: {
          'Content-Type':
            'multipart/form-data; boundary=—-WebKitFormBoundaryfgtsKTYLsT7PNUVD',
          Authorization: `${loginVia === 'apple' ? authParams.bearer : authParams.token} ${UserStore.token}`,
        },
        body: data,
      });
      const userResponse = await fetch(
        'https://www.ecomap.online/api/auth/user/',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${loginVia === 'apple' ? authParams.bearer : authParams.token} ${UserStore.token}`,
          },
        },
      );
      const user = await userResponse.json();
      UserStore.setCrowns(user.crown);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView behavior="position" >
      <AwesomeAlert
        show={showAlertt}
        showProgress={false}
        title="Улица заморожена"
        message="Вы не можете оставить отзыв так как улица заморожена"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Закрыть"
        confirmButtonColor="#1E9D2D"
        onCancelPressed={() => {
          hideAlert();
        }}
        onConfirmPressed={() => {
          hideAlert();
        }}
      />
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

      <Text style={styles.evalStreetSitiation}>Оцените обстановку</Text>

      <Rating
        minValue={1}
        type="custom"
        style={styles.rating_style}
        ratingColor={ratingColors[rating]}
        ratingCount={3}
        imageSize={90}
        fractions={0}
        startingValue={3}
        onFinishRating={rate => handleChangeRating(rate)}
        tintColor={'#f2f2f2'}
        ratingImage={require('../assets/Exclude.png')}
      />

      <Text style={styles.evalStreetWhy}>
        Что {userScore === 'bad' ? ' не понравилось' : 'понравилось'}?{' '}
      </Text>
      
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        style={{
          flex: 1,
          flexDirection: 'row',
          marginBottom: 10,
          marginTop: 10,
        }}>
        {factors[userScore].map((item, index) => (
          <Pressable
            key={index}
            onPress={e => handleChangeFactor(e, item.title)}
            style={{
              marginRight:
                item.title == 'Грязь' || item.title == 'Благоустройство'
                  ? 0
                  : 20,
              width: activeFactors.includes(item.title) ? 90 : 80,
            }}>
            <Image
              style={{
                width: activeFactors.includes(item.title) ? 90 : 80,
                height: activeFactors.includes(item.title) ? 90 : 80,
                tintColor: activeFactors.includes(item.title)
                  ? ratingColors[rating]
                  : '#C4C4C4',
              }}
              source={item.image}
            />

            <Text
              style={{
                textAlign: 'center',
                fontSize: activeFactors.includes(item.title) ? 14 : 10,
                marginTop: activeFactors.includes(item.title) ? 8 : 4,
              }}>
              {item.title}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <Text style={styles.evalStreetDescript}>Добавьте описание</Text>
      {/* {inputError ? ( */}
        {/* <View style={[styles.textAreaContainer, styles.textAreaContainerError]}>
          <TextInput
            onChangeText={val => TextInputDescr(val)}
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholderTextColor="grey"
            numberOfLines={10}
            multiline={true}
          />
        </View>
      ) : ( */}
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
      {/* )} */}

      <View style={{width: '100%', marginBottom: 20, marginTop: 20}}>
        <AwesomeButton
          type="primary"
          backgroundColor="#1E9D2D"
          backgroundDarker="#3D7606"
          borderRadius={15}
          width={null}
          stretch
          onPress={() => {
            handleSendReview(data.description);
          }}>
          <Text style={styles.textStyle}>Опубликовать</Text>
        </AwesomeButton>
      </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default CreateEvaluation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 50,
    marginBottom:80,
  },
  textStyle: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 19,
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
  textAreaContainerError: {
    borderColor: 'red',
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
    // borderWidth: 1,
    // borderColor: '#1E9D2D',
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
    marginTop: 10,
    fontSize: 16,
  },
  evalStreetSitiation: {
    marginTop: 16,
    fontSize: 16,
    marginBottom: 8,
  },
  evalStreetWhy: {
    marginBottom: 8,
    fontSize: 16,
    marginTop: 16,
  },
  evalStreetDescript: {
    marginBottom: 8,
    fontSize: 16,
    marginTop: 8,
  },
});
