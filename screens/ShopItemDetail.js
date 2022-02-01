import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import ShopStore from '../store/ShopStore';
import ShopTimerButtons from '../component/ShopTimerButtons';
import UserStore from '../store/UserStore.js';
import UserPropDisplay from '../component/UserPropDisplay.js';

const showBuyWarning = () => {
  alert('Вы не можете активировать товар');
};

const activateItem = () => {
  const time = new Date();
  const now = new Date().getTime();

  time.setSeconds(time.getSeconds() + 20);

  ShopStore.setActive('freeze', true);
  ShopStore.setTime('freeze', time.getTime() - now + ' МС');

  const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = time.getTime() - now;

    if (distance < 0) {
      clearInterval(timer);
      ShopStore.setActive('freeze', false);
      ShopStore.setTime('freeze', null);
    } else {
      ShopStore.setTime('freeze', distance + ' МС');
    }
  }, 1000);
};

class ShopItemDetail extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.ShopTitle}>
            <Text style={styles.ShopTitleText}>Мой счет</Text>
            <View style={styles.ShopTitleCoin}>
              <UserPropDisplay style={styles.TextCoin} name={'money'} />
              <Image source={require('../assets/coin.png')} />
            </View>
          </View>
          <View style={styles.itemDetail}>
            <Text style={styles.itemDetailTitle}>Ледниковый период</Text>
            <View style={styles.itemDetailPrice}>
              <Text style={styles.itemDetailPriceText}>100 монет</Text>
              <Image source={require('../assets/coinMini.png')} />
            </View>
            <Text style={styles.itemDetailDescript}>
              Купив эту способность, все улицы которые закреплены за вами
              заморозятся на 14 дней. Никто не сможет ее занять в течение этого
              времени.
            </Text>

            <Text style={styles.itemDetailDescript}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
              aliquam, purus sit amet luctus venenatis, lectus magna fringilla
              urna, porttitor rhoncus dolor purus non enim praesent{' '}
            </Text>
            {/* <ShopTimerButtons
            activateCallback={activateItem}
            warningCallback={showBuyWarning}
          /> */}

            <Pressable
              style={styles.buttonHistory}
              onPress={() => {
                this.props.navigation.navigate('HomeScreen', {
                  screen: 'HomeScreen',
                  params: {
                    activatorFreezStreet: true,
                  },
                });
              }}>
              <Text>Активировать</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default ShopItemDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  ShopTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 23,
    alignItems: 'center',
    marginBottom: 20,
  },
  ShopTitleText: {
    fontSize: 16,
    fontWeight: '700',
  },
  ShopTitleCoin: {
    flexDirection: 'row',
  },
  TextCoin: {
    color: '#F6C358',
    fontWeight: '700',
    fontSize: 24,
    marginRight: 8,
  },
  itemDetailTitle: {
    fontWeight: '700',
    fontSize: 24,
    marginBottom: 12,
  },
  itemDetailPrice: {
    flexDirection: 'row',
  },
  itemDetailPriceText: {
    fontSize: 12,
    marginRight: 8,
    marginBottom: 16,
  },
  itemDetailDescript: {
    fontSize: 10,
  },
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
  buttonHistory: {
    borderRadius: 12,
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 0,
    backgroundColor: '#1E9D2D',
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    flex: 1,
    marginTop: '65%'
  },
  signinText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
