import React, {useState} from 'react';
// import * as Progress from 'react-native-progress';
import {LinearProgress, ListItem, Avatar} from 'react-native-elements';
import {
  Text,
  View,
  Pressable,
  Modal,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
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
} from '../assets/svgimg';
import {AuthContext} from '../component/context';
import {SvgXml} from 'react-native-svg';
import {vw, vh, vmin, vmax} from 'react-native-expo-viewport-units';
import {token} from '../App';
import GLOBAL from '../global.js';
import {ProfileAwwards} from '../component';
import UserStore from '../store/UserStore';
import authParams from '../store/redux/auth/authParams';
import AuthStore from '../store/AuthStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ProfileScreen = ({navigation}) => {
  // const [user, setUser] = React.useState({});
  const [userRewards, setUserRewards] = React.useState([]);
  const [userName, setUserName] = React.useState();
  const [userImage, setUserImage] = React.useState();
  const [userLastName, setUserLastName] = React.useState();
  const [userBirthday, setUserBirthday] = React.useState();
  const [userCity, setUserCity] = React.useState();
  const [userPhone, setUserPhone] = React.useState();
  const [userMail, setUserEmail] = React.useState();
  const [userTeamsId, setUserTeamsId] = React.useState();
  const [userTeamsName, setUserTeamsName] = React.useState();
  const [userRate, SetUserRate] = React.useState();

  const [group, setGroup] = React.useState();

  // ???????????? ?????????????????? ???????? ????????????
  const [rewardsAllDays, setRewardsAllDays] = React.useState(null);
  // ???????????? ??????????????????
  const [rewardsInvite, setRewardsInvite] = React.useState(null);
  // ???????????? ???????????? ????????????
  const [rewardsCity, setRewardsCity] = React.useState(null);
  // ???????????? ????????????????????????????????
  const [rewardsUniqueComment, setRewardsUniqueComment] = React.useState(null);
  // ???????????? ??????????????????
  const [rewardsCaptured, setRewardsCaptured] = React.useState(null);
  // ???????????? ???????????????????????? ??????????????????
  const [rewardsFreez, setRewardsFreez] = React.useState(null);
  // ???????????? ???????????? ??????????
  const [rewardsStreet, setRewardsStreet] = React.useState(null);
  // ???????????? ???????????? ????????????
  const [rewardsRated, setRewardsRated] = React.useState(null);
  // ???????????? ???????????? ?????????? ?? ????????????????
  const [rewardsMerch, setRewardsMerch] = React.useState(null);
  // ???????????? ???????????? ????????????????
  const [rewardsTeam, setRewardsTeam] = React.useState(null);

  const TEAM_INFO_URL = 'https://www.ecomap.online/api/auth/team/';
