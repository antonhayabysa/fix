import React, {useState, useEffect, Component} from 'react';
import {vw, vh, vmin, vmax} from 'react-native-expo-viewport-units';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  Pressable,
  Button,
  Modal,
  TextInput,
  Platform,
} from 'react-native';
import UserStore from '../store/UserStore';
import {cityRelations} from '../store/GeojsonStore';
import RadioButtonRN from 'radio-buttons-react-native';
import TextTruncate from 'react-native-text-truncate';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import AwesomeAlert from 'react-native-awesome-alerts';
import AwesomeButton from 'react-native-really-awesome-button';
import {Swiper} from '../component';
import {Header} from 'react-native-elements';
import {render} from 'react-dom';
import GLOBAL from '../global.js';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';
import {SvgXml} from 'react-native-svg';
import authParams from '../store/redux/auth/authParams';
import AsyncStorage from '@react-native-async-storage/async-storage';

const markerRendering = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 4C10.58 4 7 7.58 7 12C7 16.42 10.58 20 15 20C19.42 20 23 16.42 23 12C23 7.58 19.42 4 15 4Z" fill="#32DC62"/>
<path d="M15 4C10.58 4 7 7.58 7 12C7 16.42 10.58 20 15 20C19.42 20 23 16.42 23 12C23 7.58 19.42 4 15 4Z" fill="url(#paint0_linear)"/>
<path d="M3 11.9998C3 9.38977 4.67 7.16977 7 6.34977V4.25977C3.55 5.14977 1 8.26977 1 11.9998C1 15.7298 3.55 18.8498 7 19.7398V17.6498C4.67 16.8298 3 14.6098 3 11.9998Z" fill="#32DC62"/>
<path d="M3 11.9998C3 9.38977 4.67 7.16977 7 6.34977V4.25977C3.55 5.14977 1 8.26977 1 11.9998C1 15.7298 3.55 18.8498 7 19.7398V17.6498C4.67 16.8298 3 14.6098 3 11.9998Z" fill="url(#paint1_linear)"/>
<defs>
<linearGradient id="paint0_linear" x1="10.36" y1="5.84" x2="19" y2="17.2" gradientUnits="userSpaceOnUse">
<stop stop-color="#1E9D2D"/>
<stop offset="1" stop-color="#3D7606"/>
</linearGradient>
<linearGradient id="paint1_linear" x1="2.26" y1="6.03997" x2="9.27837" y2="9.61665" gradientUnits="userSpaceOnUse">
<stop stop-color="#1E9D2D"/>
<stop offset="1" stop-color="#3D7606"/>
</linearGradient>
</defs>
</svg>`;

const arrowRendering = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 3L3 10.53V11.51L9.84 14.16L12.48 21H13.46L21 3Z" fill="black"/>
<path d="M21 3L3 10.53V11.51L9.84 14.16L12.48 21H13.46L21 3Z" fill="url(#paint0_linear)"/>
<defs>
<linearGradient id="paint0_linear" x1="6.78" y1="5.07" x2="16.5" y2="17.85" gradientUnits="userSpaceOnUse">
<stop stop-color="#1E9D2D"/>
<stop offset="1" stop-color="#3D7606"/>
</linearGradient>
</defs>
</svg>`;

MapboxGL.setAccessToken(
  'pk.eyJ1IjoidGFidWxhd2ViIiwiYSI6ImNrcGE2NDc4YzBxemMybm54amYxNWhkeHcifQ.wY90Me9rzVCWpdXBfpUdtQ',
);

const evaluationLineStyles = {
  0: {
    lineColor: 'red',
    lineOpacity: 1,
  },
  1: {
    lineColor: 'red',
    lineOpacity: 1,
  },
  2: {
    lineColor: 'yellow',
    lineOpacity: 1,
  },
  3: {
    lineColor: 'green',
    lineOpacity: 1,
  },
};

