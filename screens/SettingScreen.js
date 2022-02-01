
import React, {useState} from 'react';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  ScrollView,
  Switch,
} from 'react-native';

import {AuthContext} from '../component/context';
import {observer} from 'mobx-react';

import {SafeAreaProvider, initialWindowMetrics} from 'react-native-safe-area-context';

const SettingScreen = observer(({navigation}) => {
  const [isEnabledNotifications, setIsТotifications] = useState(false);
  const [isEnabledValue, setIsValue] = useState(false);
  const [isEnabledVibr, setIsVibr] = useState(false);
  const [isEnabledNews, setIsNews] = useState(false);
  const [isEnabledNewSubsc, setIsNewSubscr] = useState(false);
  const [isEnabledRating, setIsRating] = useState(false);

  // const [isEnabledValue, setIsValue] = useState(false);
  // const [isEnabledNotifications, setIsТotifications] = useState(false);
  const VolueSwitch = () => setIsValue(previousState => !previousState);
  const NotificationSwitch = () =>
    setIsТotifications(previousState => !previousState);
  const VibrSwitch = () => setIsVibr(previousState => !previousState);
  const NewsSwitch = () => setIsNews(previousState => !previousState);
  const SubrscribeSwitch = () =>
    setIsNewSubscr(previousState => !previousState);
  const RatingSwitch = () => setIsRating(previousState => !previousState);
  
  
  const {signOut, loginWithApple} = React.useContext(AuthContext);
  function handleLogout(){
    signOut()
  }
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
    <View style={styles.container}>
      <ScrollView style={styles.settingContainer}>
        <Text style={styles.settingTitle}>Общие</Text>
        <View>
          <View style={styles.blockSwitch}>
            <Text style={styles.TextSwitch}>Звуковые эффекты</Text>
            <Switch
              style={styles.switchStyles}
              trackColor={{false: '#A5A7A7', true: '#CDDFD4'}}
              thumbColor={isEnabledValue ? '#2E8A1A' : '#fff'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={VolueSwitch}
              value={isEnabledValue}
            />
          </View>
          <View style={styles.blockSwitch}>
            <Text style={styles.TextSwitch}>Уведомления</Text>
            <Switch
              trackColor={{false: '#A5A7A7', true: '#CDDFD4'}}
              thumbColor={isEnabledNotifications ? '#2E8A1A' : '#fff'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={NotificationSwitch}
              value={isEnabledNotifications}
            />
          </View>
          <View style={styles.blockSwitch}>
            <Text style={styles.TextSwitch}>Вибрация</Text>
            <Switch
              trackColor={{false: '#A5A7A7', true: '#CDDFD4'}}
              thumbColor={isEnabledVibr ? '#2E8A1A' : '#fff'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={VibrSwitch}
              value={isEnabledVibr}
            />
          </View>
        </View>

        <Text style={styles.settingTitle}>Уведомления</Text>
        <View style={styles.settingBlockNotification}>
          <View style={styles.blockSwitch}>
            <Text style={styles.TextSwitch}>Новости</Text>
            <Switch
              trackColor={{false: '#A5A7A7', true: '#CDDFD4'}}
              thumbColor={isEnabledNews ? '#2E8A1A' : '#fff'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={NewsSwitch}
              value={isEnabledNews}
            />
          </View>
          <View style={styles.blockSwitch}>
            <Text style={styles.TextSwitch}>Новый подписчик</Text>
            <Switch
              trackColor={{false: '#A5A7A7', true: '#CDDFD4'}}
              thumbColor={isEnabledNewSubsc ? '#2E8A1A' : '#fff'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={SubrscribeSwitch}
              value={isEnabledNewSubsc}
            />
          </View>
          <View style={styles.blockSwitch}>
            <Text style={styles.TextSwitch}>Смена рейтинга</Text>
            <Switch
              trackColor={{false: '#A5A7A7', true: '#CDDFD4'}}
              thumbColor={isEnabledRating ? '#2E8A1A' : '#fff'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={RatingSwitch}
              value={isEnabledRating}
            />
          </View>
        </View>

        <View>
          <Pressable
            style={[styles.button, styles.editUsersButton]}
            onPress={() => alert('alert')}>
            <Text style={styles.editProfileText}>Поделиться успехами</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.editUsersButton]}
            onPress={() => alert('alert')}>
            <Text style={styles.editProfileText}>Условия</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.editUsersButton]}
            onPress={() => alert('alert')}>
            <Text style={styles.editProfileText}>
              Политика конфиденциальности
            </Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.editUsersButton]}
            onPress={() => handleLogout()}>
            <Text style={styles.editProfileText}>Выйти</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
    </SafeAreaProvider>
  )
  ;
});

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
  },
  settingContainer: {
    paddingLeft: 20,
    paddingRight: 7,
    paddingBottom: 120,
    marginBottom:90,
  },
  settingTitle: {
    marginTop: 40,
    fontWeight: '700',
    fontSize: 18,
    
  },
  blockSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomColor: '#C4C4C4',
    borderBottomWidth: 1,
  },
  TextSwitch: {
    fontSize: 16,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 13,
    marginHorizontal: 20,
  },
  editUsersButton: {
    borderWidth: 1,
    borderColor: '#1E9D2D',
    marginBottom: 20,
  },
  editProfileText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
    textAlign: 'center',
  },
  settingBlockNotification: {
    marginBottom: 24,
  },
});
