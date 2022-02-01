import React, {useState, useEffect, userToken} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {API_URL} from '@env';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {StatusBar, platform} from 'react-native';
import {faCheckSquare, faCoffee} from '@fortawesome/free-solid-svg-icons';

library.add(fab, faCheckSquare, faCoffee);
import {
  HomeScreen,
  EvaluationEdit,
  ProfileScreen,
  ShopItemDetail,
  CreateEvaluation,
  CommandScreen,
  EvaluationHistory,
  NotificationScreen,
  SettingScreen,
  GroupUsersScreen,
  EditUserCommandScreen,
  CommandUserScreen,
  EditCommandScreen,
  ShopScreen,
  CreateCommandScreen,
  SearchCommandScreen,
  EditProfScreen,
  AwardsScreen,
  RatingScreen,
  ComandAwardsScreen,
  EvaluationUser,
  EvaluationUserDetail,
} from './screens';
import InfoScreen from './screens/InfoScreen';
import {NavigationContainer} from '@react-navigation/native';
import {
  Image,
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  Pressable,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RootStackScreen from './screens/RootStackScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from './component/context';
import {vw, vh, vmin, vmax} from 'react-native-expo-viewport-units';
import {
  HeaderButtons,
  HeaderButton,
  Item,
  HiddenItem,
  OverflowMenu,
} from 'react-navigation-header-buttons';
import UserPropDisplay from './component/UserPropDisplay';
import UserStore from './store/UserStore.js';
import ShopStore from './store/ShopStore.js';
import AuthStore from './store/AuthStore.js';
import {SvgXml} from 'react-native-svg';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {useDispatch, useSelector} from 'react-redux';
import authOperations from './store/redux/auth/login-operation';
import authParameters from './store/redux/auth/authParams';
import {getError} from '../store/redux/auth/auth-actions';
import authParams from './store/redux/auth/authParams';
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const AwardsStack = createStackNavigator();
const CommandStack = createStackNavigator();
const ShopStack = createStackNavigator();

// icon svg mapPage
const mapPageSvg = `
<svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M23.9167 3.5L23.73 3.535L17.5 5.95L10.5 3.5L3.92 5.71667C3.675 5.79833 3.5 6.00833 3.5 6.27667V23.9167C3.5 24.2433 3.75667 24.5 4.08333 24.5L4.27 24.465L10.5 22.05L17.5 24.5L24.08 22.2833C24.325 22.2017 24.5 21.9917 24.5 21.7233V4.08333C24.5 3.75667 24.2433 3.5 23.9167 3.5ZM17.5 22.1667L10.5 19.705V5.83333L17.5 8.295V22.1667Z" fill="#1E9D2D"/>
  <path d="M23.9167 3.5L23.73 3.535L17.5 5.95L10.5 3.5L3.92 5.71667C3.675 5.79833 3.5 6.00833 3.5 6.27667V23.9167C3.5 24.2433 3.75667 24.5 4.08333 24.5L4.27 24.465L10.5 22.05L17.5 24.5L24.08 22.2833C24.325 22.2017 24.5 21.9917 24.5 21.7233V4.08333C24.5 3.75667 24.2433 3.5 23.9167 3.5ZM17.5 22.1667L10.5 19.705V5.83333L17.5 8.295V22.1667Z" fill="#B2B2B2"/>
</svg>
`;

const mapPageSvgActive = `
<svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M23.9167 3.5L23.73 3.535L17.5 5.95L10.5 3.5L3.92 5.71667C3.675 5.79833 3.5 6.00833 3.5 6.27667V23.9167C3.5 24.2433 3.75667 24.5 4.08333 24.5L4.27 24.465L10.5 22.05L17.5 24.5L24.08 22.2833C24.325 22.2017 24.5 21.9917 24.5 21.7233V4.08333C24.5 3.75667 24.2433 3.5 23.9167 3.5ZM17.5 22.1667L10.5 19.705V5.83333L17.5 8.295V22.1667Z" fill="#1E9D2D"/>
  <path d="M23.9167 3.5L23.73 3.535L17.5 5.95L10.5 3.5L3.92 5.71667C3.675 5.79833 3.5 6.00833 3.5 6.27667V23.9167C3.5 24.2433 3.75667 24.5 4.08333 24.5L4.27 24.465L10.5 22.05L17.5 24.5L24.08 22.2833C24.325 22.2017 24.5 21.9917 24.5 21.7233V4.08333C24.5 3.75667 24.2433 3.5 23.9167 3.5ZM17.5 22.1667L10.5 19.705V5.83333L17.5 8.295V22.1667Z" fill="url(#paint0_linear)"/>
  <defs>
    <linearGradient id="paint0_linear" x1="7.91" y1="5.915" x2="19.25" y2="20.825" gradientUnits="userSpaceOnUse">
      <stop stop-color="#1E9D2D"/>
      <stop offset="1" stop-color="#3D7606"/>
    </linearGradient>
  </defs>
</svg>
`;

// icon svg accountPage
const accountPageSvg = `
<svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14 13.9998C16.5783 13.9998 18.6666 11.9115 18.6666 9.33317C18.6666 6.75484 16.5783 4.6665 14 4.6665C11.4216 4.6665 9.33329 6.75484 9.33329 9.33317C9.33329 11.9115 11.4216 13.9998 14 13.9998ZM14 16.3332C10.885 16.3332 4.66663 17.8965 4.66663 20.9998V23.3332H23.3333V20.9998C23.3333 17.8965 17.115 16.3332 14 16.3332Z" fill="#B2B2B2"/>
</svg>
`;

const accountPageSvgActive = `
<svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M13.9998 13.9998C16.5782 13.9998 18.6665 11.9115 18.6665 9.33317C18.6665 6.75484 16.5782 4.6665 13.9998 4.6665C11.4215 4.6665 9.33317 6.75484 9.33317 9.33317C9.33317 11.9115 11.4215 13.9998 13.9998 13.9998ZM13.9998 16.3332C10.8848 16.3332 4.6665 17.8965 4.6665 20.9998V23.3332H23.3332V20.9998C23.3332 17.8965 17.1148 16.3332 13.9998 16.3332Z" fill="#B2B2B2"/>
  <path d="M13.9998 13.9998C16.5782 13.9998 18.6665 11.9115 18.6665 9.33317C18.6665 6.75484 16.5782 4.6665 13.9998 4.6665C11.4215 4.6665 9.33317 6.75484 9.33317 9.33317C9.33317 11.9115 11.4215 13.9998 13.9998 13.9998ZM13.9998 16.3332C10.8848 16.3332 4.6665 17.8965 4.6665 20.9998V23.3332H23.3332V20.9998C23.3332 17.8965 17.1148 16.3332 13.9998 16.3332Z" fill="url(#paint0_linear)"/>
  <defs>
    <linearGradient id="paint0_linear" x1="8.5865" y1="6.81317" x2="18.6665" y2="20.0665" gradientUnits="userSpaceOnUse">
      <stop stop-color="#1E9D2D"/>
      <stop offset="1" stop-color="#3D7606"/>
    </linearGradient>
  </defs>
</svg>
`;

// icon svg awwardsPage
const awwardsPageSvg = `
<svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M13.9885 2.3335C7.5485 2.3335 2.3335 7.56016 2.3335 14.0002C2.3335 20.4402 7.5485 25.6668 13.9885 25.6668C20.4402 25.6668 25.6668 20.4402 25.6668 14.0002C25.6668 7.56016 20.4402 2.3335 13.9885 2.3335ZM18.9352 21.0002L14.0002 18.0252L9.06516 21.0002L10.3718 15.3885L6.02016 11.6202L11.7602 11.1302L14.0002 5.8335L16.2402 11.1185L21.9802 11.6085L17.6285 15.3768L18.9352 21.0002Z" fill="#B2B2B2"/>
</svg>
`;

const awwardsPageSvgActive = `
<svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M13.988 2.3335C7.54801 2.3335 2.33301 7.56016 2.33301 14.0002C2.33301 20.4402 7.54801 25.6668 13.988 25.6668C20.4397 25.6668 25.6663 20.4402 25.6663 14.0002C25.6663 7.56016 20.4397 2.3335 13.988 2.3335ZM18.9347 21.0002L13.9997 18.0252L9.06467 21.0002L10.3713 15.3885L6.01967 11.6202L11.7597 11.1302L13.9997 5.8335L16.2397 11.1185L21.9797 11.6085L17.628 15.3768L18.9347 21.0002Z" fill="#B2B2B2"/>
  <path d="M13.988 2.3335C7.54801 2.3335 2.33301 7.56016 2.33301 14.0002C2.33301 20.4402 7.54801 25.6668 13.988 25.6668C20.4397 25.6668 25.6663 20.4402 25.6663 14.0002C25.6663 7.56016 20.4397 2.3335 13.988 2.3335ZM18.9347 21.0002L13.9997 18.0252L9.06467 21.0002L10.3713 15.3885L6.01967 11.6202L11.7597 11.1302L13.9997 5.8335L16.2397 11.1185L21.9797 11.6085L17.628 15.3768L18.9347 21.0002Z" fill="url(#paint0_linear)"/>
  <defs>
    <linearGradient id="paint0_linear" x1="7.23301" y1="5.01683" x2="19.833" y2="21.5835" gradientUnits="userSpaceOnUse">
      <stop stop-color="#1E9D2D"/>
      <stop offset="1" stop-color="#3D7606"/>
    </linearGradient>
  </defs>
</svg>
`;

// icon svg groupPage
const groupPageSvg = `
<svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18.667 12.8335C20.6037 12.8335 22.1553 11.2702 22.1553 9.3335C22.1553 7.39683 20.6037 5.8335 18.667 5.8335C16.7303 5.8335 15.167 7.39683 15.167 9.3335C15.167 11.2702 16.7303 12.8335 18.667 12.8335ZM9.33366 12.8335C11.2703 12.8335 12.822 11.2702 12.822 9.3335C12.822 7.39683 11.2703 5.8335 9.33366 5.8335C7.39699 5.8335 5.83366 7.39683 5.83366 9.3335C5.83366 11.2702 7.39699 12.8335 9.33366 12.8335ZM9.33366 15.1668C6.61532 15.1668 1.16699 16.5318 1.16699 19.2502V22.1668H17.5003V19.2502C17.5003 16.5318 12.052 15.1668 9.33366 15.1668ZM18.667 15.1668C18.3287 15.1668 17.9437 15.1902 17.5353 15.2252C18.8887 16.2052 19.8337 17.5235 19.8337 19.2502V22.1668H26.8337V19.2502C26.8337 16.5318 21.3853 15.1668 18.667 15.1668Z" fill="#B2B2B2"/>
</svg>
`;

const groupPageSvgActive = `
<svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18.667 12.8335C20.6037 12.8335 22.1553 11.2702 22.1553 9.3335C22.1553 7.39683 20.6037 5.8335 18.667 5.8335C16.7303 5.8335 15.167 7.39683 15.167 9.3335C15.167 11.2702 16.7303 12.8335 18.667 12.8335ZM9.33366 12.8335C11.2703 12.8335 12.822 11.2702 12.822 9.3335C12.822 7.39683 11.2703 5.8335 9.33366 5.8335C7.39699 5.8335 5.83366 7.39683 5.83366 9.3335C5.83366 11.2702 7.39699 12.8335 9.33366 12.8335ZM9.33366 15.1668C6.61532 15.1668 1.16699 16.5318 1.16699 19.2502V22.1668H17.5003V19.2502C17.5003 16.5318 12.052 15.1668 9.33366 15.1668ZM18.667 15.1668C18.3287 15.1668 17.9437 15.1902 17.5353 15.2252C18.8887 16.2052 19.8337 17.5235 19.8337 19.2502V22.1668H26.8337V19.2502C26.8337 16.5318 21.3853 15.1668 18.667 15.1668Z" fill="#B2B2B2"/>
  <path d="M18.667 12.8335C20.6037 12.8335 22.1553 11.2702 22.1553 9.3335C22.1553 7.39683 20.6037 5.8335 18.667 5.8335C16.7303 5.8335 15.167 7.39683 15.167 9.3335C15.167 11.2702 16.7303 12.8335 18.667 12.8335ZM9.33366 12.8335C11.2703 12.8335 12.822 11.2702 12.822 9.3335C12.822 7.39683 11.2703 5.8335 9.33366 5.8335C7.39699 5.8335 5.83366 7.39683 5.83366 9.3335C5.83366 11.2702 7.39699 12.8335 9.33366 12.8335ZM9.33366 15.1668C6.61532 15.1668 1.16699 16.5318 1.16699 19.2502V22.1668H17.5003V19.2502C17.5003 16.5318 12.052 15.1668 9.33366 15.1668ZM18.667 15.1668C18.3287 15.1668 17.9437 15.1902 17.5353 15.2252C18.8887 16.2052 19.8337 17.5235 19.8337 19.2502V22.1668H26.8337V19.2502C26.8337 16.5318 21.3853 15.1668 18.667 15.1668Z" fill="url(#paint0_linear)"/>
  <defs>
    <linearGradient id="paint0_linear" x1="6.55699" y1="7.71183" x2="13.735" y2="22.5426" gradientUnits="userSpaceOnUse">
      <stop stop-color="#1E9D2D"/>
      <stop offset="1" stop-color="#3D7606"/>
    </linearGradient>
  </defs>
</svg>
`;

// icon svg shopPage
const shopPageSvg = `
<svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.16699 20.9997C6.88366 20.9997 5.84532 22.0497 5.84532 23.333C5.84532 24.6163 6.88366 25.6663 8.16699 25.6663C9.45032 25.6663 10.5003 24.6163 10.5003 23.333C10.5003 22.0497 9.45032 20.9997 8.16699 20.9997ZM1.16699 2.33301V4.66634H3.50033L7.70032 13.5213L6.12532 16.3797C5.93866 16.7063 5.83366 17.0913 5.83366 17.4997C5.83366 18.783 6.88366 19.833 8.16699 19.833H22.167V17.4997H8.65699C8.49366 17.4997 8.36532 17.3713 8.36532 17.208L8.40032 17.068L9.45033 15.1663H18.142C19.017 15.1663 19.787 14.688 20.1837 13.9647L24.3603 6.39301C24.4537 6.22967 24.5003 6.03134 24.5003 5.83301C24.5003 5.19134 23.9753 4.66634 23.3337 4.66634H6.07866L4.98199 2.33301H1.16699ZM19.8337 20.9997C18.5503 20.9997 17.512 22.0497 17.512 23.333C17.512 24.6163 18.5503 25.6663 19.8337 25.6663C21.117 25.6663 22.167 24.6163 22.167 23.333C22.167 22.0497 21.117 20.9997 19.8337 20.9997Z" fill="#B2B2B2"/>
</svg>
`;

const shopPageSvgActive = `
<svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.16675 20.9997C6.88341 20.9997 5.84508 22.0497 5.84508 23.333C5.84508 24.6163 6.88341 25.6663 8.16675 25.6663C9.45008 25.6663 10.5001 24.6163 10.5001 23.333C10.5001 22.0497 9.45008 20.9997 8.16675 20.9997ZM1.16675 2.33301V4.66634H3.50008L7.70008 13.5213L6.12508 16.3797C5.93841 16.7063 5.83341 17.0913 5.83341 17.4997C5.83341 18.783 6.88341 19.833 8.16675 19.833H22.1667V17.4997H8.65675C8.49341 17.4997 8.36508 17.3713 8.36508 17.208L8.40008 17.068L9.45008 15.1663H18.1417C19.0167 15.1663 19.7867 14.688 20.1834 13.9647L24.3601 6.39301C24.4534 6.22967 24.5001 6.03134 24.5001 5.83301C24.5001 5.19134 23.9751 4.66634 23.3334 4.66634H6.07841L4.98175 2.33301H1.16675ZM19.8334 20.9997C18.5501 20.9997 17.5117 22.0497 17.5117 23.333C17.5117 24.6163 18.5501 25.6663 19.8334 25.6663C21.1167 25.6663 22.1667 24.6163 22.1667 23.333C22.1667 22.0497 21.1167 20.9997 19.8334 20.9997Z" fill="#B2B2B2"/>
  <path d="M8.16675 20.9997C6.88341 20.9997 5.84508 22.0497 5.84508 23.333C5.84508 24.6163 6.88341 25.6663 8.16675 25.6663C9.45008 25.6663 10.5001 24.6163 10.5001 23.333C10.5001 22.0497 9.45008 20.9997 8.16675 20.9997ZM1.16675 2.33301V4.66634H3.50008L7.70008 13.5213L6.12508 16.3797C5.93841 16.7063 5.83341 17.0913 5.83341 17.4997C5.83341 18.783 6.88341 19.833 8.16675 19.833H22.1667V17.4997H8.65675C8.49341 17.4997 8.36508 17.3713 8.36508 17.208L8.40008 17.068L9.45008 15.1663H18.1417C19.0167 15.1663 19.7867 14.688 20.1834 13.9647L24.3601 6.39301C24.4534 6.22967 24.5001 6.03134 24.5001 5.83301C24.5001 5.19134 23.9751 4.66634 23.3334 4.66634H6.07841L4.98175 2.33301H1.16675ZM19.8334 20.9997C18.5501 20.9997 17.5117 22.0497 17.5117 23.333C17.5117 24.6163 18.5501 25.6663 19.8334 25.6663C21.1167 25.6663 22.1667 24.6163 22.1667 23.333C22.1667 22.0497 21.1167 20.9997 19.8334 20.9997Z" fill="url(#paint0_linear)"/>
  <defs>
    <linearGradient id="paint0_linear" x1="6.06675" y1="5.01634" x2="18.6667" y2="21.583" gradientUnits="userSpaceOnUse">
      <stop stop-color="#1E9D2D"/>
      <stop offset="1" stop-color="#3D7606"/>
    </linearGradient>
  </defs>
</svg>
`;

let user = {};


const header = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `${AuthStore.loggedVia === 'apple' ? authParams.bearer : authParams.token} ${UserStore.token}`,
}

