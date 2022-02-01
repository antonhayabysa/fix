import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen'
import SignInScreen from './SignInScreen'
import SignUpScreen from './SignUpScreen'
import IntroScreen from './IntroScreen'
import {ForgotPasswordScreen} from './ForgotPasswordScreen'

const RootSctack = createStackNavigator()

const RootSctackScreen = ({ navigation }) => (
    <RootSctack.Navigator headerMode='none'>
        <RootSctack.Screen name="SplashScreen" component={SplashScreen} />
        <RootSctack.Screen name="SignInScreen" component={SignInScreen} />
        <RootSctack.Screen name="SignUpScreen" component={SignUpScreen} />
        <RootSctack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
        <RootSctack.Screen name="IntroScreen" component={IntroScreen} />
        
    </RootSctack.Navigator>
)

export default RootSctackScreen