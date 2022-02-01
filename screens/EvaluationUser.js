import React from 'react';
import { Text, View, StyleSheet, Image, Pressable, ScrollView, Platform } from 'react-native';
import GLOBAL from '../global.js'
import authParams from '../store/redux/auth/authParams.js';
import UserStore from '../store/UserStore.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
function EvaluationUser({ navigation }) {
    const [userComment, setUserComment] = React.useState([])
    const [loggedVia, setLoggedVia] = React.useState('')

    const loggedViaFunc= async() => {
        let loginVia = null
        loginVia = await AsyncStorage.getItem('loggedVia');
        setLoggedVia(loginVia)
    }
    const ALL_USER_COMMETS = `https://www.ecomap.online/api/map/user-comment/`

    React.useEffect(() => {
        loggedViaFunc()
        fetch(ALL_USER_COMMETS, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `${loggedVia === 'apple' ? authParams.bearer : authParams.token} ${UserStore.token}`,
            }
        })
            .then(response => response.json())
            .then(json => {
                setUserComment(json)
                console.log(json)
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    console.log(userComment)

    return(
        <View style={styles.container}>
            <ScrollView style={ styles.containerScroll }>
                    {
                        userComment.map((u, i) => {
                            return(
                                <View key={i} style={ styles.streetCommentElem }>
                                    <Image source={{uri: 'https://www.ecomap.online' + u.image}} 
                                           style={styles.imageStreet} 
                                    />
                                    <View style={styles.streetCommentInfo}>
                                        <View>
                                            <Text style={{marginBottom: 5, fontWeight: 'bold'}}>{u.street.title}</Text>
                                            {u.rating == 3 ?
                                                <View style={ styles.containerStars }>
                                                    <Image source={require('../assets/RatingStar.png')} style={styles.ImageRating} />
                                                    <Image source={require('../assets/RatingStar.png')} style={[styles.ImageRating, styles.ImageRatingCenter]} />
                                                    <Image source={require('../assets/RatingStar.png')} style={styles.ImageRating} />
                                                </View>
                                                : u.rating == 2 ?
                                                <View style={ styles.containerStars }>
                                                    <Image source={require('../assets/RatingStarYelllow.png')} style={styles.ImageRating} />
                                                    <Image source={require('../assets/RatingStarYelllow.png')} style={[styles.ImageRating, styles.ImageRatingCenter]} />
                                                    <Image source={require('../assets/RatingStarGray.png')} style={styles.ImageRating} />
                                                </View>
                                                : 
                                                <View style={ styles.containerStars }>
                                                    <Image source={require('../assets/RatingStarRed.png')} style={styles.ImageRating} />
                                                    <Image source={require('../assets/RatingStarGray.png')} style={[styles.ImageRating, styles.ImageRatingCenter]} />
                                                    <Image source={require('../assets/RatingStarGray.png')} style={styles.ImageRating} />
                                                </View>
                                            }
                                        </View>
                                        <Pressable
                                            style={styles.buttonDetail}
                                            onPress={() => navigation.navigate('EvaluationUserDetail', {
                                                commentId: u.id
                                            })}
                                        >
                                            <Text style={styles.headerCrownText}>Посмотреть →</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            )
                        })
                    }
            </ScrollView>
        </View>
    )
}

export default EvaluationUser

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 60
    },
    streetCommentElem: {
        paddingBottom: 20
    },  
    imageStreet: {
        width: 64,
        height: 64,
        marginRight: 12,
        borderRadius: 5
    },
    streetCommentElem: {
        marginTop: 20,
        paddingHorizontal: 20,
        flexDirection: 'row'
    },
    containerStars: {
        flexDirection: 'row'
    },
    ImageRating: {
        width: 12,
        height: 12
    },
    ImageRatingCenter: {
        marginHorizontal: 5
    },
    streetCommentInfo: {
        justifyContent: 'space-between'
    }
})