import React from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import {Value} from 'react-native-reanimated';
import LogoMin from '../assets/LogoMin.png';
import {observer} from 'mobx-react';
import AuthStore from '../store/AuthStore';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Path, Mask, G, Rect} from 'react-native-svg';

import {AuthContext} from '../component/context';
import { AppleButton } from '@invertase/react-native-apple-authentication';


export const THEME = {
  MAIN_COLOR: '#049AFF',
  GREY: '#6380B1',
  BLUE: '#0470F6',
  BLUE_SEC: '#00ABFB',
  WHITE: '#FFFFFF',
  GREEN: '#5CBE2F',
};
const SignInScreen = observer(({navigation, nav}) => {
  
  const [data, setData] = React.useState({
    username: '',
    password: '',
  });

  const TextInputChange = val => {
    setData({
      ...data,
      username: val,
    });
  };

  const handlePasswordChange = val => {
    setData({
      ...data,
      password: val,
    });
  };

  const {signIn, loginWithApple} = React.useContext(AuthContext);

  const loginHandler = (username, password) => {
    signIn(username, password);
    console.log('Email login verif:', AuthStore.errors['email']);
    console.log('Field error:', AuthStore.errors['non_field_errors']);
  };
const handleonAppleButtonPress=() => {
  loginWithApple()
}
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      AuthStore.setErrors({});
    });
    return unsubscribe;
  }, [navigation]);

  const sign = Platform.OS === 'ios' ? 'Sign in with ' : '';

  return (
    <View style={styles.container}>
      <View style={styles.loginLogo}>
        <Svg
          width="100"
          height="56"
          viewBox="0 0 169 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M2.60833e-07 12.7645V28.8445C1.43919e-07 32.1334 2.67467 34.7995 5.97404 34.7995H21.8C21.8 31.5136 19.1301 28.8493 15.8349 28.8445H15.947L15.9463 28.8432L6.85511 28.8098V18.4865H15.826C19.1253 18.4865 21.8 15.8204 21.8 12.5315L6.85511 12.5315V7.63618H6.41607C0.929772 7.73546 0.0129547 11.1268 2.60833e-07 12.7645Z"
            fill="#30D55C"
          />
          <Path
            d="M2.60833e-07 12.7645V28.8445C1.43919e-07 32.1334 2.67467 34.7995 5.97404 34.7995H21.8C21.8 31.5136 19.1301 28.8493 15.8349 28.8445H15.947L15.9463 28.8432L6.85511 28.8098V18.4865H15.826C19.1253 18.4865 21.8 15.8204 21.8 12.5315L6.85511 12.5315V7.63618H6.41607C0.929772 7.73546 0.0129547 11.1268 2.60833e-07 12.7645Z"
            fill="#1E9D2D"
          />
          <Path
            d="M8.48934 0.0188228V0.000244141H19.4228L19.4059 0.0188233L21.8 0.0188234C21.8 3.3077 19.1253 5.97387 15.826 5.97387L0 5.97387C1.43919e-07 2.68499 2.67467 0.0188226 5.97404 0.0188227L8.48934 0.0188228Z"
            fill="#30D55C"
          />
          <Path
            d="M8.48934 0.0188228V0.000244141H19.4228L19.4059 0.0188233L21.8 0.0188234C21.8 3.3077 19.1253 5.97387 15.826 5.97387L0 5.97387C1.43919e-07 2.68499 2.67467 0.0188226 5.97404 0.0188227L8.48934 0.0188228Z"
            fill="#1E9D2D"
          />
          <Path
            d="M35.9852 35.5993C37.4666 35.5993 38.8601 35.3879 40.1656 34.965C41.445 34.5648 42.5061 34.0595 43.3487 33.4493L43.3872 33.4401C43.3859 33.4348 43.3846 33.4294 43.3833 33.4241C43.3889 33.42 43.3944 33.4159 43.3999 33.4119L43.3605 33.3347C42.7435 31.0095 40.4101 29.5661 38.0453 30.0338C37.7242 30.0692 37.3895 30.0869 37.0413 30.0869C35.7358 30.0869 34.5844 29.8026 33.5869 29.2338C32.6042 28.6651 31.8414 27.8995 31.2987 26.937C30.756 25.9599 30.4846 24.8808 30.4846 23.6996C30.4846 22.6204 30.734 21.5923 31.2327 20.6153C31.7461 19.6382 32.4868 18.8434 33.4549 18.2309C34.423 17.6184 35.6038 17.3122 36.9973 17.3122C37.4171 17.3122 37.818 17.3379 38.2002 17.3894V17.3763C40.4474 17.4728 42.5494 16.0312 43.1871 13.7855L43.0873 13.7575C42.3096 13.2192 41.3283 12.7708 40.1436 12.4123C38.8088 12.004 37.4153 11.7998 35.9632 11.7998C34.159 11.7998 32.4941 12.1206 30.9687 12.7623C29.4432 13.4039 28.1157 14.2789 26.9863 15.3872C25.8568 16.4955 24.9767 17.7643 24.346 19.1934C23.7153 20.6225 23.3999 22.1319 23.3999 23.7214C23.3999 25.3839 23.7299 26.937 24.39 28.3807C25.0501 29.8099 25.9595 31.064 27.1183 32.1431C28.2771 33.2223 29.6119 34.0681 31.1227 34.6806C32.6482 35.2931 34.269 35.5993 35.9852 35.5993Z"
            fill="#30D55C"
          />
          <Path
            d="M35.9852 35.5993C37.4666 35.5993 38.8601 35.3879 40.1656 34.965C41.445 34.5648 42.5061 34.0595 43.3487 33.4493L43.3872 33.4401C43.3859 33.4348 43.3846 33.4294 43.3833 33.4241C43.3889 33.42 43.3944 33.4159 43.3999 33.4119L43.3605 33.3347C42.7435 31.0095 40.4101 29.5661 38.0453 30.0338C37.7242 30.0692 37.3895 30.0869 37.0413 30.0869C35.7358 30.0869 34.5844 29.8026 33.5869 29.2338C32.6042 28.6651 31.8414 27.8995 31.2987 26.937C30.756 25.9599 30.4846 24.8808 30.4846 23.6996C30.4846 22.6204 30.734 21.5923 31.2327 20.6153C31.7461 19.6382 32.4868 18.8434 33.4549 18.2309C34.423 17.6184 35.6038 17.3122 36.9973 17.3122C37.4171 17.3122 37.818 17.3379 38.2002 17.3894V17.3763C40.4474 17.4728 42.5494 16.0312 43.1871 13.7855L43.0873 13.7575C42.3096 13.2192 41.3283 12.7708 40.1436 12.4123C38.8088 12.004 37.4153 11.7998 35.9632 11.7998C34.159 11.7998 32.4941 12.1206 30.9687 12.7623C29.4432 13.4039 28.1157 14.2789 26.9863 15.3872C25.8568 16.4955 24.9767 17.7643 24.346 19.1934C23.7153 20.6225 23.3999 22.1319 23.3999 23.7214C23.3999 25.3839 23.7299 26.937 24.39 28.3807C25.0501 29.8099 25.9595 31.064 27.1183 32.1431C28.2771 33.2223 29.6119 34.0681 31.1227 34.6806C32.6482 35.2931 34.269 35.5993 35.9852 35.5993Z"
            fill="#1E9D2D"
          />
          <Path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M63.7208 34.09C61.7294 35.0962 59.4892 35.5993 57 35.5993C54.5254 35.5993 52.2852 35.0962 50.2792 34.09C48.2878 33.0692 46.7065 31.6692 45.5351 29.8901C44.3784 28.0964 43.8 26.0329 43.8 23.6996C43.8 21.3663 44.3784 19.3101 45.5351 17.5309C46.7065 15.7372 48.2878 14.3373 50.2792 13.331C52.2852 12.3102 54.5254 11.7998 57 11.7998C59.4892 11.7998 61.7294 12.3102 63.7208 13.331C65.7121 14.3373 67.2862 15.7372 68.4429 17.5309C69.6143 19.3101 70.2 21.3663 70.2 23.6996C70.2 26.0329 69.6143 28.0964 68.4429 29.8901C67.2862 31.6692 65.7121 33.0692 63.7208 34.09ZM53.8812 29.0807C54.8183 29.6057 55.8579 29.8682 57 29.8682C58.1567 29.8682 59.1963 29.6057 60.1188 29.0807C61.0559 28.5557 61.7953 27.8339 62.3371 26.9151C62.8935 25.9818 63.1717 24.91 63.1717 23.6996C63.1717 22.4892 62.8935 21.4246 62.3371 20.5059C61.7953 19.5726 61.0559 18.8434 60.1188 18.3184C59.1963 17.7934 58.1567 17.5309 57 17.5309C55.8579 17.5309 54.8183 17.7934 53.8812 18.3184C52.9587 18.8434 52.2266 19.5726 51.6848 20.5059C51.1431 21.4246 50.8722 22.4892 50.8722 23.6996C50.8722 24.91 51.1431 25.9818 51.6848 26.9151C52.2266 27.8339 52.9587 28.5557 53.8812 29.0807Z"
            fill="#30D55C"
          />
          <Path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M63.7208 34.09C61.7294 35.0962 59.4892 35.5993 57 35.5993C54.5254 35.5993 52.2852 35.0962 50.2792 34.09C48.2878 33.0692 46.7065 31.6692 45.5351 29.8901C44.3784 28.0964 43.8 26.0329 43.8 23.6996C43.8 21.3663 44.3784 19.3101 45.5351 17.5309C46.7065 15.7372 48.2878 14.3373 50.2792 13.331C52.2852 12.3102 54.5254 11.7998 57 11.7998C59.4892 11.7998 61.7294 12.3102 63.7208 13.331C65.7121 14.3373 67.2862 15.7372 68.4429 17.5309C69.6143 19.3101 70.2 21.3663 70.2 23.6996C70.2 26.0329 69.6143 28.0964 68.4429 29.8901C67.2862 31.6692 65.7121 33.0692 63.7208 34.09ZM53.8812 29.0807C54.8183 29.6057 55.8579 29.8682 57 29.8682C58.1567 29.8682 59.1963 29.6057 60.1188 29.0807C61.0559 28.5557 61.7953 27.8339 62.3371 26.9151C62.8935 25.9818 63.1717 24.91 63.1717 23.6996C63.1717 22.4892 62.8935 21.4246 62.3371 20.5059C61.7953 19.5726 61.0559 18.8434 60.1188 18.3184C59.1963 17.7934 58.1567 17.5309 57 17.5309C55.8579 17.5309 54.8183 17.7934 53.8812 18.3184C52.9587 18.8434 52.2266 19.5726 51.6848 20.5059C51.1431 21.4246 50.8722 22.4892 50.8722 23.6996C50.8722 24.91 51.1431 25.9818 51.6848 26.9151C52.2266 27.8339 52.9587 28.5557 53.8812 29.0807Z"
            fill="#1E9D2D"
          />
          <Path
            d="M138.169 16.8353C138.169 13.0376 135.09 9.95898 131.293 9.95898L131.293 23.6564C131.293 27.4541 134.371 30.5327 138.169 30.5327L138.169 16.8353Z"
            fill="#1E9D2D"
          />
          <Path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M131.734 34.0385C129.751 35.0445 127.52 35.5475 125.041 35.5475C122.577 35.5475 120.346 35.0445 118.349 34.0385C116.366 33.0179 114.791 31.6181 113.624 29.8393C112.473 28.046 111.897 25.9828 111.897 23.65C111.897 21.3171 112.473 19.2613 113.624 17.4825C114.791 15.6891 116.366 14.2894 118.349 13.2834C120.346 12.2628 122.577 11.7524 125.041 11.7524C127.52 11.7524 129.751 12.2628 131.734 13.2834C133.717 14.2894 135.284 15.6891 136.436 17.4825C137.602 19.2613 138.185 21.3171 138.185 23.65C138.185 23.8775 138.18 24.1024 138.169 24.3248L138.169 35.4514C136.165 35.4514 134.362 34.5946 133.105 33.2274C132.673 33.5201 132.215 33.7905 131.734 34.0385ZM121.935 29.0301C122.869 29.555 123.904 29.8175 125.041 29.8175C126.193 29.8175 127.228 29.555 128.147 29.0301C129.08 28.5052 129.816 27.7835 130.356 26.865C130.91 25.9318 131.187 24.8602 131.187 23.65C131.187 22.4398 130.91 21.3755 130.356 20.4569C129.816 19.5238 129.08 18.7947 128.147 18.2698C127.228 17.745 126.193 17.4825 125.041 17.4825C123.904 17.4825 122.869 17.745 121.935 18.2698C121.017 18.7947 120.288 19.5238 119.748 20.4569C119.209 21.3755 118.939 22.4398 118.939 23.65C118.939 24.8602 119.209 25.9318 119.748 26.865C120.288 27.7835 121.017 28.5052 121.935 29.0301Z"
            fill="#3C4C50"
          />
          <Path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M149.536 12.9193V9.80103C145.705 9.80103 142.6 12.8859 142.6 16.6913L142.6 56.0001C146.431 56.0001 149.536 52.8928 149.536 49.0597L149.536 34.1841C151.414 35.0527 153.506 35.487 155.813 35.487C158.285 35.487 160.523 34.982 162.527 33.9719C164.516 32.9473 166.096 31.542 167.267 29.7561C168.422 27.9557 169 25.8844 169 23.5423C169 21.2002 168.422 19.1362 167.267 17.3503C166.096 15.5498 164.516 14.1446 162.527 13.1346C160.523 12.1099 158.285 11.5976 155.813 11.5976C153.506 11.5976 151.414 12.0381 149.536 12.9193ZM158.928 28.9437C157.992 29.4707 156.954 29.7342 155.813 29.7342C154.657 29.7342 153.618 29.4707 152.697 28.9437C151.76 28.4168 151.022 27.6922 150.48 26.77C149.925 25.8331 149.647 24.7572 149.647 23.5423C149.647 22.3273 149.925 21.2587 150.48 20.3365C151.022 19.3997 151.76 18.6678 152.697 18.1408C153.618 17.6138 154.657 17.3503 155.813 17.3503C156.954 17.3503 157.992 17.6138 158.928 18.1408C159.85 18.6678 160.581 19.3997 161.123 20.3365C161.664 21.2587 161.934 22.3273 161.934 23.5423C161.934 24.7572 161.664 25.8331 161.123 26.77C160.581 27.6922 159.85 28.4168 158.928 28.9437Z"
            fill="#3C4C50"
          />
          <Path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M106.076 0.386014L106.076 0.385983L106.076 0.38581L106.076 0.385903C103.221 -0.704332 100.04 0.59356 98.7347 3.29563L98.7347 3.29488L98.7329 3.29924C98.6609 3.44845 98.5947 3.60192 98.5345 3.75951L98.2985 4.37743L91.1849 22.0334L91.031 22.3578L90.8779 22.0353L83.7634 4.37702L83.5276 3.75953C83.4674 3.60198 83.4012 3.44854 83.3292 3.29937L83.3274 3.29487L83.3274 3.29564C82.0216 0.593551 78.8411 -0.70434 75.9858 0.385942L75.9856 0.385823L73.8678 22.3623L73.8881 22.3638L72.5254 35.982C76.1193 36.3415 79.3242 33.7196 79.6838 30.1257L81.1407 15.5664L81.131 15.5654L81.2739 14.2338L81.3686 14.4819L83.9071 21.3159L88.0402 32.5338L88.3268 33.3391C88.3532 33.4131 88.383 33.4849 88.4162 33.5543L88.4218 33.5697L88.4232 33.5689C88.7992 34.342 89.5823 34.8173 90.4164 34.821C90.4236 34.8213 90.4307 34.8215 90.4379 34.8218V34.8218H90.4401C90.4873 34.8233 90.5347 34.8233 90.5822 34.8218H91.4877C91.53 34.823 91.5722 34.823 91.6142 34.8218H91.624V34.8215C91.6292 34.8214 91.6343 34.8212 91.6395 34.821C92.4759 34.8196 93.2618 34.3439 93.6388 33.569L93.64 33.5697L93.645 33.5561C93.6785 33.4861 93.7086 33.4137 93.7352 33.339L94.0274 32.5182L98.1404 21.3547L100.689 14.4938L100.788 14.234L100.931 15.5654L100.921 15.5664L102.378 30.1257C102.738 33.7196 105.943 36.3415 109.537 35.9819L108.174 22.3638L108.194 22.3623L106.076 0.38618L106.076 0.386014Z"
            fill="#3C4C50"
          />
        </Svg>
      </View>
      <Text style={styles.logintitle}>????????</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.mailinput}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCompleteType="email"
          placeholder="?????????????????????? ??????????"
          onChangeText={val => TextInputChange(val)}
        />
        {AuthStore.errors['email'] ? (
          <Text style={styles.textError}>{AuthStore.errors['email']}</Text>
        ) : null}
        <TextInput
          style={styles.passwordinput}
          placeholder="????????????"
          secureTextEntry={true}
          onChangeText={val => handlePasswordChange(val)}
        />
        {AuthStore.errors['password'] ? (
          <Text style={styles.textError}>{AuthStore.errors['password']}</Text>
        ) : null}

        {AuthStore.errors['non_field_errors'] ? (
          <Text style={styles.textError}>
            {AuthStore.errors['non_field_errors']}
          </Text>
        ) : null}
        <Pressable
          onPress={() => {
            loginHandler(data.username, data.password);
          }}
          style={({pressed}) => [
            styles.signin,
            {
              backgroundColor: pressed ? '#8BCE93' : '#1E9D2D',
            },
          ]}>
          {({pressed}) => (
            <View>
              {pressed ? (
                <LinearGradient
                  colors={['#8BCE93', '#8BCE93']}
                  style={styles.linearGradient}>
                  <Text style={styles.signinText}>??????????</Text>
                </LinearGradient>
              ) : (
                <LinearGradient
                  colors={['#1E9D2D', '#3D7606']}
                  style={styles.linearGradient}>
                  <Text style={styles.signinText}>??????????</Text>
                </LinearGradient>
              )}
            </View>
          )}
        </Pressable>
        <View style={styles.navigationButtons}>
          <Pressable onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={styles.signup}>??????????????????????</Text>
          </Pressable>
          <Text style={styles.orText}>??????</Text>
          <Pressable
            onPress={() => navigation.navigate('ForgotPasswordScreen')}>
            <Text style={styles.signup}>?????????? ????????????</Text>
          </Pressable>
        </View>
      </View>

        { Platform.OS ==='ios'? (
      <View >

          <AppleButton
             buttonStyle={AppleButton.Style.BLACK}
             buttonType={AppleButton.Type.SIGN_IN}
             style={{
               width: 230, // You must specify a width
               height: 45, // You must specify a height
             }}
            onPress={() =>handleonAppleButtonPress()}
            >
          </AppleButton>
       

      </View>
         ) : null}
    </View>
  );
});

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F7FFF9',
  },
  logintitle: {
    fontWeight: '700',
    fontSize: 24,
    marginBottom: 20,
  },
  signin: {
    width: '100%',
    paddingHorizontal: 0,
    backgroundColor: '#F7FFF9',
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    borderRadius: 12,
  },
  signup: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
    fontWeight: '700',
    marginBottom: 104,
  },
  LogAlternativItems: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  LogAlternativTitle: {
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 14,
  },
  LogAlternativ: {
    width: '100%',
  },
  LogAlternativItem: {
    marginHorizontal: 8,
  },
  mailinput: {
    borderColor: '#8BCE93',
    borderStyle: 'solid',
    borderRadius: 12,
    width: '100%',
    paddingVertical: 13,
    paddingHorizontal: 24,
    borderWidth: 1,
    marginBottom: 8,
  },
  passwordinput: {
    borderColor: '#8BCE93',
    borderStyle: 'solid',
    borderRadius: 12,
    width: '100%',
    paddingVertical: 13,
    paddingHorizontal: 24,
    borderWidth: 1,
    marginBottom: 8,
  },

  form: {
    width: '100%',
    marginBottom: '17%',
  },
  loginLogo: {
    marginBottom: 40,
  },
  textError: {
    color: 'red',
    textAlign: 'center',
    fontSize: 10,
    marginBottom: 5,
    marginTop: 5,
  },
  signinText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700',
    fontSize: 19,
  },
  applesigninButtonText:{
    
    color: '#fff',
    fontWeight: '500',
    fontSize: 19,
    marginLeft:10,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  linearGradient: {
    paddingVertical: 14,
    borderRadius: 12,
  },
  authbuttons: {
    width: '100%',
   
    marginBottom: 24,
    textAlign: 'center',
  },
  authAppleButton:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:"row",
   
    padding: 10
    
  },
  buttonsoc: {
    marginHorizontal: 8,
  },
  authtext: {
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 14,
    fontWeight: 'normal',
  },
  socialButton: {
    
    width: 200,
    marginHorizontal: 5,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  appleIcon:{
    color: "#FFFF"
  }
});
