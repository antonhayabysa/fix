import React from 'react';

import {Text, StyleSheet, Image, Pressable} from 'react-native';
import {vw, vh, vmin, vmax} from 'react-native-expo-viewport-units';
import UserStore from '../store/UserStore.js';
import {observer} from 'mobx-react';

const UserPropDisplay = observer(({style, name}) => {
  return <Text style={style}>{UserStore[name]}</Text>;
});

export default UserPropDisplay;
