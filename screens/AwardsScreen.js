import React from 'react';
import GLOBAL from '../global.js';
import {Text, View, Image, StyleSheet, ScrollView, Platform} from 'react-native';
import UserPropDisplay from '../component/UserPropDisplay.js';
import UserStore from '../store/UserStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SvgXml } from 'react-native-svg';
import {
  rewardsAllDaysSVG_bronze,
  rewardsAllDaysSVG_silver,
  rewardsAllDaysSVG_gold,
  rewardsInviteSVG_bronze,
  rewardsInviteSVG_silver,
  rewardsInviteSVG_gold,
  rewardsCitySVG_bronze,
  rewardsCitySVG_silver,
  rewardsCitySVG_gold,
  rewardsUniqueCommentSVG_bronze,
  rewardsUniqueCommentSVG_silver,
  rewardsUniqueCommentSVG_gold,
  rewardsCapturedSVG_bronze,
  rewardsCapturedSVG_silver,
  rewardsCapturedSVG_gold,
  rewardsFreezSVG_bronze,
  rewardsFreezSVG_silver,
  rewardsFreezSVG_gold,
  rewardsStreetSVG_stepOne,
  rewardsStreetSVG_stepTwo,
  rewardsStreetSVG_stepThree,
  rewardsStreetSVG_stepFour,
  rewardsStreetSVG_stepFive,
  rewardsRatedSVG_stepOne,
  rewardsRatedSVG_stepTwo,
  rewardsRatedSVG_stepThree,
  rewardsRatedSVG_stepFour,
  rewardsMerchSVG,
  rewardsBlock,
  rewardsTeamSVG,
} from '../assets/svgimg'
import authParams from '../store/redux/auth/authParams.js';
import AuthStore from '../store/AuthStore.js';

