import React from 'react';
import {Text, View, Pressable, Image, StyleSheet} from 'react-native';
import {SearchBar, ListItem, Avatar} from 'react-native-elements';

const list = [
  {
    name: 'Amy Farha',
    avatar_url:
      'https://sun9-37.userapi.com/s/v1/ig2/PipuMUXoRhAvWKVTUeE7p8z1HvQ271_WtSlqZA5ioBUs9MbToDRSSM5LU0Gd3-jWVXmcGuqz0-zrprrql7VSKpmq.jpg?size=50x0&quality=96&crop=0,0,750,750&ava=1',
  },
  {
    name: 'Chris Jackson',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  },
];

class GroupUsersScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      users: [],
      filtred_users: [],
    };
  }

  componentDidMount() {
    this.setState({users: this.props.route.params.users});
    this.setState({filtred_users: this.props.route.params.users});
  }

  updateSearch = search => {
    this.setState({search});
    const filtred_users = this.state.users.filter(user => {
      return user.user.username.toLowerCase().includes(search.toLowerCase());
    });
    this.setState({filtred_users});
  };

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
              onPress={() =>
                this.props.navigation.navigate('CommandUserScreen')
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
              <Avatar rounded source={{uri: l.user.image}} />
              <ListItem.Content>
                <ListItem.Title>{l.user.username}</ListItem.Title>
              </ListItem.Content>
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
});