export {header}
const getUserInfo = async () => {
    let loginVia = null
    loginVia = await AsyncStorage.getItem('loggedVia');
   
  const userResponse = await fetch('https://www.ecomap.online/api/auth/user/', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `${loginVia === 'apple' ? authParams.bearer : authParams.token} ${UserStore.token}`,
    },
  });
  const user = await userResponse.json();
  console.log("User from Home: " + user.crown)
  UserStore.setCrowns(user.crown);
  // NOTE Вставить id команды
  // UserStore.setTeamID(user.teams);
};

const HEADER_HEIGHT = Platform.OS === 'ios' ? 44 : 20;
const HomeStackScreen = ({navigation}) => {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await getUserInfo();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <HomeStack.Navigator
      screenOptions={({navigation}) => ({
        header: () => (
          <View style={{width: vw(101), top: HEADER_HEIGHT}}>
            <StatusBar
              translucent
              backgroundColor="#fff"
              barStyle="dark-content"
            />
            <HeaderButtons>
              <Pressable
                style={[styles.HeaderButton, styles.firstHeaderButton]}>
                <Image
                  source={require('./assets/mdi_logo.png')}
                  style={styles.HeaderButtonImage}
                />
              </Pressable>
              <Pressable style={styles.HeaderButton}>
                <Image
                  source={require('./assets/crownHeader.png')}
                  style={styles.HeaderButtonImage}
                />
                <UserPropDisplay
                  style={styles.headerCrownText}
                  name={'crowns'}
                />
              </Pressable>
              <Pressable
                style={styles.HeaderButton}
                onPress={() => navigation.navigate('SettingScreen')}>
                <Image
                  source={require('./assets/mdi_settingsHeader.png')}
                  style={styles.HeaderButtonImage}
                />
              </Pressable>
              <Pressable
                style={[styles.HeaderButton, styles.lastHeaderButton]}
                onPress={() => navigation.navigate('NotificationScreen')}>
                <Image
                  source={require('./assets/mdi_notificationsHeader.png')}
                  style={styles.HeaderButtonImage}
                />
              </Pressable>
            </HeaderButtons>
          </View>
        ),
      })}>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: '',
        }}
      />
      <HomeStack.Screen
        name="EvaluationEdit"
        component={EvaluationEdit}
        options={{
          title: '',
        }}
      />
      <HomeStack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          title: 'Уведомления',
          // headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          title: 'Настройки',
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="EvaluationHistory"
        component={EvaluationHistory}
        options={{
          title: 'История Оценок',
        }}
      />
      <HomeStack.Screen
        name="CreateEvaluation"
        component={CreateEvaluation}
        options={{
          title: 'Оставить оценку',
        }}
      />
      <HomeStack.Screen
        name="EvaluationUser"
        component={EvaluationUser}
        options={{
          title: 'EvaluationUser',
        }}
      />
      <HomeStack.Screen
        name="EvaluationUserDetail"
        component={EvaluationUserDetail}
        options={{
          title: 'EvaluationUserDetail',
        }}
      />
    </HomeStack.Navigator>
  );
};
function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#F3F5F5',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'normal',
          textAlign: 'center',
        },
      }}>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: 'Профиль',
        }}
      />
      <ProfileStack.Screen
        name="RatingScreen"
        component={RatingScreen}
        options={{
          title: 'Рейтинг',
        }}
      />
      <ProfileStack.Screen
        name="InfoScreen"
        component={InfoScreen}
        options={{
          title: 'Информация',
        }}
      />
      <ProfileStack.Screen
        name="EditProfScreen"
        component={EditProfScreen}
        options={{
          title: 'Профиль',
        }}
      />
    </ProfileStack.Navigator>
  );
}
function AwardsStackScreen() {
  return (
    <AwardsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#F3F5F5',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'normal',
          textAlign: 'center',
        },
      }}>
      <AwardsStack.Screen
        name="AwardsScreen"
        component={AwardsScreen}
        options={{
          title: 'Награды',
        }}
      />
    </AwardsStack.Navigator>
  );
}