const AwardsScreen = ({navigation}) => {
  // Все ачивки
  const [userRewards, setUserRewards] = React.useState([]);
  // NOTE Ачивка несколько дней подряд
  const [rewardsAllDays, setRewardsAllDays] = React.useState(null)
  // NOTE Ачивка Пригласил
  const [rewardsInvite, setRewardsInvite] = React.useState(null)
  // NOTE Ачивка Оценил города
  const [rewardsCity, setRewardsCity] = React.useState(null)
  // NOTE Ачивка Первооткрыватель
  const [rewardsUniqueComment, setRewardsUniqueComment] = React.useState(null);
  // NOTE Ачивка Захватчик
  const [rewardsCaptured, setRewardsCaptured] = React.useState(null)
  // NOTE Ачивка Использовать заморозку
  const [rewardsFreez, setRewardsFreez] = React.useState(null)
  // NOTE Ачивка Оценил улицу
  const [rewardsStreet, setRewardsStreet] = React.useState(null)
  // NOTE Ачивка Сделал оценок
  const [rewardsRated, setRewardsRated] = React.useState(null)
  // NOTE Ачивка Заказл мерчь в магазине
  const [rewardsMerch, setRewardsMerch] = React.useState(null)
  // NOTE Ачивка Создал командку
  const [rewardsTeam, setRewardsTeam] = React.useState(null)


  
  const getUserInfo = async () => {
    let loginVia = null
    loginVia = await AsyncStorage.getItem('loggedVia');
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
    console.log(user)
    setUserRewards(user.user_reward);
    UserStore.setRang(user.rang);
    UserStore.setCrowns(user.crown);
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      getUserInfo();
    });
    return unsubscribe;
  }, [navigation]);

  const allAwards = () => {
    userRewards.forEach(function (item, i, arr) {
      // Ачивка несколько дней подряд
      if (item.reward.keyword == 'rate-in-a-row') {
        setRewardsAllDays(item);
      // Ачивка Пригласил
      } else if (item.reward.keyword == 'invited-friends') {
        setRewardsInvite(item);
      // Ачивка Оценил города
      } else if(item.reward.keyword == 'city-rated'){
        setRewardsCity(item);
      // Ачивка Первооткрыватель
      } else if (item.reward.keyword == 'street-discoverer'){
        setRewardsUniqueComment(item)
      // Ачивка Захватчик
      } else if (item.reward.keyword == 'captured'){
        setRewardsCaptured(item)
      // Ачивка Использовать заморозку
      } else if (item.reward.keyword == 'freeze-used'){
        setRewardsFreez(item)
      // Ачивка Оценил улицу
      } else if (item.reward.keyword == 'street-rated'){
        setRewardsStreet(item)
      // Ачивка Сделал оценок
      } else if (item.reward.keyword == 'rated'){
        setRewardsRated(item)
      // Ачивка заказл мерч
      } else if (item.reward.keyword == 'bought-merch'){
        setRewardsMerch(item)
      // Ачивка Создал команду
      } else if (item.reward.keyword == 'create-team'){
        setRewardsTeam(item)
      }
    });
  };

  

  React.useEffect(() => {
    allAwards();
  }, [userRewards]);

  return (
    <View style={styles.container}>
      <Text style={styles.awardsTitle}>Рейтинг</Text>
      <View style={styles.awardsStatus}>
        <UserPropDisplay style={styles.awardsStatusName} name={'rang'} />
        <View style={styles.awardsStatusPointBlock}>
          <Image source={require('../assets/crown.png')} />
          <UserPropDisplay style={styles.awardsStatusPoint} name={'crowns'} />
        </View>
      </View>
      <View style={styles.awardsStatusProgress}>
        {/* <Text style={styles.awardsProgressText}>До следующего уровня 15</Text> */}
      </View>

      <Text style={styles.awardsTitle}>Все награды</Text>

      <ScrollView style={styles.awardsItems}>
        <View style={styles.awardsScroll}>
          {/* NOTE Ачивка несколько дней подряд */}
    
          {/* NOTE Ачивка Пригласил  */}

          {/* NOTE Ачивка Оценил города */}

          {/* NOTE Ачивка Первооткрыватель */}
          {rewardsUniqueComment !== null ? (
            <View style={styles.awardsItem}>
              {rewardsUniqueComment.progress >= 0 || rewardsUniqueComment.progress <= 49 ? (
                <SvgXml xml={rewardsUniqueCommentSVG_bronze} style={styles.awardsItemImage} />
              ) : rewardsUniqueComment.progress >= 50 || rewardsUniqueComment.progress <= 99 ? (
                <SvgXml xml={rewardsUniqueCommentSVG_silver} style={styles.awardsItemImage} />
              ) : (
                <SvgXml xml={rewardsUniqueCommentSVG_gold} style={styles.awardsItemImage} />
              )}
              <View style={styles.awardsItemDetail}>
                <Text style={styles.awardsItemTitle}>Первооткрыватель</Text>
                <Text style={styles.awardsItemSubTitle}>
                  Вы заработали эту награду прокоментировава улицу первым
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.awardsItem}>
              <SvgXml xml={rewardsBlock} style={styles.awardsItemImage} />
              <View style={styles.awardsItemDetail}>
                <Text style={styles.awardsItemTitle}>Первооткрыватель</Text>
                <Text style={styles.awardsItemSubTitle}>
                  Вы заработаете эту награду прокоментировава улицу первым
                </Text>
              </View>
            </View>
          )}
          {/* NOTE Ачивка Захватчик */}
          {rewardsCaptured !== null ? (
            <View style={styles.awardsItem}>
              {rewardsCaptured.progress >= 10 || rewardsCaptured.progress <= 49 ? (
                <SvgXml xml={rewardsCapturedSVG_bronze} style={styles.awardsItemImage} />
              ) : rewardsCaptured.progress >= 50 || rewardsCaptured.progress <= 99 ? (
                <SvgXml xml={rewardsCapturedSVG_silver} style={styles.awardsItemImage} />
              ) : (
                <SvgXml xml={rewardsCapturedSVG_gold} style={styles.awardsItemImage} />
              )}
              <View style={styles.awardsItemDetail}>
                <Text style={styles.awardsItemTitle}>Захватчик</Text>
                <Text style={styles.awardsItemSubTitle}>
                  Вы заработали эту награду прокоментировав улица, котрую до вас прокомментировали
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.awardsItem}>
              <SvgXml xml={rewardsBlock} style={styles.awardsItemImage} />
              <View style={styles.awardsItemDetail}>
                <Text style={styles.awardsItemTitle}>Захватчик</Text>
                <Text style={styles.awardsItemSubTitle}>
                  Вы заработаете эту награду прокоментировав улицу, котрую до вас прокомментировали
                </Text>
              </View>
            </View>
          )}
          
          {/* NOTE Ачивка Оценил улицу */}
          {rewardsStreet !== null ? (
            <View style={styles.awardsItem}>
              {rewardsStreet.progress >= 1 || rewardsStreet.progress <= 9 ? (
                <SvgXml xml={rewardsStreetSVG_stepOne} style={styles.awardsItemImage} />
              ) : rewardsStreet.progress >= 10 || rewardsStreet.progress <= 99 ? (
                <SvgXml xml={rewardsStreetSVG_stepTwo} style={styles.awardsItemImage} />
              ) :  rewardsStreet.progress >= 100 || rewardsStreet.progress <= 499 ? (
                <SvgXml xml={rewardsStreetSVG_stepThree} style={styles.awardsItemImage} />
              ) : rewardsStreet.progress >= 500 || rewardsStreet.progress <= 999 ? (
                <SvgXml xml={rewardsStreetSVG_stepFour} style={styles.awardsItemImage} />
              ) : (
                <SvgXml xml={rewardsStreetSVG_stepFive} style={styles.awardsItemImage} />
              )}
              <View style={styles.awardsItemDetail}>
                <Text style={styles.awardsItemTitle}>Оценил улицу</Text>
                <Text style={styles.awardsItemSubTitle}>
                  Вы заработали эту награду прокоментировава улицу
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.awardsItem}>
              <SvgXml xml={rewardsBlock} style={styles.awardsItemImage} />
              <View style={styles.awardsItemDetail}>
                <Text style={styles.awardsItemTitle}>Оценил улицу</Text>
                <Text style={styles.awardsItemSubTitle}>
                  Вы заработаете эту награду прокоментировава улицу
                </Text>
              </View>
            </View>
          )}
          {/* NOTE Ачивка Сделал оценок */}
          {rewardsRated !== null ? (
            <View style={styles.awardsItem}>
              {rewardsRated.progress <= 0 || rewardsRated.progress >= 9 ? (
                <SvgXml xml={rewardsRatedSVG_stepOne} style={styles.awardsItemImage} />
              ) : rewardsRated.progress <= 10 || rewardsRated.progress >= 99 ? (
                <SvgXml xml={rewardsRatedSVG_stepOne} style={styles.awardsItemImage} />
              ) :  rewardsRated.progress <= 100 || rewardsRated.progress >= 499 ? (
                <SvgXml xml={rewardsRatedSVG_stepTwo} style={styles.awardsItemImage} />
              ) : rewardsRated.progress <= 500 || rewardsRated.progress >= 999 ? (
                <SvgXml xml={rewardsRatedSVG_stepThree} style={styles.awardsItemImage} />
              ) : (
                <SvgXml xml={rewardsRatedSVG_stepFour} style={styles.awardsItemImage} />
              )}
              <View style={styles.awardsItemDetail}>
                <Text style={styles.awardsItemTitle}>Сделал оценок</Text>
                <Text style={styles.awardsItemSubTitle}>
                  Вы заработали эту награду оставив оценку
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.awardsItem}>
              <SvgXml xml={rewardsBlock} style={styles.awardsItemImage} />
              <View style={styles.awardsItemDetail}>
                <Text style={styles.awardsItemTitle}>Сделал оценок</Text>
                <Text style={styles.awardsItemSubTitle}>
                  Вы заработаете эту награду оставив оценку
                </Text>
              </View>
            </View>
          )}
          {/* NOTE Ачивка Заказл мерч в магазине */}
          {rewardsMerch !== null ? (
            <View style={styles.awardsItem}>
              <SvgXml xml={rewardsMerchSVG} style={styles.awardsItemImage} />
              <View style={styles.awardsItemDetail}>
                <Text style={styles.awardsItemTitle}>Мерч</Text>
                <Text style={styles.awardsItemSubTitle}>
                  Вы заработали эту награду купив мерч в магазине
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.awardsItem}>
              <SvgXml xml={rewardsBlock} style={styles.awardsItemImage} />
              <View style={styles.awardsItemDetail}>
                <Text style={styles.awardsItemTitle}>Мерч</Text>
                <Text style={styles.awardsItemSubTitle}>
                  Вы заработаете эту награду купив мерч в магазине
                </Text>
              </View>
            </View>
          )}
          {/* NOTE Ачивка Создал командку */}
          {rewardsTeam !== null ? (
            <View style={styles.awardsItem}>
              <SvgXml xml={rewardsTeamSVG} style={styles.awardsItemImage} />
              <View style={styles.awardsItemDetail}>
                <Text style={styles.awardsItemTitle}>Создал команду</Text>
                <Text style={styles.awardsItemSubTitle}>
                  Вы заработали эту награду создав команду
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.awardsItem}>
              <SvgXml xml={rewardsBlock} style={styles.awardsItemImage} />
              <View style={styles.awardsItemDetail}>
                <Text style={styles.awardsItemTitle}>Создал команду</Text>
                <Text style={styles.awardsItemSubTitle}>
                  Вы заработаете эту награду создав команду
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default AwardsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 55
  },
  awardsProgressText: {
    fontWeight: '400',
    fontSize: 8,
    marginBottom: 8,
  },
  awardsItem: {
    flexDirection: 'row',
    flex: 0,
    marginVertical: 5,
  },
  awardsTitle: {
    fontWeight: '700',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  awardsStatusPointBlock: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  awardsStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  awardsStatusName: {
    color: '#806727',
    fontSize: 30,
    fontWeight: '700',
  },
  awardsStatusPoint: {
    fontSize: 34,
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
    maxWidth: '85%',
  },
  awardsScroll: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  awardsItemImage: {
    width: 105,
    height: 105,
    borderRadius: 10,
    marginRight: 10,
  },
  awardsItemTitle: {
    marginBottom: 4,
    fontWeight: 'bold',
    fontSize: 16
  },
});
