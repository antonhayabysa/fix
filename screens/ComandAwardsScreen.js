import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import {vw, vh, vmin, vmax} from 'react-native-expo-viewport-units';
import Clipboard from '@react-native-clipboard/clipboard';

const ComandAwardsScreen = ({route, navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.awardsTitle}>
        Все награды команды с ID = {route.params.id}
      </Text>

      <View style={styles.awardsItems}>
        <ScrollView style={styles.awardsScroll}>
          <View style={styles.awardsItem}>
            <Image
              source={require('../assets/openAwards.png')}
              style={styles.awardsItemImage}
            />
            <View style={styles.awardsItemDetail}>
              <Text style={styles.awardsItemTitle}>Название</Text>
              <Text style={styles.awardsItemSubTitle}>Описание</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ComandAwardsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  awardsProgressText: {
    fontWeight: '400',
    fontSize: 8,
    marginBottom: 8,
  },
  awardsItem: {
    flexDirection: 'row',
    flex: 0,
  },
  awardsTitle: {
    fontWeight: '700',
    fontSize: 14,
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  awardsStatusPointBlock: {
    flexDirection: 'row',
  },
  awardsStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  awardsStatusName: {
    color: '#806727',
    fontSize: 24,
    fontWeight: '700',
  },
  awardsStatusPoint: {
    fontSize: 32,
    fontWeight: '700',
    color: '#806727',
    marginLeft: 8,
  },
  awardsStatusProgress: {
    paddingBottom: 16,
    borderBottomColor: '#C4C4C4',
    borderBottomWidth: 1,
    marginHorizontal: 20,
  },
  awardsItemSubTitle: {
    maxWidth: '83%',
  },
  awardsScroll: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  awardsItemDetail: {
    width: '100%',
  },
});