let checkSubscribe = user.is_subscribe;

function CommandStackScreen() {
  if (checkSubscribe) {
    return (
      <CommandStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#F3F5F5',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'normal',
            textAlign: 'center',
          },
        }}>
        <CommandStack.Screen
          name="CommandUserScreen"
          component={CommandUserScreen}
          options={{
            title: 'Команды',
          }}
        />
        {UserStore.teamID ? (
          <CommandStack.Screen
            name="CommandScreen"
            component={CommandUserScreen}
            options={{
              title: 'Команды',
            }}
            initialParams={{
              id: UserStore.teamID,
            }}
          />
        ) : (
          <CommandStack.Screen
            name="CommandScreen"
            component={CommandScreen}
            options={{
              title: 'Команды',
            }}
          />
        )}

        <CommandStack.Screen
          name="CreateCommandScreen"
          component={CreateCommandScreen}
          options={{
            title: 'Команды',
          }}
        />
        <CommandStack.Screen
          name="SearchCommandScreen"
          component={SearchCommandScreen}
          options={{
            title: 'Команды',
          }}
        />

        <CommandStack.Screen
          name="EditCommandScreen"
          component={EditCommandScreen}
          options={{
            title: 'Команды',
          }}
        />
        <CommandStack.Screen
          name="EditUserCommandScreen"
          component={EditUserCommandScreen}
          options={{
            title: 'Команды',
          }}
        />
        <CommandStack.Screen
          name="GroupUsersScreen"
          component={GroupUsersScreen}
          options={{
            title: 'Участники',
          }}
        />
        <CommandStack.Screen
          name="ComandAwardsScreen"
          component={ComandAwardsScreen}
          options={{
            title: 'Награды',
          }}
        />
      </CommandStack.Navigator>
    );
  } else {
    return (
      <CommandStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#F3F5F5',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'normal',
            textAlign: 'center',
          },
        }}>
        {UserStore.teamID ? (
          <CommandStack.Screen
            name="CommandScreen"
            component={CommandUserScreen}
            options={{
              title: 'Команды',
            }}
            initialParams={{
              id: UserStore.teamID,
            }}
          />
        ) : (
          <CommandStack.Screen
            name="CommandScreen"
            component={CommandScreen}
            options={{
              title: 'Команды',
            }}
          />
        )}
        <CommandStack.Screen
          name="CommandUserScreen"
          component={CommandUserScreen}
          options={{
            title: 'Команды',
          }}
        />
        <CommandStack.Screen
          name="CreateCommandScreen"
          component={CreateCommandScreen}
          options={{
            title: 'Команды',
          }}
        />
        <CommandStack.Screen
          name="SearchCommandScreen"
          component={SearchCommandScreen}
          options={{
            title: 'Команды',
          }}
        />

        <CommandStack.Screen
          name="EditCommandScreen"
          component={EditCommandScreen}
          options={{
            title: 'Команды',
          }}
        />
        <CommandStack.Screen
          name="EditUserCommandScreen"
          component={EditUserCommandScreen}
          options={{
            title: 'Команды',
          }}
        />
        <CommandStack.Screen
          name="GroupUsersScreen"
          component={GroupUsersScreen}
          options={{
            title: 'Участники',
          }}
        />
        <CommandStack.Screen
          name="ComandAwardsScreen"
          component={ComandAwardsScreen}
          options={{
            title: 'Награды',
          }}
        />
      </CommandStack.Navigator>
    );
  }
}
function ShopStackScreen() {
  return (
    <ShopStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#F3F5F5',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'normal',
          textAlign: 'center',
        },
      }}>
      <ShopStack.Screen
        name="ShopScreen"
        component={ShopScreen}
        options={{
          title: 'Магазин',
        }}
      />
      <ShopStack.Screen
        name="ShopItemDetail"
        component={ShopItemDetail}
        options={{
          title: 'Магазин',
        }}
      />
    </ShopStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const App = () => {
  // const [isLoading, setIsLoading] = React.useState(true); //Проверяем авторизован пользователь или нет
  // const [userToken, setUserToken] = React.useState(null);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  React.useEffect(async () => {

   // console.log('fdghjklfghjk gjhkjhgj');

    let granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (!granted) {
      granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    }
    console.log('fdghjklfghjk gjhkjhgj 344');

  }, []);

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );
  
  // const [userToken, setUserToken] = React.useState(null);

  const authContext = React.useMemo(
    () => ({
      signIn: async (username, password) => {
        fetch('https://www.ecomap.online/auth/token/login/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            password: password,
            email: username,
          }),
        })
          .then(response => response.json())
          .then(json => {
            if (json.auth_token) {
              console.log(json.auth_token);
              token = json.auth_token;
              UserStore.setUserToken(token);
              AsyncStorage.setItem('userToken', token);
              AuthStore.setErrors(false);
              AuthStore.setLoggedVia('email');
              AsyncStorage.setItem('loggedVia', AuthStore.loggedVia);
              console.log(AuthStore.loggedVia);
            } else {
              AuthStore.setErrors(json);
            }
          })
          .catch(error => {
            alert(error);
          })
          .then(res => {
            fetch('https://www.ecomap.online/api/auth/user/', {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Token ${UserStore.token}`,
              },
            })
              .then(response => response.json())
              .then(json => {
                UserStore.setCrowns(json.crown);
                UserStore.setMoney(json.balance);
                UserStore.setRang(json.rang);

                //хардкод
                ShopStore.addItem('freeze', {isActive: false, time: null});
              })
              .catch(error => {
                console.error(error);
              });
          })
          .finally(() => {
            console.log(token);
            dispatch({type: 'LOGIN', token: token});
          });
      },

      // Login with Apple
      loginWithApple: async (nav) => {
        try {
          const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
          });

          const {user, email, identityToken} = appleAuthRequestResponse;
          console.log('Apple user:', identityToken);
          fetch('https://ecomap.online/auth/convert-token/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              grant_type: 'convert_token',
              client_id: 'vFlQ7AEsxEB01SBOzEewm8silWVHNIByjiMRMRbl',
              client_secret: 'qxacfcySqhw9a6KMq3UWTkko0jhmPG4NtAwVbUeisALNHbiet5L0e7rZPS3Ljz10dULkwGhKDq5hzDwHaiwEINJrRTkOQXZ329KUY354QumshrAH0JYzTk8qPmFDsA3z',
              backend: 'apple-id',
              token: identityToken,
            }),
          })
            .then(response => response.json())
            .then(data => {
              //console.log("Apple user from server", data)

              
              if (data.access_token) {
                console.log("access_token",data.access_token);
                token = data.access_token;
                UserStore.setUserToken(token);
                AsyncStorage.setItem('userToken', token);
                AuthStore.setErrors(false);

                AuthStore.setLoggedVia('apple');
                AsyncStorage.setItem('loggedVia', AuthStore.loggedVia)
                console.log("Via Apple:", AuthStore.loggedVia);

              } else {
                AuthStore.setErrors(data);
              }
            })
            .catch(error => {
              alert(error);
            }).then(res => {
              fetch('https://www.ecomap.online/api/auth/user/', {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${UserStore.token}`,
                },
              })
                .then(response => response.json())
                .then(data => {
                  console.log('Apple user info: ' + data.city)
                  UserStore.setCrowns(data.crown);
                  UserStore.setMoney(data.balance);
                  UserStore.setRang(data.rang);

                  ShopStore.addItem('freeze', {isActive: false, time: null});
                })
                .catch(error => {
                  console.error(error);
                });
            }).finally(() => {
              console.log("User apple token:",token);
              dispatch({type: 'LOGIN', token: token});
            });

          if (email != null) {
            const userConfig = {
              [authParameters.login]: email,
              [authParameters.apple]: user,
            };
            
            await dispatch(authOperations.login(userConfig, nav));
          }
          console.warn(`Apple Authentication Completed, ${user}, ${email}`);
        } catch (error) {
          if (error.code === appleAuth.Error.CANCELED) {
            console.warn('User canceled Apple Sign in.');
          } else {
            console.error(error);
          }
        }
      },
      // Ends Login with Apple
      signOut: async () => {
        try {
          let loginVia = null
          loginVia = await AsyncStorage.getItem('loggedVia');
         
          const token = UserStore.token;
          console.log('User stored token: ' + token)
          const LOUGOUT_URL = `${API_URL}/auth/token/logout`;
          fetch(LOUGOUT_URL, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `${loginVia === 'apple' ? authParams.bearer : authParams.token} ${UserStore.token}`,
            },
          })
            .then(response => response)
            .then(json => {
              console.log(json.status);
              console.log('User from logout:', json);
                if (json.status == 204) {
                    console.log(`User with token ${token} was loged out successfully!`,);
                    AsyncStorage.removeItem('userToken')
                    AuthStore.setErrors(false);
                  } else {
                  AuthStore.setErrors(json);
              }
            });
          
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      signUp: () => {
        // setUserToken('fgkj');
        // setIsLoading(false);
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      
      let userToken = null;
      let loginVia = null
      loginVia = await AsyncStorage.getItem('loggedVia');
     
      try {
        userToken = await AsyncStorage.getItem('userToken');
        
        if (userToken) {
          const response = await fetch(
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
          const result = await response.json();
          UserStore.setCrowns(result.crown);
          UserStore.setMoney(result.balance);
          UserStore.setRang(result.rang);
          UserStore.setUserToken(userToken);
          //хардкод
          ShopStore.addItem('freeze', {isActive: false, time: null});
          //dispatch({type: 'LOGIN', token: userToken});
        }
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'REGISTER', token: userToken});
    }, 1000);
  }, [userToken]);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken != null ? (
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <Tab.Navigator
              barStyle={styles.BottomBarStyle}
              tabBarOptions={{
                style: {
                  height: 85,
                  borderTopLeftRadius: 25,
                  borderTopRightRadius: 25,
                  position: 'absolute',
                },
                tabStyle: {
                  paddingTop: 15,
                },
              }}>
              <Tab.Screen
                name="HomeScreen"
                component={HomeStackScreen}
                options={{
                  tabBarLabel: '',
                  tabBarIcon: ({focused, size}) =>
                    focused ? (
                      <SvgXml xml={mapPageSvgActive} />
                    ) : (
                      <SvgXml xml={mapPageSvg} />
                    ),
                }}
              />
              <Tab.Screen
                name="ProfileScreen"
                component={ProfileStackScreen}
                options={{
                  tabBarLabel: '',
                  tabBarIcon: ({focused, size}) =>
                    focused ? (
                      <SvgXml xml={accountPageSvgActive} />
                    ) : (
                      <SvgXml xml={accountPageSvg} />
                    ),
                }}
              />
              <Tab.Screen
                name="AwardsScreen"
                component={AwardsStackScreen}
                options={{
                  tabBarLabel: '',
                  tabBarIcon: ({focused, size}) =>
                    focused ? (
                      <SvgXml xml={awwardsPageSvgActive} />
                    ) : (
                      <SvgXml xml={awwardsPageSvg} />
                    ),
                }}
              />
              <Tab.Screen
                name="CommandScreen"
                component={CommandStackScreen}
                options={{
                  tabBarLabel: '',
                  tabBarIcon: ({focused, size}) =>
                    focused ? (
                      <SvgXml xml={groupPageSvgActive} />
                    ) : (
                      <SvgXml xml={groupPageSvg} />
                    ),
                }}
              />
            </Tab.Navigator>
          </SafeAreaProvider>
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  BottomBarStyle: {
    zIndex: 1000,
  },
  dolbaeb: {
    backgroundColor: 'green',
  },
  firstHeaderButton: {
    // backgroundColor: '#000',
    borderBottomLeftRadius: 30,
  },
  lastHeaderButton: {
    // backgroundColor: '#000',
    borderBottomRightRadius: 30,
  },
  HeaderButton: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // minWidth: vw(25),
    width: '25%',
    // borderRadius: 2,
    // zIndex: 1000,
    // height: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    // alignContent: 'space-between'
    // width: vw(25),
    // position: 'absolute'
  },
  HeaderButtonImage: {
    width: 32,
    height: 32,
  },
  headerCrownText: {
    marginLeft: 4,
    fontSize: 19,
    fontWeight: '700',
  },
});
