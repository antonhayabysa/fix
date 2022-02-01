import React from 'react';
import {Text, View, StyleSheet, Image, Pressable} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {vw, vh, vmin, vmax} from 'react-native-expo-viewport-units';
import {useNavigation} from '@react-navigation/native';

const slides = [
    {
        key: '1',
        title: 'Добро пожаловать',
        text: 'Чистый город начинается с активной позиции граждан. Мы с тобой будем делать наш город лучше.',
        backgroundImage: '',
        backgroundImageStyle: ['100%', '100%'],
        image: require('../assets/Tutorial1.png'),
        backgroundColor: '#59b2ab',
        marginImage: vh(16.5)
    },
    {
        key: '2',
        title: 'Выберите улицу',
        text: 'Нажмите на улицу, которую хотите захватить.',
        backgroundImage: require('../assets/Tutorila1back.png'),
        backgroundImageStyle: [vw(100), vh(35)],
        image: require('../assets/Tutorial2.png'),
        backgroundColor: '#febe29',
        marginImage: vh(20)
    },
    {
        key: '3',
        title: 'Оцените обстановку',
        text: 'Поставьте оценку и напишите комментарий, при необходимости добавьте фотографию.',
        backgroundImage: require('../assets/Tutorial1Background.png'),
        backgroundImageStyle: ['100%', vh(45)],
        image: require('../assets/Tutorial3.png'),
        backgroundColor: '#22bcb5',
        marginImage: vh(19)
    },
    {
        key: '4',
        title: 'Отправьте отзыв',
        text: 'Отправьте свой отзыв и улица закрепится за вами. Переодически проверяйте ваши улицы, т.к. их могут отобрать',
        backgroundImage: require('../assets/Tutorial3back.png'),
        backgroundImageStyle: ['80%', vh(45)],
        image: require('../assets/Tutorial4.png'),
        backgroundColor: '#59b2ab',
        marginImage: vh(21.5)
    },
    {
        key: '5',
        title: 'Копите баллы',
        text: 'За каждый отзыв вы будете получать баллы и обменивать их на подарки',
        backgroundImage: require('../assets/Tutorial4back.png'),
        backgroundImageStyle: ['100%', vh(40)],
        image: require('../assets/Tutorial5.png'),
        backgroundColor: '#febe29',
        marginImage: vh(20.5)
    },
    {
        key: '6',
        title: 'Покупайте мерч',
        text: 'В нашем магазине накопленные баллы вы можете обменять на фирменную одежду и подарки от партнёров',
        backgroundImage: require('../assets/Tutorial6back.png'),
        backgroundImageStyle: ['100%', vh(40)],
        image: require('../assets/Tutorial6.png'),
        backgroundColor: '#22bcb5',
        marginImage: vh(19.5)
    }
];

export default class IntroScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    _renderItem = ({ item }) => {
      return (
        <View style={styles.container}>
          <Image source={require('../assets/LogoApp.png')} style={styles.logoStyle} />
          <View style={{position: 'relative', width: '100%', alignItems: 'center', heigh: '100%'}}>
          <Image style={[styles.TutueialBack, {width: item.backgroundImageStyle[0], height: item.backgroundImageStyle[1], resizeMode: 'contain'}]} source={item.backgroundImage} />
          </View>
          <Image source={item.image} style={{marginTop: item.marginImage}} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.text}</Text>

          <Pressable
          style={styles.skipButton}
            onPress={() => this.props.navigation.navigate('SignInScreen')}
          >
          <Text style={styles.skip}>Пропустить обучение</Text>
        </Pressable>
        </View>
      );
    }
    _renderNextButton = () => {
        return (
          <View>
          </View>
        );
      };
      _renderDoneButton = () => {
        return (
          <View>
          </View>
        );
      };
    render() {
        return(
        <AppIntroSlider 
            dotStyle={{
                backgroundColor: '#ACCCB8'
            }}
            activeDotStyle={{
                backgroundColor: '#1E9D2D'
            }}	
            renderItem={this._renderItem} 
            data={slides}
            renderDoneButton={this._renderDoneButton}
            renderNextButton={this._renderNextButton}
        />
        );
    }
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    logoStyle: {
        width: 127,
        height: 42,
        marginTop: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 32,
        marginBottom: 4
    },
    description: {
        textAlign: 'center',
        paddingHorizontal: 20
    },
    skip: {
        color: '#1E9D2D',
    },
    skipButton: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: vh(10),
        height: '100%'
    },  
    TutueialBack: {
        position: 'absolute',
    }
})