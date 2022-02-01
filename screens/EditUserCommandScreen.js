import React from 'react';
import {Text, View, Pressable, Image, StyleSheet, Platform} from 'react-native';
import {SearchBar, ListItem, Avatar} from 'react-native-elements';
import GLOBAL from '../global.js'
import AuthStore from '../store/AuthStore.js';
import authParams from '../store/redux/auth/authParams.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DELETE_USER_URL =
  'https://www.ecomap.online/api/auth/delete-team-member/';
const TEAM_INFO_URL = 'https://www.ecomap.online/api/auth/team/';
import UserStore from '../store/UserStore.js';

class GroupUsersScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      users: [],
      filtred_users: [],
      active_user: '',
    };
  }

  async getUsers() {
    let loginVia = null
    loginVia = await AsyncStorage.getItem('loggedVia');
    const response = await fetch(TEAM_INFO_URL + this.props.route.params.id, {
      method: 'GET',
      headers: {
        Authorization: `${loginVia === 'apple' ? authParams.bearer : authParams.token} ${UserStore.token}`,
      },
    });
    const group = await response.json();
    this.setState({users: group.team_user});
    this.setState({filtred_users: group.team_user});
  }

  updateSearch = search => {
    this.setState({search});
    const filtred_users = this.state.users.filter(user => {
      return user.user.username.toLowerCase().includes(search.toLowerCase());
    });
    this.setState({filtred_users});
  };

  userClickHandle = user => {
    this.setState({active_user: user});
  };

  deleteUserHadle = async (id ) => {
    let loginVia = null
    loginVia = await AsyncStorage.getItem('loggedVia');
    fetch(DELETE_USER_URL + id, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${loginVia === 'apple' ? authParams.bearer : authParams.token} ${UserStore.token}`,
      },
    })
      .then(response => this.getUsers())
      .catch(error => {
        console.error(error);
      });
  };

  componentDidMount() {
    this.getUsers();
  }

  render() {
    const {search} = this.state;
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Поиск"
          lightTheme="true"
          round="true"
          inputContainerStyle={styles.searchInput}
          onChangeText={this.updateSearch}
          value={search}
          containerStyle={styles.searchbar}
        />
        <View>
          {this.state.filtred_users.map((l, i) => (
            <ListItem
              key={i}
              bottomDivider
              onPress={() => this.userClickHandle(l.user.username)}
              containerStyle={{
                backgroundColor: '#F3F5F5',
                borderTopWidth: 0,
                borderBottomWidth: 1,
                borderBottomColor: '#C4C4C4',
                elevation: 0,
                shadowOpacity: 0,
                paddingHorizontal: 0,
              }}>
              <Avatar rounded source={{uri: l.user.image}} />
              <ListItem.Content>
                <ListItem.Title>{l.user.username}</ListItem.Title>
              </ListItem.Content>
              {l.user.username === this.state.active_user && (
                <Pressable
                  style={styles.deleteBtn}
                  onPress={() => this.deleteUserHadle(l.id)}>
                  <Image source={require('../assets/mdi_delete.png')}></Image>
                </Pressable>
              )}
            </ListItem>
          ))}
        </View>
      </View>
    );
  }
}

export default GroupUsersScreen;

const styles = StyleSheet.create({
  searchbar: {
    backgroundColor: null,
    borderColor: null,
    borderTopWidth: null,
    marginTop: 10,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 0,
  },
  searchInput: {
    backgroundColor: '#DBDBDD',
    borderColor: null,
    borderTopWidth: null,
  },
  container: {
    paddingHorizontal: 20,
  },
  deleteBtn: {
    height: 50,
    width: 50,
    backgroundColor: '#FF8181',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
