import React from 'react';
import {Text, View, StyleSheet, Pressable, Platform} from 'react-native';
import {CommandUser} from '../component/CommandUser';
import AwesomeButton from 'react-native-really-awesome-button';
import UserStore from '../store/UserStore';
import {StackActions} from '@react-navigation/native';
import authParams from '../store/redux/auth/authParams';
import AuthStore from '../store/AuthStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CommandScreen = ({navigation}) => {

  const [showCreateButton, setShowCreateButton]= React.useState(true)
  const getUserInfo = async () => {
    let loginVia = null
    loginVia = await AsyncStorage.getItem('loggedVia');
   
    const getUserId = await fetch ('https://www.ecomap.online/api/auth/user/',{
      method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `${loginVia === 'apple' ? authParams.bearer : authParams.token} ${UserStore.token}`,
        },
    })
    const userinfo = await getUserId.json()
 
    const userResponse = await fetch(`https://www.ecomap.online/api/auth/team/${userinfo.team_id}/`,{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${loginVia === 'apple' ? authParams.bearer : authParams.token} ${UserStore.token}`
      },
      });
    const user = await userResponse.json();
     console.log("Data:", user)
    // if (user && user.team_id) {
    //   setShowCreateButton(false);
    // }
    //console.log("Command team 33003:", user.team_id)
    // console.log("User Team Id:", user.team_id)
    if (user && user.id) {
    const nanav=  navigation.dispatch(
        StackActions.replace('CommandUserScreen', {
          id: user.id,
        }),
      );
      console.log("Navegation:", nanav)
    }
  };
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await getUserInfo();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.commandNull}>
        Вы ещё не вступили в команду, срочно присоединитесь к единомышленникам
      </Text>
      {/* <Pressable
        style={[styles.button, styles.changeCommand]}
        onPress={() => navigation.navigate('SearchCommandScreen')}>
        <Text style={styles.textStyle}>Выбрать команду</Text>
      </Pressable> */}
      <View style={{width: '100%', marginBottom: 20, marginTop: 20}}>
        <AwesomeButton
          type="primary"
          backgroundColor="#1E9D2D"
          backgroundDarker="#3D7606"
          borderRadius={15}
          width={null}
          stretch
          onPress={() => navigation.navigate('SearchCommandScreen')}>
          <Text style={styles.textStyle}>Выбрать команду</Text>
        </AwesomeButton>
      </View>
      {showCreateButton?(
        <Pressable
        style={[styles.button, styles.createCommand]}
        onPress={() => navigation.navigate('CreateCommandScreen')}>
        <Text style={styles.editProfileText}>Создать свою</Text>
      </Pressable>
      ): null}
      
    </View>
    // <View style={styles.conteinerBuild}>
    //   <Text style={styles.textBuild}>Страница в разработке</Text>
    // </View>
  );
};

export default CommandScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  textBuild: {
    fontSize: 21,
  },
  conteinerBuild: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commandNull: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400',
    maxWidth: 300,
    marginTop: 20,
    marginBottom: 24,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 13,
    marginHorizontal: 20,
  },
  changeCommand: {
    backgroundColor: '#1E9D2D',
    marginBottom: 12,
    width: '100%',
  },
  createCommand: {
    borderWidth: 1.3,
    borderColor: '#1E9D2D',
    marginBottom: 20,
    width: '100%',
    borderRadius: 14,
  },
  textStyle: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 19,
  },
  editProfileText: {
    fontSize: 19,
    fontWeight: '700',
    color: 'black',
    textAlign: 'center',
  },
});
