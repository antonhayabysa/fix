import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Pressable,
  ScrollView,
  Platform,
} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import {vw, vh, vmin, vmax} from 'react-native-expo-viewport-units';
import Clipboard from '@react-native-clipboard/clipboard';
import GLOBAL from '../global.js';
import UserStore from '../store/UserStore.js';
import {StackActions} from '@react-navigation/native';
import authParams from '../store/redux/auth/authParams.js';
import AuthStore from '../store/AuthStore.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TEAM_INFO_URL = 'https://www.ecomap.online/api/auth/team/';
const DELETE_TEAM_URL = 'https://www.ecomap.online/api/auth/delete-team/';
const DELETE_USER_URL =
  'https://www.ecomap.online/api/auth/delete-team-member/';
const JOIN_USER_URL = 'https://www.ecomap.online/api/auth/join-team/';
const JOIN_ACEPT_USER_URL = 'https://www.ecomap.online/api/auth/join-team/';

const CommandUserScreen = ({route, navigation}) => {
  const [group, setGroup] = React.useState(null);
  const [adminGroup, setAdminGroup] = React.useState(false);
  const [adminIdGroup, setAdminIdGroup] = React.useState(null);
  const [userID, setUserID] = React.useState(null);
  const [userCommand, setuserCommand] = React.useState(null);
  const [isGroupMember, setIsGroupMember] = React.useState(false);
  const [memberID, setMemberID] = React.useState(null);

  const getUserInfo = async () => {
    let loginVia = null
    loginVia = await AsyncStorage.getItem('loggedVia');
    fetch('https://www.ecomap.online/api/auth/user/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${loginVia === 'apple' ? authParams.bearer : authParams.token} ${UserStore.token}`,
      },
    })
      .then(response => response.json())
      .then(json => {
      console.log("User command screen", json);
        
        setAdminGroup(json.id);
        setUserID(json.id);
        setuserCommand(json.teams);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const getGroupInfo = async () => {
    console.log("Group User params id:",route.params.id)
    let loginVia = null
    loginVia = await AsyncStorage.getItem('loggedVia');
    const response = await fetch(`${TEAM_INFO_URL + route.params.id}/`, {
      method: 'GET',
      headers: {
        Authorization: `${loginVia === 'apple' ? authParams.bearer : authParams.token} ${UserStore.token}`,
      },
    });
    const group = await response.json();
    
    setGroup(group);
    setAdminIdGroup(group.admin_id);
  };

  const checkGroupMember = async () => {
    let inGroup = false;
    if (!group) {
      return;
    }
    group.user.forEach(element => {
      if (element.user.id == userID) {
        inGroup = true;
        setMemberID(element.id);
      }
    });
    setIsGroupMember(inGroup);
  };

  const deleteGroup = async () => {
    let loginVia = null
    loginVia = await AsyncStorage.getItem('loggedVia');
    if (!group) {
      return;
    }
    fetch(DELETE_TEAM_URL + group.id, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${loginVia === 'apple' ? authParams.bearer : authParams.token} ${UserStore.token}`,
      },
    })
      .then(response => navigation.navigate('SearchCommandScreen'))
      .catch(error => {
        console.error(error);
      });
  };

  const joinGroup = async () => {
    let loginVia = null
    loginVia = await AsyncStorage.getItem('loggedVia');
    if (userCommand !== null) {
      alert('Вы уже состаите в команде');
    } else {
      let formData = new FormData();

      formData.append('link', group.link);
      formData.append('team', group.id);
      formData.append('user', userID);

      fetch(`${JOIN_USER_URL}${group.link}/`, {
        method: 'POST',
        headers: {
          'Content-Type':
            'multipart/form-data; boundary=—-WebKitFormBoundaryfgtsKTYLsT7PNUVD',
          Authorization: `${loginVia === 'apple' ? authParams.bearer : authParams.token} ${UserStore.token}`,
        }
      })
        .then(response => {
          setIsGroupMember(true);
          getGroupInfo();
        })
        .catch(error => {
          console.error(error);
        });
    }
  };
  const leaveGroup = async () => {
    let loginVia = null
    loginVia = await AsyncStorage.getItem('loggedVia');
    if (!memberID) {
      return;
    }
    fetch(DELETE_USER_URL + memberID, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${loginVia === 'apple' ? authParams.bearer : authParams.token} ${UserStore.token}`,
      },
    })
      .then(response => {
        setIsGroupMember(false);
        getGroupInfo();

        navigation.dispatch(StackActions.replace('CommandScreen'));
      })
      .catch(error => {
        console.error(error);
      });
  };

  React.useEffect(() => {
    if (userID && group) {
      checkGroupMember();
    }
  }, [userID, group]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      getUserInfo();
      getGroupInfo();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      {group == null ? (
        <Text>Загрузка</Text>
      ) : (
        <View>
          <View style={styles.headerCommand}>
            <Image
              style={styles.headerCommandImg}
              source={
                group.image !== null
                  ? {uri: 'https://www.ecomap.online' + group.image}
                  : require('../assets/imgGroup.png')
              }
            />
            <View>
              <Text style={styles.headerCommandTitle}>{group.title}</Text>
              <Text style={styles.headerCommandMember}>
                {group.user_count} участников
              </Text>
              {isGroupMember ? (
                <Pressable
                  style={styles.subscButton}
                  onPress={() => leaveGroup()}>
                  <Text style={styles.subscText}>Выйти</Text>
                </Pressable>
              ) : (
                <Pressable
                  style={styles.subscButton}
                  onPress={() => joinGroup()}>
                  <Text style={styles.subscText}>Вступить</Text>
                </Pressable>
              )}
            </View>
          </View>
          <View style={styles.subheader}>
            <Text style={styles.subheaderText}>{group.description}</Text>
          </View>
          <View
            style={
              adminGroup == adminIdGroup ? styles.linkUser : styles.linkUserNone
            }>
            <View style={styles.linkUserHeader}>
              <Text style={styles.linkUserTitle}>Ссылка для приглашений</Text>
              <Pressable
                style={styles.copyButton}
                onPress={() => {
                  Clipboard.setString('https://ecomap/' + group.link);
                  alert('Скопировано');
                }}>
                <Text style={styles.copyText}>Cкопировать</Text>
              </Pressable>
            </View>
            <Pressable
              style={styles.linkUserlink}
              onPress={() => alert('ссылка')}>
              <Text style={styles.linkUserlinkText}>
                https://ecomap/{group.link}
              </Text>
            </Pressable>
          </View>
          <View style={styles.userGroup}>
            <View style={styles.userGroupHead}>
              <View style={styles.userGroupTitle}>
                <Text style={styles.userGroupTitleText}>Участники</Text>
                <Pressable
                  style={styles.linkUserGroup}
                  onPress={() =>
                    navigation.navigate('GroupUsersScreen', {
                      users: group.user,
                    })
                  }>
                  <Text style={styles.linkUserGroupText}>Посмотреть</Text>
                </Pressable>
              </View>
              <Text style={styles.userGroupNum}>
                {group.user.length} участников
              </Text>
            </View>
            <View>
              {group.user.map((l, i) => (
                <ListItem
                  containerStyle={styles.containerListItem}
                  key={i}
                  bottomDivider>
                  <Avatar
                    avatarStyle={styles.avatarik}
                    source={{uri: l.user.image}}
                  />
                  <ListItem.Content>
                    <ListItem.Title>{l.user.username}</ListItem.Title>
                    <ListItem.Subtitle>{l.user.rang}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              ))}
            </View>
          </View>
          <View style={styles.achiveCommand}> 
          <View style={styles.achiveCommandHead}>
              <Text style={styles.achiveCommandTitle}>Награды команды</Text>
              <Pressable
                onPress={() =>
                  navigation.navigate('ComandAwardsScreen', {
                    id: group.id,
                  })
                }>
                <Text style={styles.achiveCommandLink}>Показать ещё</Text>
              </Pressable>
            </View> 
          <View horizontal={true} style={styles.AccountRatingHorScroll}>
              <View style={styles.awardsItems}>
                <View style={styles.awardsItem}>
                  <Image
                    style={styles.awardsImage}
                    source={require('../assets/awardItemNoLock.png')}
                  />
                  <Text style={styles.awardsTitle}>Лучшая команда месяца</Text>
                </View>
                <View style={styles.awardsItem}>
                  <Image
                    style={styles.awardsImage}
                    source={require('../assets/awardItemNoLock.png')}
                  />
                  <Text style={styles.awardsTitle}>Качественные отзывы</Text>
                </View>
                <View style={styles.awardsItem}>
                  <Image
                    style={styles.awardsImage}
                    source={require('../assets/awardItemNoLock.png')}
                  />
                  <Text style={styles.awardsTitle}>
                    Знатоки города 3 уровня
                  </Text>
                </View>
              </View>
            </View> 
           </View>
          <View
            style={
              adminGroup == adminIdGroup
                ? styles.ButtonGroupAdmin
                : styles.ButtonGroupAdminNone
            }>
            <Pressable
              style={[styles.button, styles.editCommandButton]}
              onPress={() =>
                navigation.navigate('EditCommandScreen', {
                  group: group,
                })
              }>
              <Text style={styles.editCommandText}>Редактировать</Text>
            </Pressable>
            <Pressable style={styles.delCommand} onPress={() => deleteGroup()}>
              <Text style={styles.deletProfileText}>Удалить команду</Text>
            </Pressable>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default CommandUserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  linkUserNone: {
    display: 'none',
  },
  ButtonGroupAdminNone: {
    display: 'none',
  },
  headerCommand: {
    flexDirection: 'row',
    marginTop: 20,
  },
  headerCommandImg: {
    marginRight: 12,
    width: 95,
    height: 95,
    borderRadius: 12
  },
  headerCommandTitle: {
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 1,
  },
  headerCommandMember: {
    fontWeight: '400',
    fontSize: 13,
    marginBottom: 14,
  },
  subscButton: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#1E9D2D',
    paddingVertical: 8,
    paddingHorizontal: 60,
  },
  subscText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
  },
  subheader: {
    marginTop: 16,
  },
  subheaderText: {
    fontSize: 16,
    fontWeight: '400',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#C4C4C4',
    marginBottom: 12,
  },
  linkUserHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkUserTitle: {
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 4,
  },
  copyText: {
    fontWeight: '400',
    fontSize: 12,
  },
  linkUserlinkText: {
    fontWeight: '400',
    fontSize: 12,
  },
  linkUser: {
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#C4C4C4',
    marginBottom: 12,
  },
  userGroupTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userGroupTitleText: {
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 4,
  },
  linkUserGroupText: {
    fontWeight: '400',
    fontSize: 12,
  },
  userGroupNum: {
    fontWeight: '400',
    fontSize: 12,
  },
  userGroupHead: {
    marginBottom: 8,
  },
  avatarik: {
    borderRadius: 2,
  },
  containerListItem: {
    backgroundColor: null,
    borderBottomWidth: null,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginVertical: 8,
  },
  userGroup: {
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderColor: '#C4C4C4',
    marginBottom: 12,
  },
  achiveCommandHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  achiveCommandTitle: {
    fontWeight: '700',
    fontSize: 12,
    marginBottom: 16,
  },
  achiveCommandLink: {
    fontWeight: '400',
    fontSize: 8,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 13,
  },
  deletProfileText: {
    color: '#B2B2B2',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
  },
  editCommandText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
  },
  editCommandButton: {
    borderWidth: 1,
    borderColor: '#1E9D2D',
    marginBottom: 20,
  },
  delCommand: {
    marginBottom: 20,
  },
  AccountRatingHorScroll: {
    paddingBottom: 12,
  },
  awardsItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  awardsItem: {
    flex: 1,
    maxWidth: 80,
    alignItems: 'center',
  },
  awardsImage: {
    marginBottom: 8,
    width: 80,
    height: 80,
    borderRadius: 6,
  },
  awardsTitle: {
    fontSize: 8,
    fontWeight: '400',
    marginBottom: 4,
    textAlign: 'center',
  },
  achiveCommand: {
    marginBottom: 20,
  },
});
