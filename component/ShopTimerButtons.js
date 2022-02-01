import React from 'react';

import {Text, StyleSheet, Image, Pressable} from 'react-native';
import {vw, vh, vmin, vmax} from 'react-native-expo-viewport-units';
import ShopStore from '../store/ShopStore';
import {observer} from 'mobx-react';
import {View} from 'react-native';

const ShopTimerButtons = observer(({activateCallback, warningCallback}) => {
  return (
    <View>
      {ShopStore.items['freeze'] ? (
        !ShopStore.items['freeze'].isActive ? (
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => activateCallback()}>
            <Text style={styles.textStyle}>Активировать</Text>
          </Pressable>
        ) : (
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => warningCallback()}>
            <Text style={styles.textStyle}>
              {ShopStore.items['freeze'].time}
            </Text>
          </Pressable>
        )
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  button: {
    marginTop: 50,
    borderRadius: 8,
    paddingVertical: 13,
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
});

export default ShopTimerButtons;
