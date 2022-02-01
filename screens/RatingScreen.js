import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import { SearchBar, ListItem, Avatar } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const list = [
  {
    name: 'Amy Farha',
    subtitle: 'Стратег',
    avatar_url: 'https://sun9-37.userapi.com/s/v1/ig2/PipuMUXoRhAvWKVTUeE7p8z1HvQ271_WtSlqZA5ioBUs9MbToDRSSM5LU0Gd3-jWVXmcGuqz0-zrprrql7VSKpmq.jpg?size=50x0&quality=96&crop=0,0,750,750&ava=1',
  },
  {
    name: 'Chris Jackson',
    subtitle: 'Владыка',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  },
]

class RatingLocation extends React.Component {
    state = {
        search: '',
    };
    
    updateSearch = (search) => {
        this.setState({ search });
    };
    
    render() {
        const { search } = this.state;
    
      return (
          // <View style={styles.container}>
          <View style={styles.conteinerBuild}>
            <Text style={styles.textBuild}>Страница еще в разработке</Text>
          </View>
          // <SearchBar
          //   placeholder="Поиск"
          //   lightTheme="true"
          //   round="true"
          //   onChangeText={this.updateSearch}
          //   inputContainerStyle={styles.searchInput}
          //   value={search}
          //   containerStyle={styles.searchbar}
          // />
          // <View>
          //           {
          //               list.map((l, i) => (
          //               <ListItem containerStyle={styles.containerListItem} key={i} bottomDivider>
          //                   <Avatar avatarStyle={styles.avatarik} source={{uri: l.avatar_url}}/>
          //                   <ListItem.Content>
          //                           <ListItem.Title>{l.name}</ListItem.Title>
          //                           <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
          //                   </ListItem.Content>
          //               </ListItem>
          //               ))
          //           }
          //       </View>
          // </View>
        );
      }
}
  
class RatingAllLocation extends React.Component {
    state = {
        search: '',
    };
    
    updateSearch = (search) => {
        this.setState({ search });
    };
    
    render() {
        const { search } = this.state;
    
        return (
          // <View style={styles.container}>
          <View style={styles.conteinerBuild}>
            <Text style={styles.textBuild}>Страница в разработке</Text>
          </View>
          // <SearchBar
          //   placeholder="Поиск"
          //   lightTheme="true"
          //   round="true"
          //   onChangeText={this.updateSearch}
          //   inputContainerStyle={styles.searchInput}
          //   value={search}
          //   containerStyle={styles.searchbar}
          // />
          // <View>
          //           {
          //               list.map((l, i) => (
          //               <ListItem containerStyle={styles.containerListItem} key={i} bottomDivider>
          //                   <Avatar avatarStyle={styles.avatarik} source={{uri: l.avatar_url}}/>
          //                   <ListItem.Content>
          //                           <ListItem.Title>{l.name}</ListItem.Title>
          //                           <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
          //                   </ListItem.Content>
          //               </ListItem>
          //               ))
          //           }
          //       </View>
          // </View>
        );
      }
}

const Tab = createMaterialTopTabNavigator();

const RatingScreen = ({ navigation }) => {
    return(
        <Tab.Navigator
          tabBarOptions = {{
            style: {
                backgroundColor: '#F3F5F5',
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            },
            indicatorStyle: {
                height: 1,
                backgroundColor: '#1E9D2D',
                zIndex: 10
            }
          }}
        >
          <Tab.Screen name="RatingLocation" component={RatingLocation} options={{ 
            title: "Москва" 
          }}  />
          <Tab.Screen name="RatingAllLocation" component={RatingAllLocation} options={{ 
            title: "Россия" 
          }}  />
        </Tab.Navigator>
      );
}

export default RatingScreen

const styles = StyleSheet.create({
    searchbar: {
        backgroundColor: null,
        borderColor: null,
        borderTopWidth: null,
        marginTop: 10,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        paddingHorizontal: 0
    },
    searchInput: {
      backgroundColor: '#DBDBDD',
      borderColor: null,
      borderTopWidth: null,
    },
    containerListItem: {
      backgroundColor: null,
      borderBottomWidth: 1,
      borderBottomColor: '#C4C4C4',
      paddingHorizontal: 0,
      paddingVertical: 0,
      paddingBottom: 8,
      marginBottom: 8
  },
  avatarik: {
    borderRadius: 2,
  },
  container: {
    paddingHorizontal: 20,
  },
  textBuild: {
    fontSize: 21,
  },
  conteinerBuild: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})