const {loginWithApple} = React.useContext(AuthContext);


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
    console.log('user ', user);
    setUserImage(user.image);
    setUserRewards(user.user_reward);
    setUserName(user.first_name);
    setUserLastName(user.last_name);
    setUserBirthday(user.birthday);
    setUserCity(user.city);
    setUserPhone(user.phone);
    setUserEmail(user.email);
    setUserTeamsId(user.teams);
    SetUserRate(user.rate);
  };

  // const deleteUser = async () => {
  //   await fetch(
  //     'https://www.ecomap.online/api/auth/user/',
  //     {
  //       method: 'DELETE',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //         Authorization: `Token ${UserStore.token}`,
  //       },
  //     },
  //   );
  // }

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await getUserInfo();
    });
    return unsubscribe;
  }, [navigation]);

  // ???????????????? ???????????????????? ???? ?????????????????? ??????????
  const allAwards = () => {
    userRewards.forEach(function (item, i, arr) {
      // ???????????? ?????????????????? ???????? ????????????
      if (item.reward.keyword == 'rate-in-a-row') {
        setRewardsAllDays(item);
        // ???????????? ??????????????????
      } else if (item.reward.keyword == 'invited-friends') {
        setRewardsInvite(item);
        // ???????????? ???????????? ????????????
      } else if (item.reward.keyword == 'city-rated') {
        setRewardsCity(item);
        // ???????????? ????????????????????????????????
      } else if (item.reward.keyword == 'street-discoverer') {
        setRewardsUniqueComment(item);
        // ???????????? ??????????????????
      } else if (item.reward.keyword == 'captured') {
        setRewardsCaptured(item);
        // ???????????? ???????????????????????? ??????????????????
      } else if (item.reward.keyword == 'freeze-used') {
        setRewardsFreez(item);
        // ???????????? ???????????? ??????????
      } else if (item.reward.keyword == 'street-rated') {
        setRewardsStreet(item);
        // ???????????? ???????????? ????????????
      } else if (item.reward.keyword == 'rated') {
        setRewardsRated(item);
        // ???????????? ???????????? ????????
      } else if (item.reward.keyword == 'bought-merch') {
        setRewardsMerch(item);
        // ???????????? ???????????? ??????????????
      } else if (item.reward.keyword == 'create-team') {
        setRewardsTeam(item);
      }
    });
  };

  const {signOut} = React.useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

  React.useEffect(() => {
    allAwards();
  }, [userRewards]);

  React.useEffect(async () => {
    try {
      let loginVia = null
      loginVia = await AsyncStorage.getItem('loggedVia');
      const teamResponse = await fetch(TEAM_INFO_URL + userTeamsId.team, {
        method: 'GET',
        headers: {
          Authorization: `${loginVia === 'apple' ? authParams.bearer : authParams.token} ${UserStore.token}`,
        },
      });
      const teamObj = await teamResponse.json();
      console.log(teamObj);
      setUserTeamsName(teamObj.title);
    } catch (error) {
      console.log('teamerror ', error);
    }
  }, [userTeamsId]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalTitle}>
                <Text style={styles.modalText}>EcoMap plus</Text>
                <Pressable
                  style={[styles.buttonCloseModal]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Image
                    source={require('../assets/closeModal.png')}
                    style={styles.closeModalImage}
                  />
                </Pressable>
              </View>
              <View style={styles.modalDescription}>
                <Text style={styles.modalDescriptionText}>
                  ???????????????? EcoMap plus ???????? ?????? ?????????????? ?????????? ????????????????????????, ??????
                  ???? ???????????? ???? ????????????????????????????
                </Text>
                <Image
                  source={require('../assets/mascotModal.png')}
                  style={styles.modalDescriptionImage}
                />
              </View>
              <Pressable
                style={[
                  styles.button,
                  styles.buttonOpen,
                  styles.buttonModalFree,
                ]}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.textStyle}>2 ???????????? ??????????????????</Text>
              </Pressable>
              <View style={styles.modalBenefits}>
                <Text style={styles.modalBenefitsTitle}>?????? ???? ????????????????:</Text>
                <View>
                  {/* {list.map((l, i) => (
                    <ListItem containerStyle={styles.containerListItem} key={i}>
                      <Image
                        style={styles.avatarik}
                        source={require('../assets/modalImageBenef.png')}
                      />
                      <ListItem.Content style={styles.listItemBenefits}>
                        <ListItem.Title
                          style={{fontWeight: '700', marginBottom: 4}}>
                          {l.name}
                        </ListItem.Title>
                        <ListItem.Subtitle style={{fontSize: 8}}>
                          {l.subtitle}
                        </ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                  ))} */}
                </View>
              </View>
              <Pressable
                style={[
                  styles.button,
                  styles.buttonOpen,
                  styles.buttonModalFreeBottom,
                ]}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.textStyle}>2 ???????????? ??????????????????</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <View style={[styles.AccountInfo]}>
          <View style={styles.AccountInfoMain}>
            <Image
              source={
                userImage !== null
                  ? {uri: 'https://www.ecomap.online' + userImage}
                  : require('../assets/usernoAvatar.png')
              }
              style={styles.AccountInfoImg}
            />
            <View style={styles.AccountInfoMainBlock}>
              {userName ? (
                <Text style={styles.NameUser}>{userName}</Text>
              ) : (
                <Text style={styles.NameUser}>?????????????? ??????</Text>
              )}

              {userBirthday != 'null' ? (
                <Text style={styles.DataUser}>{userBirthday}</Text>
              ) : (
                <Text style={styles.DataUser}>01.01.1990</Text>
              )}

              {userCity ? (
                <Text style={styles.CityUser}>{userCity}</Text>
              ) : (
                <Text style={styles.CityUser}>??????????</Text>
              )}
            </View>
          </View>

          <View style={styles.AccountInfoMinor}>
            {userPhone ? (
              <Text style={styles.PhoneUser}>{userPhone}</Text>
            ) : (
              <Text style={styles.PhoneUser}>+7 (987) 654-32-10</Text>
            )}

            {userMail ? (
              <Text style={styles.MailUser}>{userMail}</Text>
            ) : (
              <Text style={styles.MailUser}>hello@mail.ru</Text>
            )}
          </View>
        </View>
        <View style={styles.AccountRating}>
          <View style={styles.AccountHeadTitle}>
            <Text style={styles.AccountRatingTitle}>??????????????</Text>
            <Text
              style={styles.AccountRatingLink}
              onPress={() => navigation.navigate('RatingScreen')}>
              ???????????????????? ??????????????
            </Text>
          </View>
          {userRate ? (
            <Text style={styles.AccountRatingRang}>
              {userRate} ?????????? {userCity}
            </Text>
          ) : (
            <Text style={styles.AccountRatingRang}>?? ?????? ?????? ?????? ????????????????</Text>
          )}
        </View>

        {/* ???????????? ?????????? */}
        <View style={styles.AccountAwwards}>
          <View style={styles.AccountHeadTitle}>
            <Text style={styles.AccountAwardsTitle}>??????????????</Text>
            <Text
              style={styles.AccountRatingLink}
              onPress={() => navigation.navigate('AwardsScreen')}>
              ???????????????????? ??????
            </Text>
          </View>
          <View style={styles.AccountRatingHorScroll}>
            <View style={styles.awardsItems}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                {/* ???????????????????????????????? */}
                {rewardsUniqueComment !== null ? (
                  <View style={styles.awardsItem}>
                    {rewardsUniqueComment.progress <= 10 ||
                    rewardsUniqueComment.progress >= 49 ? (
                      <SvgXml
                        xml={rewardsUniqueCommentSVG_bronze}
                        style={styles.awardsImage}
                      />
                    ) : rewardsUniqueComment.progress <= 99 ? (
                      <SvgXml
                        xml={rewardsUniqueCommentSVG_silver}
                        style={styles.awardsImage}
                      />
                    ) : (
                      <SvgXml
                        xml={rewardsUniqueCommentSVG_gold}
                        style={styles.awardsImage}
                      />
                    )}
                    <Text style={styles.awardsTitle}>????????????????????????????????</Text>
                  </View>
                ) : (
                  <View style={styles.awardsItem}>
                    <SvgXml xml={rewardsBlock} style={styles.awardsImage} />

                    <Text style={styles.awardsTitle}>????????????????????????????????</Text>
                  </View>
                )}
                {/* ???????????? ???????? */}
                {rewardsStreet !== null ? (
                  <View style={[styles.awardsItem, styles.awwardsItemCenter]}>
                    {rewardsStreet.progress <= 0 ||
                    rewardsStreet.progress >= 9 ? (
                      <SvgXml
                        xml={rewardsCitySVG_gold}
                        style={styles.awardsImage}
                      />
                    ) : rewardsStreet.progress <= 10 ||
                      rewardsStreet.progress >= 99 ? (
                      <SvgXml
                        xml={rewardsCitySVG_gold}
                        style={styles.awardsImage}
                      />
                    ) : rewardsStreet.progress <= 100 ||
                      rewardsStreet.progress >= 499 ? (
                      <SvgXml
                        xml={rewardsCitySVG_gold}
                        style={styles.awardsImage}
                      />
                    ) : rewardsStreet.progress <= 500 ||
                      rewardsStreet.progress >= 999 ? (
                      <SvgXml
                        xml={rewardsCitySVG_gold}
                        style={styles.awardsImage}
                      />
                    ) : (
                      <SvgXml
                        xml={rewardsCitySVG_gold}
                        style={styles.awardsImage}
                      />
                    )}
                    <Text style={styles.awardsTitle}>???????????? ????????</Text>
                  </View>
                ) : (
                  <View style={styles.awardsItem}>
                    <SvgXml xml={rewardsBlock} style={styles.awardsImage} />

                    <Text style={styles.awardsTitle}>???????????? ????????????</Text>
                  </View>
                )}
                {/* ???????????? ???????????? */}
                {rewardsRated !== null ? (
                  <View style={styles.awardsItem}>
                    {rewardsRated.progress >= 1 ||
                    rewardsRated.progress <= 9 ? (
                      <SvgXml
                        xml={rewardsRatedSVG_stepOne}
                        style={styles.awardsImage}
                      />
                    ) : rewardsRated.progress >= 10 ||
                      rewardsRated.progress <= 499 ? (
                      <SvgXml
                        xml={rewardsRatedSVG_stepOne}
                        style={styles.awardsImage}
                      />
                    ) : rewardsRated.progress >= 499 ||
                      rewardsRated.progress <= 999 ? (
                      <SvgXml
                        xml={rewardsRatedSVG_stepTwo}
                        style={styles.awardsImage}
                      />
                    ) : rewardsRated.progress >= 1000 ||
                      rewardsRated.progress <= 4999 ? (
                      <SvgXml
                        xml={rewardsRatedSVG_stepThree}
                        style={styles.awardsImage}
                      />
                    ) : (
                      <SvgXml
                        xml={rewardsRatedSVG_stepFour}
                        style={styles.awardsImage}
                      />
                    )}
                    <Text style={styles.awardsTitle}>???????????? ????????????</Text>
                  </View>
                ) : (
                  <View style={styles.awardsItem}>
                    <SvgXml xml={rewardsBlock} style={styles.awardsImage} />

                    <Text style={styles.awardsTitle}>???????????? ????????????</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
        <View style={styles.AccountRating}>
          <View style={styles.AccountHeadTitle}>
            <Text style={styles.AccountRatingTitle}>??????????????</Text>
            {userTeamsId ? (
              <Text
                style={styles.AccountRatingLink}
                onPress={() => {
                  if (userTeamsId) {
                    navigation.navigate('CommandScreen', {
                      screen: 'CommandUserScreen',
                      params: {id: userTeamsId},
                    });
                  }
                }}>
                ???????????????????? ??????????????
              </Text>
            ) : (
              <Text
                style={styles.AccountRatingLink}
                onPress={() => {
                  navigation.navigate('CommandScreen');
                }}>
                ???????????????????? ??????????????
              </Text>
            )}
          </View>
          {userTeamsName ? (
            <Text style={styles.AccountRatingRang}>{userTeamsName}</Text>
          ) : (
            <Text style={styles.AccountRatingRang}>?? ?????? ?????? ??????????????</Text>
          )}
        </View>
        <View style={styles.AccountInformation}>
          <View style={styles.AccountHeadTitle}>
            <Text style={styles.AccountRatingTitle}>????????????????????</Text>
            <Text
              style={styles.AccountRatingLink}
              onPress={() => navigation.navigate('InfoScreen')}>
              ??????????????????
            </Text>
          </View>
          <Text style={styles.AccountRatingRang}>
            ?????? ?? ????????????????????, ?????????????????????? ???????????????????? ?? ????????????
          </Text>
        </View>
        {/* <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.textStyle}>???????????? ????????????????</Text>
            </Pressable> */}
        <Pressable
          style={[styles.button, styles.buttonEdit]}
          onPress={() =>
            navigation.navigate('EditProfScreen', {
              username: userName,
              userdata: userBirthday,
              usercity: userCity,
              userphone: userPhone,
              usermail: userMail,
            })
          }>
          <Text style={styles.editProfileText}>??????????????????????????</Text>
        </Pressable>
        {/* <Pressable
          style={styles.signOutProfile}
          onPress={() => {
            signOut();
          }}>
          <Text style={styles.signOutProfileText}>??????????</Text>
        </Pressable> */}
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F5F5',
    marginBottom: 60,
  },
  awardsItem: {
    flex: 1,
    maxWidth: 80,
    alignItems: 'center',
  },
  awardsImage: {
    marginBottom: 8,
    borderRadius: 12,
    width: 105,
    height: 105,
  },
  awardsTitle: {
    fontSize: 13,
    fontWeight: '400',
    marginBottom: 4,
    textAlign: 'center',
  },
  awardsSubTitle: {
    fontSize: 6,
    fontWeight: '300',
    marginBottom: 8,
    textAlign: 'center',
  },
  containerListItem: {
    backgroundColor: null,
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4C4',
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginTop: 8,
    paddingBottom: 8,
  },
  avatarik: {
    borderRadius: 2,
    width: 32,
    height: 32,
  },
  AccountInfoImg: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  centeredView: {
    flex: 1,
    position: 'relative',
  },
  buttonModalFreeBottom: {
    marginTop: 24,
  },
  signOutProfileText: {
    color: '#B2B2B2',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
  },
  deletProfileText: {
    color: '#B2B2B2',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
  },
  AccountInfo: {
    marginTop: 20,
    marginHorizontal: 20,

  },
  signOutProfile: {
    marginBottom: 12,
  },
  deletProfile: {
    marginBottom: 24,
  },
  buttonEdit: {
    borderWidth: 1,
    borderColor: '#1E9D2D',
    marginBottom:Platform.OS ==='android'? 35 : 20,
    borderRadius: 15,
  },
  editProfileText: {
    fontSize: 21,
    fontWeight: '700',
    color: 'black',
    textAlign: 'center',
  },
  buttonModalFree: {
    marginTop: 40,
    marginBottom: 50,
  },
  awardsItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  AccountRating: {
    paddingBottom: 12,
    borderBottomColor: '#C4C4C4',
    borderBottomWidth: 1,
    marginBottom: 12,
    marginHorizontal: 20,
  },
  AccountAwwards: {
    borderBottomColor: '#C4C4C4',
    borderBottomWidth: 1,
    marginBottom: 12,
    marginHorizontal: 20,
  },
  AccountInformation: {
    paddingBottom: 12,
    marginBottom: 12,
    marginHorizontal: 20,
  },
  AccountRatingTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  AccountAwardsTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  AccountRatingLink: {
    fontSize: 12,
    fontWeight: '400',
  },
  AccountRatingRang: {
    fontSize: 12,
    fontWeight: '400',
  },
  AccountHeadTitle: {
    flexDirection: 'row',
    marginBottom: 4,
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  AccountInfoMain: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  AccountInfoMainBlock: {
    marginLeft: 12,
  },
  NameUser: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 0,
  },
  DataUser: {
    fontSize: 13,
    fontWeight: '400',
    marginBottom: 4,
  },
  CityUser: {
    fontSize: 13,
    fontWeight: '400',
  },
  AccountInfoMinor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  PhoneUser: {
    paddingVertical: 13,
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '48%',
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '400',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 11.14,

    elevation: 5,
  },
  MailUser: {
    paddingVertical: 13,
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '48%',
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '400',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 11.14,

    elevation: 5,
  },
  modalView: {
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    borderRadius: 8,
    paddingVertical: 13,
    marginHorizontal: 20,
  },
  buttonOpen: {
    backgroundColor: '#1E9D2D',
    marginBottom: 12,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: '400',
    textAlign: 'center',
    fontSize: 16,
  },
  modalText: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 14,
    fontWeight: '700',
  },
  closeModal: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  progressCustom: {
    width: 80,
    borderRadius: 7,
  },
  AccountRatingHorScroll: {
    paddingBottom: 12,
    paddingHorizontal: 10,
  },
  closeModalImage: {
    width: 12,
    height: 12,
  },
  modalTitle: {
    position: 'relative',
  },
  buttonCloseModal: {
    position: 'absolute',
    padding: 20,
  },
  modalDescriptionImage: {
    width: 227,
    height: 116,
    position: 'absolute',
    right: '-28%',
    top: '-50%',
  },
  modalDescription: {
    flexDirection: 'row',
    position: 'relative',
    paddingHorizontal: 20,
    marginTop: 29,
    // flex: 1,
    // alignItems:'center'
  },
  modalDescriptionText: {
    maxWidth: '60%',
    fontWeight: '700',
  },
  modalBenefits: {
    paddingHorizontal: 20,
  },
  modalBenefitsTitle: {
    fontWeight: '700',
  },
});
