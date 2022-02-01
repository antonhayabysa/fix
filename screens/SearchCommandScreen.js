import React from 'react';
import {Text, View, StyleSheet, ScrollView, Platform} from 'react-native';
import {SearchBar, ListItem, Avatar} from 'react-native-elements';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';
import GLOBAL from '../global.js';
import UserStore from '../store/UserStore.js';
import authParams from '../store/redux/auth/authParams.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ALL_TEAMS_URL = 'https://www.ecomap.online/api/auth/team';


class CommandItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      groups: [],
      filtred_groups: [],
    };
  }

  componentDidMount() {
    const unsubscribe = this.props.navigation.addListener('focus', async () => {
      this.getAllGroups();
    });
    return unsubscribe;
  }

  async getAllGroups() {
    let loginVia = null
    loginVia = await AsyncStorage.getItem('loggedVia');
    console.log('Good ttootot:'+ `${loginVia === 'apple' ? authParams.bearer : authParams.token} ${UserStore.token}`)
     fetch(ALL_TEAMS_URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${loginVia === 'apple' ? authParams.bearer : authParams.token} ${UserStore.token}`,
      }
    }).then(response =>  response.json())
    .then(groups => {
      console.log("Groups:", groups)
      this.setState({groups});
      this.setState({filtred_groups: groups});
    })
    .catch(error => {
      console.error(error);
    });;
    
    
  }

  updateSearch = search => {
    this.setState({search});
    const filtred_groups = this.state.groups.filter(group => {
      return group.title.toLowerCase().includes(search.toLowerCase());
    });
    this.setState({filtred_groups});
  };

  render() {
    const {search} = this.state;

    if (!this.props.locationIsSpecified) {
      return (
        <View>
          <Text style={styles.locationNoneText}>
            Пожалуйста, укажите город в профиле
          </Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.container}>
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
          {/* {this.state.filtred_groups && this.state.filtred_groups.map((l, i) => (
            <ListItem
              key={i}
              onPress={() =>
                this.props.navigation.navigate('CommandUserScreen', {
                  id: l.id,
                })
              }
              containerStyle={{
                backgroundColor: '#F3F5F5',
                borderTopWidth: 0,
                borderBottomWidth: 1,
                borderBottomColor: '#C4C4C4',
                elevation: 0,
                shadowOpacity: 0,
                paddingHorizontal: 0,
              }}>
              <Avatar
                // rounded
                source={
                  l.image !== null
                    ? {uri: 'https://www.ecomap.online' + l.image}
                    : require('../assets/imgGroup.png')
                }
              />
              <ListItem.Content>
                <ListItem.Title>{l.title}</ListItem.Title>
                {this.props.hasSubtitle && (
                  <ListItem.Subtitle>{l.team_user_count} участников</ListItem.Subtitle>
                )}
              </ListItem.Content>
            </ListItem>
          ))} */}
        </View>
      </ScrollView>
    );
  }
}

const Tab = createMaterialTopTabNavigator();

const SearchCommandScreen = ({navigation}) => {
  const [userCity, setUserCity] = React.useState();

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
    setUserCity(user.city);
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await getUserInfo();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: '#F3F5F5',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        indicatorStyle: {
          height: 1,
          backgroundColor: '#1E9D2D',
          zIndex: 10,
        },
      }}>
      <Tab.Screen
        name="YouLocation"
        children={props => (
          <CommandItem
            {...props}
            hasSubtitle={true}
            locationIsSpecified={!!userCity}
          />
        )}
        options={{
          title: userCity ? userCity : 'Город',
        }}
      />
      <Tab.Screen
        name="OtherLocation"
        children={props => (
          <CommandItem
            {...props}
            hasSubtitle={false}
            locationIsSpecified={true}
          />
        )}
        options={{
          title: 'Россия',
        }}
      />
    </Tab.Navigator>
  );
};

export default SearchCommandScreen;

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
  container: {
    paddingHorizontal: 20,
  },
  searchInput: {
    backgroundColor: '#DBDBDD',
    borderColor: null,
    borderTopWidth: null,
  },
  groupItemDetail: {
    backgroundColor: '#000',
  },
  locationNoneText: {
    marginTop: 15,
    fontSize: 16,
    textAlign: 'center',
  },
});