const stylesLine = {
  neighborhoods: {
    lineWidth: 20,
    lineOpacity: 0.01,
  },
  selectedNeighborhood: {
    lineColor: 'lightblue',
    lineOpacity: 1,
  },
};
const ANNOTATION_SIZE = 450;
const PIDOR = '';
const stylesPoint = StyleSheet.create({
  annotationContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    borderColor: 'rgba(255, 255, 255, 0)',
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    height: ANNOTATION_SIZE,
    justifyContent: 'center',
    overflow: 'hidden',
    width: ANNOTATION_SIZE,
  },
});

const ALL_USER_COMMETS = `https://www.ecomap.online/api/map/user-review/`;
// let evaluations = [];
// const getUserInfo = () => {
//   fetch(ALL_USER_COMMETS, {
//     method: 'GET',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//       Authorization: `Token ${UserStore.token}`,
//     },
//   })
//     .then(response => response.json())
//     .then(json => {
//       let abobus = json;
//       evaluations = abobus.map(value => {
//         // console.log(value);

//         return {
//           id: value.street.geo_json_id,
//           score: value.rating,
//         };
//       });
//     })
//     .catch(error => {
//       console.error(error);
//     });
// };

class AnnotationWithRemoteImage extends React.Component {
  annotationRef = null;
  render() {
    const {id, coordinate, title} = this.props;
    return (
      <MapboxGL.PointAnnotation id={id} coordinate={coordinate} title={title}>
        <View style={stylesPoint.annotationContainer}>
          <MapboxGL.Callout title={PIDOR} />
        </View>
      </MapboxGL.PointAnnotation>
    );
  }
}

class HomeScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      userCitypop: null,
      userLatitud: null,
      userLangitud: null,
      activeAnnotationIndex: -1,
      previousActiveAnnotationIndex: -1,
      freezeCount: null,
      freezStreet: false,
      showAlert: false,
      showAlertFreez: false,
      backgroundColor: 'blue',

      center: [],
      location: [],

      emptyState: {
        selectedGeoJSON: null,
        selectedCommunityDistrict: -1,
      },
      nameStreet: null,
      followUserLocation: false,
      idStreet: null,
      ididStreet: null,
      modalVisible: false,
      StreetCommentViewOrNot: false,
      StreetCoordinate: null,
      StreetComment: [
        {
          label: 'Карта с отметками',
          StreetCommentView: false,
        },
        {
          label: 'Карта без отметок',
          StreetCommentView: true,
        },
      ],

      lastStreetCommentView: false,
      lastStreetCommentText: null,
      lastStreetCommentRating: null,
      lastStreetCommentUserName: null,
      lastStreetCommentUserRange: null,
      lastStreetCommentUserImage: null,
      lastStreetCommentImage: null,
      lastStreetCommentStar: null,

      evaluations: [],

      width: 0,
      height: 0,

      locationAPI: {},

      snapPoints: ['35%', '35%', '65%'],
    };
    this.onRegionDidChange = this.onRegionDidChange.bind(this);
    this.getLat = this.getLat.bind(this);
    this.getLng = this.getLng.bind(this);

    this.onUserLocationUpdate = this.onUserLocationUpdate.bind(this);
    this._scaleIn = null;
    this._scaleOut = null;

    this.onPress = this.onPress.bind(this);

    this.getLastStreetComment = this.getLastStreetComment.bind(this);
    this.postStreet = this.postStreet.bind(this);

    this.bottomSheetModalRef = React.createRef();
    this.handlePresentModalPress = this.handlePresentModalPress.bind(this);
    this.handleDismissModalPress = this.handleDismissModalPress.bind(this);
  }
  getUserData = async () => {
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
        this.setState({freezeCount: json.freeze_item_count});
        this.setState(prevState => ({
          ...prevState,
          userCitypop: json.city,
          locationAPI: cityRelations[json.city],
        }));
      });
  };

  getUserInfo = async () => {
    let loginVia = null
    loginVia = await AsyncStorage.getItem('loggedVia');
    fetch(ALL_USER_COMMETS, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${loginVia === 'apple'? authParams.bearer: authParams.token} ${UserStore.token}`,
      },
    })
      .then(response => response.json())
      .then(json => {
        let abobus = json;
        const evaluations = abobus.map(value => {
          return {
            id: value.street.geo_json_id,
            score: value.rating,
          };
        });
        this.setState({evaluations});
      })
      .catch(error => {
        console.error(error);
      });
  };

  async componentFocusHandler() {}

  componentDidMount() {
    this.getUserInfo();
    this.getUserData();
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          userLatitud: position.coords.latitude,
          userLangitud: position.coords.longitude,
        });
      },
      error => {
        // See error code charts below.
        //console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      this.getUserInfo();
      this.getUserData();
    });
  }

  componentWillUnmount() {}

  async onRegionDidChange() {
    const location = await this._map.getCenter();
    this.setState({location});
  }

  getLng() {
    const {location} = this.state;
    return location.length === 2 ? `Lng: ${location[0]}` : 'Not available';
  }

  getLat() {
    const {location} = this.state;
    return location.length === 2 ? `Lat: ${location[1]}` : 'Not available';
  }

  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  showAlertFreez = () => {
    this.setState({
      showAlertFreez: true,
    });
  };

  hideAlertFreez = () => {
    this.setState({
      showAlertFreez: false,
    });
  };

  onFlyToPress() {
    Geolocation.getCurrentPosition(
      position => {
        this.setState({userLatitud: position.coords.latitude});
        this.setState({userLangitud: position.coords.longitude});
      },
      error => {
        //console.log(error);
      },
    );
  }

  renderExpandor = () => {
    return (
      <Text
        style={{
          textAlign: 'left',
          justifyContent: 'flex-start',
          marginBottom: 24,
          marginTop: 8,
          fontSize: 10,
        }}>
        {'Читать полностью'}
      </Text>
    );
  };
  renderCollapsar = () => {
    return (
      <Text
        style={{
          marginBottom: 24,
          marginTop: 8,
          fontSize: 10,
        }}>
        {'Скрыть'}
      </Text>
    );
  };

  onUserLocationUpdate(location) {
    console.log('call');
    //console.log("Features State:", this.state.locationAPI.features)

    this.setState({
      timestamp: location.timestamp,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      altitude: location.coords.altitude,
      heading: location.coords.heading,
      accuracy: location.coords.accuracy,
      speed: location.coords.speed,
    });
  }

  openModal = () => {
    this.setState({modalVisible: true});
  };

  closeModal = () => {
    this.setState({modalVisible: false});
  };

  get emptyState() {
    return {selectedGeoJSON: null, selectedCommunityDistrict: -1};
  }

  async onPress(e) {
    const {screenPointX, screenPointY} = e.properties;
    const featureCollection = await this._map.queryRenderedFeaturesAtPoint(
      [screenPointX, screenPointY],
      null,
      ['nycFill'],
    );

    if (featureCollection.features.length) {
      this.handlePresentModalPress();
      this.setState({
        selectedGeoJSON: featureCollection,
        selectedCommunityDistrict:
          featureCollection.features[0].properties.name,
        nameStreet: featureCollection.features[0].properties.name,
        idStreet: featureCollection.features[0].properties.id,
        StreetCoordinate: featureCollection.features[0],
      });
      this.getLastStreetComment(featureCollection);
      this.postStreet();
    } else {
      this.handleDismissModalPress();
      this.setState({
        ...this.state.emptyState,
        StreetCoordinate: null,
      });
    }
  }

  async getLastStreetComment(featureCollection) {
    const LAST_STREET_COMENT = `https://www.ecomap.online/api/map/last-user-review/${featureCollection.features[0].properties.id}/`;
    let loginVia = null
    loginVia = await AsyncStorage.getItem('loggedVia');

    await fetch(LAST_STREET_COMENT, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${loginVia === 'apple'? authParams.bearer: authParams.token} ${UserStore.token}`,
      },
    })
      .then(response => response.json())
      .then(json => {
        console.log("User home:", json.user)
        if (json == 'Comment matching query does not exist.') {
          this.setState({
            lastStreetCommentView: false,
          });
          console.log('Нет коментов');
        } else {
          this.setState({
            lastStreetCommentView: true,
            lastStreetCommentText: json.text,
            lastStreetCommentRating: json.rating,
            lastStreetCommentUserName: json.user.username,
            lastStreetCommentUserRange: json.user.rang,
            lastStreetCommentUserImage: json.user.image,
            lastStreetCommentImage: json.image,
            lastStreetCommentStar: json.rating,
            // freezStreet: json[0].street.is_freeze,
          });
          console.log('Есть коменты');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  async postStreet() {
    let loginVia = null
    loginVia = await AsyncStorage.getItem('loggedVia');

    await fetch(
      `https://www.ecomap.online/api/map/street/${this.state.idStreet}/`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `${loginVia === 'apple'? authParams.bearer: authParams.token} ${UserStore.token}`,
        },
        body: JSON.stringify({
          title: this.state.nameStreet,
        }),
      },
    )
      .then(response => response.json())
      .then(json => {
        if (json == 'Error UNIQUE constraint failed: map_street.geo_json_id') {
          this.getSreetData();
        } else {
          this.setState({ididStreet: json.geo_json_id});
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  getSreetData = async () => {
    await fetch(
      `https://www.ecomap.online/api/map/street/${this.state.idStreet}/`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `${loginVia === 'apple' ? authParams.bearer : authParams.token} ${UserStore.token}`,
        },
      },
    )
      .then(response => response.json())
      .then(json => {
        this.setState({ididStreet: json.geo_json_id});
      })
      .catch(error => {
        console.log(error);
      });
  };

  // freezStreetActivate = async () => {
  //   await fetch('https://www.ecomap.online/api/map/freeze/', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //       Authorization: `Token ${UserStore.token}`,
  //     },
  //     body: JSON.stringify({
  //       geo_json_id: this.state.idStreet,
  //     }),
  //   })
  //     .then(response => response.json())
  //     .then(json => {
  //       // console.log(json);
  //     });
  // };

  onAnnotationDeselected(deselectedIndex) {
    const nextState = {};

    if (this.state.activeAnnotationIndex === deselectedIndex) {
      nextState.activeAnnotationIndex = -1;
    }

    this._scaleOut = new Animated.Value(1);
    Animated.timing(this._scaleOut, {toValue: 0.6, duration: 200}).start();
    nextState.previousActiveAnnotationIndex = deselectedIndex;
    this.setState(nextState);
  }

  renderAnnotations() {
    const items = [];

    for (let i = 0; i < this.state.coordinates.length; i++) {
      const coordinate = this.state.coordinates[i];

      const title = `Lon: ${coordinate[0]} Lat: ${coordinate[1]}`;
      const id = `pointAnnotation${i}`;

      const animationStyle = {};
      if (i === this.state.activeAnnotationIndex) {
        animationStyle.transform = [{scale: this._scaleIn}];
      } else if (i === this.state.previousActiveAnnotationIndex) {
        animationStyle.transform = [{scale: this._scaleOut}];
      }

      items.push(
        <AnnotationWithRemoteImage
          key={id}
          id={id}
          coordinate={coordinate}
          title={title}
          streetName={PIDOR}
        />,
      );
    }

    return items;
  }

  handlePresentModalPress() {
    this.bottomSheetModalRef.current?.present();
  }

  handleDismissModalPress() {
    this.bottomSheetModalRef.current?.dismiss();
  }

  render() {
    return (
      <BottomSheetModalProvider>
        <View
          style={{
            flex: 1,
            position: 'relative',
            width: '100%',
            height: vh(100),
            top: '-15%',
          }}>
          {/* NOTE Подгружаем Псков если у пользователя в профиле стоит город Псков */}
          {this.state.userCitypop ? (
            <View>
              {!this.state.StreetCommentViewOrNot ? (
                <View>
                  <View style={styles.container}>
                    <MapboxGL.MapView
                      style={styles.map}
                      styleURL="mapbox://styles/mapbox/dark-v10"
                      ref={c => (this._map = c)}
                      onPress={this.onPress}>
                      <MapboxGL.UserLocation
                        visible={true}
                        onUpdate={this.onUserLocationUpdate}
                      />
                      <MapboxGL.Camera
                        zoomLevel={11}
                        centerCoordinate={[
                          this.state.userLatitud,
                          this.state.userLangitud,
                        ]}
                        followUserLocation
                        followUserMode={'normal'}
                      />
                      {this.state.userCitypop !== null ? (
                        <MapboxGL.ShapeSource
                          id="smileyFaceSource"
                          shape={{
                            type: 'FeatureCollection',
                            features: this.state.locationAPI.features.map(
                              street => {
                                let evaluation = this.state.evaluations.filter(
                                  item => item.id == street.properties.id,
                                );
                                if (evaluation.length) {
                                  const totalScore = evaluation.reduce(
                                    (acc, item) => acc + item.score,
                                    0,
                                  );

                                  const averageScore =
                                    totalScore / evaluation.length;
                                  const roundedScore = Math.round(averageScore);

                                  street.properties.color =
                                    evaluationLineStyles[
                                      roundedScore
                                    ].lineColor;
                                }
                                return street;
                              },
                            ),
                          }}>
                          <MapboxGL.LineLayer
                            id={'equals'}
                            style={{
                              lineWidth: 4,
                              lineOpacity: 1,
                              lineColor: ['get', 'color'],
                            }}
                          />
                        </MapboxGL.ShapeSource>
                      ) : null}
                      {this.state.userCitypop ? (
                        <MapboxGL.ShapeSource
                          id="smileyFaceSource"
                          shape={this.state.locationAPI}>
                          <MapboxGL.LineLayer
                            id="nycFill"
                            style={
                              stylesLine.neighborhoods
                            }></MapboxGL.LineLayer>
                        </MapboxGL.ShapeSource>
                      ) : null}

                      {this.state.selectedGeoJSON ? (
                        <MapboxGL.ShapeSource
                          id="selectedNYC"
                          shape={this.state.selectedGeoJSON}>
                          <MapboxGL.LineLayer
                            id="selectedNYCFill"
                            style={stylesLine.selectedNeighborhood}
                          />
                        </MapboxGL.ShapeSource>
                      ) : null}
                    </MapboxGL.MapView>
                  </View>
                </View>
              ) : (
                <View>
                  <View style={styles.container}>
                    <MapboxGL.MapView
                      // onRegionDidChange={this.onRegionDidChange}
                      style={styles.map}
                      styleURL="mapbox://styles/mapbox/dark-v10"
                      ref={c => (this._map = c)}
                      onPress={this.onPress}
                      zoomLevel={12}>
                      <MapboxGL.UserLocation
                        visible={true}
                        onUpdate={this.onUserLocationUpdate}
                      />
                      <MapboxGL.Camera
                        zoomLevel={12}
                        animationMode={'flyTo'}
                        centerCoordinate={this.state.location}
                      />
                      {this.state.userCitypop ? (
                        <MapboxGL.ShapeSource
                          id="smileyFaceSource"
                          shape={this.state.locationAPI}>
                          <MapboxGL.LineLayer
                            id="selectedFill"
                            style={
                              stylesLine.neighborhoods
                            }></MapboxGL.LineLayer>
                        </MapboxGL.ShapeSource>
                      ) : null}

                      {this.state.selectedGeoJSON ? (
                        <MapboxGL.ShapeSource
                          id="selectedNYC"
                          shape={this.state.selectedGeoJSON}>
                          <MapboxGL.LineLayer
                            id="selectedNYCFill"
                            style={stylesLine.selectedNeighborhood}
                          />
                        </MapboxGL.ShapeSource>
                      ) : null}
                    </MapboxGL.MapView>
                  </View>
                </View>
              )}
            </View>
          ) : null}

          {this.state.lastStreetCommentView ? (
            <BottomSheetModal
              ref={this.bottomSheetModalRef}
              index={1}
              snapPoints={this.state.snapPoints}>
              <Text style={styles.boxswipeTitle}>{this.state.nameStreet}</Text>

              <View styles={styles.containerImageStreet}>
                <Image
                  style={styles.imageStreet}
                  source={{
                    uri:
                      'https://www.ecomap.online' +
                      this.state.lastStreetCommentImage,
                  }}
                />
              </View>
              <View style={styles.containerSwiper}>
                <View style={styles.containerAccountSwiper}>
                  <Image
                    source={{
                      uri:
                        'https://www.ecomap.online' +
                        this.state.lastStreetCommentUserImage,
                    }}
                    style={styles.SwipeAvatar}
                  />
                  <View>
                    <Text style={styles.SwipeAccountTitle}>
                      {this.state.lastStreetCommentUserName}
                    </Text>
                    <Text style={styles.SwipeAccountDescription}>
                      {this.state.lastStreetCommentUserRange}
                    </Text>
                  </View>
                </View>
                {this.state.lastStreetCommentStar == 3 ? (
                  <View style={styles.containerStars}>
                    <Image
                      source={require('../assets/RatingStar.png')}
                      style={styles.ImageRating}
                    />
                    <Image
                      source={require('../assets/RatingStar.png')}
                      style={[styles.ImageRating, styles.ImageRatingCenter]}
                    />
                    <Image
                      source={require('../assets/RatingStar.png')}
                      style={styles.ImageRating}
                    />
                  </View>
                ) : this.state.lastStreetCommentStar == 2 ? (
                  <View style={styles.containerStars}>
                    <Image
                      source={require('../assets/RatingStarYelllow.png')}
                      style={styles.ImageRating}
                    />
                    <Image
                      source={require('../assets/RatingStarYelllow.png')}
                      style={[styles.ImageRating, styles.ImageRatingCenter]}
                    />
                    <Image
                      source={require('../assets/RatingStarGray.png')}
                      style={styles.ImageRating}
                    />
                  </View>
                ) : (
                  <View style={styles.containerStars}>
                    <Image
                      source={require('../assets/RatingStarRed.png')}
                      style={styles.ImageRating}
                    />
                    <Image
                      source={require('../assets/RatingStarGray.png')}
                      style={[styles.ImageRating, styles.ImageRatingCenter]}
                    />
                    <Image
                      source={require('../assets/RatingStarGray.png')}
                      style={styles.ImageRating}
                    />
                  </View>
                )}
              </View>
              <TextTruncate
                style={{
                  fontSize: 10,
                  fontWeight: '400',
                  color: 'black',
                  paddingHorizontal: 20,
                  backgroundColor: '#F6F6F6',
                  marginBottom: 10,
                }}
                numberOfLines={2}
                renderExpandor={this.renderExpandor}
                renderCollapsar={this.renderCollapsar}>
                <Text style={{marginBottom: 10}}>
                  {this.state.lastStreetCommentText}
                </Text>
              </TextTruncate>
              {/* <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() =>
                this.props.navigation.navigate('CreateEvaluation', {
                  streetName: this.state.nameStreet,
                  streetid: this.state.idStreet,
                  sreetCoordinate: this.state.StreetCoordinate,
                  streetFreezz: this.state.freezStreet,
                })
              }>
              <Text style={styles.textStyle}>Оставить оценку</Text>
            </Pressable> */}
              <View
                style={{
                  paddingHorizontal: 20,
                  width: '100%',
                  marginBottom: 10,
                }}>
                <AwesomeButton
                  type="primary"
                  backgroundColor="#1E9D2D"
                  backgroundDarker="#3D7606"
                  borderRadius={15}
                  width={null}
                  stretch
                  onPress={() =>
                    this.props.navigation.navigate('CreateEvaluation', {
                      streetName: this.state.nameStreet,
                      streetid: this.state.idStreet,
                      sreetCoordinate: this.state.StreetCoordinate,
                      // streetFreezz: this.state.freezStreet,
                    })
                  }>
                  <Text style={styles.textStyle}>Оставить оценку</Text>
                </AwesomeButton>
              </View>
              <Pressable
                style={styles.buttonHistory}
                onPress={() =>
                  this.props.navigation.navigate('EvaluationHistory', {
                    streetid: this.state.idStreet,
                    streetName: this.state.nameStreet,
                  })
                }>
                <Text style={styles.headerCrownText}>История оценок</Text>
                <Image
                  source={require('../assets/arrowRightHistory.png')}
                  style={{width: 10, height: 8}}
                />
              </Pressable>

              <Pressable
                style={[styles.buttonHistory, {marginTop: 8}]}
                onPress={() =>
                  this.props.navigation.navigate('EvaluationUser', {
                    streetid: this.state.idStreet,
                    streetName: this.state.nameStreet,
                  })
                }>
                <Text style={styles.headerCrownText}>Мои отзывы</Text>
                <Image
                  source={require('../assets/arrowRightHistory.png')}
                  style={{width: 8, height: 8}}
                />
              </Pressable>
              {/* {this.state.freezeCount == 0 ?
              <Pressable
                style={[styles.buttonHistory, {marginTop: 8}]}
                onPress={() => {this.showAlertFreez();}}>
                <Text style={styles.headerCrownText}>Заморозка</Text>
                <Image
                  source={require('../assets/arrowRightHistory.png')}
                  style={{width: 8, height: 8}}
                />
              </Pressable>
              :
              <Pressable
                style={[styles.buttonHistory, {marginTop: 8}]}
                onPress={() => this.freezStreetActivate()}>
                <Text style={styles.headerCrownText}>Заморозка</Text>
                <Image
                  source={require('../assets/arrowRightHistory.png')}
                  style={{width: 8, height: 8}}
                />
              </Pressable>
            } */}
            </BottomSheetModal>
          ) : (
            <BottomSheetModal
              ref={this.bottomSheetModalRef}
              index={1}
              snapPoints={this.state.snapPoints}>
              <Text style={styles.boxswipeTitle}>{this.state.nameStreet}</Text>
              <Text
                style={{
                  paddingHorizontal: 20,
                  marginBottom: 24,
                  fontSize: 12,
                }}>
                У этой улицы ещё нет оценок, вы можете оставить первую.
              </Text>
              {/* <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() =>
                this.props.navigation.navigate('CreateEvaluation', {
                  streetName: this.state.nameStreet,
                  streetid: this.state.idStreet,
                  sreetCoordinate: this.state.StreetCoordinate,
                  streetFreezz: this.state.freezStreet,
                })
              }>
              <Text style={styles.textStyle}>Оставить оценку</Text>
            </Pressable> */}
              <View
                style={{
                  paddingHorizontal: 20,
                  width: '100%',
                  marginBottom: 10,
                }}>
                <AwesomeButton
                  type="primary"
                  backgroundColor="#1E9D2D"
                  backgroundDarker="#3D7606"
                  borderRadius={15}
                  width={null}
                  stretch
                  onPress={() =>
                    this.props.navigation.navigate('CreateEvaluation', {
                      streetName: this.state.nameStreet,
                      streetid: this.state.idStreet,
                      sreetCoordinate: this.state.StreetCoordinate,
                      // streetFreezz: this.state.freezStreet,
                    })
                  }>
                  <Text style={styles.textStyle}>Оставить оценку</Text>
                </AwesomeButton>
              </View>
            </BottomSheetModal>
          )}
          <AwesomeAlert
            show={this.state.showAlert}
            showProgress={false}
            title="Улица заморожена"
            message="Вы не можете оставить отзыв так как улица заморожена"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            confirmText="Закрыть"
            confirmButtonColor="#1E9D2D"
            onCancelPressed={() => {
              this.hideAlert();
            }}
            onConfirmPressed={() => {
              this.hideAlert();
            }}
          />

          <AwesomeAlert
            show={this.state.showAlertFreez}
            showProgress={false}
            title="Нет заморозки"
            message="Зайдите в магазин и купите заморозку"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            confirmText="Закрыть"
            confirmButtonColor="#1E9D2D"
            onCancelPressed={() => {
              this.hideAlertFreez();
            }}
            onConfirmPressed={() => {
              this.hideAlertFreez();
            }}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Переключить вид</Text>
                <RadioButtonRN
                  data={this.state.StreetComment}
                  boxStyle={styles.radioBoxStyle}
                  style={styles.allStyleradio}
                  textStyle={styles.TextRadioBox}
                  activeColor="#1E9D2D"
                  deactiveColor="#1E9D2D"
                  circleSize={12}
                  selectedBtn={e => {
                    if (e.StreetCommentView) {
                      this.setState({StreetCommentViewOrNot: true});
                    } else {
                      this.setState({StreetCommentViewOrNot: false});
                    }
                    setTimeout(() => {
                      this.closeModal();
                    }, 800);
                  }}
                />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  // onPress={() => setModalVisible(!modalVisible)}
                ></Pressable>
              </View>
            </View>
          </Modal>
          <View
            style={{
              position: 'absolute', //use absolute position to show button on top of the map
              bottom: vh(12), //for center align
              right: vw(5),
              alignSelf: 'flex-end', //for align to right
            }}>
            <Pressable
              style={[styles.mapEl, {marginBottom: 8}]}
              onPress={() => this.onFlyToPress()}>
              <SvgXml xml={arrowRendering} />
            </Pressable>
            {/* <Pressable style={styles.mapEl} onPress={() => this.openModal()}>
            <SvgXml xml={markerRendering} />
          </Pressable> */}
          </View>
        </View>
      </BottomSheetModalProvider>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();

  return <HomeScreen {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
  freezNotice: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
  },
  radioBoxStyle: {
    borderColor: null,
    alignSelf: 'flex-start',
    borderWidth: null,
    backgroundColor: null,
    marginHorizontal: 0,
    paddingVertical: 0,
    marginLeft: 0,
    paddingLeft: 0,
  },
  allStyleradio: {
    margin: null,
    padding: null,
    paddingHorizontal: null,
    marginHorizontal: 0,
  },
  textStyle: {
    color: 'white',
    fontWeight: '400',
    textAlign: 'center',
    fontSize: 16,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 13,
  },
  buttonOpen: {
    backgroundColor: '#1E9D2D',
    marginBottom: 12,
    marginHorizontal: 20,
  },
  editProfileText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
  },

  TextRadioBox: {
    marginLeft: '-4%',
    padding: null,
    paddingHorizontal: null,
    color: '#444',
    fontSize: 15,
    fontWeight: '500',
  },
  modalText: {
    marginBottom: 12,
    fontSize: 19,
    fontWeight: '700',
    paddingLeft: 20,
    paddingTop: 20,
    color: '#444444',
  },
  containerImageStreet: {
    marginHorizontal: 20,
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // padding: 20,
    height: '22%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  map: {
    flex: 1,
  },

  mapEl: {
    padding: 8,
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
  },

  mapArrow: {
    width: 24,
    height: 24,
  },
  firstHeaderButton: {
    borderBottomLeftRadius: 15,
  },
  lastHeaderButton: {
    borderBottomRightRadius: 15,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    top:100,
    width: '100%',
    height: '100%',
  },
  map: {
    flex: 1,
  },

  boxswipe: {
    backgroundColor: '#F6F6F6',
  },
  boxswipeTitle: {
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  imageStreet: {
    width: '90%',
    height: 103,
    borderRadius: 8,
    marginBottom: 16,
    marginHorizontal: 20,
  },
  containerSwiper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  containerAccountSwiper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  SwipeAvatar: {
    width: 32,
    height: 32,
    borderRadius: 2,
    marginRight: 8,
  },
  SwipeAccountTitle: {
    fontSize: 12,
    fontWeight: '700',
  },
  SwipeAccountDescription: {
    fontSize: 8,
    fontWeight: '500',
  },
  containerStars: {
    flexDirection: 'row',
  },
  ImageRating: {
    width: 12,
    height: 12,
  },
  ImageRatingCenter: {
    marginHorizontal: 5,
  },
  textButtonTransform: {
    marginBottom: 24,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 13,
  },
  buttonOpen: {
    backgroundColor: '#1E9D2D',
    marginBottom: 12,
    marginHorizontal: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 19,
  },
  buttonHistory: {
    paddingHorizontal: 20,
    paddingVertical: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerCrownText: {
    marginLeft: 5,
    fontWeight: '700',
  },
  StoryItemImage: {
    width: 34,
    height: 34,
    borderRadius: 5,
    marginRight: 5,
  },
});
