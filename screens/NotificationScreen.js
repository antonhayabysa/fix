import React, {useState, useEffect} from 'react';
import {CheckBox} from 'react-native-elements';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import {vw, vh, vmin, vmax} from 'react-native-expo-viewport-units';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ListItem} from 'react-native-elements';
import {Pressable} from 'react-native';
import UserStore from '../store/UserStore';
import authParams from '../store/redux/auth/authParams';
import AuthStore from '../store/AuthStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {filter} from 'lodash';
const notificaions = {
  all: [
    'You do not have notice yet',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum',
  ],
  status: ['You do not have notice for status yet', 'You do not have notice for status yet', 'You do not have notice for status yet'],
  invintations: ['You do not have notice for invintations yet', 'You do not have notice for status yet', 'You do not have notice for status yet','You do not have notice for status yet'],
  adwdawdawda: ['You do not have notice for adwdawdawd yet'],
};

const noticeButton = [
  {
    text: 'Все',
    active: true,
  },

  {
    text: 'Улица',
    active: false,
  },
  {
    text: 'Команда',
    active: false,
  },
];

const NotificationScreen = () => {
  const [notice, setNotice] = React.useState([]);
  const [filteredNotice, setFilteredNotice] = React.useState([])
  const [noNotice, setNoNotice] = React.useState('You do not have notice yet');

  const all = filter(notice,{_type: 'text'})
  const streetNotice = filter(notice, {keyname: 'get_reward'});
  const teamNotice = filter(notice, {keyname: 'team_request'});
  // console.log(notice)
  const getUserNotification = async () => {
    let loginVia = null;
    loginVia = await AsyncStorage.getItem('loggedVia');
    fetch('https://www.ecomap.online/api/auth/notice/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${
          loginVia === 'apple' ? authParams.bearer : authParams.token
        } ${UserStore.token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
          setNotice(data)
          setFilteredNotice(data)
      })
      .catch(error => {
        console.error(error);
      });
  };
  useEffect(() => {
    getUserNotification();
    setFilteredNotice(all)
    setNotice()
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.selectItems} horizontal>
        <View style={{flexDirection: 'row', paddingHorizontal: 20}}>
          {noticeButton.map((l, k) => (
            <Pressable
              key={k}
              onPress={() => {
                if (l.text == 'Все') {
                  
                  setFilteredNotice(all)
                  
                  if(notice.length=== 0){
                    setNoNotice();
                  }

                  noticeButton[k].active = true;
                  noticeButton[1].active = false;
                  noticeButton[2].active = false;
                } else if (l.text == 'Улица') {

                  if(streetNotice.length=== 0){
                    setNoNotice();
                  }
                  setFilteredNotice(streetNotice)
                  noticeButton[k].active = true;
                  noticeButton[0].active = false;
                  noticeButton[2].active = false;
                } else if (l.text == 'Команда') {
                  if(teamNotice.length=== 0){
                    setNoNotice('nnotice for now');
                  }
                  
                
                  setFilteredNotice(teamNotice)
                  noticeButton[k].active = true;
                  noticeButton[1].active = false;
                  noticeButton[0].active = false;
                }
                //  console.log(noticeButton);
              }}
              style={
                noticeButton[k].active == true
                  ? styles.noticeButton
                  : styles.noticeButtonNon
              }>
              <Text
                style={
                  noticeButton[k].active == true
                    ? styles.noticeTextButton
                    : styles.noticeTextButtonNon
                }>
                {l.text}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

       <ScrollView
          style={{paddingHorizontal: 20, marginBottom:120, marginTop: 80}}>
            
          {filteredNotice.map((data, i) => (
            <ListItem
              key={i}
              containerStyle={{
                backgroundColor: '#F3F5F5',
                borderTopWidth: 0,
                borderBottomWidth: 0,
                elevation: 0,
                shadowOpacity: 0,
                paddingHorizontal: 0,
      
              }}>
              <ListItem.Content>
             
                <View style={styles.noticeItem}>
                  <Image
                    source={require('../assets/NoticeImage.png')}
                    style={styles.noticeImage}
                  />
                  <View style={styles.noticeContent}>
                    <Text style={styles.noticeContentText}>{data.text}</Text>
                  </View>
                </View>
                
              </ListItem.Content>
            </ListItem>
          ))}
           
        </ScrollView> 
        
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: '#F3F5F5',
    marginBottom: 10,
  },
  containerNotification: {
    paddingHorizontal: 20,
  },
  noticeButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#1E9D2D',
    marginRight: 8,
    borderRadius: 6,
    height: 38,
  },
  noticeTextButton: {
    color: '#fff',
    fontSize: 15,
  },
  noticeImage: {
    width: 30,
    height: 30,
  },
  selectItems: {
    paddingBottom: 10,
    top: 60,
  },
  noticeItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  noticeContent: {
    backgroundColor: '#E0EDE2',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginLeft: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomEndRadius: 20,
    width: '91.2%',
  },
  noticeButtonNon: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#E0EDE2',
    marginRight: 8,
    borderRadius: 6,
    height: 38,
  },
  noticeTextButtonNon: {
    color: '#000',
    fontSize: 15,
  },
  noticeContentText: {
    fontSize: 16,
  },
  NoNoticeText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 60,
    color: '#000',
  },
});
